import { allTokens } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";

import { getAiDocAbsolutePath } from "@/app/lib/aiDocHelper.ts";
import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getTokensSlugs } from "@/app/lib/getSlugs";
import { PageHeader } from "@/app/ui/components/pageHeader/PageHeader";
import { BasePageLayout } from "@/app/ui/layout/basePageLayout/BasePageLayout";
import AICallout from "@/components/ai-callout/AICallout";
import Mdx from "@/components/mdx/Mdx.tsx";

interface PageProps {
    params: {
        slug: string[];
    };
}

function findPageFromSlug(slug: string[]) {
    const [section, type] = slug;

    return allTokens.find(page => page.section === section && page.slug === type);
}

export default function TokenPage({ params: { slug } }: PageProps) {
    const designToken = findPageFromSlug(slug);

    if (!designToken) {
        notFound();
    }

    const [section, type] = slug;
    const aiDoc = getAiDocAbsolutePath(["tokens", section, type]);
    const sectionLinks = getSectionLinks(designToken);

    return (
        <BasePageLayout sectionsLinks={sectionLinks}>
            <article className="hd-content" key={designToken._id}>
                <PageHeader title={designToken.title} aiDocAbsolutePath={aiDoc} sectionTitle="Tokens" sectionPath="tokens" />
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
