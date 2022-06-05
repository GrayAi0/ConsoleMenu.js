import { MenuStyle } from "../styles";
import MenuItem from "./menu-item";
export interface MenuPropertys extends MenuStyle {
    padding: number;
    between_items_padding: number;
    message_item_selected: boolean;
    message_item_format: string;
    minimal_width: number;
}
export default abstract class MenuCore {
    static readonly MENU_TYPE: string;
    protected readonly propertys: MenuPropertys;
    protected _selected_item_idx: number;
    protected _items: MenuItem[];
    protected _message: string;
    private _message_timeout_tmo;
    protected _is_menu_locked: boolean;
    protected _is_menu_hidden: boolean;
    get current_selected_item(): MenuItem;
    get selected_item_idx(): number;
    constructor(propertys?: Partial<MenuPropertys>);
    showMessage(message: string, timeout?: number): void;
    /**
     * Call this.showMessage("", -1)
     */
    clearMessage(): void;
    protected _on_key_down(keydat: string | undefined, key: any): void;
    /**
     * Lock the menu control
     */
    lock(): void;
    /**
     * Unlock the menu control
     */
    unlock(): void;
    clear(): void;
    protected _hide(): void;
    protected _show(): void;
    hide(): void;
    show(): void;
    /**
     * Append new Item
     * @param at Append the item at
     */
    append(item: MenuItem, at?: number | MenuItem): void;
    /**
     * Remove item from the menu
     */
    remove(item: MenuItem): void;
    moveSelection(up: boolean): void;
    /**
     * Disable an item from the menu
     */
    disable(item: MenuItem | number): void;
    /**
     * Enable an item from the menu
     */
    enable(item: MenuItem | number): void;
    /**
     * Is item enabled
     */
    isEnabled(item: MenuItem | number): boolean;
    /**
     * Is item disabled
     */
    isDisabled(item: MenuItem | number): boolean;
    /**
     * Get the current menu index
     */
    currentItemIndex(): number;
    /**
     * Get Item by index
     */
    getItem(index: number): MenuItem | undefined;
    /**
     * Initialize the menu
     */
    initialize(...args: any[]): void;
    /**
     * Render the menu
     */
    render(): void;
}
