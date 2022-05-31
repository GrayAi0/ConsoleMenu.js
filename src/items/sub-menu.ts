import Menu from "../menus/menu";
import { byteOnly } from "../helpers/rendering";
import MenuCore from "../structs/menu-core";
import MenuItem, { MenuItemProps } from "../structs/menu-item";
import Button from "./button";








export interface SubMenuProps extends Omit<MenuItemProps, 'onClicked'> {
    onClicked: (this: SubMenu) => void,
}


export default class SubMenu extends MenuItem {

    public get subMenu() {
        return this._render_menu;
    }

    constructor(
        label: string,
        private readonly _render_menu: MenuCore = new Menu(label),
        propertys: Partial<SubMenuProps> = {}

    ) {
        super(label, propertys as any)
        
        this._render_menu.lock()
        this._render_menu.append(new Button("Return", {
            onClicked: () => {
                this.hide()
            },
        }))

        this._render_menu.initialize()
    }

    public render(width: number) {
        
        const label = this.label
        const rightIcon = '[<]'

        let spaces = byteOnly(
            width - label.length
        ) / 2
        
        return (
            ' '.repeat(spaces + (
                    label.length % 2 == 1 ? 1 : 0
                )
            ) +
            label +
            ' '.repeat(spaces - rightIcon.length) + rightIcon
        )
    }

    public show() {

        this.menu.lock();
        this.menu.hide();

        this._render_menu.show();
        this._render_menu.unlock();
        this._render_menu.render()

    }

    public hide() {
        
        this._render_menu.lock();
        this._render_menu.hide();

        process.nextTick(() => {
            this.menu.unlock();
            this.menu.show();
        })

    }

    public onClicked() {
        super.onClicked();
        this.show();
    }

}