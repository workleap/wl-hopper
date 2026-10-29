import { type LocalizedStringFormatter, useLocalizedStringFormatter } from "react-aria";

import resourcesDeDE from "../intl/de-DE.json" with { type: "json" };
import resourcesEnUS from "../intl/en-US.json" with { type: "json" };
import resourcesEsES from "../intl/es-ES.json" with { type: "json" };
import resourcesFrCa from "../intl/fr-CA.json" with { type: "json" };
import resourcesNlNL from "../intl/nl-NL.json" with { type: "json" };

const Resources = {
    "de-DE": resourcesDeDE,
    "en-US": resourcesEnUS,
    "es-ES": resourcesEsES,
    "fr-CA": resourcesFrCa,
    "nl-NL": resourcesNlNL
} satisfies Parameters<typeof useLocalizedStringFormatter>[0];

/**
 * This hook is used to get the localized string formatter.
 * It uses the resources from the component package.
 */
export function useLocalizedString(): LocalizedStringFormatter {
    return useLocalizedStringFormatter(Resources, "@hopper-ui/components");
}
