"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
try {
    require('source-map-support/register');
}
catch (err) {
}
const src_1 = require("./src");
function example() {
    let menu = new src_1.Menu("ConsoleMenu.js Beta");
    menu.append(new src_1.Button(`Normal Button`, {
        onClicked() {
            menu.showMessage(`Message !`);
        },
    }));
    const exSubMenu = new src_1.SubMenu("SubMenu", new src_1.Menu("My Tall Sub Menu", {
        minimal_width: 50
    }));
    exSubMenu.subMenu.append(new src_1.Button("SubMenu Button", {
        onClicked() {
            this.menu.showMessage(`SubMenu Message !`);
        }
    }));
    menu.append(exSubMenu);
    menu.append(new src_1.CheckButton("Hide Menu", {
        /**
         * On the item clicked event
         */
        onClicked(is_checked) {
            if (is_checked) {
                menu.hide();
            }
            else {
                menu.show();
            }
        }
    }));
    let _has_checked = false;
    const canCheckMeButton = new src_1.CheckButton("Can you uncheck me ?", {
        /**
         * Check the item by default
         */
        checked: true,
        /**
         * Disable the item by default
         */
        disabled: true,
        onClicked(is_checked) {
            if (!is_checked && !_has_checked) {
                _has_checked = true;
                this.menu.showMessage("Will done !!!", 3000);
            }
        },
    });
    const enableCheckMeButton = new src_1.CheckButton("Enable Button Above", {
        onClicked() {
            if (enableCheckMeButton.checked) {
                this.label = "Disable Button Above"; // item.enable will render the menu
                canCheckMeButton.enable();
            }
            else {
                this.label = "Enable Button Above"; // item.disable will render the menu
                canCheckMeButton.disable();
            }
        },
    });
    menu.append(canCheckMeButton);
    menu.append(enableCheckMeButton);
    menu.append(new src_1.Button("Exit", {
        onClicked() {
            menu.dispose();
            process.nextTick(process.exit, 0);
        }
    }));
    menu.initialize();
    menu.render();
}
exports.default = example;
/** __name__ == "__main__" */
if (require.main === module) {
    example();
}
//# sourceMappingURL=example.js.map