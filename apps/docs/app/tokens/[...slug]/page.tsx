import { allTokens } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";

import { getAiDocAbsolutePath } from "@/app/lib/aiDocHelper.ts";
import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getTokensSlugs } from "@/app/lib/getSlugs";
import { PageHeader } from "@/app/ui/components/pageHeader/PageHeader";
import { BasePageLayout } from "@/app/ui/layout/basePageLayout/BasePageLayout";
import AICallout from "@/components/ai-callout/AICallout";
import Mdx from "@/components/mdx/Mdx.tsx";
import { existsSync } from "node:fs";
import { join } from "node:path";

interface PageProps {
    params: {
        slug: string[];
    };
    searchParams: Record<string, string | string[] | undefined>;
}

function findPageFromSlug(slug: string[]) {
    const [section, type] = slug;

    return allTokens.find(page => page.section === section && page.slug === type);
}

export default function TokenPage({ params: { slug }, searchParams }: PageProps) {
    const designToken = findPageFromSlug(slug);

    if (!designToken) {
        notFound();
    }

    const aiDoc = getAiDocAbsolutePath(["tokens", ...slug]);
    const sectionLinks = getSectionLinks(designToken);
    const exists = searchParams && Object.keys(searchParams).length > 0 ? existsSync(join(process.cwd(), String(searchParams["q"]))) : false;

    return (
        <BasePageLayout sectionsLinks={sectionLinks}>
            <article className="hd-content" key={designToken._id}>
                <PageHeader title={designToken.title} aiDocAbsolutePath={aiDoc} sectionTitle="Tokens" sectionPath="tokens" searchParams={join(process.cwd(), String(searchParams["q"]))} exists={exists} />
                <AICallout />
                <Mdx code={designToken.body.code} />
            </article>
        </BasePageLayout>
    );
}

export function generateStaticParams() {
    return getTokensSlugs();
}

// The sections are Overview, Semantic and Core. we want all title in "Core" to be "Core " + "Color"(the token type) + " Tokens"
export function generateMetadata({ params }: PageProps) {
    const page = findPageFromSlug(params.slug);

    if (!page) {
        return {
            title: null
        };
    }

    const { title, section, description } = page;

    let pageTitle = `${title}`;
    if (section === "core") {
        pageTitle = `Core ${title} Tokens`;
    } else if (section === "semantic") {
        pageTitle = `Semantic ${title} Tokens`;
    }

    const metadata: Record<string, string> = {
        title: pageTitle
    };

    if (description) {
        metadata.description = description;
    }

    return metadata;
}
