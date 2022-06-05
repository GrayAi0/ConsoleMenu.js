export declare type RenderableLine = [ /** flags *//** flags */ number, (string | [ /** colors flags *//** colors flags */ number, /** string to render */ string])[]];
export declare type ScreenBuffer = RenderableLine[];
export declare type HashedLine = [
    /** Hashed line */ number,
    /** total string length */ number
];
export declare type ScreenCache = {
    buffer_cache: HashedLine[];
};
export interface ScreenOptions {
    cache?: boolean;
    curser_under_screen?: boolean;
}
export declare const screenCache: ScreenCache;
export default function renderScreenBuffer(buffer: ScreenBuffer, options?: ScreenOptions): ScreenCache;
