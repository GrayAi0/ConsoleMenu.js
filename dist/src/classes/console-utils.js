"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCursorPosition = exports.setCursorPosition = void 0;
function setCursorPosition(x, y) {
    process.stdout.cursorTo(x, y);
}
exports.setCursorPosition = setCursorPosition;
function getCursorPosition() {
    return { x: process.stdout.columns, y: process.stdout.rows };
}
exports.getCursorPosition = getCursorPosition;
//# sourceMappingURL=console-utils.js.map