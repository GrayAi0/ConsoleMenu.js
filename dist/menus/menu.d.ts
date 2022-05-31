/// <reference types="node" />
import MenuCore, { MenuPropertys } from "../structs/menu-core";
/** Initialize the stdin for us */
export declare const RL: import("readline").Interface;
export default class Menu extends MenuCore {
    private readonly _title;
    private readonly _menu_header;
    private readonly _menu_footer;
    private _cache?;
    constructor(_title?: string, props?: Partial<MenuPropertys>);
    initialize(): void;
    dispose(): void;
    protected _hide(): void;
    protected _show(): void;
    render(width?: number): void;
    private _render;
}
