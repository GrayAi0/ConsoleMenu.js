"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rendering_1 = require("../../helpers/rendering");
var menu_item_1 = (0, tslib_1.__importDefault)(require("../../structs/menu-item"));
var word_wrap_1 = (0, tslib_1.__importDefault)(require("word-wrap"));
var MenuFooter = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(MenuFooter, _super);
    function MenuFooter() {
        return _super.call(this, "") || this;
    }
    /** @ts-ignore */
    MenuFooter.prototype.render = function (messages, width, props) {
        var _this = this;
        var labels = [];
        var max_length = width;
        for (var idx in messages) {
            var message = messages[idx];
            var footer_labels = (0, word_wrap_1.default)(message, { width: width - (props.padding * 2) }).split('\n').map(function (lbl) { return (0, rendering_1.centerString)(lbl, width); });
            var _max_length = footer_labels.map(function (lbl) { return lbl.length; }).reduce(function (prev, cur) { return Math.max(prev, cur); });
            max_length = Math.max(_max_length, max_length);
            labels.push.apply(labels, (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], footer_labels.map(function (lbl) { return (_this._render(lbl, props)); }), false), [this._render(props.footer_style.repeat(max_length + props.padding * 2), props, 
                /** @ts-ignore */
                idx == messages.length - 1, true)], false));
        }
        return (0, tslib_1.__spreadArray)([
            this._render(props.footer_style.repeat(max_length + props.padding * 2), props, !labels.length, true)
        ], labels, true);
    };
    MenuFooter.prototype._render = function (item, props, is_bottom_line, _remove_padding) {
        return [
            0,
            [
                // The left character of the menu
                (is_bottom_line ? props.bottom_left_corner_style : props.left_column_style) + // "|"
                    // The menu padding, before the item
                    (_remove_padding ? "" : ' '.repeat(props.padding)) +
                    // The selected item render output
                    item + // "  Item  "
                    // The menu padding, after the item
                    (_remove_padding ? "" : ' '.repeat(props.padding)) +
                    // The right character of the menu
                    (is_bottom_line ? props.bottom_right_corner_style : props.right_column_style) // "|"
            ]
        ];
    };
    return MenuFooter;
}(menu_item_1.default));
exports.default = MenuFooter;
//# sourceMappingURL=menu-footer.js.map