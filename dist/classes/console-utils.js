"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCursorPosition = exports.setCursorPosition = void 0;
var rendering_1 = require("../helpers/rendering");
function setCursorPosition(x, y) {
    process.stdout.cursorTo(x, y);
}
exports.setCursorPosition = setCursorPosition;
function getCursorPosition() {
    var handle = rendering_1.kernal.GetStdHandle(/** Default Console Handle */ -11);
    var buff = Buffer.alloc(22 /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 22 */);
    /** @ts-ignore */
    rendering_1.kernal.GetConsoleScreenBufferInfo(handle, buff);
    return { x: buff.readInt16LE(4 /** offest in memory */), y: buff.readInt16LE(6 /** offest in memory */) };
}
exports.getCursorPosition = getCursorPosition;
//# sourceMappingURL=console-utils.js.map