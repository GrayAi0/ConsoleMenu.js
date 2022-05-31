import MenuCore, { MenuPropertys } from "../structs/menu-core";
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
