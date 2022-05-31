"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// format("${name} ${age}", {name: "John", age: 34}) // "John 34"
function format(data, obj) {
    return data.replace(/\{([^\}]*)\}/g, (match, key) => {
        return obj[key];
    });
}
exports.default = format;
//# sourceMappingURL=formater.js.map