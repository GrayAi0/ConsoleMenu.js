import { RenderableLine } from "../../classes/screen";
import { centerString } from "../../helpers/rendering";
import { MenuPropertys } from "../../structs/menu-core";
import MenuItem from "../../structs/menu-item";







export default class MenuHeader extends MenuItem {

    constructor(
        private readonly _label: string
    ) { 
        super("")
    }

    /** @ts-ignore */
    public render(width: number, props: MenuPropertys): [number, RenderableLine, RenderableLine, RenderableLine] {

        const header_label = centerString(this._label, width)

        return [
            /** @ts-ignore */
            header_label.length,

            this._renderLine(
                props.header_style.repeat((header_label.length + props.padding * 2)),
                props,
                true,
                true
            ),
            
            this._renderLine(
                header_label,
                props
            ),

            this._renderLine(
                props.header_style.repeat(header_label.length + (props.padding * 2)),
                props,
                false,
                true
            )
        ]
    }

    private _renderLine(item: string, props: MenuPropertys, is_top_line?: boolean, _remove_padding?: boolean): RenderableLine {
        return [
            0,
            [
                // The left character of the menu
                (is_top_line ? props.top_left_corner_style : props.left_column_style) + // "|"

                // The menu padding, before the item
                (_remove_padding ? "" : ' '.repeat(props.padding)) +

                // The selected item render output
                item + // "  Item  "

                // The menu padding, after the item
                (_remove_padding ? "" : ' '.repeat(props.padding)) +
                
                // The right character of the menu
                (is_top_line ? props.top_right_corner_style : props.right_column_style) // "|"
            ]
        ]
    }

}