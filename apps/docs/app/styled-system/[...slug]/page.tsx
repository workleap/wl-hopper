import { allStyledSystems } from "@/.contentlayer/generated";
import { getAiDocAbsolutePath } from "@/app/lib/aiDocHelper.ts";
import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getStyledSystemSlugs } from "@/app/lib/getSlugs";
import { PageHeader } from "@/app/ui/components/pageHeader/PageHeader";
import { BasePageLayout } from "@/app/ui/layout/basePageLayout/BasePageLayout";
import AICallout from "@/components/ai-callout/AICallout";
import Mdx from "@/components/mdx/Mdx.tsx";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        slug: string[];
    };
}

function findPageFromSlug(slug: string[]) {
    const [section, type] = slug;

    return allStyledSystems.find(page => page.section === section && page.slug === type);
}

export default function StyledSystemPage({ params }: PageProps) {
    const page = findPageFromSlug(params.slug);

    if (!page) {
        notFound();
    }

    const aiDoc = getAiDocAbsolutePath(["styled-system", ...params.slug]);
    const sectionLinks = getSectionLinks(page);
    const { title, body: { code }, _id: id } = page;

    return (
        <BasePageLayout sectionsLinks={sectionLinks}>
            <article className="hd-content" key={id}>
                <PageHeader title={title} aiDocAbsolutePath={aiDoc} sectionTitle="Styled System" />
                <AICallout />
                <Mdx code={code} />
            </article>
        </BasePageLayout>
    );
}

export function generateStaticParams() {
    return getStyledSystemSlugs();
}

export function generateMetadata({ params }: PageProps) {
    const page = findPageFromSlug(params.slug);

    if (page) {
        const metadata: Record<string, string> = {
            title: page.title
        };

        if (page.description) {
            metadata.description = page.description;
        }

        return metadata;
    }

    return {
        title: null
    };
}
