import EventEmitter from "events";
import MenuCore from "./menu-core";



export interface ItemRenderResult {

}

export type DefaultEvents<T extends MenuItem> = { clicked: (item: T, ...args: any[]) => void }

export interface MenuItemProps<T extends MenuItem = any> extends Partial<DefaultEvents<T>> {
    is_countless: boolean,
    disabled: boolean,
}

export interface Events<T extends MenuItem> extends NodeJS.Dict<(...args: any[]) => void>{
    clicked: (item: T, ...args: any[]) => void
}

export default abstract class MenuItem<P extends MenuItemProps = MenuItemProps, M extends MenuCore = MenuCore, E extends Events<any> = { clicked: (this: MenuItem) => void }> {

    protected readonly emitter = new EventEmitter(); 
    
    readonly ITEM_TYPE: string = "DEFAULT_ITEM";
    protected _is_disabled: boolean = false;
    /** @ts-ignore: Defined afeter calling MenuCore.append() */
    private _id: string;
    /** @ts-ignore: Defined afeter calling MenuCore.append() */
    private _menu: M

    public readonly propertys: P;

    public get label() {
        return this._label
    }

    public set label(value) {
        this._label = value
    }

    constructor(
        private _label: string,
        propertys: Partial<P> = {}
    ) {
        this.propertys = Object.assign<MenuItemProps, P>({
            is_countless: false,
            disabled: false,
        }, propertys as P)

        if(this.propertys.disabled) {
            this.disable()
        }

        if(this.propertys.clicked) {
            this.on('clicked', this.propertys.clicked)
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
        this.emitter.emit('keydown', key)
    }

    public onClicked(...args: any[]): any {
        this.emitter.emit('clicked', this, ...args)
    }

    /**
     * Render the item
     */
    public render(width: number): string {
        throw new Error("`Item.render(width)` Method not implemented.");
    }


    public on<K extends keyof Events<any>>(eventName: K, listener: E[K]): this {
        this.emitter.on(eventName as string, listener as any);
        return this;
    }

    public once<K extends keyof Events<any>>(eventName: K, listener: E[K]): this {
        this.emitter.once(eventName as string, listener as any);
        return this;
    }

    public off<K extends keyof Events<any>>(eventName: K, listener: E[K]): this {
        this.emitter.off(eventName as string, listener as any);
        this.emitter.eventNames
        return this;
    }

    public eventNames(): Array<string | symbol> {
        return this.emitter.eventNames()
    }

    public listeners<K extends keyof Events<any>>(eventName: K): Array<E[K]> {
        return this.emitter.listeners(eventName as string) as any
    }
}