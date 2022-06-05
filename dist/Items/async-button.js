"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var label_1 = (0, tslib_1.__importDefault)(require("../componet/label"));
var menu_item_1 = (0, tslib_1.__importDefault)(require("../structs/menu-item"));
var button_1 = (0, tslib_1.__importDefault)(require("./button"));
var loading_icons = [
    '⣷', '⣯', '⣟',
    '⡿', '⢿', '⣻',
    '⣽', '⣾'
];
var AsyncButton = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(AsyncButton, _super);
    function AsyncButton(label, props) {
        if (props === void 0) { props = {}; }
        var _a;
        var _this = _super.call(this, label, (0, tslib_1.__assign)((0, tslib_1.__assign)({}, props), { loadingIcons: (_a = props.loadingIcons) !== null && _a !== void 0 ? _a : loading_icons })) || this;
        _this._is_loadng = false;
        _this._loading_icon = 0;
        return _this;
    }
    Object.defineProperty(AsyncButton.prototype, "loading", {
        get: function () {
            return this._is_loadng;
        },
        set: function (val) {
            if (!this._is_loadng && val) {
                this._is_loadng = true;
                this.renderIconProcess();
            }
            else if (this._is_loadng && !val) {
                this._is_loadng = false;
            }
        },
        enumerable: false,
        configurable: true
    });
    AsyncButton.prototype.renderIconProcess = function () {
        var _this = this;
        var _interval = setInterval(function () {
            if (!_this._is_loadng) {
                clearInterval(_interval);
                _this._loading_icon = 0;
                _this.menu.render();
                return;
            }
            _this._loading_icon = (_this._loading_icon + 1) % _this.propertys.loadingIcons.length;
            _this.menu.render();
        }, 100);
    };
    AsyncButton.prototype.render = function (width) {
        var leftIcon = '[' + this.propertys.loadingIcons[this._loading_icon] + ']';
        return new label_1.default({
            label: this.label,
            leftIcon: this._is_loadng ? leftIcon : undefined,
            rightIcon: this._is_loadng ? undefined : button_1.default.RIGHT_ICON,
        }).render(width);
    };
    return AsyncButton;
}(menu_item_1.default));
exports.default = AsyncButton;
//# sourceMappingURL=async-button.js.map