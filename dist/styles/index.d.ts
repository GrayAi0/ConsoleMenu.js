import { MenuPropertys } from "../structs/menu-core";
export interface MenuStyle {
    top_left_corner_style: string;
    top_right_corner_style: string;
    bottom_left_corner_style: string;
    bottom_right_corner_style: string;
    left_column_style: string;
    right_column_style: string;
    header_style: string;
    footer_style: string;
    between_items_style: string;
    selected_arrow_style: string;
}
declare const menuStyles: {
    normal: {
        top_left_corner_style: string;
        top_right_corner_style: string;
        bottom_left_corner_style: string;
        bottom_right_corner_style: string;
        left_column_style: string;
        right_column_style: string;
        header_style: string;
        footer_style: string;
        between_items_style: string;
        selected_arrow_style: string;
    };
    smooth: {
        top_left_corner_style: string;
        top_right_corner_style: string;
        bottom_left_corner_style: string;
        bottom_right_corner_style: string;
        left_column_style: string;
        right_column_style: string;
        header_style: string;
        footer_style: string;
        between_items_style: string;
        selected_arrow_style: string;
    };
    "smooth-heavy": {
        top_left_corner_style: string;
        top_right_corner_style: string;
        bottom_left_corner_style: string;
        bottom_right_corner_style: string;
        left_column_style: string;
        right_column_style: string;
        header_style: string;
        footer_style: string;
        between_items_style: string;
        selected_arrow_style: string;
    };
    dashed: {
        top_left_corner_style: string;
        top_right_corner_style: string;
        bottom_left_corner_style: string;
        bottom_right_corner_style: string;
        left_column_style: string;
        right_column_style: string;
        header_style: string;
        footer_style: string;
        between_items_style: string;
        selected_arrow_style: string;
    };
    "dashed-heavy": {
        top_left_corner_style: string;
        top_right_corner_style: string;
        bottom_left_corner_style: string;
        bottom_right_corner_style: string;
        left_column_style: string;
        right_column_style: string;
        header_style: string;
        footer_style: string;
        between_items_style: string;
        selected_arrow_style: string;
    };
    quadruple: {
        top_left_corner_style: string;
        top_right_corner_style: string;
        bottom_left_corner_style: string;
        bottom_right_corner_style: string;
        left_column_style: string;
        right_column_style: string;
        header_style: string;
        footer_style: string;
        between_items_style: string;
        selected_arrow_style: string;
    };
    "quadruple-heavy": {
        top_left_corner_style: string;
        top_right_corner_style: string;
        bottom_left_corner_style: string;
        bottom_right_corner_style: string;
        left_column_style: string;
        right_column_style: string;
        header_style: string;
        footer_style: string;
        between_items_style: string;
        selected_arrow_style: string;
    };
    fancy: {
        top_left_corner_style: string;
        top_right_corner_style: string;
        bottom_left_corner_style: string;
        bottom_right_corner_style: string;
        left_column_style: string;
        right_column_style: string;
        header_style: string;
        footer_style: string;
        between_items_style: string;
        selected_arrow_style: string;
    };
};
export declare type StyleType = keyof typeof menuStyles;
export default function applyStyle<T extends MenuPropertys>(type?: StyleType, options?: Partial<T>): MenuPropertys;
export {};
