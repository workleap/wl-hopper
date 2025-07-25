import { Article, H1, HtmlFooter, LI, Paragraph, UL } from "@hopper-ui/components";

export default function Example() {
    return (
        <Article>
            <H1>What does an aerospace engineer do?</H1>
            <UL>
                <LI>Research and development</LI>
                <LI>Testing</LI>
                <LI>Production and maintenance</LI>
            </UL>
            <HtmlFooter color="neutral-weak">
                <Paragraph>© 2021 Orbiter</Paragraph>
            </HtmlFooter>
        </Article>
    );
}
