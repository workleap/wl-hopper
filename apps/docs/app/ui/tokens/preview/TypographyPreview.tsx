import type { CSSProperties } from "react";
import "./preview.css";
import "@hopper-ui/tokens/fonts.css";

interface TypographyPreviewProps {
    values?: TypographyValues;
    style?: CSSProperties;
}

interface TypographyValues {
    lineHeight?: string;
    fontWeight?: string;
    fontSize?: string;
    fontFamily?: string;
    topOffset?: string;
    bottomOffset?: string;
}

const TypographyPreview = ({ values, style }: TypographyPreviewProps) => {
    return (
        <div
            className="hd-preview hd-preview--font hd-preview--typography"
            style={{
                lineHeight: values?.lineHeight,
                fontWeight: values?.fontWeight,
                fontSize: values?.fontSize,
                fontFamily: values?.fontFamily,
                ...style
            }}
        >
            Aa
        </div>
    );
};

export default TypographyPreview;
