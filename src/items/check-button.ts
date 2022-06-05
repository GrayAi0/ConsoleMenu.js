import Menu from "../menus/menu";
import { byteOnly } from "../helpers/rendering";
import MenuItem, { MenuItemProps } from "../structs/menu-item";
import MenuCore from "../structs/menu-core";
import Label from "../componet/label";









export interface CheckButtonProps extends MenuItemProps<CheckButton> {
    checked: boolean;
}

export default class CheckButton extends MenuItem<CheckButtonProps, MenuCore, { clicked: (btn: CheckButton, is_checked: boolean) => void }> {

    public static readonly RIGHT_ICON_CHECKED = "[◉]";
    public static readonly RIGHT_ICON_UNCHECKED = "[○]";

    private _checked: boolean = false

    public get checked() {
        return this._checked;
    }

    constructor(
        label: string,
        props: Partial<CheckButtonProps> = {}
    ) { 
        super(label, props as any)
        this._checked = props.checked ?? false
    }


    public render(width: number) {

        const checkBtnLabel = new Label({
            label: this.label,
            rightIcon: {
                icon: this._checked ? CheckButton.RIGHT_ICON_CHECKED : CheckButton.RIGHT_ICON_UNCHECKED,
            },
        })

        return checkBtnLabel.render(width)
    }


    public onClicked() {
        this._checked = !this._checked;
        super.onClicked(this._checked)
    }
}