
import ffi = require('ffi-napi');

const kernal = ffi.Library('kernel32', {
    'GetStdHandle': ['int', ['int']],
    'SetConsoleTextAttribute': ['int', ['int', 'int']],
    "GetConsoleScreenBufferInfo": ['int', ['int', 'pointer']]
});


export enum Color {
    FOREGROUND_BLUE = 0x0001,	// Text color contains blue.
    FOREGROUND_GREEN = 0x0002,	// Text color contains green.
    FOREGROUND_RED = 0x0004,	// Text color contains red.
    FOREGROUND_INTENSITY = 0x0008,	// Text color is intensified.
    FOREGROUND_RESET = 0x000F,
    BACKGROUND_BLUE = 0x0010,	// Background color contains blue.
    BACKGROUND_GREEN = 0x0020,	// Background color contains green.
    BACKGROUND_RED = 0x0040,	// Background color contains red.
    BACKGROUND_INTENSITY = 0x0080,	// Background color is intensified.
    BACKGROUND_RESET = 256,
    COMMON_LVB_LEADING_BYTE = 0x0100,	// Leading byte.
    COMMON_LVB_TRAILING_BYTE = 0x0200,	// Trailing byte.
    COMMON_LVB_GRID_HORIZONTAL = 0x0400,	// Top horizontal.
    COMMON_LVB_GRID_LVERTICAL = 0x0800,	// Left vertical.
    COMMON_LVB_GRID_RVERTICAL = 0x1000,	// Right vertical.
    COMMON_LVB_REVERSE_VIDEO = 0x4000,	// Reverse foreground and background attribute.
    COMMON_LVB_UNDERSCORE = 0x8000	// Underscore.
}

export class RenderColor {

    public static _default_attributes: number = RenderColor.getCurrentColor();
    private _is_applyed: boolean = false;

    constructor(
        public readonly color: number
    ) { }

    public static create(color: string | number) {
        return new RenderColor(typeof color === 'string' ? Number(color.split('[')[1].split('m')[0]) : color)
    }

    public toString() { // Debug only !!!
        return `[color: ${this.color}]|`;
    }

    private static getCurrentColor(): number {
        const handle = kernal.GetStdHandle(/** Default Console Handle */ -11);
        
        const buff = Buffer.alloc(16 /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 16 */) 

        /** @ts-ignore */
        kernal.GetConsoleScreenBufferInfo(handle, buff);

        return buff.readInt32LE(8 /** offest in memory */)
    }

    public static applyColor(color: number) {
        const handle = kernal.GetStdHandle(/** Default Console Handle */ -11);
        
        const buff = Buffer.alloc(16 /** sizeof(CONSOLE_SCREEN_BUFFER_INFO) == 16 */) 

        /** @ts-ignore */
        kernal.GetConsoleScreenBufferInfo(handle, buff);

        kernal.SetConsoleTextAttribute(handle, color)

        return buff.readInt32LE(8 /** offest in memory */)
    }

    public toggle() {
        if (this._is_applyed) {
            this.end()
        } else {
            this.apply()
        }
        this._is_applyed = !this._is_applyed
    }

    public apply() {
        RenderColor.applyColor(this.color)
    }

    public end() {
        RenderColor.applyColor(RenderColor._default_attributes)
    }

}


export function byteOnly(n: number) {
    return Math.max(n, -n)
}

export function centerString(str: string, width: number) {
    let spaces = byteOnly(
        width - str.length
    ) / 2
    
    return (
        ' '.repeat(spaces + (
                str.length % 2 == 1 ? 1 : 0
            )
        ) +
        str +
        ' '.repeat(spaces)
    )
}