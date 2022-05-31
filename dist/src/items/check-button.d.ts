import Menu from "../menus/menu";
import MenuItem, { MenuItemProps } from "../structs/menu-item";
export interface CheckButtonProps extends Omit<MenuItemProps, "onClicked"> {
    onClicked: (this: CheckButton, is_checked: boolean) => void;
    checked: boolean;
}
export default class CheckButton extends MenuItem<Menu> {
    private _checked;
    get checked(): boolean;
    constructor(label: string, props?: Partial<CheckButtonProps>);
    render(width: number): string;
    onClicked(): void;
}
