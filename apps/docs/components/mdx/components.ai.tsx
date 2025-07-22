// eslint-disable-next-line no-restricted-imports
import Tag from "../tag/Tag.ai";

import ComponentExample from "@/app/ui/components/componentExample/ComponentExample.ai";
import ComposedComponents from "@/app/ui/components/composedComponents/composedComponents.ai";
import MigrateGuide from "@/app/ui/components/migrateGuide/MigrateGuide.ai";
import PropTable from "@/app/ui/components/propTable/PropTable.ai";
import { Callout } from "../callout/Callout.ai";
import CardLink from "../cardLink/cardLink.ai";
import CardLinkList from "../cardLink/cardLinkList.ai";
import PackageInstallation from "../packageInstallation/PackageInstallation.ai";


export const components = {
    Tag: Tag,
    Callout: Callout,
    CodeOnlyExample: ComponentExample,
    Example: ComponentExample,
    ComposedComponents: ComposedComponents,
    PropTable: PropTable,
    MigrateGuide: MigrateGuide,
    PackageInstallation: PackageInstallation,
    CardLink,
    CardLinkList
};

export function isValidComponentName(name: string): boolean {
    return Object.keys(components).includes(name);
}
