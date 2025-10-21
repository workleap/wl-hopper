interface Raw {
    flattenedPath: string;
    sourceFileDir?: string;
}

export interface Data {
    _id: string;
    title: string;
    menuTitle?: string;
    order?: number | undefined;
    status?: string | undefined;
    section?: string;
    isNewUntil?: Date;
    _raw: Raw;
}

export interface LinkItem {
    id: string;
    title: string;
    order?: number;
    status?: string;
    path: string;
    isNew?: boolean;
}

export interface Section {
    id: string;
    title: string;
    linkItems: LinkItem[];
}

function capitalizeWords(str: string) {
    return str.replace(/-/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}

function sortBy<T>(a: T, b: T, accessor: (item: T) => number | undefined) {
    const aValue = accessor(a) ?? -1;
    const bValue = accessor(b) ?? -1;

    if (aValue === -1 && bValue === -1) {
        return 0;
    }
    if (aValue === -1) {
        return 1;
    }
    if (bValue === -1) {
        return -1;
    }

    return aValue - bValue;
}

interface GetPageLinksOptions<T> {
    order?: string[];
    pathAccessor?: (item: T) => string;
    sectionTitles?: Record<string, string>;
}

function getPageLinks<T extends Data>(items: T[], opt?: GetPageLinksOptions<T>) {
    if (!items) {
        return [];
    }

    const { order, pathAccessor, sectionTitles } = {
        order: [],
        pathAccessor: item => item._raw.flattenedPath, // Default path accessor
        sectionTitles: {},
        ...opt
    } satisfies GetPageLinksOptions<T>;

    const sections = items.reduce<Record<string, Section>>((acc, item) => {
        const sectionId = item.section ?? "";

        if (!acc[sectionId]) {
            acc[sectionId] = {
                id: sectionId,
                title: sectionTitles[sectionId] ?? capitalizeWords(sectionId),
                linkItems: []
            };
        }
        acc[sectionId].linkItems.push({
            id: item._id,
            title: item.menuTitle ?? item.title,
            order: item.order,
            status: item.status,
            path: pathAccessor(item),
            isNew: item.isNewUntil ? new Date(item.isNewUntil) >= new Date() : false
        });

        return acc;
    }, {});

    // Create a section array sorted by the order of the sections
    const sortedSections = Object.values(sections)
        .sort((a, b) => sortBy(a, b, section => order.length > 0 ? order.indexOf(section.id) : 0));

    // Sort the link items within each section
    sortedSections.forEach(section => {
        section.linkItems.sort((a, b) => sortBy(a, b, item => item.order));
    });

    return sortedSections;
}

export default getPageLinks;
