import Button from "./button";
import Label from "../componet/label";
import { byteOnly } from "../helpers/rendering";
import MenuCore from "../structs/menu-core";
import MenuItem, { MenuItemProps } from "../structs/menu-item";






export interface PrograssButtonProps extends MenuItemProps<PrograssButton> {
}


export default class PrograssButton extends MenuItem<PrograssButtonProps, MenuCore, { clicked: (btn: PrograssButton) => void }> {

    private _prograss: number = 0;

    public set prograss(val: number) {
        this._prograss = Math.max(Math.min(val, 1), 0)
        this._prograss = this._prograss
        this.menu.render()
    }

    public get prograss() {
        return this._prograss
    }
    
    constructor(
        label: string,
        props: Partial<PrograssButtonProps> = {},
    ) { 
        super(label, props as any) 
    }
    

    public render(width: number): string {

        const leftIcon = '[' + Math.floor(this._prograss * 100) + '%]'


        return new Label({
            label: this.label,
            leftIcon: this.prograss ? leftIcon : undefined,
            rightIcon: this.prograss ? undefined : Button.RIGHT_ICON,
        }).render(width)
        
    }
}