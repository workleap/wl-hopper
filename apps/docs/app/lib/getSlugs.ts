import {
    allComponents,
    allGettingStarteds,
    allIcons,
    allShadcnExtensions,
    allStyledSystems,
    allTokens
} from "@/.contentlayer/generated";

export function getGettingStartedSlugs() {
    return allGettingStarteds.map(({ section, slug }) => ({
        slug: [section, slug]
    }));
}

export function getStyledSystemSlugs() {
    return allStyledSystems.map(({ section, slug }) => ({
        slug: [section, slug]
    }));
}

export function getShadcnExtensionSlugs() {
    return allShadcnExtensions.map(({ section, slug }) => ({
        slug: [section, slug]
    }));
}

export function getTokensSlugs() {
    return allTokens.map(({ section, slug }) => ({
        slug: [section, slug]
    }));
}

export function getIconsSlugs() {
    return allIcons.map(({ section, slug }) => ({
        slug: [section, slug]
    }));
}

export function getComponentsSlugs() {
    return allComponents.map(({ slug }) => {
        return {
            slug: [slug]
        };
    });
}
