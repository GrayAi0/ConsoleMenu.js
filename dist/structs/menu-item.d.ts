import MenuCore from "./menu-core";
export interface ItemRenderResult {
}
export interface MenuItemProps {
    is_countless: boolean;
    onClicked: (this: MenuItem) => void;
    onKeyDown: (this: MenuItem, key: any) => void;
    disabled: boolean;
}
export default abstract class MenuItem<M extends MenuCore = MenuCore> {
    private _label;
    readonly ITEM_TYPE: string;
    protected _is_disabled: boolean;
    private _id;
    private _menu;
    readonly propertys: MenuItemProps;
    get label(): string;
    set label(value: string);
    constructor(_label: string, propertys?: Partial<MenuItemProps>);
    get isDisabled(): boolean;
    get menu(): M;
    set menu(val: M);
    get id(): string;
    set id(val: string);
    disable(): void;
    enable(): void;
    onKeyDown(key: any): void;
    onClicked(...args: any[]): any;
    /**
     * Render the item
     */
    render(width: number): string;
}
