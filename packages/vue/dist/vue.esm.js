/* @monitoring/vue version ' + 0.0.1 */
import { getLocationHref, getTimestamp, variableTypeDetection, getBigVersion, getFlag, setFlag, Severity, slientConsoleScope } from '@monitoring/utils';
import { ERRORTYPES, BREADCRUMBTYPES, EVENTTYPES } from '@monitoring/shared';
import { breadcrumb, transportData } from '@monitoring/core';

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

function handleVueError(err, vm, info, level, breadcrumbLevel, Vue) {
    var version = Vue === null || Vue === void 0 ? void 0 : Vue.version;
    var data = {
        type: ERRORTYPES.VUE_ERROR,
        message: err.message + "(" + info + ")",
        level: level,
        url: getLocationHref(),
        name: err.name,
        stack: err.stack || [],
        time: getTimestamp()
    };
    if (variableTypeDetection.isString(version)) {
        console.log('getBigVersion', getBigVersion(version));
        switch (getBigVersion(version)) {
            case 2:
                data = __assign(__assign({}, data), vue2VmHandler(vm));
                break;
            case 3:
                data = __assign(__assign({}, data), vue3VmHandler(vm));
                break;
            default:
                return;
        }
    }
    breadcrumb.push({
        type: BREADCRUMBTYPES.VUE,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.VUE),
        data: data,
        level: breadcrumbLevel
    });
    transportData.send(data);
}
function vue2VmHandler(vm) {
    var componentName = '';
    if (vm.$root === vm) {
        componentName = 'root';
    }
    else {
        var name_1 = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
        componentName =
            (name_1 ? 'component <' + name_1 + '>' : 'anonymous component') +
                (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');
    }
    return {
        componentName: componentName,
        propsData: vm.$options && vm.$options.propsData
    };
}
function vue3VmHandler(vm) {
    var componentName = '';
    if (vm.$root === vm) {
        componentName = 'root';
    }
    else {
        console.log(vm.$options);
        var name_2 = vm.$options && vm.$options.name;
        componentName = name_2 ? 'component <' + name_2 + '>' : 'anonymous component';
    }
    return {
        componentName: componentName,
        propsData: vm.$props
    };
}

var hasConsole = typeof console !== 'undefined';
var MitoVue = {
    install: function (Vue) {
        if (getFlag(EVENTTYPES.VUE) || !Vue || !Vue.config)
            return;
        setFlag(EVENTTYPES.VUE, true);
        Vue.config.errorHandler = function (err, vm, info) {
            handleVueError.apply(null, [err, vm, info, Severity.Normal, Severity.Error, Vue]);
            if (hasConsole && !Vue.config.silent) {
                slientConsoleScope(function () {
                    console.error('Error in ' + info + ': "' + err.toString() + '"', vm);
                    console.error(err);
                });
            }
        };
    }
};

export { MitoVue };
/* follow me on Github! @cjinhuo */
//# sourceMappingURL=vue.esm.js.map
