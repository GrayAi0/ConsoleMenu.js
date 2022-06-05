"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rendering_1 = require("../helpers/rendering");
var Label = /** @class */ (function () {
    function Label(_options) {
        this._options = this.processOptions(_options);
    }
    Label.prototype.processOptions = function (options) {
        if (!options.label) {
            throw new Error("Label must have a label");
        }
        var label = options.label, leftIcon = options.leftIcon, rightIcon = options.rightIcon, align = options.align;
        return {
            label: label,
            leftIcon: typeof leftIcon === 'string' || !leftIcon ? { icon: leftIcon !== null && leftIcon !== void 0 ? leftIcon : "", leftPadding: 0, rightPadding: 0 } : leftIcon,
            rightIcon: typeof rightIcon === 'string' || !rightIcon ? { icon: rightIcon !== null && rightIcon !== void 0 ? rightIcon : "", leftPadding: 0, rightPadding: 0 } : rightIcon,
            align: ['left', 'right', 'center'].includes(align) ? align : "center"
        };
    };
    Label.prototype.spliceSpaces = function (spaces, count) {
        /**
         * if:
         *      spaces = 10
         *      count  = 5
         * then:
         *      res_spaces = 5
         *      res_count  = 5
         *
         * if:
         *      spaces = 10
         *      count  = 15
         * then:
         *     res_spaces = 0
         *     res_count  = 5
         */
        if (spaces < count) {
            return [0, spaces];
        }
        return [(0, rendering_1.byteOnly)(spaces - count), count];
    };
    Label.prototype._render_icon = function (icon, spaces) {
        var _a, _b;
        var _c, _d;
        var icon_left_padding;
        _a = this.spliceSpaces(spaces, (_c = icon.leftPadding) !== null && _c !== void 0 ? _c : 0), spaces = _a[0], icon_left_padding = _a[1];
        var icon_right_padding;
        _b = this.spliceSpaces(spaces, (_d = icon.rightPadding) !== null && _d !== void 0 ? _d : 0), spaces = _b[0], icon_right_padding = _b[1];
        return [
            ' '.repeat((0, rendering_1.byteOnly)(icon_left_padding)) + icon.icon + ' '.repeat((0, rendering_1.byteOnly)(icon_right_padding)),
            spaces
        ];
    };
    Label.prototype.render = function (width) {
        var _a, _b, _c, _d;
        var _e = this._options, label = _e.label, leftIcon = _e.leftIcon, rightIcon = _e.rightIcon, align = _e.align;
        var spaces = this.spliceSpaces(width, label.length)[0];
        var right_icon_length;
        _a = this.spliceSpaces(spaces, rightIcon.icon.length), spaces = _a[0], right_icon_length = _a[1];
        var left_icon_length;
        _b = this.spliceSpaces(spaces, leftIcon.icon.length), spaces = _b[0], left_icon_length = _b[1];
        var renderedRightIcon;
        _c = this._render_icon(rightIcon, spaces), renderedRightIcon = _c[0], spaces = _c[1];
        var renderedLeftIcon;
        _d = this._render_icon(leftIcon, spaces), renderedLeftIcon = _d[0], spaces = _d[1];
        if (align == "left") {
            return (renderedLeftIcon +
                label +
                ' '.repeat((0, rendering_1.byteOnly)(spaces)) +
                renderedRightIcon);
        }
        if (align == "right") {
            return (renderedLeftIcon +
                ' '.repeat((0, rendering_1.byteOnly)(spaces)) +
                label +
                renderedRightIcon);
        }
        if (align == "center") {
            return (renderedLeftIcon +
                ' '.repeat((0, rendering_1.byteOnly)((spaces / 2) + ((label.length +
                    renderedRightIcon.length +
                    renderedLeftIcon.length) % 2 == 1 ? 1 : 0))) +
                label +
                ' '.repeat((0, rendering_1.byteOnly)((spaces / 2))) +
                renderedRightIcon);
        }
        return align;
    };
    return Label;
}());
exports.default = Label;
// const options: Partial<LabelOptions> = {
//     label: 'Hello, World',
//     leftIcon: {
//         icon: "l",
//         leftPadding: 1,
//         rightPadding: 1,
//     },
//     rightIcon: {
//         icon: "r",
//         leftPadding: 1,
//         rightPadding: 1,
//     }
// }
// function printLine() {
//     console.log("-".repeat(42))
// }
// printLine();
// console.log(
//     "|" + new Label(Object.assign({
//         align: "right",
//     }, options)).render(40) + "|"
// )
// printLine();
// console.log("")
// printLine();
// console.log(
//     "|" + new Label(Object.assign({
//         align: "center",
//     }, options)).render(40) + "|"
// )
// printLine();
// console.log("")
// printLine();
// console.log(
//     "|" + new Label(Object.assign({
//         align: "left",
//     }, options)).render(40) + "|"
// )
// printLine();
// console.log("")
//# sourceMappingURL=label.js.map