/* @monitoring/browser version ' + 0.0.1 */
import { HTTP_CODE, BREADCRUMBTYPES, ERRORTYPES, ERROR_TYPE_RE, EVENTTYPES, HTTPTYPE } from '@monitoring/shared';
export { SDK_NAME, SDK_VERSION } from '@monitoring/shared';
import { httpTransform, breadcrumb, transportData, resourceTransform, subscribeEvent, setTraceId, options, triggerHandlers, handleConsole, initOptions } from '@monitoring/core';
export { log } from '@monitoring/core';
import { Severity, isError, extractErrorStack, getLocationHref, getTimestamp, parseUrlToObj, unknownToString, _global, replaceOld, variableTypeDetection, on, isExistProperty, supportsHistory } from '@monitoring/utils';
import { EMethods } from '@monitoring/types';

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var HandleEvents = {
    handleHttp: function (data, type) {
        var isError = data.status === 0 || data.status === HTTP_CODE.BAD_REQUEST || data.status > HTTP_CODE.UNAUTHORIZED;
        var result = httpTransform(data);
        breadcrumb.push({
            type: type,
            category: breadcrumb.getCategory(type),
            data: __assign({}, result),
            level: Severity.Info,
            time: data.time
        });
        if (isError) {
            breadcrumb.push({
                type: type,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
                data: __assign({}, result),
                level: Severity.Error,
                time: data.time
            });
            transportData.send(result);
        }
    },
    handleError: function (errorEvent) {
        var target = errorEvent.target;
        if (target.localName) {
            var data = resourceTransform(errorEvent.target);
            breadcrumb.push({
                type: BREADCRUMBTYPES.RESOURCE,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.RESOURCE),
                data: data,
                level: Severity.Error
            });
            transportData.send(data);
        }
        var message = errorEvent.message, filename = errorEvent.filename, lineno = errorEvent.lineno, colno = errorEvent.colno, error = errorEvent.error;
        var result;
        if (error && isError(error)) {
            result = extractErrorStack(error, Severity.Normal);
        }
        result || (result = HandleEvents.handleNotErrorInstance(message, filename, lineno, colno));
        result.type = ERRORTYPES.JAVASCRIPT_ERROR;
        breadcrumb.push({
            type: BREADCRUMBTYPES.CODE_ERROR,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
            data: __assign({}, result),
            level: Severity.Error
        });
        transportData.send(result);
    },
    handleNotErrorInstance: function (message, filename, lineno, colno) {
        var name = ERRORTYPES.UNKNOWN;
        var url = filename || getLocationHref();
        var msg = message;
        var matches = message.match(ERROR_TYPE_RE);
        if (matches[1]) {
            name = matches[1];
            msg = matches[2];
        }
        var element = {
            url: url,
            func: ERRORTYPES.UNKNOWN_FUNCTION,
            args: ERRORTYPES.UNKNOWN,
            line: lineno,
            col: colno
        };
        return {
            url: url,
            name: name,
            message: msg,
            level: Severity.Normal,
            time: getTimestamp(),
            stack: [element]
        };
    },
    handleHistory: function (data) {
        var from = data.from, to = data.to;
        var parsedFrom = parseUrlToObj(from).relative;
        var parsedTo = parseUrlToObj(to).relative;
        breadcrumb.push({
            type: BREADCRUMBTYPES.ROUTE,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
            data: {
                from: parsedFrom ? parsedFrom : '/',
                to: parsedTo ? parsedTo : '/'
            },
            level: Severity.Info
        });
    },
    handleHashchange: function (data) {
        var oldURL = data.oldURL, newURL = data.newURL;
        var from = parseUrlToObj(oldURL).relative;
        var to = parseUrlToObj(newURL).relative;
        breadcrumb.push({
            type: BREADCRUMBTYPES.ROUTE,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
            data: {
                from: from,
                to: to
            },
            level: Severity.Info
        });
    },
    handleUnhandleRejection: function (ev) {
        var data = {
            type: ERRORTYPES.PROMISE_ERROR,
            message: unknownToString(ev.reason),
            url: getLocationHref(),
            name: ev.type,
            time: getTimestamp(),
            level: Severity.Low
        };
        if (isError(ev.reason)) {
            data = __assign(__assign({}, data), extractErrorStack(ev.reason, Severity.Low));
        }
        breadcrumb.push({
            type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
            data: __assign({}, data),
            level: Severity.Error
        });
        transportData.send(data);
    }
};

function isFilterHttpUrl(url) {
    return options.filterXhrUrlRegExp && options.filterXhrUrlRegExp.test(url);
}
function addReplaceHandler(handler) {
    if (!subscribeEvent(handler))
        return;
    replace(handler.type);
}
function replace(type) {
    switch (type) {
        case EVENTTYPES.XHR:
            xhrReplace();
            break;
        case EVENTTYPES.FETCH:
            fetchReplace();
            break;
        case EVENTTYPES.ERROR:
            listenError();
            break;
        case EVENTTYPES.CONSOLE:
            consoleReplace();
            break;
        case EVENTTYPES.HISTORY:
            historyReplace();
            break;
        case EVENTTYPES.UNHANDLEDREJECTION:
            unhandledrejectionReplace();
            break;
        case EVENTTYPES.DOM:
            break;
        case EVENTTYPES.HASHCHANGE:
            listenHashchange();
            break;
    }
}
function xhrReplace() {
    if (!('XMLHttpRequest' in _global)) {
        return;
    }
    var originalXhrProto = XMLHttpRequest.prototype;
    replaceOld(originalXhrProto, 'open', function (originalOpen) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.mito_xhr = {
                method: variableTypeDetection.isString(args[0]) ? args[0].toUpperCase() : args[0],
                url: args[1],
                sTime: getTimestamp(),
                type: HTTPTYPE.XHR
            };
            originalOpen.apply(this, args);
        };
    });
    replaceOld(originalXhrProto, 'send', function (originalSend) {
        return function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a = this.mito_xhr, method = _a.method, url = _a.url;
            setTraceId(url, function (headerFieldName, traceId) {
                _this.mito_xhr.traceId = traceId;
                _this.setRequestHeader(headerFieldName, traceId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, this);
            on(this, 'loadend', function () {
                if ((method === EMethods.Post && transportData.isSdkTransportUrl(url)) || isFilterHttpUrl(url))
                    return;
                var _a = this, responseType = _a.responseType, response = _a.response, status = _a.status;
                this.mito_xhr.reqData = args[0];
                var eTime = getTimestamp();
                this.mito_xhr.time = this.mito_xhr.sTime;
                this.mito_xhr.status = status;
                if (['', 'json', 'text'].indexOf(responseType) !== -1) {
                    this.mito_xhr.responseText = typeof response === 'object' ? JSON.stringify(response) : response;
                }
                this.mito_xhr.elapsedTime = eTime - this.mito_xhr.sTime;
                triggerHandlers(EVENTTYPES.XHR, this.mito_xhr);
            });
            originalSend.apply(this, args);
        };
    });
}
function fetchReplace() {
    if (!('fetch' in _global))
        return;
    replaceOld(_global, EVENTTYPES.FETCH, function (originalFetch) {
        return function (url, config) {
            if (config === void 0) { config = {}; }
            var sTime = getTimestamp();
            var method = (config && config.method) || 'GET';
            var handlerData = {
                type: HTTPTYPE.FETCH,
                method: method,
                reqData: config && config.body,
                url: url
            };
            var headers = new Headers(config.headers || {});
            Object.assign(headers, {
                setRequestHeader: headers.set
            });
            setTraceId(url, function (headerFieldName, traceId) {
                handlerData.traceId = traceId;
                headers.set(headerFieldName, traceId);
            });
            options.beforeAppAjaxSend && options.beforeAppAjaxSend({ method: method, url: url }, headers);
            config = __assign(__assign({}, config), { headers: headers });
            return originalFetch.apply(_global, [url, config]).then(function (res) {
                var tempRes = res.clone();
                var eTime = getTimestamp();
                handlerData = __assign(__assign({}, handlerData), { elapsedTime: eTime - sTime, status: tempRes.status, time: sTime });
                tempRes.text().then(function (data) {
                    if (method === EMethods.Post && transportData.isSdkTransportUrl(url))
                        return;
                    if (isFilterHttpUrl(url))
                        return;
                    handlerData.responseText = tempRes.status > HTTP_CODE.UNAUTHORIZED && data;
                    triggerHandlers(EVENTTYPES.FETCH, handlerData);
                });
                return res;
            }, function (err) {
                var eTime = getTimestamp();
                if (method === EMethods.Post && transportData.isSdkTransportUrl(url))
                    return;
                if (isFilterHttpUrl(url))
                    return;
                handlerData = __assign(__assign({}, handlerData), { elapsedTime: eTime - sTime, status: 0, time: sTime });
                triggerHandlers(EVENTTYPES.FETCH, handlerData);
                throw err;
            });
        };
    });
}
function listenHashchange() {
    if (!isExistProperty(_global, 'onpopstate')) {
        on(_global, EVENTTYPES.HASHCHANGE, function (e) {
            triggerHandlers(EVENTTYPES.HASHCHANGE, e);
        });
    }
}
function listenError() {
    on(_global, 'error', function (e) {
        triggerHandlers(EVENTTYPES.ERROR, e);
    }, true);
}
function consoleReplace() {
    if (!('console' in _global)) {
        return;
    }
    var logType = ['log', 'debug', 'info', 'warn', 'error', 'assert'];
    logType.forEach(function (level) {
        if (!(level in _global.console))
            return;
        replaceOld(_global.console, level, function (originalConsole) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (originalConsole) {
                    triggerHandlers(EVENTTYPES.CONSOLE, { args: args, level: level });
                    originalConsole.apply(_global.console, args);
                }
            };
        });
    });
}
var lastHref;
lastHref = getLocationHref();
function historyReplace() {
    if (!supportsHistory())
        return;
    var oldOnpopstate = _global.onpopstate;
    _global.onpopstate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var to = getLocationHref();
        var from = lastHref;
        lastHref = to;
        triggerHandlers(EVENTTYPES.HISTORY, {
            from: from,
            to: to
        });
        oldOnpopstate && oldOnpopstate.apply(this, args);
    };
    function historyReplaceFn(originalHistoryFn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var url = args.length > 2 ? args[2] : undefined;
            if (url) {
                var from = lastHref;
                var to = String(url);
                lastHref = to;
                triggerHandlers(EVENTTYPES.HISTORY, {
                    from: from,
                    to: to
                });
            }
            return originalHistoryFn.apply(this, args);
        };
    }
    replaceOld(_global.history, 'pushState', historyReplaceFn);
    replaceOld(_global.history, 'replaceState', historyReplaceFn);
}
function unhandledrejectionReplace() {
    on(_global, EVENTTYPES.UNHANDLEDREJECTION, function (ev) {
        triggerHandlers(EVENTTYPES.UNHANDLEDREJECTION, ev);
    });
}

function setupReplace() {
    addReplaceHandler({
        callback: function (data) {
            HandleEvents.handleHttp(data, BREADCRUMBTYPES.XHR);
        },
        type: EVENTTYPES.XHR
    });
    addReplaceHandler({
        callback: function (data) {
            HandleEvents.handleHttp(data, BREADCRUMBTYPES.FETCH);
        },
        type: EVENTTYPES.FETCH
    });
    addReplaceHandler({
        callback: function (error) {
            HandleEvents.handleError(error);
        },
        type: EVENTTYPES.ERROR
    });
    addReplaceHandler({
        callback: function (data) {
            handleConsole(data);
        },
        type: EVENTTYPES.CONSOLE
    });
    addReplaceHandler({
        callback: function (data) {
            HandleEvents.handleHistory(data);
        },
        type: EVENTTYPES.HISTORY
    });
    addReplaceHandler({
        callback: function (data) {
            HandleEvents.handleUnhandleRejection(data);
        },
        type: EVENTTYPES.UNHANDLEDREJECTION
    }),
        addReplaceHandler({
            callback: function (e) {
                HandleEvents.handleHashchange(e);
            },
            type: EVENTTYPES.HASHCHANGE
        });
}

function webInit(options) {
    if (options === void 0) { options = {}; }
    if (!('XMLHttpRequest' in _global) || options.disabled)
        return;
    initOptions(options);
    setupReplace();
}
function init(options) {
    if (options === void 0) { options = {}; }
    webInit(options);
}

export { HandleEvents, addReplaceHandler, init, setupReplace };
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=browser.esm.js.map
