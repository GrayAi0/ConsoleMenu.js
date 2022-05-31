
# ConsoleMenu.js Beta



![Light mode by default](https://github.com/GrayAi0/ConsoleMenu/blob/main/review/Menu-light-mode.png?raw=true)






## Example

```ts
try {
    require('source-map-support/register')
} catch(err) {

}

import { Button, CheckButton, Menu, SubMenu } from './src';


export default function example() {

    let menu = new Menu(
        "ConsoleMenu.js Beta"
    );

    menu.append(
        new Button(
            `Normal Button`, 
            {
                onClicked() {
                    menu.showMessage(`Message !`);
                },
            }
        )
    )

    const exSubMenu = new SubMenu(
        "SubMenu",
        new Menu(
            "My Tall Sub Menu", 
            {
                minimal_width: 50
            }
        )
    )

    exSubMenu.subMenu.append(
        new Button(
            "SubMenu Button",
            {
                onClicked() {
                    this.menu.showMessage(`SubMenu Message !`);
                }
            }
        )
    )

    menu.append(exSubMenu)

    menu.append(new CheckButton(
        "Hide Menu",
        {

            /**
             * On the item clicked event
             */
            onClicked(is_checked) {
                if(is_checked) {
                    menu.hide()
                }else {
                    menu.show()
                }
            }
        }
    ))

    let _has_checked = false
    const canCheckMeButton = new CheckButton(
        "Can you uncheck me ?",
        {
            /**
             * Check the item by default
             */
            checked: true,

            /**
             * Disable the item by default
             */
            disabled: true,

            onClicked(this, is_checked) {
                if(!is_checked && !_has_checked) {
                    _has_checked = true
                    this.menu.showMessage("Will done !!!", 3000)
                }
            },

        }
    )
    
    const enableCheckMeButton = new CheckButton(
        "Enable Button Above",
        {
            onClicked() {
                if(enableCheckMeButton.checked) {
                    this.label = "Disable Button Above" // item.enable will render the menu
                    canCheckMeButton.enable()
                }else {
                    this.label = "Enable Button Above" // item.disable will render the menu
                    canCheckMeButton.disable()
                }
            },
        }
    )

    menu.append(canCheckMeButton)
    menu.append(enableCheckMeButton)

    menu.append(new Button(
        "Exit",
        {
            onClicked() {
                menu.dispose();
                process.nextTick(process.exit, 0)
            }
        }        
    ))


    menu.initialize();
    menu.render();

}

/** __name__ == "__main__" */
if(require.main === module) {
    example()
}
```