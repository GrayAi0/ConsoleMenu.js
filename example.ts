try {
    require('source-map-support/register')
} catch(err) {
}

import { AsyncButton, PrograssButton, Button, CheckButton, Menu, applyStyle, SubMenu, RL } from './dist'


export default function example() {

    let menu = new Menu(
        "ConsoleMenu.js Beta",
        applyStyle('fancy', {


            minimal_width: 35,
        })
    );

    const exSubMenu = new SubMenu(
        "Buttons Menu",
        new Menu(
            "Buttons Menu",
            applyStyle('fancy', {
                minimal_width: 35,
            })
        )
    )

    exSubMenu.subMenu.append(
        new Button(
            `Normal Button`, 
            {
                clicked(btn) {
                    btn.menu.showMessage(`Message !`);
                },
            }
        )
    )

    const prograssBtn = new PrograssButton(
        "Prograss Button",
        {
            clicked(item) {
                if(item.prograss != 0) return;
                    
                item.menu.showMessage("Downloading...")
                const interval = setInterval(() => {
                    if(item.prograss >= 1) {
                        item.menu.showMessage("Downloaded !", 1000)
                        item.prograss = 0
                        clearInterval(interval)
                        return;
                    }
                    item.prograss += 0.01
                }, 100);
            },
        }
    )
    
    const asyncButton = new AsyncButton(
        "Async Button", 
        {
            clicked(item) {
                item.loading = true
                setTimeout(() => {
                    item.loading = false
                }, 100 * 100)
            },
        }
    )

    const hideMenuBtn = new CheckButton(
        "Hide Menu",
        {
            clicked(item, is_checked) {
                if(is_checked) {
                    menu.hide()
                }else {
                    menu.show()
                }
            },
        }
    )


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

            clicked(item, is_checked) {
                if(!is_checked && !_has_checked) {
                    _has_checked = true
                    item.menu.showMessage("Will done !!!", 3000)
                }
            },

        }
    )

    
    const enableCheckMeButton = new CheckButton(
        "Enable Button Above",
        {
            clicked(item, is_checked) {
                if(is_checked) {
                    item.label = "Disable Button Above" // item.enable will re-render the menu
                    canCheckMeButton.enable()
                }else {
                    item.label = "Enable Button Above" // item.disable will re-render the menu
                    canCheckMeButton.disable()
                }
            },
        }
    )

    exSubMenu.subMenu.append(prograssBtn)
    exSubMenu.subMenu.append(asyncButton)
    menu.append(exSubMenu)
    menu.append(hideMenuBtn)
    menu.append(canCheckMeButton)
    menu.append(enableCheckMeButton)
    menu.append(new Button(
        "Exit",
        {
            clicked(item) {
                menu.dispose();
                process.nextTick(process.exit, 0)
            },
        }        
    ))

    menu.initialize();
    menu.render();

    RL.on("SIGINT", () => {
        exSubMenu.hide()
        process.nextTick(menu.dispose.bind(menu))
        process.nextTick(process.exit, 0)
    })
}



/** __name__ == "__main__" */
if(require.main === module) {
    example()
}