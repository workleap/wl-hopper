import formattingTitleId from "@/app/lib/formattingTitleId";
import type { MDX } from "contentlayer2/core";

type SectionLink = Pick<MDX, "raw">;

function getSectionLinks(content: {
    body: SectionLink;
}) {
    const regex = /(^#{2,3}\s).*?(?=\n)/gm;
    const body = content.body.raw;
    const matches = body.match(regex);
    let lastLevel2Title = "";

    if (matches) {
        return matches.map(link => {
            const title = link.replace("###", "").replace("##", "").trim();
            const level = link.startsWith("###") ? 3 : 2;

            if (level === 2) {
                lastLevel2Title = title;
            }

            const url = level === 3 && lastLevel2Title
                ? `#${formattingTitleId(lastLevel2Title.toString())}-${formattingTitleId(title.toString())}`
                : `#${formattingTitleId(title.toString())}`;

            return {
                title: title,
                url: url,
                id: title.toLowerCase().replace(/\s+/g, "-"),
                level: level
            };
        });
    }

    return [];
}

export default getSectionLinks;
