export interface Icon {
    icon: string;
    leftPadding?: number;
    rightPadding?: number;
}
export interface LabelOptions {
    label: string;
    leftIcon?: string | Icon;
    rightIcon?: string | Icon;
    align?: "left" | "right" | "center";
}
export default class Label {
    private readonly _options;
    constructor(_options: Partial<LabelOptions>);
    private processOptions;
    spliceSpaces(spaces: number, count: number): [number, number];
    _render_icon(icon: Icon, spaces: number): [string, number];
    render(width: number): string;
}
