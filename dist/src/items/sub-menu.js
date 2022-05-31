"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("../menus/menu");
const rendering_1 = require("../helpers/rendering");
const menu_item_1 = require("../structs/menu-item");
const button_1 = require("./button");
class SubMenu extends menu_item_1.default {
    _render_menu;
    get subMenu() {
        return this._render_menu;
    }
    constructor(label, _render_menu = new menu_1.default(label), propertys = {}) {
        super(label, propertys);
        this._render_menu = _render_menu;
        this._render_menu.lock();
        this._render_menu.append(new button_1.default("Return", {
            onClicked: () => {
                this.hide();
            },
        }));
        this._render_menu.initialize();
    }
    render(width) {
        const label = this.label;
        const rightIcon = '[<]';
        let spaces = (0, rendering_1.byteOnly)(width - label.length) / 2;
        return (' '.repeat(spaces + (label.length % 2 == 1 ? 1 : 0)) +
            label +
            ' '.repeat(spaces - rightIcon.length) + rightIcon);
    }
    show() {
        this.menu.lock();
        this.menu.hide();
        this._render_menu.show();
        this._render_menu.unlock();
        this._render_menu.render();
    }
    hide() {
        this._render_menu.lock();
        this._render_menu.hide();
        process.nextTick(() => {
            this.menu.unlock();
            this.menu.show();
        });
    }
    onClicked() {
        super.onClicked();
        this.show();
    }
}
exports.default = SubMenu;
//# sourceMappingURL=sub-menu.js.map