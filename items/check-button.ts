import Menu from "../menus/menu";
import { byteOnly, centerString } from "../helpers/rendering";
import MenuItem, { MenuItemProps } from "../structs/menu-item";









export interface CheckButtonProps extends Omit<MenuItemProps, "onClicked"> {
    onClicked: (this: CheckButton, is_checked: boolean) => void;
    checked: boolean;
}

export default class CheckButton extends MenuItem<Menu> {

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

        const checked = this._checked ? '[X]' : '[ ]'

        let spaces = byteOnly(
            width - this.label.length
        ) / 2
        
        return (
            ' '.repeat(spaces + (
                this.label.length % 2 == 1 ? 1 : 0
                )
            ) +
            this.label +
            ' '.repeat(spaces - checked.length) + checked
        )
    }


    public onClicked() {
        this._checked = !this._checked;
        super.onClicked(this._checked)
    }
}