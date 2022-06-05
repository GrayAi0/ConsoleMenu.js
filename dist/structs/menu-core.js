"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var formater_1 = (0, tslib_1.__importDefault)(require("../helpers/formater"));
var styles_1 = (0, tslib_1.__importDefault)(require("../styles"));
var menu_item_1 = (0, tslib_1.__importDefault)(require("./menu-item"));
var MenuCore = /** @class */ (function () {
    function MenuCore(propertys) {
        if (propertys === void 0) { propertys = {}; }
        this._selected_item_idx = -1;
        this._items = [];
        this._messages = [];
        this._is_menu_locked = false;
        this._is_menu_hidden = false;
        this._max_id_msg = 0;
        this.propertys = Object.assign((0, styles_1.default)('normal', {
            padding: 2,
            between_items_padding: 1,
            message_item_selected: false,
            message_item_format: "Item ${index} selected",
            minimal_width: 10
        }), propertys);
    }
    Object.defineProperty(MenuCore.prototype, "current_selected_item", {
        get: function () {
            return this._items[this._selected_item_idx];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuCore.prototype, "selected_item_idx", {
        get: function () {
            return this._selected_item_idx;
        },
        enumerable: false,
        configurable: true
    });
    MenuCore.prototype.showMessage = function (message, timeout) {
        var _this = this;
        var _msg_id = this._max_id_msg++;
        this._messages.push({ id: _msg_id, message: message });
        this.render();
        setTimeout(function () {
            _this.clearMessage(_msg_id);
            _this.render();
        }, timeout || 4000);
        return _msg_id;
    };
    MenuCore.prototype.clearMessage = function (id) {
        this._messages = this._messages.filter(function (msg) { return msg.id != id; });
    };
    MenuCore.prototype._on_key_down = function (keydat, key) {
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
        else if (key.name === 'left' || key.name === 'right') {
            if (this.current_selected_item) {
                this.current_selected_item.onClicked();
            }
            this.render();
        }
    };
    /**
     * Lock the menu control
     */
    MenuCore.prototype.lock = function () {
        this._is_menu_locked = true;
    };
    /**
     * Unlock the menu control
     */
    MenuCore.prototype.unlock = function () {
        this._is_menu_locked = false;
    };
    MenuCore.prototype.clear = function () {
        throw new Error("`Menu.clear()` Method not implemented.");
    };
    MenuCore.prototype._hide = function () {
        throw new Error("`Menu._hide()` Method not implemented.");
    };
    MenuCore.prototype._show = function () {
        throw new Error("`Menu._show()` Method not implemented.");
    };
    MenuCore.prototype.hide = function () {
        if (!this._is_menu_hidden) {
            this._is_menu_hidden = true;
            this._hide();
        }
    };
    MenuCore.prototype.show = function () {
        if (this._is_menu_hidden) {
            this._is_menu_hidden = false;
            this._show();
        }
    };
    /**
     * Append new Item
     * @param at Append the item at
     */
    MenuCore.prototype.append = function (item, at) {
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
    };
    /**
     * Remove item from the menu
     */
    MenuCore.prototype.remove = function (item) {
        this._items.splice(this._items.indexOf(item), 1);
    };
    MenuCore.prototype.moveSelection = function (up) {
        var _a;
        this._selected_item_idx += up ? -1 : 1;
        if (this._selected_item_idx < 0) {
            this._selected_item_idx = this._items.length - 1;
        }
        else if (this._selected_item_idx >= this._items.length) {
            this._selected_item_idx = 0;
        }
        if ((_a = this.current_selected_item) === null || _a === void 0 ? void 0 : _a.isDisabled) {
            this.moveSelection(up);
        }
    };
    /**
     * Disable an item from the menu
     */
    MenuCore.prototype.disable = function (item) {
        var _a;
        if (typeof item == 'number') {
            item = this._items[item];
        }
        (_a = item === null || item === void 0 ? void 0 : item.disable) === null || _a === void 0 ? void 0 : _a.call(item);
    };
    /**
     * Enable an item from the menu
     */
    MenuCore.prototype.enable = function (item) {
        var _a;
        if (typeof item == 'number') {
            item = this._items[item];
        }
        (_a = item === null || item === void 0 ? void 0 : item.enable) === null || _a === void 0 ? void 0 : _a.call(item);
    };
    /**
     * Is item enabled
     */
    MenuCore.prototype.isEnabled = function (item) {
        if (typeof item == 'number') {
            item = this._items[item];
        }
        return typeof (item === null || item === void 0 ? void 0 : item.isDisabled) === 'boolean' ? !(item === null || item === void 0 ? void 0 : item.isDisabled) : false;
    };
    /**
     * Is item disabled
     */
    MenuCore.prototype.isDisabled = function (item) {
        if (typeof item == 'number') {
            item = this._items[item];
        }
        return typeof (item === null || item === void 0 ? void 0 : item.isDisabled) === 'boolean' ? item === null || item === void 0 ? void 0 : item.isDisabled : false;
    };
    /**
     * Get the current menu index
     */
    MenuCore.prototype.currentItemIndex = function () {
        return this._selected_item_idx;
    };
    /**
     * Get Item by index
     */
    MenuCore.prototype.getItem = function (index) {
        return this._items[index];
    };
    /**
     * Initialize the menu
     */
    MenuCore.prototype.initialize = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new Error("`Menu.render()` Method not implemented.");
    };
    /**
     * Render the menu
     */
    MenuCore.prototype.render = function () {
        throw new Error("`Menu.render()` Method not implemented.");
    };
    MenuCore.MENU_TYPE = "DEFAULT_MENU";
    return MenuCore;
}());
exports.default = MenuCore;
//# sourceMappingURL=menu-core.js.map