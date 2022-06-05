import { MenuPropertys } from "../structs/menu-core"




export interface MenuStyle {

    top_left_corner_style: string,
    top_right_corner_style: string,

    bottom_left_corner_style: string,
    bottom_right_corner_style: string,

    left_column_style: string
    right_column_style: string
    
    header_style: string
    footer_style: string
    
    between_items_style: string
    selected_arrow_style: string


}

const menuStyles = {
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
    },

    ["smooth-heavy"]: {
                                        
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


    dashed: {

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
    
    ["dashed-heavy"]: {

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

    quadruple: {

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

    ["quadruple-heavy"]: {

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

    fancy: {
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
    }
}

export type StyleType = keyof typeof menuStyles

export default function applyStyle<T extends MenuPropertys>(
    type: StyleType = 'normal',
    options: Partial<T> = {} as any
): MenuPropertys {

    return Object.assign((type in menuStyles ? menuStyles[type] : menuStyles.normal)!, options) as MenuPropertys
}