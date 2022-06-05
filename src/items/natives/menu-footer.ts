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
    public render(log: string, width: number, props: MenuPropertys): RenderableLine[] {

        const footer_labels = wrap(log, { width: width - (props.padding * 2) }).split('\n').map(lbl => centerString(lbl, width))
        
        /** @ts-ignore */
        let max_length = footer_labels.reduce((prev, cur) => Math.max(prev.length, cur.length)) as number

        if(typeof max_length === 'string') {
            /** @ts-ignore */
            max_length = max_length.length 
        }


        return [
            this._render(
                props.footer_style.repeat(max_length + props.padding * 2),
                props,
                false,
                true
            ),
            
            ...footer_labels.map(label => this._render(label, props)),

            this._render(
                props.footer_style.repeat(max_length + (props.padding * 2)),
                props,
                true,
                true
            )
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