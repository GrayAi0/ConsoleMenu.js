





export function setCursorPosition(x: number, y: number) {
    process.stdout.cursorTo(x, y);
}

export function getCursorPosition(): { x: number, y: number } {
    return { x: process.stdout.columns, y: process.stdout.rows };
}