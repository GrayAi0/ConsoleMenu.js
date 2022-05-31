/**
 * TODO: Warp all the `console` methods, to move the cursor to ender the menu and then call the orignal method
 */
import { getCursorPosition, setCursorPosition } from "./console-utils";
import { RenderColor } from '../helpers/rendering'

// let _flag_c = 0;
// const flag = () => 1 << _flag_c++
// const flag_containt = (flags: number, d: number) => (d & flags) === d

//const array_same = (a: any[], b: any[]) => a.length === b.length && a.every((v, i) => v === b[i])

// export enum Flags {
    

// }

export type RenderableLine = [/** flags */ number, (string | [ /** colors flags */ number, /** string to render */ string ])[]] 
export type ScreenBuffer = RenderableLine[]

export type ScreenCache = { buffer_cache: number[] }


export interface ScreenOptions {
    cache?: ScreenCache
    curser_under_screen?: boolean
}

export default function renderScreenBuffer(buffer: ScreenBuffer, options: ScreenOptions = {}): ScreenCache {

    let height = 0;
    let mouseY = getCursorPosition().y

    if(!options.cache) {
        options.cache = { buffer_cache: [] }
    }


    const cache_rendered_lines: number[] = []

    while(height < buffer.length) {
        
        cache_rendered_lines[height] = 0

        const current_line       = buffer[height]
        // const current_line_flags = current_line[0]

        let _current_point = -1

        setCursorPosition(0, height+mouseY)

        while(current_line[1].length >++ _current_point) {

            const current_str = current_line[1][_current_point]
            const is_color    = current_str instanceof Array

            cache_rendered_lines[height] += is_color ? (
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

        if(cache_rendered_lines[height] < options.cache.buffer_cache[height]) {
            process.stdout.write(
                ' '.repeat(
                    options.cache.buffer_cache[height] - cache_rendered_lines[height] + 1
                )
            )
        }
                
        height++;
    }

    if(cache_rendered_lines.length < options.cache.buffer_cache.length) {
        for(let i = cache_rendered_lines.length; i < options.cache.buffer_cache.length; i++) {
            setCursorPosition(0, height++)
            process.stdout.write(
                ' '.repeat(
                    options.cache.buffer_cache[i]
                )
            )
        }
    }

    // if(options.curser_under_screen) {
    //     // setCursorPosition(0, buffer.length)
    // }

    setCursorPosition(0, mouseY);

    return { buffer_cache: cache_rendered_lines };
}
