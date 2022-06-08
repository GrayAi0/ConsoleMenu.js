"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RL = void 0;
var tslib_1 = require("tslib");
var readline_1 = require("readline");
var rendering_1 = require("../helpers/rendering");
var console_utils_1 = require("../classes/console-utils");
var menu_core_1 = (0, tslib_1.__importDefault)(require("../structs/menu-core"));
var screen_1 = (0, tslib_1.__importStar)(require("../classes/screen"));
var menu_header_1 = (0, tslib_1.__importDefault)(require("../items/natives/menu-header"));
var menu_footer_1 = (0, tslib_1.__importDefault)(require("../items/natives/menu-footer"));
/** Initialize the stdin for us */
exports.RL = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
var Menu = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Menu, _super);
    function Menu(_title, props) {
        if (_title === void 0) { _title = "Default Menu Title"; }
        if (props === void 0) { props = {}; }
        var _this = _super.call(this, props) || this;
        _this._title = _title;
        _this._menu_header = new menu_header_1.default(_this._title);
        _this._menu_header.menu = _this;
        _this._menu_footer = new menu_footer_1.default();
        _this._menu_footer.menu = _this;
        return _this;
    }
    Menu.prototype.initialize = function () {
        this.moveSelection(false);
        process.stdin.on('keypress', this._on_key_down.bind(this));
    };
    Menu.prototype.dispose = function () {
        process.stdin.off('keypress', this._on_key_down);
        this.lock();
        this.hide();
    };
    Menu.prototype._hide = function () {
        if (!(screen_1.screenCache === null || screen_1.screenCache === void 0 ? void 0 : screen_1.screenCache.buffer_cache))
            return;
        var hidden_buffer = [];
        for (var _i = 0, _a = screen_1.screenCache.buffer_cache; _i < _a.length; _i++) {
            var line = _a[_i];
            hidden_buffer.push([
                0,
                [
                    ' '.repeat(line[1])
                ]
            ]);
        }
        (0, screen_1.default)(hidden_buffer);
        (0, console_utils_1.setCursorPosition)(0, 0);
    };
    Menu.prototype._show = function () {
        this.render();
    };
    Menu.prototype.render = function (width) {
        if (width === void 0) { width = this.propertys.minimal_width; }
        if (this._is_menu_hidden)
            return;
        var buffer = [];
        // Rendering the menu header
        var _a = this._menu_header.render(width, this.propertys), header_width = _a[0], rendered_menu_header = _a.slice(1);
        width = header_width;
        var rendered_menu_footer = this._menu_footer.render(this._messages.map(function (msg) { return msg.message; }), width, this.propertys);
        // Rendering the menu footer
        for (var idx in this._items) {
            var item = this._items[idx];
            var is_item_selected = idx == this._selected_item_idx;
            var rendered_item = item.render(width);
            if (rendered_item.length > width) {
                return this.render(rendered_item.length);
            }
            buffer.push(this._renderLine(rendered_item, is_item_selected, item));
            // We don't want to add padding after the last item
            // @ts-ignore
            if (idx != this._items.length - 1) {
                // Adding between items padding
                for (var i = 0; i < this.propertys.between_items_padding; i++) {
                    buffer.push(this._renderLine(this.propertys.between_items_style.repeat(width), false));
                }
            }
        }
        // Redner the menu
        (0, screen_1.default)((0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], rendered_menu_header, true), buffer, true), rendered_menu_footer, true), { curser_under_screen: true, cache: true });
    };
    Menu.prototype._renderLine = function (rendered_data, is_selected, item) {
        var _a;
        return [
            0,
            (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([
                // The left character of the menu
                (_a = this.propertys.left_column_style) !== null && _a !== void 0 ? _a : "|"
            ], (is_selected ? ([
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
                ((item === null || item === void 0 ? void 0 : item.isDisabled) ? ([
                    8 /** 8 for gray */,
                    // The selected item render output
                    rendered_data // "  Item  "
                ]) : (rendered_data)),
                // The menu padding, after the item
                ' '.repeat(this.propertys.padding)
            ])), true), [
                // The right character of the menu
                this.propertys.right_column_style + // "|"
                    // Selected item indicator
                    (is_selected ? this.propertys.selected_arrow_style : "") // " <--" or ""
            ], false),
        ];
    };
    return Menu;
}(menu_core_1.default));
exports.default = Menu;
//# sourceMappingURL=menu.js.map