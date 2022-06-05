"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var label_1 = (0, tslib_1.__importDefault)(require("../componet/label"));
var menu_item_1 = (0, tslib_1.__importDefault)(require("../structs/menu-item"));
var Button = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Button, _super);
    function Button(label, props) {
        if (props === void 0) { props = {}; }
        return _super.call(this, label, props) || this;
    }
    ;
    Button.prototype.render = function (width) {
        return new label_1.default({
            label: this.label + " ",
            rightIcon: {
                icon: Button.RIGHT_ICON,
                leftPadding: 0,
            },
        }).render(width);
    };
    Button.RIGHT_ICON = "[↲]";
    return Button;
}(menu_item_1.default));
exports.default = Button;
//# sourceMappingURL=button.js.map