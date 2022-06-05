"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var menu_item_1 = (0, tslib_1.__importDefault)(require("../structs/menu-item"));
var label_1 = (0, tslib_1.__importDefault)(require("../componet/label"));
var CheckButton = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(CheckButton, _super);
    function CheckButton(label, props) {
        if (props === void 0) { props = {}; }
        var _a;
        var _this = _super.call(this, label, props) || this;
        _this._checked = false;
        _this._checked = (_a = props.checked) !== null && _a !== void 0 ? _a : false;
        return _this;
    }
    Object.defineProperty(CheckButton.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        enumerable: false,
        configurable: true
    });
    CheckButton.prototype.render = function (width) {
        var checkBtnLabel = new label_1.default({
            label: this.label,
            rightIcon: {
                icon: this._checked ? CheckButton.RIGHT_ICON_CHECKED : CheckButton.RIGHT_ICON_UNCHECKED,
            },
        });
        return checkBtnLabel.render(width);
    };
    CheckButton.prototype.onClicked = function () {
        this._checked = !this._checked;
        _super.prototype.onClicked.call(this, this._checked);
    };
    CheckButton.RIGHT_ICON_CHECKED = "[◉]";
    CheckButton.RIGHT_ICON_UNCHECKED = "[○]";
    return CheckButton;
}(menu_item_1.default));
exports.default = CheckButton;
//# sourceMappingURL=check-button.js.map