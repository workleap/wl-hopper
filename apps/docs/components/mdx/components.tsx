import dynamic from "next/dynamic";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

import InlineCode from "@/components/code/InlineCode.tsx";
import Link from "@/components/link/Link.tsx";

import AI from "@/app/ui/components/ai/AI";
import BreakpointTable from "@/app/ui/components/breakpointTable/BreakpointTable";
import Callout from "@/app/ui/components/callout/Callout";
import Card from "@/app/ui/components/card/Card";
import CardLink from "@/app/ui/components/cardLink/cardLink.tsx";
import CardLinkList from "@/app/ui/components/cardLink/cardLinkList.tsx";
import ComponentCodeWrapper from "@/app/ui/components/componentExample/ComponentCodeWrapper.tsx";
import type { ComponentExampleProps } from "@/app/ui/components/componentExample/ComponentExample.tsx";
import ComponentPreview from "@/app/ui/components/componentExample/ComponentPreview.tsx";
import ComposedComponents from "@/app/ui/components/composedComponents/composedComponents.tsx";
import DosAndDonts from "@/app/ui/components/dosAndDonts/DosAndDonts";
import Expand from "@/app/ui/components/expand/Expand";
import Figure from "@/app/ui/components/figure/Figure";
import Footnote from "@/app/ui/components/footnote/Footnote";
import NextImage from "@/app/ui/components/image/Image";
import FigmaAuthentication from "@/app/ui/components/mcpConfiguration/FigmaAuthentication";
import McpConfiguration from "@/app/ui/components/mcpConfiguration/McpConfiguration";
import McpServersVerification from "@/app/ui/components/mcpConfiguration/McpServersVerification";
import type { MigrateGuideProps } from "@/app/ui/components/migrateGuide/MigrateGuide.tsx";
import MotionPreview from "@/app/ui/components/motionPreview/MotionPreview";
import Overview from "@/app/ui/components/overview/Overview.tsx";
import PackageInstallation, {
    type PackageInstallationProps
} from "@/app/ui/components/packageInstallation/PackageInstallation";
import Pre from "@/app/ui/components/pre/Pre";
import PromptSnippet from "@/app/ui/components/PromptSnippet/PromptSnippet";
import PropsReferenceTable from "@/app/ui/components/propsReferenceTable/PropsReferenceTable";
import type { PropTableProps } from "@/app/ui/components/propTable/PropTable.tsx";
import SimpleTable from "@/app/ui/components/simpleTable/SimpleTable";
import Tabs from "@/app/ui/components/tabs/Tabs";
import Tag from "@/app/ui/components/tag/Tag";
import Title from "@/app/ui/components/title/Title";
import IconTable from "@/app/ui/icons/iconTable/IconTable.tsx";
import Switcher from "@/app/ui/icons/switcher/Switcher.tsx";
import IconSpecTable from "@/app/ui/tokens/table/IconSpecTable.tsx";
import TokenTable from "@/app/ui/tokens/table/TokenTable.tsx";
import TypographyTable from "@/app/ui/tokens/table/TypographyTable.tsx";
import TypographyVariantTable from "@/app/ui/tokens/table/TypographyVariantTable.tsx";
import TableSection from "@/app/ui/tokens/tableSection/TableSection.tsx";


const MigrateGuide = dynamic(() => import("@/app/ui/components/migrateGuide/MigrateGuide.tsx"));
const PropTable = dynamic(() => import("@/app/ui/components/propTable/PropTable.tsx"));
const ComponentExample = dynamic(() => import("@/app/ui/components/componentExample/ComponentExample.tsx"));

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

let h2Title = "";

export const components = {
    AI,
    Card,
    CardLink,
    CardLinkList,
    code: InlineCode,
    Callout: Callout,
    DosAndDonts,
    Expand,
    Figure,
    FigmaAuthentication,
    Image: NextImage,
    McpConfiguration,
    McpServersVerification,
    pre: Pre,
    Tag,
    MotionPreview: MotionPreview,
    BreakpointTable: BreakpointTable,
    Footnote: Footnote,
    TokenTable: TokenTable,
    PropsReferenceTable: PropsReferenceTable,
    TypographyTable: TypographyTable,
    TypographyVariantTable: TypographyVariantTable,
    IconTable: IconTable,
    IconSpecTable: IconSpecTable,
    Overview: Overview,
    SimpleTable: SimpleTable,
    Tabs: Tabs,
    ComposedComponents: ComposedComponents,
    TableSection: TableSection,
    Link: Link,
    Switcher: Switcher,
    PackageInstallation: (props: PackageInstallationProps) => {
        return <PackageInstallation {...props} />;
    },
    PromptSnippet: PromptSnippet,
    Example: (props: ComponentExampleProps) => {
        const { src, type = "both" } = props;

        return <ComponentExample
            {...props}
            type={type}
            code={<ComponentCodeWrapper src={src} />}
            preview={<ComponentPreview src={src} />}
        />;
    },
    CodeOnlyExample: (props: ComponentExampleProps) => {
        const { src } = props;

        return <ComponentExample
            {...props}
            type="code"
            isOpen
            code={<ComponentCodeWrapper src={src} />}
        />;
    },
    MigrateGuide: (props: MigrateGuideProps) => {
        return <MigrateGuide {...props} />;
    },
    PropTable: (props: PropTableProps) => {
        return <PropTable {...props} />;
    },
    h1: (props: HeadingProps) => {
        return <Title {...props} level={1} interactive />;
    },
    h2: (props: HeadingProps) => {
        h2Title = props.children as string;

        return <Title {...props} interactive level={2} />;
    },
    h3: (props: HeadingProps) => {
        return <Title {...props} parentHeading={h2Title} interactive level={3} />;
    },
    h4: (props: HeadingProps) => {
        return <Title {...props} interactive level={4} />;
    },
    h5: (props: HeadingProps) => {
        return <Title {...props} interactive level={5} />;
    }
};
