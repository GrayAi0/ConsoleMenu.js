import { centerString } from "../../helpers/rendering";
import { MenuPropertys } from "../../structs/menu-core";
import MenuItem from "../../structs/menu-item";
import { RenderableLine } from "../../classes/screen";
import wrap from 'word-wrap';





export default class MenuFooter extends MenuItem {

    constructor(
    ) { 
        super("")
    }

    /** @ts-ignore */
    public render(messages: string[], width: number, props: MenuPropertys): RenderableLine[] {

        const labels: RenderableLine[] = []
        let max_length = width;
        for(const idx in messages) {
            const message = messages[idx]
            const footer_labels = wrap(message, { width: width - (props.padding * 2) }).split('\n').map(lbl => centerString(lbl, width))
            
            const _max_length = footer_labels.map(lbl => lbl.length).reduce((prev, cur) => Math.max(prev, cur)) as number
            
            max_length = Math.max(_max_length, max_length)
            
            labels.push(
                ...footer_labels.map(lbl => (
                    this._render(lbl, props)
                )),

                this._render(
                    props.footer_style.repeat(max_length + props.padding * 2),
                    props,
                    /** @ts-ignore */
                    idx == messages.length - 1,
                    true
                )
            )
        }
        


        return [
            this._render(
                props.footer_style.repeat(max_length + props.padding * 2),
                props,
                !labels.length,
                true
            ),
            
            ...labels,

            // this._render(
            //     props.footer_style.repeat(max_length + (props.padding * 2)),
            //     props,
            //     true,
            //     true
            // )
        ]
    }

    private _render(item: string, props: MenuPropertys, is_bottom_line?: boolean, _remove_padding?: boolean): RenderableLine {
        return [
            0,
            [
                // The left character of the menu
                (is_bottom_line ? props.bottom_left_corner_style : props.left_column_style) + // "|"

                // The menu padding, before the item
                (_remove_padding ? "" : ' '.repeat(props.padding)) +

                // The selected item render output
                item + // "  Item  "

                // The menu padding, after the item
                (_remove_padding ? "" : ' '.repeat(props.padding)) +
                
                // The right character of the menu
                (is_bottom_line ? props.bottom_right_corner_style : props.right_column_style) // "|"
            ]
        ]
    }

}