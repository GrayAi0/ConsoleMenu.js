import MenuItem, { MenuItemProps } from "../structs/menu-item";
export interface ButtonProps extends Omit<MenuItemProps, 'onClicked'> {
    onClicked: (this: Button) => void;
}
export default class Button extends MenuItem {
    constructor(label: string, props?: Partial<ButtonProps>);
    render(width: number): string;
}
