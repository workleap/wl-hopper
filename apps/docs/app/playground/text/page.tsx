import { allPages } from "@/.contentlayer/generated";
import getSectionLinks from "@/app/lib/getSectionLinks";
import Aside from "@/app/ui/layout/aside/Aside.tsx";
import Mdx from "@/components/mdx/Mdx";
import { notFound } from "next/navigation";

export default function HeadingsLinkPage() {
    const page = allPages.find(playgroundPage => playgroundPage._id === "pages/playground-text-flow.mdx");

    if (!page) {
        notFound();
    }

    const sectionLinks = getSectionLinks(page);

    return (
        <div className="hd-wrapper hd-flex">
            <div className="hd-container">
                <Aside title="On this page" links={sectionLinks} />
                <main>
                    <article className="hd-content" key={page._id}>
                        {page.body && <Mdx code={page.body.code} />}
                    </article>
                </main>
            </div>
        </div>
    );
}
