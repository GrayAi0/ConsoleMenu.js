"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenCache = void 0;
/**
 * TODO: Warp all the `console` methods, to move the cursor to ender the menu and then call the orignal method
 */
var console_utils_1 = require("./console-utils");
var rendering_1 = require("../helpers/rendering");
var fs_1 = require("fs");
var ENABLE_DEBUG = false;
exports.screenCache = { buffer_cache: [] };
function renderScreenBuffer(buffer, options) {
    var _a, _b, _c;
    if (options === void 0) { options = {}; }
    var height = 0;
    var mouseY = (0, console_utils_1.getCursorPosition)().y;
    var debug_menu = [];
    var cache_rendered_lines = [];
    while (height < buffer.length) {
        var current_line = buffer[height];
        // const current_line_flags = current_line[0]
        cache_rendered_lines[height] = [(0, rendering_1.hashLine)(current_line), 0];
        if (cache_rendered_lines[height][0] === ((_a = exports.screenCache.buffer_cache[height]) === null || _a === void 0 ? void 0 : _a[0])) {
            cache_rendered_lines[height] = exports.screenCache.buffer_cache[height];
            if (ENABLE_DEBUG)
                debug_menu[height] = '0'.repeat(exports.screenCache.buffer_cache[height][1]);
            height++;
            continue;
        }
        var _current_point = -1;
        (0, console_utils_1.setCursorPosition)(0, height + mouseY);
        while (current_line[1].length > ++_current_point) {
            var current_str = current_line[1][_current_point];
            var is_color = current_str instanceof Array;
            cache_rendered_lines[height][1] += is_color ? (current_str[1].length) : (current_str.length);
            if (is_color) {
                /** @ts-ignore: if is_color is true that mean current_str[0] is number */
                rendering_1.RenderColor.applyColor(current_str[0]);
            }
            process.stdout.write(
            /** @ts-ignore: ??? */
            is_color ? current_str[1] : current_str);
            if (is_color) {
                rendering_1.RenderColor.applyColor(rendering_1.RenderColor._default_attributes);
            }
        }
        if (ENABLE_DEBUG)
            debug_menu[height] = '1'.repeat((_b = cache_rendered_lines[height]) === null || _b === void 0 ? void 0 : _b[1]);
        if (cache_rendered_lines[height][1] < ((_c = exports.screenCache.buffer_cache[height]) === null || _c === void 0 ? void 0 : _c[1])) {
            process.stdout.write(' '.repeat(exports.screenCache.buffer_cache[height][1] - cache_rendered_lines[height][1] + 1));
        }
        height++;
    }
    if (cache_rendered_lines.length < exports.screenCache.buffer_cache.length) {
        for (var i = cache_rendered_lines.length; i < exports.screenCache.buffer_cache.length; i++) {
            (0, console_utils_1.setCursorPosition)(0, height++);
            process.stdout.write(' '.repeat(exports.screenCache.buffer_cache[i].length));
        }
    }
    // if(options.curser_under_screen) {
    //     // setCursorPosition(0, buffer.length)
    // }
    if (ENABLE_DEBUG) {
        (0, fs_1.writeFileSync)('debug.log', debug_menu.join('\n'));
    }
    (0, console_utils_1.setCursorPosition)(0, mouseY);
    exports.screenCache.buffer_cache = cache_rendered_lines;
    return { buffer_cache: cache_rendered_lines };
}
exports.default = renderScreenBuffer;
//# sourceMappingURL=screen.js.map