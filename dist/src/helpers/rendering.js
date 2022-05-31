"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerString = exports.byteOnly = exports.RenderColor = exports.Color = void 0;
const ffi = require("ffi-napi");
const kernal = ffi.Library('kernel32', {
    'GetStdHandle': ['int', ['int']],
    'SetConsoleTextAttribute': ['int', ['int', 'int']],
    "GetConsoleScreenBufferInfo": ['int', ['int', 'pointer']]
});
var Color;
(function (Color) {
    Color[Color["FOREGROUND_BLUE"] = 1] = "FOREGROUND_BLUE";
    Color[Color["FOREGROUND_GREEN"] = 2] = "FOREGROUND_GREEN";
    Color[Color["FOREGROUND_RED"] = 4] = "FOREGROUND_RED";
    Color[Color["FOREGROUND_INTENSITY"] = 8] = "FOREGROUND_INTENSITY";
    Color[Color["FOREGROUND_RESET"] = 15] = "FOREGROUND_RESET";
    Color[Color["BACKGROUND_BLUE"] = 16] = "BACKGROUND_BLUE";
    Color[Color["BACKGROUND_GREEN"] = 32] = "BACKGROUND_GREEN";
    Color[Color["BACKGROUND_RED"] = 64] = "BACKGROUND_RED";
    Color[Color["BACKGROUND_INTENSITY"] = 128] = "BACKGROUND_INTENSITY";
    Color[Color["BACKGROUND_RESET"] = 256] = "BACKGROUND_RESET";
    Color[Color["COMMON_LVB_LEADING_BYTE"] = 256] = "COMMON_LVB_LEADING_BYTE";
    Color[Color["COMMON_LVB_TRAILING_BYTE"] = 512] = "COMMON_LVB_TRAILING_BYTE";
    Color[Color["COMMON_LVB_GRID_HORIZONTAL"] = 1024] = "COMMON_LVB_GRID_HORIZONTAL";
    Color[Color["COMMON_LVB_GRID_LVERTICAL"] = 2048] = "COMMON_LVB_GRID_LVERTICAL";
    Color[Color["COMMON_LVB_GRID_RVERTICAL"] = 4096] = "COMMON_LVB_GRID_RVERTICAL";
    Color[Color["COMMON_LVB_REVERSE_VIDEO"] = 16384] = "COMMON_LVB_REVERSE_VIDEO";
    Color[Color["COMMON_LVB_UNDERSCORE"] = 32768] = "COMMON_LVB_UNDERSCORE"; // Underscore.
})(Color = exports.Color || (exports.Color = {}));
class RenderColor {
    color;
    static _default_attributes = RenderColor.getCurrentColor();
    _is_applyed = false;
    constructor(color) {
        this.color = color;
    }
    static create(color) {
        return new RenderColor(typeof color === 'string' ? Number(color.split('[')[1].split('m')[0]) : color);
    }
    toString() {
        return `[color: ${this.color}]|`;
    }
    static getCurrentColor() {
        const handle = kernal.GetStdHandle(/** Default Console Handle */ -11);
        const buff = Buffer.alloc(16 /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 16 */);
        /** @ts-ignore */
        kernal.GetConsoleScreenBufferInfo(handle, buff);
        return buff.readInt32LE(8 /** offest in memory */);
    }
    static applyColor(color) {
        const handle = kernal.GetStdHandle(/** Default Console Handle */ -11);
        const buff = Buffer.alloc(16 /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 16 */);
        /** @ts-ignore */
        kernal.GetConsoleScreenBufferInfo(handle, buff);
        kernal.SetConsoleTextAttribute(handle, color);
        return buff.readInt32LE(8 /** offest in memory */);
    }
    toggle() {
        if (this._is_applyed) {
            this.end();
        }
        else {
            this.apply();
        }
        this._is_applyed = !this._is_applyed;
    }
    apply() {
        RenderColor.applyColor(this.color);
    }
    end() {
        RenderColor.applyColor(RenderColor._default_attributes);
    }
}
exports.RenderColor = RenderColor;
function byteOnly(n) {
    return Math.max(n, -n);
}
exports.byteOnly = byteOnly;
function centerString(str, width) {
    let spaces = byteOnly(width - str.length) / 2;
    return (' '.repeat(spaces + (str.length % 2 == 1 ? 1 : 0)) +
        str +
        ' '.repeat(spaces));
}
exports.centerString = centerString;
//# sourceMappingURL=rendering.js.map