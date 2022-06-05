"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rendering_1 = require("../../helpers/rendering");
var menu_item_1 = (0, tslib_1.__importDefault)(require("../../structs/menu-item"));
var MenuHeader = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(MenuHeader, _super);
    function MenuHeader(_label) {
        var _this = _super.call(this, "") || this;
        _this._label = _label;
        return _this;
    }
    /** @ts-ignore */
    MenuHeader.prototype.render = function (width, props) {
        var header_label = (0, rendering_1.centerString)(this._label, width);
        return [
            /** @ts-ignore */
            header_label.length,
            this._render(props.header_style.repeat((header_label.length + props.padding * 2)), props, true, true),
            this._render(header_label, props),
            this._render(props.header_style.repeat(header_label.length + (props.padding * 2)), props, false, true)
        ];
    };
    MenuHeader.prototype._render = function (item, props, is_top_line, _remove_padding) {
        return [
            0,
            [
                // The left character of the menu
                (is_top_line ? props.top_left_corner_style : props.left_column_style) + // "|"
                    // The menu padding, before the item
                    (_remove_padding ? "" : ' '.repeat(props.padding)) +
                    // The selected item render output
                    item + // "  Item  "
                    // The menu padding, after the item
                    (_remove_padding ? "" : ' '.repeat(props.padding)) +
                    // The right character of the menu
                    (is_top_line ? props.top_right_corner_style : props.right_column_style) // "|"
            ]
        ];
    };
    return MenuHeader;
}(menu_item_1.default));
exports.default = MenuHeader;
//# sourceMappingURL=menu-header.js.map