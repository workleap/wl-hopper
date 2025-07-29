import { formatCode } from "@/app/lib/formatingCode";
import { HighlightCode } from "@/components/highlightCode";
import type { PropsWithChildren, ReactNode } from "react";
import SimpleTable from "../simpleTable/SimpleTable";
import "./DoDont.css";
import { fetchDoDontItems, fetchDoDontTitle } from "./DoDont.utils";

interface DoDontProps {
    children: ReactNode;
}

function DoDont({ children }: DoDontProps) {
    const items = fetchDoDontItems(children);
    const title = fetchDoDontTitle(children);

    return <div className="hd-doDont">
        {title && <div>{title}</div>}
        <SimpleTable
            headers={["✅ Do", "🚫 Don't"]}
            data={items.map(item => ({
                "✅ Do": item.do,
                "🚫 Don't": item.dont
            }))}
        />
    </div>;
}

function Item({ children }: PropsWithChildren) { return children; }
function Title({ children }: PropsWithChildren) { return children; }

function Do({ children }: PropsWithChildren) { return children; }
function Dont({ children }: PropsWithChildren) { return children; }

interface ExampleProps {
    code: string;
}

async function Example({ code }: ExampleProps) {
    const formattedCode = await formatCode(code, "tsx");

    return <HighlightCode code={formattedCode} />;
}

DoDont.Item = Item;
DoDont.Title = Title;

DoDont.Do = Do;
DoDont.Dont = Dont;
DoDont.Example = Example;

export default DoDont;
