import { RenderableLine } from "../../classes/screen";
import { MenuPropertys } from "../../structs/menu-core";
import MenuItem from "../../structs/menu-item";
export default class MenuHeader extends MenuItem {
    private readonly _label;
    constructor(_label: string);
    /** @ts-ignore */
    render(width: number, props: MenuPropertys): [number, RenderableLine, RenderableLine, RenderableLine];
    private _renderLine;
}
