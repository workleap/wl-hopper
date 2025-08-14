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
    const doAndDontItem = (item: DosAndDontsItem) => {
        return (
            <div>
                {item.example}
                {item.explanation}
            </div>
        );
    };

    return (
        <SimpleTable
            headers={["✅ Do", "🚫 Don't"]}
            data={items.map(item => ({
                "✅ Do": item.do ? doAndDontItem(item.do) : null,
                "🚫 Don't": item.dont ? doAndDontItem(item.dont) : null
            }))}
        />
    );
}

export default DosAndDonts;
