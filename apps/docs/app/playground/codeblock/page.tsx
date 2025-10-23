import { allPages } from "@/.contentlayer/generated";
import Mdx from "@/components/mdx/Mdx";

export default function CodeBlockPage() {
    return <main>
        {allPages
            .filter(page => page._id === "pages/playground-codeblock.mdx")
            .map(page => (
                <div key={page._id} className="hd-wrapper hd-flex">
                    <article className="hd-content" key={page._id}>
                        {page.body && <Mdx code={page.body.code} />}
                    </article>
                </div>
            ))}
    </main>;
}
