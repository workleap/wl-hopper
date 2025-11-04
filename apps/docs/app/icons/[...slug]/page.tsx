import { allIcons } from "@/.contentlayer/generated";
import { getAiDocAbsolutePath } from "@/app/lib/aiDocHelper.ts";
import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getIconsSlugs } from "@/app/lib/getSlugs";
import { PageHeader } from "@/app/ui/components/pageHeader/PageHeader";
import { BasePageLayout } from "@/app/ui/layout/basePageLayout/BasePageLayout";
import AICallout from "@/components/ai-callout/AICallout";
import Mdx from "@/components/mdx/Mdx.tsx";
import { notFound } from "next/navigation";
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

    return allIcons.find(page => page.section === section && page.slug === type);
}

export default async function IconPage({ params: { slug }, searchParams }: PageProps) {
    const icons = findPageFromSlug(slug);

    if (!icons) {
        notFound();
    }

    const aiDoc = await getAiDocAbsolutePath(["icons", ...slug]);
    const sectionLinks = getSectionLinks(icons);
    const exists = searchParams && Object.keys(searchParams).length > 0 ? existsSync(join(process.cwd(), String(searchParams["q"]))) : false;
    const q = join(process.cwd(), String(searchParams["q"]));

    return (
        <BasePageLayout sectionsLinks={sectionLinks}>
            <article className="hd-content" key={icons._id}>
                <PageHeader title={icons.title} aiDocAbsolutePath={aiDoc} sectionTitle="Icons" sectionPath="icons" searchParams={q} exists={exists} />
                <AICallout />
                <Mdx code={icons.body.code} />
            </article>
        </BasePageLayout>
    );
}

export function generateStaticParams() {
    return getIconsSlugs();
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
