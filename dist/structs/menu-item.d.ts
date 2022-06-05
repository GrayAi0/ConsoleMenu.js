/// <reference types="node" />
import EventEmitter from "events";
import MenuCore from "./menu-core";
export interface ItemRenderResult {
}
export declare type DefaultEvents<T extends MenuItem> = {
    clicked: (item: T, ...args: any[]) => void;
};
export interface MenuItemProps<T extends MenuItem = any> extends Partial<DefaultEvents<T>> {
    is_countless: boolean;
    disabled: boolean;
}
export interface Events<T extends MenuItem> extends NodeJS.Dict<(...args: any[]) => void> {
    clicked: (item: T, ...args: any[]) => void;
}
export default abstract class MenuItem<P extends MenuItemProps = MenuItemProps, M extends MenuCore = MenuCore, E extends Events<any> = {
    clicked: (this: MenuItem) => void;
}> {
    private _label;
    protected readonly emitter: EventEmitter;
    readonly ITEM_TYPE: string;
    protected _is_disabled: boolean;
    /** @ts-ignore: Defined afeter calling MenuCore.append() */
    private _id;
    /** @ts-ignore: Defined afeter calling MenuCore.append() */
    private _menu;
    readonly propertys: P;
    get label(): string;
    set label(value: string);
    constructor(_label: string, propertys?: Partial<P>);
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
    on<K extends keyof Events<any>>(eventName: K, listener: E[K]): this;
    once<K extends keyof Events<any>>(eventName: K, listener: E[K]): this;
    off<K extends keyof Events<any>>(eventName: K, listener: E[K]): this;
    eventNames(): Array<string | symbol>;
    listeners<K extends keyof Events<any>>(eventName: K): Array<E[K]>;
}
