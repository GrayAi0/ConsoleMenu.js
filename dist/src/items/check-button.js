"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rendering_1 = require("../helpers/rendering");
const menu_item_1 = require("../structs/menu-item");
class CheckButton extends menu_item_1.default {
    _checked = false;
    get checked() {
        return this._checked;
    }
    constructor(label, props = {}) {
        super(label, props);
        this._checked = props.checked ?? false;
    }
    render(width) {
        const checked = this._checked ? '[X]' : '[ ]';
        let spaces = (0, rendering_1.byteOnly)(width - this.label.length) / 2;
        return (' '.repeat(spaces + (this.label.length % 2 == 1 ? 1 : 0)) +
            this.label +
            ' '.repeat(spaces - checked.length) + checked);
    }
    onClicked() {
        this._checked = !this._checked;
        super.onClicked(this._checked);
    }
}
exports.default = CheckButton;
//# sourceMappingURL=check-button.js.map