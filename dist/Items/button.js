"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rendering_1 = require("../helpers/rendering");
const menu_item_1 = require("../structs/menu-item");
class Button extends menu_item_1.default {
    constructor(label, props = {}) { super(label, props); }
    ;
    render(width) {
        return (0, rendering_1.centerString)(this.label, width);
    }
}
exports.default = Button;
//# sourceMappingURL=button.js.map