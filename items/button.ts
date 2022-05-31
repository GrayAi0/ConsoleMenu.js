import { centerString } from "../helpers/rendering";
import MenuItem, { MenuItemProps } from "../structs/menu-item";





export interface ButtonProps extends Omit<MenuItemProps, 'onClicked'> {
    onClicked: (this: Button) => void,
}


export default class Button extends MenuItem {


    constructor(
        label: string,
        props: Partial<ButtonProps> = {},
    ) { super(label, props as any) };

    public render(width: number) {
        return centerString(this.label, width); 
    }
}