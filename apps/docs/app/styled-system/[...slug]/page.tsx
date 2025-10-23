import { allStyledSystems } from "@/.contentlayer/generated";
import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getStyledSystemSlugs } from "@/app/lib/getSlugs";
import Title from "@/app/ui/components/title/Title";
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

    const sectionLinks = getSectionLinks(page);
    const { title, body: { code }, _id: id } = page;

    return (
        <BasePageLayout sectionsLinks={sectionLinks}>
            <article className="hd-content" key={id}>
                <Title level={1}>{title}</Title>
                <AICallout />
                <Mdx code={code} />
            </article>
        </BasePageLayout>
    );
}


export async function generateStaticParams() {
    return getStyledSystemSlugs();
}

export async function generateMetadata({ params }: PageProps) {
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
