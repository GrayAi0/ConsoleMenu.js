import MenuItem, { MenuItemProps } from "../structs/menu-item";
import MenuCore from "../structs/menu-core";
export interface CheckButtonProps extends MenuItemProps<CheckButton> {
    checked: boolean;
}
export default class CheckButton extends MenuItem<CheckButtonProps, MenuCore, {
    clicked: (btn: CheckButton, is_checked: boolean) => void;
}> {
    static readonly RIGHT_ICON_CHECKED = "[\u25C9]";
    static readonly RIGHT_ICON_UNCHECKED = "[\u25CB]";
    private _checked;
    get checked(): boolean;
    constructor(label: string, props?: Partial<CheckButtonProps>);
    render(width: number): string;
    onClicked(): void;
}
