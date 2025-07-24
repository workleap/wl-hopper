// eslint-disable-next-line no-restricted-imports
import BreakpointTable from "@/app/ui/components/breakpointTable/BreakpointTable.ai";
import ComponentExample from "@/app/ui/components/componentExample/ComponentExample.ai";
import ComposedComponents from "@/app/ui/components/composedComponents/composedComponents.ai";
import MigrateGuide from "@/app/ui/components/migrateGuide/MigrateGuide.ai";
import Overview from "@/app/ui/components/overview/Overview.ai";
import { PropsReferenceTable } from "@/app/ui/components/propsReferenceTable/PropsReferenceTable.ai";
import PropTable from "@/app/ui/components/propTable/PropTable.ai";
import SimpleTable from "@/app/ui/components/simpleTable/SimpleTable.ai";
import Switcher from "@/app/ui/icons/switcher/Switcher.ai";
import IconSpecTable from "@/app/ui/tokens/table/IconSpecTable.ai";
import TokenTable from "@/app/ui/tokens/table/TokenTable.ai";
import TypographyTable from "@/app/ui/tokens/table/TypographyTable.ai";
import TypographyVariantTable from "@/app/ui/tokens/table/TypographyVariantTable.ai";
import TableSection from "@/app/ui/tokens/tableSection/TableSection.ai";
import { Callout } from "../callout/Callout.ai";
import CardLink from "../cardLink/cardLink.ai";
import CardLinkList from "../cardLink/cardLinkList.ai";
import Expand from "../expand/Expand.ai";
import Footnote from "../footnote/Footnote.ai";
import PackageInstallation from "../packageInstallation/PackageInstallation.ai";
import Tag from "../tag/Tag.ai";

export const components = {
    Overview: Overview,
    Tag: Tag,
    Callout: Callout,
    CodeOnlyExample: ComponentExample,
    Example: ComponentExample,
    ComposedComponents: ComposedComponents,
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
    Footnote: Footnote,
    BreakpointTable: BreakpointTable,
    PropsReferenceTable: PropsReferenceTable,
    SimpleTable: SimpleTable,
    Expand: Expand,

    FeatureFlag: () => undefined,
    Figure: () => undefined,
    MotionPreview: () => undefined,
    Image: () => undefined,
    JsIcon: () => undefined,

    ReactIcon: () => undefined,
    ReactIconLibIcon: () => undefined,
    ReactRichIconLibIcon: () => undefined,
    SvgIconLibIcon: () => undefined,
    SvgRichIconLibIcon: () => undefined,


    Card: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
    ),

    br: () => <></>,
    hr: () => <></>,
    table: (children: React.ReactNode) => <table>{children}</table>,
    thead: (children: React.ReactNode) => <thead>{children}</thead>,
    tbody: (children: React.ReactNode) => <tbody>{children}</tbody>,
    th: (children: React.ReactNode) => <th>{children}</th>,
    td: (children: React.ReactNode) => <td>{children}</td>,
    tr: (children: React.ReactNode) => <tr>{children}</tr>


};

export function isValidComponentName(name: string): boolean {
    return Object.keys(components).includes(name);
}
