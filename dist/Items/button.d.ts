import MenuCore from "../structs/menu-core";
import MenuItem, { MenuItemProps } from "../structs/menu-item";
export interface ButtonProps extends MenuItemProps<Button> {
}
export default class Button extends MenuItem<ButtonProps, MenuCore, {
    clicked: (btn: Button) => void;
}> {
    static readonly RIGHT_ICON = "[\u21B2]";
    constructor(label: string, props?: Partial<ButtonProps>);
    render(width: number): string;
}
