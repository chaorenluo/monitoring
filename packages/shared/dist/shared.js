/* @monitoring/shared version ' + 0.0.1 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var version = "0.0.1";

var SDK_NAME = 'monitoring';
var SDK_VERSION = version;

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

exports.ERRORTYPES = void 0;
(function (ERRORTYPES) {
    ERRORTYPES["UNKNOWN"] = "UNKNOWN";
    ERRORTYPES["UNKNOWN_FUNCTION"] = "UNKNOWN_FUNCTION";
    ERRORTYPES["JAVASCRIPT_ERROR"] = "JAVASCRIPT_ERROR";
    ERRORTYPES["LOG_ERROR"] = "LOG_ERROR";
    ERRORTYPES["HTTP_ERROR"] = "HTTP_ERROR";
    ERRORTYPES["FETCH_ERROR"] = "FETCH_HTTP_ERROR";
    ERRORTYPES["VUE_ERROR"] = "VUE_ERROR";
    ERRORTYPES["REACT_ERROR"] = "REACT_ERROR";
    ERRORTYPES["RESOURCE_ERROR"] = "RESOURCE_ERROR";
    ERRORTYPES["PROMISE_ERROR"] = "PROMISE_ERROR";
    ERRORTYPES["ROUTE_ERROR"] = "ROUTE_ERROR";
})(exports.ERRORTYPES || (exports.ERRORTYPES = {}));
var CompositeEvents = __assign({}, exports.ERRORTYPES);
exports.BREADCRUMBTYPES = void 0;
(function (BREADCRUMBTYPES) {
    BREADCRUMBTYPES["ROUTE"] = "Route";
    BREADCRUMBTYPES["CLICK"] = "UI.Click";
    BREADCRUMBTYPES["XHR"] = "xhr";
    BREADCRUMBTYPES["CONSOLE"] = "Console";
    BREADCRUMBTYPES["FETCH"] = "Fetch";
    BREADCRUMBTYPES["UNHANDLEDREJECTION"] = "Unhandledrejection";
    BREADCRUMBTYPES["CODE_ERROR"] = "Code Error";
    BREADCRUMBTYPES["VUE"] = "Vue";
    BREADCRUMBTYPES["REACT"] = "React";
    BREADCRUMBTYPES["RESOURCE"] = "Resource";
    BREADCRUMBTYPES["CUSTOMER"] = "Customer";
})(exports.BREADCRUMBTYPES || (exports.BREADCRUMBTYPES = {}));
exports.BREADCRUMBCATEGORYS = void 0;
(function (BREADCRUMBCATEGORYS) {
    BREADCRUMBCATEGORYS["HTTP"] = "http";
    BREADCRUMBCATEGORYS["USER"] = "user";
    BREADCRUMBCATEGORYS["DEBUG"] = "debug";
    BREADCRUMBCATEGORYS["EXCEPTION"] = "exception";
    BREADCRUMBCATEGORYS["LIFECYCLE"] = "lifecycle";
})(exports.BREADCRUMBCATEGORYS || (exports.BREADCRUMBCATEGORYS = {}));
exports.EVENTTYPES = void 0;
(function (EVENTTYPES) {
    EVENTTYPES["XHR"] = "xhr";
    EVENTTYPES["FETCH"] = "fetch";
    EVENTTYPES["CONSOLE"] = "console";
    EVENTTYPES["DOM"] = "dom";
    EVENTTYPES["HISTORY"] = "history";
    EVENTTYPES["ERROR"] = "error";
    EVENTTYPES["HASHCHANGE"] = "hashchange";
    EVENTTYPES["UNHANDLEDREJECTION"] = "unhandledrejection";
    EVENTTYPES["VUE"] = "Vue";
})(exports.EVENTTYPES || (exports.EVENTTYPES = {}));
exports.HTTPTYPE = void 0;
(function (HTTPTYPE) {
    HTTPTYPE["XHR"] = "xhr";
    HTTPTYPE["FETCH"] = "fetch";
})(exports.HTTPTYPE || (exports.HTTPTYPE = {}));
exports.HTTP_CODE = void 0;
(function (HTTP_CODE) {
    HTTP_CODE[HTTP_CODE["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HTTP_CODE[HTTP_CODE["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HTTP_CODE[HTTP_CODE["INTERNAL_EXCEPTION"] = 500] = "INTERNAL_EXCEPTION";
})(exports.HTTP_CODE || (exports.HTTP_CODE = {}));
var ERROR_TYPE_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
var globalVar = {
    isLogAddBreadcrumb: true,
    crossOriginThreshold: 1000
};

exports.CompositeEvents = CompositeEvents;
exports.ERROR_TYPE_RE = ERROR_TYPE_RE;
exports.SDK_NAME = SDK_NAME;
exports.SDK_VERSION = SDK_VERSION;
exports.globalVar = globalVar;
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=shared.js.map
