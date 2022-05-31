








// format("${name} ${age}", {name: "John", age: 34}) // "John 34"
export default function format<T extends object>(data: string, obj: T) {
    return data.replace(/\{([^\}]*)\}/g, (match, key) => {
        return obj[key]
    })
}