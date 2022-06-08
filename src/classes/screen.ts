/**
 * TODO: Warp all the `console` methods, to move the cursor to ender the menu and then call the orignal method
 */
import { getCursorPosition, setCursorPosition } from "./console-utils";
import { hashLine, RenderColor } from '../helpers/rendering'
import { writeFileSync } from "fs";

const ENABLE_DEBUG = false

// let _flag_c = 0;
// const flag = () => 1 << _flag_c++
// const flag_containt = (flags: number, d: number) => (d & flags) === d

//const array_same = (a: any[], b: any[]) => a.length === b.length && a.every((v, i) => v === b[i])

// export enum Flags {
    

// }

export type RenderableLine = [/** flags */ number, (string | [ /** colors flags */ number, /** string to render */ string ])[]] 
export type ScreenBuffer = RenderableLine[]

export type HashedLine = [ 
    /** Hashed line */ number,
    /** total string length */ number
]

export type ScreenCache = { buffer_cache: HashedLine[] }


export interface ScreenOptions {
    cache?: boolean
    curser_under_screen?: boolean
}

export const screenCache: ScreenCache = { buffer_cache: [] }

export default function renderScreenBuffer(buffer: ScreenBuffer, options: ScreenOptions = {}): ScreenCache {

    let height = 0;
    let mouseY = getCursorPosition().y
    let debug_menu = []

    const cache_rendered_lines: HashedLine[] = []

    while(height < buffer.length) {
        

        const current_line       = buffer[height]
        // const current_line_flags = current_line[0]

        cache_rendered_lines[height] = [ hashLine(current_line), 0 ]

        if(cache_rendered_lines[height][0] === screenCache.buffer_cache[height]?.[0]) {
            
            cache_rendered_lines[height] = screenCache.buffer_cache[height]
            if(ENABLE_DEBUG) debug_menu[height] = '0'.repeat(screenCache.buffer_cache[height][1]);

            height++
            continue
        }
        
        let _current_point = -1

        setCursorPosition(0, height+mouseY)

        while(current_line[1].length >++ _current_point) {

            const current_str = current_line[1][_current_point]
            const is_color    = current_str instanceof Array

            cache_rendered_lines[height][1] += is_color ? (
                current_str[1].length
            ) : (
                current_str.length
            )

            if(is_color) {
                /** @ts-ignore: if is_color is true that mean current_str[0] is number */
                RenderColor.applyColor(current_str[0])
            }

            process.stdout.write(
                /** @ts-ignore: ??? */
                is_color ? current_str[1] : current_str
            )

            if(is_color) {
                RenderColor.applyColor(RenderColor._default_attributes)
            }
        }

        if(ENABLE_DEBUG) debug_menu[height] = '1'.repeat(cache_rendered_lines[height]?.[1]);

        if(cache_rendered_lines[height][1] < screenCache.buffer_cache[height]?.[1]) {
            process.stdout.write(
                ' '.repeat(
                    screenCache.buffer_cache[height][1] - cache_rendered_lines[height][1] + 1
                )
            )
        }
                
        height++;
    }

    if(cache_rendered_lines.length < screenCache.buffer_cache.length) {
        for(let i = cache_rendered_lines.length; i < screenCache.buffer_cache.length; i++) {
            setCursorPosition(0, height++)
            process.stdout.write(
                ' '.repeat(
                    screenCache.buffer_cache[i][1]
                )
            )
        }
    }

    // if(options.curser_under_screen) {
    //     // setCursorPosition(0, buffer.length)
    // }

    if(ENABLE_DEBUG) {
        writeFileSync('debug.log', debug_menu.join('\n'))
    }

    setCursorPosition(0, mouseY);

    screenCache.buffer_cache = cache_rendered_lines
    return { buffer_cache: cache_rendered_lines };
}
