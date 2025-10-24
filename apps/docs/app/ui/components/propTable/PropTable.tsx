import { Fragment } from "react";

import { capitalize } from "@/app/lib/capitalize.ts";
import { getComponentProps } from "@/app/lib/getComponentProps.ts";
import { MDXRemote } from "next-mdx-remote/rsc";

import Title from "@/app/ui/components/title/Title.tsx";
import Collapsible from "@/components/collapsible/Collapsible.tsx";
import { highlightCode, HighlightCode } from "@/components/highlightCode";

import { PropTableCodeExample } from "./PropTableCodeExample.tsx";
import type { Item } from "./PropTableRender.tsx";
import { PropTableRender } from "./PropTableRender.tsx";

import "./propTable.css";

export interface PropTableProps {
    component: string;
}

interface PropTableItem extends Item {
    name: string;
    type: string;
    description: string;
    required: boolean;
}

export interface Groups {
    [group: string]: PropTableItem[];
}

const linkRegex = /@see {@link\s+(.*?)}/;
const exampleRegex = /@example\s+([\s\S]*)/;

function replaceSeeLinkWithMarkdown(description: string) {
    const replacementFormat = "@see [Link]($1)";

    return description.replace(linkRegex, replacementFormat);
}

function replaceExampleWithMarkdown(description: string) {
    const placeholder = "PLACEHOLDER_FOR_CODE_EXAMPLE";

    return description.replace(exampleRegex, (_, content) => {
        return `${placeholder} ${content} `;
    });
}

const renderDescription = async (description: string) => {
    const parts = description.split("PLACEHOLDER_FOR_CODE_EXAMPLE");
    const [content, example] = parts;

    const formatExample = await highlightCode(`
\`\`\`tsx showLineNumbers
${example}
\`\`\`
`);

    return (
        <>
            <MDXRemote source={content} />
            <PropTableCodeExample>
                <HighlightCode code={formatExample} />
            </PropTableCodeExample>
        </>
    );
};

const formatDescription = async (description: string) => {
    const linkMatch = linkRegex.exec(description);
    const exampleMatch = exampleRegex.exec(description);

    if (linkMatch) {
        const replacedDescription = replaceSeeLinkWithMarkdown(description);

        return <MDXRemote source={replacedDescription} />;
    }

    if (exampleMatch) {
        const replacedDescription = replaceExampleWithMarkdown(description);

        return await renderDescription(replacedDescription);
    }

    return <MDXRemote source={description} />;
};

const formatGroup = async (groups: Groups[]) => {
    return Promise.all(groups.map(async group => {
        const [key] = Object.keys(group);

        const items = await Promise.all(group[key].map(item => formatDescription(item.description)));

        return {
            [key]: items.map((description, index) => ({
                ...group[key][index],
                name: <span>{group[key][index].name}</span>,
                type: <HighlightCode code={group[key][index].type} variant="tiny" />,
                defaultValue: group[key][index].defaultValue.replace(/"/g, ""),
                description,
                required: group[key][index].required
            }))
        };
    }));
};

export default async function PropTable({ component }: PropTableProps) {
    const { groups } = await getComponentProps(component);
    const formattedGroups = await formatGroup(groups);

    return (
        <>
            {formattedGroups.map(group => {
                const [key] = Object.keys(group);
                const isEmpty = group[key].length === 0;

                if (isEmpty) {
                    return null;
                }

                return (
                    <Fragment key={key}>
                        {key === "default" ?
                            <PropTableRender items={group[key]} /> : (
                                <Collapsible
                                    className="hd-props-table__section"
                                    key={key}
                                    title={(
                                        <Title level={4}>
                                            {capitalize(key)}
                                        </Title>
                                    )}
                                >
                                    <PropTableRender items={group[key]} />
                                </Collapsible>
                            )}
                    </Fragment>
                );
            })}
        </>
    );
}

