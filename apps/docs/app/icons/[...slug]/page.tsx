import { allIcons } from "@/.contentlayer/generated";
import { getAiDocAbsolutePath } from "@/app/lib/aiDocHelper.ts";
import getSectionLinks from "@/app/lib/getSectionLinks.ts";
import { getIconsSlugs } from "@/app/lib/getSlugs";
import { PageHeader } from "@/app/ui/components/pageHeader/PageHeader";
import { BasePageLayout } from "@/app/ui/layout/basePageLayout/BasePageLayout";
import AICallout from "@/components/ai-callout/AICallout";
import Mdx from "@/components/mdx/Mdx.tsx";
import { env } from "@/context/env/env";
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
    const data = {
        cwd: process.cwd(),
        path: join(env.isNetlifyFunction ? "/var/task/apps/docs/" : process.cwd(), "public"),
        env: process.env,
        exists: existsSync(join(env.isNetlifyFunction ? "/var/task/apps/docs/" : process.cwd(), "public", searchParams["q"] as string || "")),
        searchParams
    };

    return (
        <BasePageLayout sectionsLinks={sectionLinks}>
            <article className="hd-content" key={icons._id}>
                <PageHeader title={icons.title} aiDocAbsolutePath={aiDoc} sectionTitle="Icons" sectionPath="icons" data={data} />
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
