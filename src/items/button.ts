import Label from "../componet/label";
import { byteOnly, centerString } from "../helpers/rendering";
import MenuCore from "../structs/menu-core";
import MenuItem, { DefaultEvents, Events, MenuItemProps } from "../structs/menu-item";





export interface ButtonProps extends MenuItemProps<Button> {
    
}

export default class Button extends MenuItem<ButtonProps, MenuCore, { clicked: (btn: Button) => void }> {

    public static readonly RIGHT_ICON = "[↲]";

    constructor(
        label: string,
        props: Partial<ButtonProps> = {},
    ) { super(label, props) };

    public render(width: number) {
        return new Label({
            label: this.label + " ",
            rightIcon: {
                icon: Button.RIGHT_ICON,
                leftPadding: 0,
            },
        }).render(width) 
    }
}