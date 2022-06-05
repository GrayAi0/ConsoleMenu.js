import { byteOnly, centerString } from "../helpers/rendering";









export interface Icon {
    icon: string,
    leftPadding?: number,
    rightPadding?: number,
}

export interface LabelOptions {
    label: string;
    leftIcon?: string | Icon;
    rightIcon?: string | Icon;
    align?: "left" | "right" | "center";
}

export default class Label {

    private readonly _options: Omit<Omit<Required<LabelOptions>, 'leftIcon'>, 'rightIcon'> & { leftIcon: Icon, rightIcon: Icon };
    
    constructor(
        _options: Partial<LabelOptions>
    ) {
        this._options = this.processOptions(_options)
    }

    private processOptions(options: Partial<LabelOptions>): typeof this._options {

        if(!options.label) {
            throw new Error("Label must have a label")
        }

        const { label, leftIcon, rightIcon, align } = options

        return {
            label,
            leftIcon: typeof leftIcon === 'string' || !leftIcon ? { icon: leftIcon ?? "", leftPadding: 0, rightPadding: 0 } : leftIcon,
            rightIcon: typeof rightIcon === 'string' || !rightIcon ? { icon: rightIcon ?? "", leftPadding: 0, rightPadding: 0 } : rightIcon,
            align: ['left', 'right', 'center'].includes(align!) ? align! : "center"
        }
    }

    public spliceSpaces(spaces: number, count: number): [number, number] {

        /**
         * if:
         *      spaces = 10
         *      count  = 5
         * then:
         *      res_spaces = 5
         *      res_count  = 5
         * 
         * if: 
         *      spaces = 10
         *      count  = 15
         * then:
         *     res_spaces = 0
         *     res_count  = 5
         */

        if(spaces < count) {
            return [0, spaces]
        }
        return [byteOnly(spaces - count), count]
    }

    public _render_icon(icon: Icon, spaces: number): [ string, number ] {

        
        let icon_left_padding;
        [ spaces, icon_left_padding ] = this.spliceSpaces(
            spaces,
            icon.leftPadding ?? 0
        )

        let icon_right_padding;
        [ spaces, icon_right_padding ] = this.spliceSpaces(
            spaces,
            icon.rightPadding ?? 0
        )

        return [
            ' '.repeat(byteOnly(icon_left_padding)) + icon.icon + ' '.repeat(byteOnly(icon_right_padding)),
            spaces
        ]

    }

    public render(width: number) {
        const { label, leftIcon, rightIcon, align } = this._options

        let spaces = this.spliceSpaces(
            width,
            label.length
        )[0]

        let right_icon_length;
        [ spaces, right_icon_length ] = this.spliceSpaces(
            spaces,
            rightIcon.icon.length
        );
        
        let left_icon_length;
        [ spaces, left_icon_length ] = this.spliceSpaces(
            spaces,
            leftIcon.icon.length
        );
        
        let renderedRightIcon;
        [ renderedRightIcon, spaces ] = this._render_icon(rightIcon, spaces)
        
        let renderedLeftIcon;
        [ renderedLeftIcon, spaces ] = this._render_icon(leftIcon, spaces)

        if(align == "left") {
            return (
                renderedLeftIcon +
                label +
                ' '.repeat(byteOnly(spaces)) +
                renderedRightIcon
            )
        }

        if(align == "right") {
            return (
                renderedLeftIcon +
                ' '.repeat(byteOnly(spaces)) +
                label +
                renderedRightIcon
            )
        }

        if(align == "center") {
            return (
                renderedLeftIcon +
                ' '.repeat(
                    byteOnly(
                        (spaces / 2) + (
                            (
                                label.length + 
                                renderedRightIcon.length +
                                renderedLeftIcon.length
                            ) % 2 == 1 ? 1 : 0
                        )
                        )
                    ) +
                label +
                ' '.repeat(byteOnly((spaces / 2))) +
                renderedRightIcon
            )
        }


        return align
    }
}

// const options: Partial<LabelOptions> = {
//     label: 'Hello, World',
//     leftIcon: {
//         icon: "l",
//         leftPadding: 1,
//         rightPadding: 1,
//     },
//     rightIcon: {
//         icon: "r",
//         leftPadding: 1,
//         rightPadding: 1,
//     }
// }

// function printLine() {
//     console.log("-".repeat(42))
// }

// printLine();
// console.log(
//     "|" + new Label(Object.assign({
//         align: "right",
//     }, options)).render(40) + "|"
// )
// printLine();
// console.log("")
// printLine();
// console.log(
//     "|" + new Label(Object.assign({
//         align: "center",
//     }, options)).render(40) + "|"
// )
// printLine();
// console.log("")
// printLine();
// console.log(
//     "|" + new Label(Object.assign({
//         align: "left",
//     }, options)).render(40) + "|"
// )
// printLine();
// console.log("")
