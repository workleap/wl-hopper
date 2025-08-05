import SimpleTable from "../simpleTable/SimpleTable.ai";

import { type DoDontProps, fetchDoDontItems, fetchDoDontTitle, Item, Title } from "./util";

export const DoDont = ({ children }: DoDontProps) => {
    const items = fetchDoDontItems(children);
    const title = fetchDoDontTitle(children);

    return <>
        {title && <div>{title}</div>}
        <SimpleTable headers={["✅ Do", "🚫 Don't"]}
            data={items.map(item => ({
                "✅ Do": item.do,
                "🚫 Don't": item.dont
            }))}
        />
    </>;
};

DoDont.Item = Item;
DoDont.Title = Title;
