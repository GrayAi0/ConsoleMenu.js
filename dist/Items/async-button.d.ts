import MenuCore from "../structs/menu-core";
import MenuItem, { MenuItemProps } from "../structs/menu-item";
export declare type AsyncButtonOnClicked = (this: AsyncButton, ...args: any[]) => Promise<any>;
export interface AsyncButtonProps extends MenuItemProps<AsyncButton> {
    loadingIcons: string[];
}
export default class AsyncButton extends MenuItem<AsyncButtonProps, MenuCore, {
    clicked: (btn: AsyncButton) => void;
}> {
    private _is_loadng;
    private _loading_icon;
    get loading(): boolean;
    set loading(val: boolean);
    constructor(label: string, props?: Partial<AsyncButtonProps>);
    renderIconProcess(): void;
    render(width: number): string;
}
