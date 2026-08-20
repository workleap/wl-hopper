import { type LocalizedStringFormatter, useLocalizedStringFormatter } from "react-aria";

import resourcesEnUS from "../intl/en-US.json" with { type: "json" };
import resourcesFrCa from "../intl/fr-CA.json" with { type: "json" };

const Resources = {
    "en-US": resourcesEnUS,
    "fr-CA": resourcesFrCa
} satisfies Parameters<typeof useLocalizedStringFormatter>[0];

/**
 * This hook is used to get the localized string formatter.
 * It uses the resources from the component package.
 */
export function useLocalizedString(): LocalizedStringFormatter {
    return useLocalizedStringFormatter(Resources, "@hopper-ui/components");
}
