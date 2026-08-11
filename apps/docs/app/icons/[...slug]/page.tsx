import { allIcons } from "@/.contentlayer/generated";
import { getAiDocAbsolutePath } from "@/app/lib/aiDocHelper.ts";
import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getIconsSlugs } from "@/app/lib/getSlugs";
import { PageHeader } from "@/app/ui/components/pageHeader/PageHeader";
import { BasePageLayout } from "@/app/ui/layout/basePageLayout/BasePageLayout";
import AICallout from "@/components/ai-callout/AICallout";
import Mdx from "@/components/mdx/Mdx.tsx";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string[];
    }>;
}

function findPageFromSlug(slug: string[]) {
    const [section, type] = slug;

    return allIcons.find(page => page.section === section && page.slug === type);
}

export default async function IconPage({ params }: PageProps) {
    const { slug } = await params;
    const icons = findPageFromSlug(slug);

    if (!icons) {
        notFound();
    }

    const aiDoc = getAiDocAbsolutePath(["icons", ...slug]);
    const sectionLinks = getSectionLinks(icons);

    return (
        <BasePageLayout sectionsLinks={sectionLinks}>
            <article className="hd-content" key={icons._id}>
                <PageHeader title={icons.title} aiDocAbsolutePath={aiDoc} sectionTitle="Icons" sectionPath="icons" />
                <AICallout />
                <Mdx code={icons.body.code} />
            </article>
        </BasePageLayout>
    );
}

export function generateStaticParams() {
    return getIconsSlugs();
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const page = findPageFromSlug(slug);

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
