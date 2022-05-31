"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MenuItem {
    _label;
    ITEM_TYPE = "DEFAULT_ITEM";
    _is_disabled = false;
    _id;
    _menu;
    propertys;
    get label() {
        return this._label;
    }
    set label(value) {
        this._label = value;
    }
    constructor(_label, propertys = {}) {
        this._label = _label;
        this.propertys = Object.assign({
            is_countless: false,
            onClicked: () => { },
            onKeyDown: (key) => { },
            disabled: false,
        }, propertys);
        if (this.propertys.disabled) {
            this.disable();
        }
    }
    get isDisabled() {
        return this._is_disabled;
    }
    get menu() {
        if (!this._menu) {
            throw new Error("Cannot access `MenuItem.menu` property before append the item to the menu.");
        }
        return this._menu;
    }
    set menu(val) {
        if (!this._menu) {
            this._menu = val;
        }
    }
    get id() {
        return this._id;
    }
    set id(val) {
        if (!this._id?.length) {
            this._id = val;
        }
    }
    disable() {
        this._is_disabled = true;
        if (this._menu) {
            this._menu.render();
        }
    }
    enable() {
        this._is_disabled = false;
        if (this._menu) {
            this._menu.render();
        }
    }
    onKeyDown(key) {
        this.propertys.onKeyDown.bind(this)(key);
    }
    onClicked(...args) {
        /** @ts-ignore */
        return this.propertys.onClicked.bind(this)(...args);
    }
    /**
     * Render the item
     */
    render(width) {
        throw new Error("`Item.render(width)` Method not implemented.");
    }
}
exports.default = MenuItem;
//# sourceMappingURL=menu-item.js.map