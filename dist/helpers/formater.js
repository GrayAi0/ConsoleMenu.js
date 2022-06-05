"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// format("${name} ${age}", {name: "John", age: 34}) // "John 34"
function format(data, obj) {
    return data.replace(/\{([^\}]*)\}/g, function (match, key) {
        var _a;
        /** @ts-ignore */
        return (_a = obj[key]) !== null && _a !== void 0 ? _a : "";
    });
}
exports.default = format;
//# sourceMappingURL=formater.js.map