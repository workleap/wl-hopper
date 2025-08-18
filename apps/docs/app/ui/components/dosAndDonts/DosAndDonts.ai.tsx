"use client";

import type { ReactNode } from "react";
import SimpleTable from "../simpleTable/SimpleTable.ai";

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
            {items.map(item => (
                <div>
                    {item.do && (
                        <div>
                            <div>✅ Do:</div>
                            {doAndDontItem(item.do)}
                        </div>
                    )}
                    {item.dont && (
                        <div>
                            <div>🚫 Don't:</div>
                            {doAndDontItem(item.dont)}
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default DosAndDonts;
