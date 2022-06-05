import Label from "../componet/label";
import { byteOnly } from "../helpers/rendering";
import MenuCore from "../structs/menu-core";
import MenuItem, { MenuItemProps } from "../structs/menu-item";
import Button from "./button";

const loading_icons = [
    '⣷', '⣯', '⣟',
    '⡿', '⢿', '⣻',
    '⣽', '⣾'
]


export type AsyncButtonOnClicked = (this: AsyncButton, ...args: any[]) => Promise<any>;

export interface AsyncButtonProps extends MenuItemProps<AsyncButton> {
    loadingIcons: string[]
}

export default class AsyncButton extends MenuItem<AsyncButtonProps, MenuCore, { clicked: (btn: AsyncButton) => void }> {


    private _is_loadng: boolean = false;
    private _loading_icon = 0

    public get loading() {
        return this._is_loadng
    }

    public set loading(val: boolean) {
        if(!this._is_loadng && val) {
            this._is_loadng = true;
    
            this.renderIconProcess()      
        }else if(this._is_loadng && !val) {
            this._is_loadng = false;
        }
    }

    constructor(
        label: string,
        props: Partial<AsyncButtonProps> = {},
    ) { 
        super(label, {
            ...props,
            loadingIcons: props.loadingIcons ?? loading_icons
        }) 
    }


    public renderIconProcess() {
        const _interval = setInterval(() => {
            if(!this._is_loadng) {
                clearInterval(_interval)
                this._loading_icon = 0
                this.menu.render();
                return;
            }
            this._loading_icon = (this._loading_icon + 1) % this.propertys.loadingIcons.length;
            this.menu.render();
        }, 100);
    }

    public render(width: number): string {

        const leftIcon = '[' + this.propertys.loadingIcons[this._loading_icon] + ']'

        return new Label({
            label: this.label,
            leftIcon: this._is_loadng ? leftIcon : undefined,
            rightIcon: this._is_loadng ? undefined : Button.RIGHT_ICON,
        }).render(width)

    }

}