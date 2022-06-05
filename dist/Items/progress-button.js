"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var button_1 = (0, tslib_1.__importDefault)(require("./button"));
var label_1 = (0, tslib_1.__importDefault)(require("../componet/label"));
var menu_item_1 = (0, tslib_1.__importDefault)(require("../structs/menu-item"));
var PrograssButton = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(PrograssButton, _super);
    function PrograssButton(label, props) {
        if (props === void 0) { props = {}; }
        var _this = _super.call(this, label, props) || this;
        _this._prograss = 0;
        return _this;
    }
    Object.defineProperty(PrograssButton.prototype, "prograss", {
        get: function () {
            return this._prograss;
        },
        set: function (val) {
            this._prograss = Math.max(Math.min(val, 1), 0);
            this._prograss = this._prograss;
            this.menu.render();
        },
        enumerable: false,
        configurable: true
    });
    PrograssButton.prototype.render = function (width) {
        var leftIcon = '[' + Math.floor(this._prograss * 100) + '%]';
        return new label_1.default({
            label: this.label,
            leftIcon: this.prograss ? leftIcon : undefined,
            rightIcon: this.prograss ? undefined : button_1.default.RIGHT_ICON,
        }).render(width);
    };
    return PrograssButton;
}(menu_item_1.default));
exports.default = PrograssButton;
//# sourceMappingURL=progress-button.js.map