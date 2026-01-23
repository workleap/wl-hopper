import "@hopper-ui/tokens/fonts.css";
import type { CSSProperties, ReactNode } from "react";
import "./preview.css";

interface PreviewProps {
    category?: string;
    name?: string;
    value?: string;
}

interface PreviewElemProps {
    className?: string;
    content?: ReactNode;
    style?: CSSProperties;
}

const Preview = ({ category, name, value }: PreviewProps) => {
    let preview: PreviewElemProps = {};

    const sampleText = "Aa";
    const dimensionPaddingKeywords = ["inset"];
    const dimensionInlineKeywords = ["inline"];
    const dimensionStackKeywords = ["stack"];
    const matchingPaddingKeyword = name ? dimensionPaddingKeywords.find(keyword => name.includes(keyword)) : "";
    const matchingStackKeyword = name ? dimensionStackKeywords.find(keyword => name.includes(keyword)) : "";
    const matchingInlineKeyword = name ? dimensionInlineKeywords.find(keyword => name.includes(keyword)) : "";

    switch (category) {
        case "fontFamily":
            preview = {
                style: { fontFamily: value },
                className: "hd-preview--font",
                content: sampleText
            };
            break;
        case "fontWeight":
            preview = {
                style: { fontWeight: value },
                className: "hd-preview--font",
                content: sampleText
            };
            break;
        case "fontSize":
            preview = {
                style: { fontSize: value },
                className: "hd-preview--font",
                content: sampleText
            };
            break;
        case "lineHeight":
            preview = {
                style: { lineHeight: value },
                className: "hd-preview--font hd-preview--line-height",
                content: <><span className="hd-preview--line-height__text hd-preview--line-height__text-top">{sampleText}</span><span className="hd-preview--line-height__text hd-preview--line-height__text-bottom">{sampleText}</span></>
            };
            break;
        case "mediaQuery":
        case "zIndex":
            preview = {
                style: {},
                className: "hd-preview--empty"
            };
            break;
        case "borderRadius":
            preview = {
                style: { borderTopLeftRadius: value },
                className: "hd-preview--stroke"
            };
            break;
        case "shadow":
        case "focus":
            preview = {
                style: { boxShadow: value },
                className: "hd-preview--shadow"
            };
            break;
        case "size":
        case "paddingSize":
        case "marginSize":
            preview = {
                style: { width: value }
            };
            if (matchingPaddingKeyword) {
                preview = {
                    style: { padding: value, justifySelf: "end" },
                    className: `hd-preview--semantic-size hd-preview--${matchingPaddingKeyword}`
                };
            }
            if (matchingInlineKeyword) {
                preview = {
                    style: { padding: `0 ${value} 0 0` },
                    className: `hd-preview--semantic-size hd-preview--${matchingInlineKeyword}`
                };
            }
            if (matchingStackKeyword) {
                preview = {
                    style: { padding: `0 0 ${value} 0`, justifySelf: "end" },
                    className: `hd-preview--semantic-size hd-preview--${matchingStackKeyword}`
                };
            }
            break;
        default:
            preview = {
                style: { backgroundColor: value }
            };
            break;
    }

    return <div className={`hd-preview ${preview.className}`} style={preview.style}>{preview.content}</div>;
};

export default Preview;
