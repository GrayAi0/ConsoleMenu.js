"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rendering_1 = require("../../helpers/rendering");
const menu_item_1 = require("../../structs/menu-item");
class MenuHeader extends menu_item_1.default {
    _label;
    constructor(_label) {
        super("");
        this._label = _label;
    }
    /** @ts-ignore */
    render(width, props) {
        const header_label = (0, rendering_1.centerString)(this._label, width);
        return [
            /** @ts-ignore */
            header_label.length,
            this._render("-".repeat(header_label.length + props.padding * 2), props, true),
            this._render(header_label, props),
            this._render("-".repeat(header_label.length + (props.padding * 2)), props, true)
        ];
    }
    _render(item, props, _remove_padding) {
        return [
            0,
            [
                // The left character of the menu
                props.left_column_style + // "|"
                    // The menu padding, before the item
                    (_remove_padding ? "" : ' '.repeat(props.padding)) +
                    // The selected item render output
                    item + // "  Item  "
                    // The menu padding, after the item
                    (_remove_padding ? "" : ' '.repeat(props.padding)) +
                    // The right character of the menu
                    props.right_column_style // "|"
            ]
        ];
    }
}
exports.default = MenuHeader;
//# sourceMappingURL=menu-header.js.map