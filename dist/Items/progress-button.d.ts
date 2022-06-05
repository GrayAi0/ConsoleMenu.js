import MenuCore from "../structs/menu-core";
import MenuItem, { MenuItemProps } from "../structs/menu-item";
export interface PrograssButtonProps extends MenuItemProps<PrograssButton> {
}
export default class PrograssButton extends MenuItem<PrograssButtonProps, MenuCore, {
    clicked: (btn: PrograssButton) => void;
}> {
    private _prograss;
    set prograss(val: number);
    get prograss(): number;
    constructor(label: string, props?: Partial<PrograssButtonProps>);
    render(width: number): string;
}
