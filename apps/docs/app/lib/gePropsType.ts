export interface PropItemTypeValue {
    name: string;
    value?: Array<{ value: string; name: string }>;
    raw?: string;
}

export function getType(type: PropItemTypeValue) {
    const handler: {
        [key: string]: (type: PropItemTypeValue) => string;
    } = {
        enum: t => (t.value ? t.value.map(item => item.value.replace(/'/g, "")).join(" \\| ") : ""),
        union: t => (t.value ? t.value.map(item => item.name).join(" \\| ") : "")
    };
    if (typeof handler[type.name] === "function") {
        return handler[type.name](type).replace(/\|/g, "");
    }

    return type.name;
}
