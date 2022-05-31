import MenuCore from "./menu-core";



export interface ItemRenderResult {

}

export interface MenuItemProps {
    is_countless: boolean,
    onClicked: (this: MenuItem) => any,
    onKeyDown: (this: MenuItem, key: any) => void,
    disabled: boolean,
}

export default abstract class MenuItem<M extends MenuCore = MenuCore> {

    
    readonly ITEM_TYPE: string = "DEFAULT_ITEM";
    protected _is_disabled: boolean = false;
    /** @ts-ignore: Defined afeter calling MenuCore.append() */
    private _id: string;
    /** @ts-ignore: Defined afeter calling MenuCore.append() */
    private _menu: M

    public readonly propertys: MenuItemProps;

    public get label() {
        return this._label
    }

    public set label(value) {
        this._label = value
    }

    constructor(
        private _label: string,
        propertys: Partial<MenuItemProps> = {}
    ) {
        this.propertys = Object.assign<MenuItemProps, typeof propertys>({
            is_countless: false,
            onClicked: () => {},
            onKeyDown: (key: any) => {},
            disabled: false,
        }, propertys)

        if(this.propertys.disabled) {
            this.disable()
        } 

    }

    public get isDisabled() {
        return this._is_disabled;
    }

    public get menu() {
        if(!this._menu) {
            throw new Error("Cannot access `MenuItem.menu` property before append the item to the menu.");
        }
        return this._menu;
    }

    public set menu(val: M) {
        if(!this._menu) {
            this._menu = val
        }
    }

    public get id() {
        return this._id;
    }

    public set id(val: string) {
        if(!this._id?.length) {
            this._id = val
        }
    }

    public disable() {
        this._is_disabled = true;
        if(this._menu) {
            this._menu.render();
        }
    }

    public enable() {
        this._is_disabled = false;
        if(this._menu) {
            this._menu.render();
        }
    }

    public onKeyDown(key: any) {
        this.propertys.onKeyDown.bind(this)(key);
    }

    public onClicked(...args: any[]): any {
        /** @ts-ignore */
        return this.propertys.onClicked.bind(this)(...args);
    }

    /**
     * Render the item
     */
    public render(width: number): string {
        throw new Error("`Item.render(width)` Method not implemented.");
    }
}

