"use client";

import SimpleTable from "../simpleTable/SimpleTable.ai";

interface DosAndDontsItem {
    explanation?: string;
    code?: string;
}

export interface DosAndDontsProps {
    items: [{
        do?: DosAndDontsItem;
        dont?: DosAndDontsItem;
    }]
}

function DosAndDonts({ items }: DosAndDontsProps) {
    return (
        <SimpleTable
            headers={["✅ Do", "🚫 Don't"]}
            data={items.map(item => ({
                "✅ Do": item.do ? (
                    <div>
                        {item.do.code}
                        {item.do.explanation}
                    </div>
                ) : null,
                "🚫 Don't": item.dont ? (
                    <div>
                        {item.dont.code}
                        {item.dont.explanation}
                    </div>
                ) : null
            }))}
        />
    );
}

export default DosAndDonts;
