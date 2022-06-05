"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var menuStyles = (_a = {
        normal: {
            top_left_corner_style: '|',
            top_right_corner_style: '|',
            bottom_left_corner_style: '|',
            bottom_right_corner_style: '|',
            left_column_style: '|',
            right_column_style: '|',
            header_style: '-',
            footer_style: '-',
            between_items_style: ' ',
            selected_arrow_style: " <--",
        },
        smooth: {
            top_left_corner_style: '│',
            top_right_corner_style: '│',
            bottom_left_corner_style: '│',
            bottom_right_corner_style: '│',
            left_column_style: '│',
            right_column_style: '│',
            header_style: '─',
            footer_style: '─',
            between_items_style: ' ',
            selected_arrow_style: " <--",
        }
    },
    _a["smooth-heavy"] = {
        top_left_corner_style: '┃',
        top_right_corner_style: '┃',
        bottom_left_corner_style: '┃',
        bottom_right_corner_style: '┃',
        left_column_style: '┃',
        right_column_style: '┃',
        header_style: '━',
        footer_style: '━',
        between_items_style: ' ',
        selected_arrow_style: " <--",
    },
    _a.dashed = {
        top_left_corner_style: '┆',
        top_right_corner_style: '┆',
        bottom_left_corner_style: '┆',
        bottom_right_corner_style: '┆',
        left_column_style: '┆',
        right_column_style: '┆',
        header_style: '┄',
        footer_style: '┄',
        between_items_style: ' ',
        selected_arrow_style: " <--",
    },
    _a["dashed-heavy"] = {
        top_left_corner_style: '┆',
        top_right_corner_style: '┆',
        bottom_left_corner_style: '┆',
        bottom_right_corner_style: '┆',
        left_column_style: '┇',
        right_column_style: '┇',
        header_style: '┅',
        footer_style: '┅',
        between_items_style: ' ',
        selected_arrow_style: " <--",
    },
    _a.quadruple = {
        top_left_corner_style: '┊',
        top_right_corner_style: '┊',
        bottom_left_corner_style: '┊',
        bottom_right_corner_style: '┊',
        left_column_style: '┊',
        right_column_style: '┊',
        header_style: '┈',
        footer_style: '┈',
        between_items_style: ' ',
        selected_arrow_style: " <--",
    },
    _a["quadruple-heavy"] = {
        top_left_corner_style: '┋',
        top_right_corner_style: '┋',
        bottom_left_corner_style: '┋',
        bottom_right_corner_style: '┋',
        left_column_style: '┋',
        right_column_style: '┋',
        header_style: '┉',
        footer_style: '┉',
        between_items_style: ' ',
        selected_arrow_style: " <--",
    },
    _a.fancy = {
        top_left_corner_style: '╔',
        top_right_corner_style: '╗',
        bottom_left_corner_style: '╚',
        bottom_right_corner_style: '╝',
        left_column_style: "║",
        right_column_style: "║",
        header_style: '═',
        footer_style: '═',
        between_items_style: ' ',
        selected_arrow_style: ' ↵',
    },
    _a);
function applyStyle(type, options) {
    if (type === void 0) { type = 'normal'; }
    if (options === void 0) { options = {}; }
    return Object.assign((type in menuStyles ? menuStyles[type] : menuStyles.normal), options);
}
exports.default = applyStyle;
//# sourceMappingURL=index.js.map