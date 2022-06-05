
import { createInterface } from "readline";
import { Color } from '../helpers/rendering';
import { setCursorPosition } from '../classes/console-utils';
import MenuCore, { MenuPropertys } from "../structs/menu-core";
import renderScreenBuffer, { RenderableLine, ScreenBuffer, screenCache, ScreenCache } from "../classes/screen";
import MenuHeader from "../items/natives/menu-header";
import MenuFooter from '../items/natives/menu-footer';
import MenuItem from '../structs/menu-item';

/** Initialize the stdin for us */
export const RL = createInterface({
    input: process.stdin,
    output: process.stdout,
})

export default class Menu extends MenuCore {

    private readonly _menu_header: MenuHeader;
    private readonly _menu_footer: MenuFooter;
    
    constructor(
        private readonly _title: string = "Default Menu Title",
        props: Partial<MenuPropertys> = {}
    ) {
        super(props);

        this._menu_header = new MenuHeader(this._title)
        this._menu_header.menu = this
        
        this._menu_footer = new MenuFooter()
        this._menu_footer.menu = this

    }

    public initialize(): void {
        this.moveSelection(false)
        process.stdin.on('keypress', this._on_key_down.bind(this))
    }

    public dispose() {
        process.stdin.off('keypress', this._on_key_down)
        this.lock()
        this.hide();
    }


    protected _hide(): void {

        if(!screenCache?.buffer_cache) return;

        const hidden_buffer: ScreenBuffer = []

        for(const line of screenCache.buffer_cache) {
            hidden_buffer.push([
                0,
                [
                    ' '.repeat(line[1])
                ]
            ])
        }

        renderScreenBuffer(hidden_buffer)
        setCursorPosition(0, 0)
    }

    protected _show(): void {
        this.render()
    }

    public render(width: number = this.propertys.minimal_width): void {

        if(this._is_menu_hidden) return;

        const buffer: ScreenBuffer = []

       // Rendering the menu header
        
        const [ header_width, ...rendered_menu_header ] = this._menu_header.render(width, this.propertys)
        width = header_width

        const rendered_menu_footer = this._menu_footer.render(
            this._messages.map(msg => msg.message).join('\n'),
            width,
            this.propertys
        )

       // Rendering the menu footer
        
        for(const idx in this._items) {
            
            const item = this._items[idx]
            const is_item_selected = (idx as any) == this._selected_item_idx;

            const rendered_item = item.render(width)

            if(rendered_item.length > width) {
                return this.render(rendered_item.length)
            }

            buffer.push(
                this._render(
                    rendered_item,
                    is_item_selected,
                    item
                )
            )

            // We don't want to add padding after the last item
            // @ts-ignore
            if(idx != this._items.length - 1) {
                // Adding between items padding
                for(let i = 0; i < this.propertys.between_items_padding; i++) {
                    buffer.push(
                        this._render(
                            this.propertys.between_items_style.repeat(width),
                            false
                        )
                    )
                }
            }
        }

        // Redner the menu
        renderScreenBuffer([
            // The header of the menu
            ...rendered_menu_header,

            // // Rendered Items
            ...buffer,

            // // Rendered Footer
            ...rendered_menu_footer
        ], { curser_under_screen: true, cache: true })

    }


    private _render(rendered_data: string, is_selected: boolean, item?: MenuItem): RenderableLine {

        return [
            0,
            [
                // The left character of the menu
                this.propertys.left_column_style ?? "|", // "|"
                ...(
                    is_selected ? (
                        [
                            [
                                Color.BACKGROUND_BLUE | Color.BACKGROUND_GREEN | Color.BACKGROUND_RED,
                                // The menu padding, before the item
                                ' '.repeat(this.propertys.padding) +
                
                                // The selected item render output
                                rendered_data + // "  Item  "
                
                                // The menu padding, after the item
                                ' '.repeat(this.propertys.padding)
                            ]
                        ]
                    ) : (
                        [
                            
                            // The menu padding, before the item
                            ' '.repeat(this.propertys.padding),

                            (
                                item?.isDisabled ? (
                                    [
                                        8 /** 8 for gray */,
                                        // The selected item render output
                                        rendered_data // "  Item  "
                                    ]
                                ) : (
                                    rendered_data
                                ) as string
                            ),
                     
                            // The menu padding, after the item
                            ' '.repeat(this.propertys.padding)
                        
                        ]
                    )
                ) as string[],

                // The right character of the menu
                this.propertys.right_column_style + // "|"
    
                // Selected item indicator
                (is_selected ? this.propertys.selected_arrow_style : "") // " <--" or ""
            ],
        ]
    }

}
