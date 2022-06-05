import MenuCore from "../structs/menu-core";
import MenuItem, { MenuItemProps } from "../structs/menu-item";
export interface SubMenuProps extends MenuItemProps<SubMenu> {
}
export default class SubMenu extends MenuItem {
    private readonly _render_menu;
    get subMenu(): MenuCore;
    constructor(label: string, _render_menu?: MenuCore, propertys?: Partial<SubMenuProps>);
    dispose(): void;
    render(width: number): string;
    show(): void;
    hide(): void;
    onClicked(): void;
}
