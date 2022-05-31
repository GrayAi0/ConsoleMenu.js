"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formater_1 = require("../helpers/formater");
const menu_item_1 = require("./menu-item");
class MenuCore {
    static MENU_TYPE = "DEFAULT_MENU";
    propertys;
    _selected_item_idx = -1;
    _items = [];
    _message = "";
    _message_timeout_tmo;
    _is_menu_locked = false;
    _is_menu_hidden = false;
    // protected _screen: Screen = new Screen()
    get current_selected_item() {
        return this._items[this._selected_item_idx];
    }
    get selected_item_idx() {
        return this._selected_item_idx;
    }
    constructor(propertys = {}) {
        this.propertys = Object.assign({
            left_column_style: '|',
            right_column_style: '|',
            header_style: '-',
            bottom_row_style: '-',
            between_items_style: ' ',
            padding: 2,
            between_items_padding: 1,
            message_item_selected: false,
            message_item_format: "Item ${index} selected",
            minimal_width: 5,
        }, propertys);
    }
    showMessage(message, timeout = -1) {
        this._message = message;
        this.render();
        if (timeout > 0) {
            clearTimeout(this._message_timeout_tmo);
            this._message_timeout_tmo = setTimeout(() => {
                this.clearMessage();
                this.render();
            }, timeout);
        }
    }
    /**
     * Call this.showMessage("", -1)
     */
    clearMessage() {
        this.showMessage("", -1);
    }
    _on_key_down(keydat, key) {
        if (this._is_menu_locked)
            return;
        if (key.name == 'down') {
            this.moveSelection(false);
            if (this.propertys.message_item_selected)
                this.showMessage(// showMessage will render the menu
                (0, formater_1.default)(this.propertys.message_item_format, { index: this._selected_item_idx }));
            else
                this.render();
        }
        else if (key.name == 'up') {
            this.moveSelection(true);
            if (this.propertys.message_item_selected)
                this.showMessage(// showMessage will render the menu
                (0, formater_1.default)(this.propertys.message_item_format, { index: this._selected_item_idx }));
            else
                this.render();
        }
        else if (key.name === 'left') {
            this.current_selected_item.onClicked();
            this.render();
        }
    }
    /**
     * Lock the menu control
     */
    lock() {
        this._is_menu_locked = true;
    }
    /**
     * Unlock the menu control
     */
    unlock() {
        this._is_menu_locked = false;
    }
    clear() {
        throw new Error("`Menu.clear()` Method not implemented.");
    }
    _hide() {
        throw new Error("`Menu._hide()` Method not implemented.");
    }
    _show() {
        throw new Error("`Menu._show()` Method not implemented.");
    }
    hide() {
        if (!this._is_menu_hidden) {
            this._is_menu_hidden = true;
            this._hide();
        }
    }
    show() {
        if (this._is_menu_hidden) {
            this._is_menu_hidden = false;
            this._show();
        }
    }
    /**
     * Append new Item
     * @param at Append the item at
     */
    append(item, at) {
        if (typeof at == 'number') {
            this._items.splice(at, 0, item);
        }
        else if (at instanceof menu_item_1.default) {
            this._items.splice(this._items.indexOf(at), 0, item);
        }
        else {
            this._items.push(item);
        }
        item.id = item.ITEM_TYPE + ": " + this._items.indexOf(item);
        item.menu = this;
    }
    /**
     * Remove item from the menu
     */
    remove(item) {
        this._items.splice(this._items.indexOf(item), 1);
    }
    moveSelection(up) {
        this._selected_item_idx += up ? -1 : 1;
        if (this._selected_item_idx < 0) {
            this._selected_item_idx = this._items.length - 1;
        }
        else if (this._selected_item_idx >= this._items.length) {
            this._selected_item_idx = 0;
        }
        if (this.current_selected_item.isDisabled) {
            this.moveSelection(up);
        }
    }
    /**
     * Disable an item from the menu
     */
    disable(item) {
        if (typeof item == 'number') {
            item = this._items[item];
        }
        item?.disable?.();
    }
    /**
     * Enable an item from the menu
     */
    enable(item) {
        if (typeof item == 'number') {
            item = this._items[item];
        }
        item?.enable?.();
    }
    /**
     * Is item enabled
     */
    isEnabled(item) {
        if (typeof item == 'number') {
            item = this._items[item];
        }
        return typeof item?.isDisabled === 'boolean' ? !item?.isDisabled : false;
    }
    /**
     * Is item disabled
     */
    isDisabled(item) {
        if (typeof item == 'number') {
            item = this._items[item];
        }
        return typeof item?.isDisabled === 'boolean' ? item?.isDisabled : false;
    }
    /**
     * Get the current menu index
     */
    currentItemIndex() {
        return this._selected_item_idx;
    }
    /**
     * Get Item by index
     */
    getItem(index) {
        return this._items[index];
    }
    /**
     * Initialize the menu
     */
    initialize(...args) {
        throw new Error("`Menu.render()` Method not implemented.");
    }
    /**
     * Render the menu
     */
    render() {
        throw new Error("`Menu.render()` Method not implemented.");
    }
}
exports.default = MenuCore;
//# sourceMappingURL=menu-core.js.map