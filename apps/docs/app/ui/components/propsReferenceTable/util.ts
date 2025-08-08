

export const ScaleLinks = {
    "color-scale": {
        title: "Colors",
        link: "/tokens/semantic/color"
    },
    "elevation-scale": {
        title: "Elevation",
        link: "/tokens/semantic/elevation"
    },
    "dimension-scale": {
        title: "Dimensions",
        link: "/tokens/core/dimensions"
    },
    "spacing-scale": {
        title: "Spacing",
        link: "/tokens/semantic/space"
    },
    "shape-scale": {
        title: "Shape",
        link: "/tokens/semantic/shape"
    },
    "typography-scale": {
        title: "Typography",
        link: "/tokens/semantic/typography"
    }
};

export function isScaleLink(key: string): key is keyof typeof ScaleLinks {
    return key in ScaleLinks;
}
