"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var events_1 = (0, tslib_1.__importDefault)(require("events"));
var MenuItem = /** @class */ (function () {
    function MenuItem(_label, propertys) {
        if (propertys === void 0) { propertys = {}; }
        this._label = _label;
        this.emitter = new events_1.default();
        this.ITEM_TYPE = "DEFAULT_ITEM";
        this._is_disabled = false;
        this.propertys = Object.assign({
            is_countless: false,
            disabled: false,
        }, propertys);
        if (this.propertys.disabled) {
            this.disable();
        }
        if (this.propertys.clicked) {
            this.on('clicked', this.propertys.clicked);
        }
    }
    Object.defineProperty(MenuItem.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "isDisabled", {
        get: function () {
            return this._is_disabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "menu", {
        get: function () {
            if (!this._menu) {
                throw new Error("Cannot access `MenuItem.menu` property before append the item to the menu.");
            }
            return this._menu;
        },
        set: function (val) {
            if (!this._menu) {
                this._menu = val;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MenuItem.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            var _a;
            if (!((_a = this._id) === null || _a === void 0 ? void 0 : _a.length)) {
                this._id = val;
            }
        },
        enumerable: false,
        configurable: true
    });
    MenuItem.prototype.disable = function () {
        this._is_disabled = true;
        if (this._menu) {
            this._menu.render();
        }
    };
    MenuItem.prototype.enable = function () {
        this._is_disabled = false;
        if (this._menu) {
            this._menu.render();
        }
    };
    MenuItem.prototype.onKeyDown = function (key) {
        this.emitter.emit('keydown', key);
    };
    MenuItem.prototype.onClicked = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.emitter).emit.apply(_a, (0, tslib_1.__spreadArray)(['clicked', this], args, false));
    };
    /**
     * Render the item
     */
    MenuItem.prototype.render = function (width) {
        throw new Error("`Item.render(width)` Method not implemented.");
    };
    MenuItem.prototype.on = function (eventName, listener) {
        this.emitter.on(eventName, listener);
        return this;
    };
    MenuItem.prototype.once = function (eventName, listener) {
        this.emitter.once(eventName, listener);
        return this;
    };
    MenuItem.prototype.off = function (eventName, listener) {
        this.emitter.off(eventName, listener);
        this.emitter.eventNames;
        return this;
    };
    MenuItem.prototype.eventNames = function () {
        return this.emitter.eventNames();
    };
    MenuItem.prototype.listeners = function (eventName) {
        return this.emitter.listeners(eventName);
    };
    return MenuItem;
}());
exports.default = MenuItem;
//# sourceMappingURL=menu-item.js.map