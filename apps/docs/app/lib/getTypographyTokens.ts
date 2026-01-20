import type { TokenValue } from "../ui/tokens/allDataTokens";

export const Sizes = ["3xl", "2xl", "xl", "lg", "md", "sm", "xs"] as const;
export const FontProperties = ["fontSize", "fontWeight", "lineHeight", "fontFamily", "topOffset", "bottomOffset"] as const;

export type Size = typeof Sizes[number];
export type FontProperty = typeof FontProperties[number];

export type FontProperties = Partial<Record<FontProperty, {
    tokenName: string;
    value: string;
}>>;
export type FontPropertiesBySizes = Partial<Record<Size, FontProperties>>;

export interface TokenData {
    [category: string]: TokenValue[];
}

/**
 * given an itemType (overline/body/heading/accent) and optionally a size, return all property tokens that matches the itemType and size
 */
function getAllProperties(tokenData: TokenData, itemType: string, sizeKey?: Size): FontProperties {
    return FontProperties.map(propertyKey => {
        if (!tokenData[propertyKey]) {
            return [propertyKey, undefined] as const;
        }

        const matchingItem = tokenData[propertyKey].find(item => {
            const nameParts = item.name.split("-");

            const includesSizeKey = sizeKey !== undefined ? nameParts.includes(sizeKey) : true;
            const includesName = nameParts.includes(itemType);

            return includesName && includesSizeKey;
        });
        const test = [propertyKey, matchingItem ? {
            tokenName: matchingItem.name,
            value: matchingItem.value
        } : undefined] as const;

        return test;
    }).reduce((acc, [key, value]) => {
        acc[key] = value;

        return acc;
    }, {} as FontProperties);
}

/**
 * Given an itemType (overline/body/heading/accent), group all property tokens by size
 */
export function groupItemsByPropertiesAndSizes(tokenData: TokenData, itemType: string): FontPropertiesBySizes {
    return Sizes.reduce<FontPropertiesBySizes>((acc, sizeKey) => {
        const allProperties = getAllProperties(tokenData, itemType, sizeKey);
        if (Object.values(allProperties).some(value => value)) {
            acc[sizeKey] = allProperties;
        }

        return acc;
    }, {});
}

/**
 * Given an itemType (overline/body/heading/accent), group all property tokens for item types that have no size
 */
export function groupItemsByProperties(tokenData: TokenData, itemType: string) {
    const allProperties = getAllProperties(tokenData, itemType);

    if (Object.values(allProperties).every(value => !value)) {
        return undefined;
    }

    return allProperties;
}
