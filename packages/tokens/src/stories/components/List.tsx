import type { ComponentProps } from "react";
import "./list.css";

export interface Style { name: string; value: string }
export type TokenType = "core" | "background" | "border" | "text" | "icon" | "dataViz";

interface ListProps {
    styles: Style[];
    tokenType: TokenType;
}

export const List = ({ styles, tokenType }: ListProps) => {
    const listItems = styles.map(style => {
        return (
            <li className="list__item" key={style.name} >
                <DisplayComponent className="list__color" value={style.value} tokenType={tokenType} />
                <span className="list__value">{style.value}</span>
                <span className="list__name">{style.name}</span>
            </li>);
    });

    return <ul className="list">{listItems}</ul>;
};

interface DisplayComponentProps extends ComponentProps<"div"> {
    value: Style["value"];
    tokenType: TokenType;
}

function DisplayComponent({ value, tokenType, style, ...rest }: DisplayComponentProps) {
    switch (tokenType) {
        case "core":
        case "background":
        case "dataViz":
            return (
                <div style={{ backgroundColor: value, ...style }} {...rest}>
                </div>);
        case "border":
            return (
                <div {...rest} style={{ border: `1px solid ${value}`, backgroundColor: value === "#ffffff" ? "black" : undefined, ...style }} >
                </div>);
        case "text":
            return (
                <div {...rest} style={{ color: value, backgroundColor: value === "#ffffff" ? "black" : undefined, ...style }} >
                    Aa
                </div>);
        case "icon":
            return (
                <div {...rest} style={{ color: value, backgroundColor: value === "#ffffff" ? "black" : undefined, ...style }} >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        { }
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.673 4.557a.75.75 0 0 0-1.345 0L9.173 8.923l-4.819.7a.75.75 0 0 0-.416 1.28L7.425 14.3l-.823 4.8a.75.75 0 0 0 1.088.79L12 17.625l4.31 2.266a.75.75 0 0 0 1.088-.79l-.823-4.8 3.487-3.399a.75.75 0 0 0-.416-1.279l-4.819-.7-2.154-4.366Z" fill="currentColor"></path>
                    </svg>
                </div>);
    }
}
