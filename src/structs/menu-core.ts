import format from "../helpers/formater";
import applyStyle, { MenuStyle } from "../styles";
import MenuItem from "./menu-item";



export interface MenuPropertys extends MenuStyle {
    
    // Padding
    padding: number
    between_items_padding: number


    // options
    message_item_selected: boolean, // "Item {index} selected"
    message_item_format: string // "Item ${index} selected"

    minimal_width: number
}

export interface IDMessage {
    id: number,
    message: string
}

export default abstract class MenuCore {

    public static readonly MENU_TYPE: string = "DEFAULT_MENU";
    protected readonly propertys: MenuPropertys
    
    protected _selected_item_idx: number = -1
    protected _items: MenuItem[] = []
    protected _messages: IDMessage[] = [];
    private _message_timeout_tmo: NodeJS.Timeout | undefined;
    
    protected _is_menu_locked: boolean = false;
    protected _is_menu_hidden: boolean = false;
    private _max_id_msg = 0;

    public get current_selected_item(): MenuItem {
        return this._items[this._selected_item_idx];
    }

    public get selected_item_idx(): number {
        return this._selected_item_idx;
    }

    constructor(
        propertys: Partial<MenuPropertys> = {}
    ) {
        this.propertys = Object.assign<MenuPropertys, typeof propertys>(
            applyStyle(
                'normal',
                {           
                    padding: 2,
                    between_items_padding: 1,
        
                    message_item_selected: false,
                    message_item_format: "Item ${index} selected",
        
                    minimal_width: 10
                }
            ),
            propertys
        )
    }




    public showMessage(message: string, timeout?: number) {
        const _msg_id = this._max_id_msg++;

        this._messages.push(
            { id: _msg_id, message: message }
        )

        this.render()
        setTimeout(() => {
            this.clearMessage(_msg_id)
            this.render()
        }, timeout || 4000)
        return _msg_id
    }

    public clearMessage(id: number) {
        this._messages = this._messages.filter(msg => msg.id != id)
    }

    protected _on_key_down(keydat: string | undefined, key: any) {

        if(this._is_menu_locked) return

        if(key.name == 'down') {
            this.moveSelection(false)

            if(this.propertys.message_item_selected)
                this.showMessage( // showMessage will render the menu
                    format(
                        this.propertys.message_item_format,
                        { index: this._selected_item_idx }
                    )
                );
            else this.render();

        } else if(key.name == 'up') {
            this.moveSelection(true)
        
            if(this.propertys.message_item_selected)
                this.showMessage( // showMessage will render the menu
                    format(
                        this.propertys.message_item_format,
                        { index: this._selected_item_idx }
                    )
                );
            else this.render();

        }else if(key.name === 'left' || key.name === 'right') {
            if(this.current_selected_item) {
                this.current_selected_item.onClicked()
            }
            this.render()
        }
    }

    /**
     * Lock the menu control
     */
    public lock(): void {
        this._is_menu_locked = true;
    }
    
    /**
     * Unlock the menu control
     */
    public unlock(): void {
        this._is_menu_locked = false;
    }

    public clear() {
        throw new Error("`Menu.clear()` Method not implemented.");
    }

    protected _hide() {
        throw new Error("`Menu._hide()` Method not implemented.");
    }

    protected _show() {
        throw new Error("`Menu._show()` Method not implemented.");
    }

    public hide() {

        if(!this._is_menu_hidden) {
            this._is_menu_hidden = true;
            this._hide()
        }
    }

    public show() {
        if(this._is_menu_hidden) {
            this._is_menu_hidden = false;
            this._show();
        }
    }

    /**
     * Append new Item
     * @param at Append the item at
     */
    public append(item: MenuItem, at?: number | MenuItem): void {
        if(typeof at == 'number') {
            this._items.splice(at, 0, item);
        } else if(at instanceof MenuItem) {
            this._items.splice(this._items.indexOf(at), 0, item);
        }else {
            this._items.push(item);
        }

        item.id = item.ITEM_TYPE + ": " + this._items.indexOf(item);
        item.menu = this
    }

    /**
     * Remove item from the menu
     */
    public remove(item: MenuItem): void {
        this._items.splice(this._items.indexOf(item), 1);
    }
    
    public moveSelection(up: boolean): void {

        this._selected_item_idx += up ? -1 : 1;
        if(this._selected_item_idx < 0) {
            this._selected_item_idx = this._items.length - 1;
        } else if(this._selected_item_idx >= this._items.length) {
            this._selected_item_idx = 0;
        }

        if(this.current_selected_item?.isDisabled) {
            this.moveSelection(up);
        }

    }
    
    /**
     * Disable an item from the menu
     */
    public disable(item: MenuItem | number): void {
        if(typeof item == 'number') {
            item = this._items[item]
        }

        item?.disable?.();
    }

    /**
     * Enable an item from the menu
     */
    public enable(item: MenuItem | number): void {
        if(typeof item == 'number') {
            item = this._items[item]
        }
        
        item?.enable?.();
    }

    /**
     * Is item enabled
     */
    public isEnabled(item: MenuItem | number): boolean {
        if(typeof item == 'number') {
            item = this._items[item]
        }

        return typeof item?.isDisabled === 'boolean' ? !item?.isDisabled : false;
    }

    /**
     * Is item disabled
     */
    public isDisabled(item: MenuItem | number): boolean {
        if(typeof item == 'number') {
            item = this._items[item]
        }

        return typeof item?.isDisabled === 'boolean' ? item?.isDisabled : false;
    }

    /**
     * Get the current menu index
     */
    public currentItemIndex(): number {
        return this._selected_item_idx;
    }

    /**
     * Get Item by index
     */

    public getItem(index: number): MenuItem | undefined {
        return this._items[index];
    }


    /**
     * Initialize the menu
     */
    public initialize(...args: any[]): void {
        throw new Error("`Menu.render()` Method not implemented.");
    }
    
    /**
     * Render the menu
     */
    public render(): void {
        throw new Error("`Menu.render()` Method not implemented.");
    }

}