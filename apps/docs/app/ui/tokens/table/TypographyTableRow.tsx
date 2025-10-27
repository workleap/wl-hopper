import type { FontProperties, Size } from "@/app/lib/getTypographyTokens";
import Code from "@/components/code/Code";
import type { ComponentProps, ReactNode } from "react";
import TypographyPreview from "../preview/TypographyPreview";

import Link from "next/link";
import "./tokenTable.css";

export function typographyTableRow(type: string, properties: FontProperties, size?: Size) {
    const {
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        topOffset,
        bottomOffset
    } = properties;

    let previewAdditionalStyles = {};

    if (type === "overline") {
        previewAdditionalStyles = {
            textTransform: "uppercase",
            letterSpacing: "0.015rem"
        };
    }

    return ({
        name: size,
        value: <PropertiesCell properties={properties} />,
        preview: (
            <TypographyPreview
                style={{ ...previewAdditionalStyles }}
                values={{
                    lineHeight: lineHeight?.value,
                    fontSize: fontSize?.value,
                    fontWeight: fontWeight?.value,
                    fontFamily: fontFamily?.value,
                    topOffset: topOffset?.value,
                    bottomOffset: bottomOffset?.value
                }}
            />
        )
    });
}

interface PropertiesCellProps {
    properties: FontProperties;
}

function PropertiesCell({ properties }: PropertiesCellProps) {
    return (
        <table>
            <tbody className="hd-properties-table__tbody">
                {properties.fontSize && (
                    <PropertyRow
                        key="fontSize"
                        tokenName={properties.fontSize.tokenName}
                        displayName="Font Size"
                        value={properties.fontSize.value}
                    />
                )}
                {properties.fontWeight && (
                    <PropertyRow
                        key="fontWeight"
                        tokenName={properties.fontWeight.tokenName}
                        displayName="Font Weight"
                        value={properties.fontWeight.value}
                    />
                )}
                {properties.lineHeight && (
                    <PropertyRow
                        key="lineHeight"
                        tokenName={properties.lineHeight.tokenName}
                        displayName="Line Height"
                        value={properties.lineHeight.value}
                    />
                )}
                {properties.fontFamily && (
                    <PropertyRow
                        key="fontFamily"
                        tokenName={properties.fontFamily.tokenName}
                        displayName="Font Family"
                        value={properties.fontFamily.value}
                    />
                )}
                {properties.topOffset && (
                    <PropertyRow
                        key="topOffset"
                        className="hd-typo-offset-cell"
                        tokenName={properties.topOffset.tokenName}
                        displayName={(
                            <>
                                Top Offset
                                <Link
                                    href="#offset-tokens"
                                    className="hd-table__link"
                                >
                                    <sup>1</sup>
                                </Link>
                            </>
                        )}
                        value={properties.topOffset.value}
                    />
                )}
                {properties.bottomOffset && (
                    <PropertyRow
                        key="bottomOffset"
                        className={properties.topOffset ? undefined : "hd-typo-offset-cell"}
                        tokenName={properties.bottomOffset.tokenName}
                        displayName={(
                            <>
                                Bottom Offset
                                <Link
                                    href="#offset-tokens"
                                    className="hd-table__link"
                                >
                                    <sup>1</sup>
                                </Link>
                            </>
                        )}
                        value={properties.bottomOffset.value}
                    />
                )}
            </tbody>
        </table>
    );
}

interface PropertyRowProps extends Omit<ComponentProps<"tr">, "children"> {
    tokenName: string;
    displayName: ReactNode;
    value: string;
}

function PropertyRow({ tokenName, displayName, value, ...rest }: PropertyRowProps) {
    return (
        <tr {...rest} >
            <td className="hd-properties-table__cell">
                {displayName}
            </td>
            <td className="hd-properties-table__cell">
                <Code value={tokenName}>{tokenName}</Code>
            </td>
            <td className="hd-properties-table__token-value-cell">
                {value}
            </td>
        </tr>
    );
}
