import { buffer } from "stream/consumers";
import { kernal } from "../helpers/rendering";






export function setCursorPosition(x: number, y: number) {
    process.stdout.cursorTo(x, y);
}

export function getCursorPosition(): { x: number, y: number } {
    const handle = kernal.GetStdHandle(/** Default Console Handle */ -11);
    const buff = Buffer.alloc(22 /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 22 */)
    
    /** @ts-ignore */
    kernal.GetConsoleScreenBufferInfo(handle, buff);
    
    return { x: buff.readInt16LE(4 /** offest in memory */), y: buff.readInt16LE(6 /** offest in memory */) };
}