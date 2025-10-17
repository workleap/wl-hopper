import AI from "@/app/ui/components/ai/AI.ai";
import BreakpointTable from "@/app/ui/components/breakpointTable/BreakpointTable.ai";
import Callout from "@/app/ui/components/callout/Callout.ai";
import CardLink from "@/app/ui/components/cardLink/cardLink.ai";
import CardLinkList from "@/app/ui/components/cardLink/cardLinkList.ai";
import ComponentExample from "@/app/ui/components/componentExample/ComponentExample.ai";
import ComposedComponents from "@/app/ui/components/composedComponents/composedComponents.ai";
import DosAndDonts from "@/app/ui/components/dosAndDonts/DosAndDonts.ai";
import Expand from "@/app/ui/components/expand/Expand.ai";
import MigrateGuide from "@/app/ui/components/migrateGuide/MigrateGuide.ai";
import Overview from "@/app/ui/components/overview/Overview.ai";
import PackageInstallation from "@/app/ui/components/packageInstallation/PackageInstallation.ai";
import PropsReferenceTable from "@/app/ui/components/propsReferenceTable/PropsReferenceTable.ai";
import PropTable from "@/app/ui/components/propTable/PropTable.ai";
import SimpleTable from "@/app/ui/components/simpleTable/SimpleTable.ai";
import Tag from "@/app/ui/components/tag/Tag.ai";
import Switcher from "@/app/ui/icons/switcher/Switcher.ai";
import IconSpecTable from "@/app/ui/tokens/table/IconSpecTable.ai";
import TokenTable from "@/app/ui/tokens/table/TokenTable.ai";
import TypographyTable from "@/app/ui/tokens/table/TypographyTable.ai";
import TypographyVariantTable from "@/app/ui/tokens/table/TypographyVariantTable.ai";
import TableSection from "@/app/ui/tokens/tableSection/TableSection.ai";
import type { ReactNode } from "react";
import Link from "../link/Link.ai";

export const components = {
    Overview: Overview,
    Tag: Tag,
    Callout: Callout,
    CodeOnlyExample: ComponentExample,
    Example: ComponentExample,
    ComposedComponents: ComposedComponents,
    DosAndDonts: DosAndDonts,
    PropTable: PropTable,
    MigrateGuide: MigrateGuide,
    PackageInstallation: PackageInstallation,
    CardLink,
    CardLinkList,
    Switcher: Switcher,
    IconSpecTable: IconSpecTable,
    TokenTable: TokenTable,
    TypographyTable: TypographyTable,
    TypographyVariantTable: TypographyVariantTable,
    TableSection: TableSection,
    BreakpointTable: BreakpointTable,
    PropsReferenceTable: PropsReferenceTable,
    SimpleTable: SimpleTable,
    Expand: Expand,
    Link: Link,
    AI: AI,

    Footnote: () => <div />,
    Figure: () => <div />,
    MotionPreview: () => <div />,
    Image: () => <div />,
    JsIcon: () => <div />,

    ReactIcon: () => <div />,
    ReactIconLibIcon: () => <div />,
    ReactRichIconLibIcon: () => <div />,
    SvgIconLibIcon: () => <div />,
    SvgRichIconLibIcon: () => <div />,

    Card: ({ children }: { children: ReactNode }) => (
        <div>{children}</div>
    )
} as const;

export function isValidComponentName(name: string): boolean {
    return Object.keys(components).includes(name);
}
