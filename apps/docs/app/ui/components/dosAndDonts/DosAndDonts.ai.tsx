"use client";

import { Fragment, type ReactNode } from "react";

interface DosAndDontsItem {
    explanation?: string;
    example?: ReactNode;
}

export interface DosAndDontsProps {
    items: [{
        do?: DosAndDontsItem;
        dont?: DosAndDontsItem;
    }];
}

function DosAndDonts({ items }: DosAndDontsProps) {
    const doAndDontItem = ({ example, explanation }: DosAndDontsItem) => {
        return (
            <>
                <div>{example}</div>
                <div>{explanation}</div>
            </>
        );
    };

    return (
        <>
            {items.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index}>
                    <span><strong>Rule {index + 1}</strong></span>
                    <ul>
                        {item.do && (
                            <li>
                                <div>✅ Do:</div>
                                {doAndDontItem(item.do)}
                            </li>
                        )}
                        {item.dont && (
                            <li>
                                <div>🚫 Don&apos;t:</div>
                                {doAndDontItem(item.dont)}
                            </li>
                        )}
                    </ul>
                </div>
            ))}
        </>
    );
}

export default DosAndDonts;
