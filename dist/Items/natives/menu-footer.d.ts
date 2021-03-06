import { MenuPropertys } from "../../structs/menu-core";
import MenuItem from "../../structs/menu-item";
import { RenderableLine } from "../../classes/screen";
export default class MenuFooter extends MenuItem {
    constructor();
    /** @ts-ignore */
    render(messages: string[], width: number, props: MenuPropertys): RenderableLine[];
    private _renderLine;
}
