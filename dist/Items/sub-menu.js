"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var menu_1 = (0, tslib_1.__importDefault)(require("../menus/menu"));
var rendering_1 = require("../helpers/rendering");
var menu_item_1 = (0, tslib_1.__importDefault)(require("../structs/menu-item"));
var button_1 = (0, tslib_1.__importDefault)(require("./button"));
var SubMenu = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(SubMenu, _super);
    function SubMenu(label, _render_menu, propertys) {
        if (_render_menu === void 0) { _render_menu = new menu_1.default(label); }
        if (propertys === void 0) { propertys = {}; }
        var _this = _super.call(this, label, propertys) || this;
        _this._render_menu = _render_menu;
        _this._render_menu.lock();
        _this._render_menu.append(new button_1.default("Return", {
            /** Attach this.hide to the clicked events automatically */
            clicked: _this.hide.bind(_this)
        }));
        _this._render_menu.initialize();
        return _this;
    }
    Object.defineProperty(SubMenu.prototype, "subMenu", {
        get: function () {
            return this._render_menu;
        },
        enumerable: false,
        configurable: true
    });
    SubMenu.prototype.dispose = function () {
        this._render_menu.getItem(0).off("clicked", this.hide);
    };
    SubMenu.prototype.render = function (width) {
        var label = this.label;
        var rightIcon = '[<]';
        var spaces = (0, rendering_1.byteOnly)(width - label.length) / 2;
        return (' '.repeat(spaces + (label.length % 2 == 1 ? 1 : 0)) +
            label +
            ' '.repeat(spaces - rightIcon.length) + rightIcon);
    };
    SubMenu.prototype.show = function () {
        this.menu.lock();
        this.menu.hide();
        this._render_menu.show();
        this._render_menu.unlock();
        this._render_menu.render();
    };
    SubMenu.prototype.hide = function () {
        var _this = this;
        this._render_menu.lock();
        this._render_menu.hide();
        process.nextTick(function () {
            _this.menu.unlock();
            _this.menu.show();
        });
    };
    SubMenu.prototype.onClicked = function () {
        _super.prototype.onClicked.call(this);
        this.show();
    };
    return SubMenu;
}(menu_item_1.default));
exports.default = SubMenu;
//# sourceMappingURL=sub-menu.js.map