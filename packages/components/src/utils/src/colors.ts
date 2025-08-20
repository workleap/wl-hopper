export function getColorIndex(name: string, maxNumberOfColor: number) {
    let hashCode = 0;

    for (let i = name.length - 1; i >= 0; i--) {
        const character = name.charCodeAt(i);
        const shift = i % 8;

        hashCode ^= (character << shift) + (character >> (8 - shift));
    }

    return hashCode % maxNumberOfColor;
}

export function getColorName(name: string) {
    const variantToUse = `option${getColorIndex(name, 8) + 1}`;

    return `decorative-${variantToUse}`;
}
