import * as ffi from 'ffi-napi';
import { RenderableLine } from '../classes/screen';
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
export declare const kernal: {
    GetStdHandle: ffi.ForeignFunction<number, [number]>;
    SetConsoleTextAttribute: ffi.ForeignFunction<number, [number, number]>;
    GetConsoleScreenBufferInfo: ffi.ForeignFunction<number, [number, import("ref-napi").Pointer<unknown>]>;
};
export declare enum Color {
    FOREGROUND_BLUE = 1,
    FOREGROUND_GREEN = 2,
    FOREGROUND_RED = 4,
    FOREGROUND_INTENSITY = 8,
    BACKGROUND_BLUE = 16,
    BACKGROUND_GREEN = 32,
    BACKGROUND_RED = 64,
    BACKGROUND_INTENSITY = 128,
    COMMON_LVB_LEADING_BYTE = 256,
    COMMON_LVB_TRAILING_BYTE = 512,
    COMMON_LVB_GRID_HORIZONTAL = 1024,
    COMMON_LVB_GRID_LVERTICAL = 2048,
    COMMON_LVB_GRID_RVERTICAL = 4096,
    COMMON_LVB_REVERSE_VIDEO = 16384,
    COMMON_LVB_UNDERSCORE = 32768
}
export declare class RenderColor {
    readonly color: number;
    static _default_attributes: number;
    private _is_applyed;
    constructor(color: number);
    static create(color: string | number): RenderColor;
    toString(): string;
    private static getCurrentColor;
    static applyColor(color: number): number;
    toggle(): void;
    apply(): void;
    end(): void;
}
export declare function hashLine(line: RenderableLine): number;
export declare function byteOnly(n: number): number;
export declare function centerString(str: string, width: number): string;
