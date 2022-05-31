"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rendering_1 = require("../../helpers/rendering");
const menu_item_1 = require("../../structs/menu-item");
const wrap = require("word-wrap");
class MenuFooter extends menu_item_1.default {
    constructor() {
        super("");
    }
    /** @ts-ignore */
    render(log, width, props) {
        const footer_labels = wrap(log, { width: width - (props.padding * 2) }).split('\n').map(lbl => (0, rendering_1.centerString)(lbl, width));
        /** @ts-ignore */
        let max_length = footer_labels.reduce((prev, cur) => Math.max(prev.length, cur.length));
        if (typeof max_length === 'string') {
            /** @ts-ignore */
            max_length = max_length.length;
        }
        return [
            this._render("-".repeat(max_length + props.padding * 2), props, true),
            ...footer_labels.map(label => this._render(label, props)),
            this._render("-".repeat(max_length + (props.padding * 2)), props, true)
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
exports.default = MenuFooter;
//# sourceMappingURL=menu-footer.js.map