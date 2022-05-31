export declare enum Flags {
}
export declare type RenderableLine = [ /** flags *//** flags */ number, (string | [ /** colors flags *//** colors flags */ number, /** string to render */ string])[]];
export declare type ScreenBuffer = RenderableLine[];
export declare type ScreenCache = number[];
export interface ScreenOptions {
    cache?: ScreenCache;
    curser_under_screen?: boolean;
}
export default function renderScreenBuffer(buffer: ScreenBuffer, options?: ScreenOptions): ScreenCache;
