"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.centerString = exports.byteOnly = exports.hashLine = exports.RenderColor = exports.Color = exports.kernal = void 0;
var tslib_1 = require("tslib");
var ffi = (0, tslib_1.__importStar)(require("ffi-napi"));
/**
 * GetConsoleScreenBufferInfo
 *
 * dwSize x: offest 0 size 2
 * dwSize y: offest 2 size 2
 * dwCursorPosition x: offest 4 size 2
 * dwCursorPosition y: offest 6 size 2
 * wAttributes: offest 8 size 2
 * srWindowLeft: offest 10 size 2
 * srWindowTop: offest 12 size 2
 * srWindowRight: offest 14 size 2
 * srWindowBottom: offest 16 size 2
 * dwMaximumWindowSize x: offest 18 size 2
 * dwMaximumWindowSize y: offest 20 size 2
 *
 *
 */
exports.kernal = ffi.Library('kernel32', {
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
    Color[Color["BACKGROUND_BLUE"] = 16] = "BACKGROUND_BLUE";
    Color[Color["BACKGROUND_GREEN"] = 32] = "BACKGROUND_GREEN";
    Color[Color["BACKGROUND_RED"] = 64] = "BACKGROUND_RED";
    Color[Color["BACKGROUND_INTENSITY"] = 128] = "BACKGROUND_INTENSITY";
    Color[Color["COMMON_LVB_LEADING_BYTE"] = 256] = "COMMON_LVB_LEADING_BYTE";
    Color[Color["COMMON_LVB_TRAILING_BYTE"] = 512] = "COMMON_LVB_TRAILING_BYTE";
    Color[Color["COMMON_LVB_GRID_HORIZONTAL"] = 1024] = "COMMON_LVB_GRID_HORIZONTAL";
    Color[Color["COMMON_LVB_GRID_LVERTICAL"] = 2048] = "COMMON_LVB_GRID_LVERTICAL";
    Color[Color["COMMON_LVB_GRID_RVERTICAL"] = 4096] = "COMMON_LVB_GRID_RVERTICAL";
    Color[Color["COMMON_LVB_REVERSE_VIDEO"] = 16384] = "COMMON_LVB_REVERSE_VIDEO";
    Color[Color["COMMON_LVB_UNDERSCORE"] = 32768] = "COMMON_LVB_UNDERSCORE"; // Underscore.
})(Color = exports.Color || (exports.Color = {}));
var RenderColor = /** @class */ (function () {
    function RenderColor(color) {
        this.color = color;
        this._is_applyed = false;
    }
    RenderColor.create = function (color) {
        return new RenderColor(typeof color === 'string' ? Number(color.split('[')[1].split('m')[0]) : color);
    };
    RenderColor.prototype.toString = function () {
        return "[color: " + this.color + "]|";
    };
    RenderColor.getCurrentColor = function () {
        var handle = exports.kernal.GetStdHandle(/** Default Console Handle */ -11);
        var buff = Buffer.alloc(22 /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 22 */);
        /** @ts-ignore */
        exports.kernal.GetConsoleScreenBufferInfo(handle, buff);
        return buff.readInt32LE(8 /** offest in memory */);
    };
    RenderColor.applyColor = function (color) {
        var handle = exports.kernal.GetStdHandle(/** Default Console Handle */ -11);
        var buff = Buffer.alloc(22 /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 22 */);
        /** @ts-ignore */
        exports.kernal.GetConsoleScreenBufferInfo(handle, buff);
        exports.kernal.SetConsoleTextAttribute(handle, color);
        return buff.readInt32LE(8 /** offest in memory */);
    };
    RenderColor.prototype.toggle = function () {
        if (this._is_applyed) {
            this.end();
        }
        else {
            this.apply();
        }
        this._is_applyed = !this._is_applyed;
    };
    RenderColor.prototype.apply = function () {
        RenderColor.applyColor(this.color);
    };
    RenderColor.prototype.end = function () {
        RenderColor.applyColor(RenderColor._default_attributes);
    };
    RenderColor._default_attributes = RenderColor.getCurrentColor();
    return RenderColor;
}());
exports.RenderColor = RenderColor;
function hashLine(line) {
    var hash = 0;
    for (var i = 0; i < line.length; i++) {
        var char = line[i];
        var _hash = 0;
        if (typeof char == 'number') {
            _hash = 0;
        }
        else {
            for (var _i = 0, char_1 = char; _i < char_1.length; _i++) {
                var c = char_1[_i];
                if (typeof c === 'string') {
                    hash = ((hash << 5) - hash) + c.split('').map(function (c) { return c.charCodeAt(0); }).reduce(function (a, b) { return a + b; });
                }
                else {
                    hash = ((hash << 5) - hash) + c[0];
                    hash = ((hash << 5) - hash) + c[1].split('').map(function (c) { return c.charCodeAt(0); }).reduce(function (a, b) { return a + b; });
                }
            }
        }
        hash = ((hash << 5) - hash) + _hash;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
exports.hashLine = hashLine;
function byteOnly(n) {
    return Math.max(n, -n);
}
exports.byteOnly = byteOnly;
function centerString(str, width) {
    var spaces = byteOnly(width - str.length) / 2;
    return (' '.repeat(spaces + (str.length % 2 == 1 ? 1 : 0)) +
        str +
        ' '.repeat(spaces));
}
exports.centerString = centerString;
//# sourceMappingURL=rendering.js.map