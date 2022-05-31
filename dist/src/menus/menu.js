"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_core_1 = require("../structs/menu-core");
const readline_1 = require("readline");
const screen_1 = require("../classes/screen");
const menu_header_1 = require("../items/natives/menu-header");
const menu_footer_1 = require("../items/natives/menu-footer");
const rendering_1 = require("../helpers/rendering");
const console_utils_1 = require("../classes/console-utils");
/** Initialize the stdin for us */
(0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
class Menu extends menu_core_1.default {
    _title;
    _menu_header;
    _menu_footer;
    _cache = undefined;
    constructor(_title = "Default Menu Title", props = {}) {
        super(props);
        this._title = _title;
        this._menu_header = new menu_header_1.default(this._title);
        this._menu_header.menu = this;
        this._menu_footer = new menu_footer_1.default();
        this._menu_footer.menu = this;
    }
    initialize() {
        this.moveSelection(false);
        process.stdin.on('keypress', this._on_key_down.bind(this));
    }
    dispose() {
        process.stdin.off('keypress', this._on_key_down);
        this.lock();
        this.hide();
    }
    _hide() {
        if (!this._cache)
            return;
        const hidden_buffer = [];
        for (const line of this._cache) {
            hidden_buffer.push([
                0,
                [
                    ' '.repeat(line)
                ]
            ]);
        }
        (0, screen_1.default)(hidden_buffer);
        (0, console_utils_1.setCursorPosition)(0, 0);
    }
    _show() {
        this.render();
    }
    render(width = this.propertys.minimal_width) {
        if (this._is_menu_hidden)
            return;
        const buffer = [];
        // Rendering the menu header
        const [header_width, ...rendered_menu_header] = this._menu_header.render(width, this.propertys);
        width = header_width;
        // if(rendered_menu_header[0][1][0].length > header_width) {
        //     width = header_width
        // }
        const rendered_menu_footer = this._menu_footer.render(this._message, width, this.propertys);
        // Rendering the menu footer
        for (const idx in this._items) {
            const item = this._items[idx];
            const is_item_selected = idx == this._selected_item_idx;
            const rendered_item = item.render(width);
            if (rendered_item.length > width) {
                return this.render(rendered_item.length);
            }
            buffer.push(this._render(rendered_item, is_item_selected, item));
            // We don't want to add padding after the last item
            // @ts-ignore
            if (idx != this._items.length - 1) {
                // Adding between items padding
                for (let i = 0; i < this.propertys.between_items_padding; i++) {
                    buffer.push(this._render(this.propertys.between_items_style.repeat(width), false, null));
                }
            }
        }
        // Redner the menu
        this._cache = (0, screen_1.default)([
            // The header of the menu
            ...rendered_menu_header,
            // // Rendered Items
            ...buffer,
            // // Rendered Footer
            ...rendered_menu_footer
        ], { curser_under_screen: true, cache: this._cache });
    }
    _render(rendered_data, is_selected, item) {
        return [
            0,
            [
                // The left character of the menu
                this.propertys.left_column_style ?? "|",
                ...(is_selected ? ([
                    [
                        rendering_1.Color.BACKGROUND_BLUE | rendering_1.Color.BACKGROUND_GREEN | rendering_1.Color.BACKGROUND_RED,
                        // The menu padding, before the item
                        ' '.repeat(this.propertys.padding) +
                            // The selected item render output
                            rendered_data + // "  Item  "
                            // The menu padding, after the item
                            ' '.repeat(this.propertys.padding)
                    ]
                ]) : ([
                    // The menu padding, before the item
                    ' '.repeat(this.propertys.padding),
                    (item?.isDisabled ? ([
                        8 /** 8 for gray */,
                        // The selected item render output
                        rendered_data // "  Item  "
                    ]) : (rendered_data)),
                    // The menu padding, after the item
                    ' '.repeat(this.propertys.padding)
                ])),
                // The right character of the menu
                this.propertys.right_column_style + // "|"
                    // Selected item indicator
                    (is_selected ? " <--" : "") // " <-" or ""
            ],
        ];
    }
}
exports.default = Menu;
//# sourceMappingURL=menu.js.map