import dynamic from "next/dynamic";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

import ComposedComponents from "@/app/ui/components/composedComponents/composedComponents.tsx";
import Overview from "@/app/ui/components/overview/Overview.tsx";
import { IconTable } from "@/app/ui/icons/iconTable/IconTable.tsx";
import Switcher from "@/app/ui/icons/switcher/Switcher.tsx";
import IconSpecTable from "@/app/ui/tokens/table/IconSpecTable.tsx";
import TokenTable from "@/app/ui/tokens/table/TokenTable.tsx";
import TypographyTable from "@/app/ui/tokens/table/TypographyTable.tsx";
import TypographyVariantTable from "@/app/ui/tokens/table/TypographyVariantTable.tsx";
import TableSection from "@/app/ui/tokens/tableSection/TableSection.tsx";
import { Callout } from "@/components/callout/Callout.tsx";
import Card from "@/components/card/Card.tsx";
import CardLink from "@/components/cardLink/cardLink.tsx";
import CardLinkList from "@/components/cardLink/cardLinkList.tsx";
import InlineCode from "@/components/code/InlineCode.tsx";
import Expand from "@/components/expand/Expand.tsx";
import Figure from "@/components/figure/Figure.tsx";
import Footnote from "@/components/footnote/Footnote.tsx";
import NextImage from "@/components/image/Image.tsx";
import Link from "@/components/link/Link.tsx";
import MotionPreview from "@/components/motionPreview/MotionPreview.tsx";
import PackageInstallation, {
    type PackageInstallationProps
} from "@/components/packageInstallation/PackageInstallation.tsx";
import Pre from "@/components/pre/Pre.tsx";
import Tabs from "@/components/tabs/Tabs.tsx";
import Tag from "@/components/tag/Tag.tsx";
import Title from "@/components/title/Title.tsx";

import BreakpointTable from "@/app/ui/components/breakpointTable/BreakpointTable";
import { ComponentCodeWrapper } from "@/app/ui/components/componentExample/ComponentCodeWrapper.tsx";
import type { ComponentExampleProps } from "@/app/ui/components/componentExample/ComponentExample.tsx";
import ComponentPreview from "@/app/ui/components/componentExample/ComponentPreview.tsx";
import type { MigrateGuideProps } from "@/app/ui/components/migrateGuide/MigrateGuide.tsx";
import { PropsReferenceTable } from "@/app/ui/components/propsReferenceTable/PropsReferenceTable";
import type { PropTableProps } from "@/app/ui/components/propTable/PropTable.tsx";
import SimpleTable from "@/app/ui/components/simpleTable/SimpleTable";

const MigrateGuide = dynamic(() => import("@/app/ui/components/migrateGuide/MigrateGuide.tsx"));
const PropTable = dynamic(() => import("@/app/ui/components/propTable/PropTable.tsx"));
const ComponentExample = dynamic(() => import("@/app/ui/components/componentExample/ComponentExample.tsx"));
const FeatureFlag = dynamic(() => import("@/components/featureFlag/FeatureFlag.tsx"));

type HeadingProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

let h2Title = "";

export const components = {
    Card,
    CardLink,
    CardLinkList,
    code: InlineCode,
    Callout: Callout,
    Expand,
    Figure,
    Image: NextImage,
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
    FeatureFlag: FeatureFlag,
    PackageInstallation: (props: PackageInstallationProps) => {
        return <PackageInstallation {...props} />;
    },
    Example: (props: ComponentExampleProps) => {
        const { src } = props;

        return <ComponentExample
            {...props}
            type="both"
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
