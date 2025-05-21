import type { BadgeVariant } from "../src/Badge.tsx";

// TODO: Remove this when Orbiter is not used anymore
type OrbiterVariant = "informative" | "warning" | "positive" | "negative";

function isOrbiterVariant(variant: BadgeVariant | OrbiterVariant): variant is OrbiterVariant {
    return ["informative", "warning", "positive", "negative"].includes(variant);
}

export function mapOrbiterToHopperVariants(variant: BadgeVariant | OrbiterVariant): BadgeVariant {
    if (isOrbiterVariant(variant)) {
        return "primary";
    }

    return variant;
}
