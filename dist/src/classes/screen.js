"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flags = void 0;
const console_utils_1 = require("./console-utils");
const rendering_1 = require("../helpers/rendering");
const fs_1 = require("fs");
let _flag_c = 0;
const flag = () => 1 << _flag_c++;
const flag_containt = (flags, d) => (d & flags) === d;
//const array_same = (a: any[], b: any[]) => a.length === b.length && a.every((v, i) => v === b[i])
var Flags;
(function (Flags) {
})(Flags = exports.Flags || (exports.Flags = {}));
function renderScreenBuffer(buffer, options = {}) {
    let height = 0;
    if (!options.cache) {
        options.cache = [];
    }
    (0, fs_1.writeFileSync)("./menu.log", "[current buffer]:\n" +
        buffer.map(line => line.toString()).join("\n") +
        "\n\n[last buffer]:\n" +
        options.cache?.map?.(line => line.toString()).join?.("\n"));
    const cache_rendered_lines = [];
    while (height < buffer.length) {
        cache_rendered_lines[height] = 0;
        const current_line = buffer[height];
        // const current_line_flags = current_line[0]
        let _current_point = -1;
        (0, console_utils_1.setCursorPosition)(0, height);
        while (current_line[1].length > ++_current_point) {
            const current_str = current_line[1][_current_point];
            const is_color = current_str instanceof Array;
            cache_rendered_lines[height] += is_color ? (current_str[1].length) : (current_str.length);
            if (is_color) {
                rendering_1.RenderColor.applyColor(current_str[0]);
            }
            process.stdout.write(is_color ? current_str[1] : current_str);
            if (is_color) {
                rendering_1.RenderColor.applyColor(rendering_1.RenderColor._default_attributes);
            }
        }
        if (cache_rendered_lines[height] < options.cache[height]) {
            process.stdout.write(' '.repeat(options.cache[height] - cache_rendered_lines[height] + 1));
        }
        height++;
    }
    if (cache_rendered_lines.length < options.cache.length) {
        for (let i = cache_rendered_lines.length; i < options.cache.length; i++) {
            (0, console_utils_1.setCursorPosition)(0, height++);
            process.stdout.write(' '.repeat(options.cache[i]));
        }
    }
    if (options.curser_under_screen) {
        (0, console_utils_1.setCursorPosition)(0, buffer.length);
    }
    return cache_rendered_lines;
}
exports.default = renderScreenBuffer;
//# sourceMappingURL=screen.js.map