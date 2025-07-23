import { readdirSync, readFileSync } from "fs";
import { select, selectAll } from "hast-util-select";
import path from "path";
import parse from "rehype-parse";
import { unified } from "unified";
import { fileURLToPath } from "url";

import { RichAllowedIconFillColors, RichIconSizes, RichIconsSourceDirectory } from "../../scripts/constants.ts";

const iconsSrcPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), `../../${RichIconsSourceDirectory}`);

const allIconsContent = RichIconSizes.flatMap(size => {
    return readdirSync(`${iconsSrcPath}/${size}px`, { recursive: true, withFileTypes: true })
        .filter(file => file.isFile() && file.name.endsWith(".svg"))
        .map(file => {
            return {
                name: file.name,
                size,
                content: readFileSync(path.resolve(file.path, file.name), "utf8")
            };
        });
});

const dataGroupedBySize = allIconsContent.reduce((acc, icon) => {
    if (!acc[icon.size]) {
        acc[icon.size] = [icon.name];
    } else {
        acc[icon.size].push(icon.name);
    }

    return acc;
}, {} as Record<typeof RichIconSizes[number], string[]>);

describe("SVGs", () => {
    it("should not have the word icon in it's name", () => {
        allIconsContent.forEach(icon => {
            expect(icon.name).not.toMatch(/icon/i);
        });
    });

    it("should have the same amount of icons in each folder", () => {
        const amountOfIcons = Object.values(dataGroupedBySize).map(group => group.length);
        const unique = [...new Set(amountOfIcons)];

        expect(unique.length).toStrictEqual(1);
    });

    it("should have the same name in all folder", () => {
        expect(Object.values(dataGroupedBySize).length).toBeGreaterThan(1);

        Object.values(dataGroupedBySize)
            .slice(1)
            .forEach(group => {
                const firstGroup = Object.values(dataGroupedBySize)[0].map(icon => icon);
                const otherGroup = group.map(icon => icon);

                expect(otherGroup).toStrictEqual(firstGroup);
            });
    });

    it("should have the same amount of icons in metadata folder as in each size folder", () => {
        const metadataPath = path.resolve(iconsSrcPath, "metadata");
        const metadataFiles = readdirSync(metadataPath).filter(file => file.endsWith(".yml"));

        // Check each icon size folder against metadata
        RichIconSizes.forEach(size => {
            const sizeDir = path.resolve(iconsSrcPath, `${size}px`);
            const svgFiles = readdirSync(sizeDir).filter(file => file.endsWith(".svg"));

            expect(svgFiles.length).toStrictEqual(metadataFiles.length);
        });
    });

    it("should have the same icon names in metadata folder as in each size folder", () => {
        const metadataPath = path.resolve(iconsSrcPath, "metadata");
        const metadataFiles = readdirSync(metadataPath)
            .filter(file => file.endsWith(".yml"))
            .map(file => file.replace(".yml", ""))
            .sort();

        // Check each icon size folder against metadata
        RichIconSizes.forEach(size => {
            const sizeDir = path.resolve(iconsSrcPath, `${size}px`);
            const svgFiles = readdirSync(sizeDir)
                .filter(file => file.endsWith(".svg"))
                .map(file => file.replace(".svg", ""))
                .sort();

            expect(svgFiles).toStrictEqual(metadataFiles);
        });
    });
});

allIconsContent.forEach(icon => {
    describe(`SVG Contents: ${icon.name} ${icon.size}px`, () => {
        const expectedSize = icon.size.toString();
        const expectedViewbox = `0 0 ${expectedSize} ${expectedSize}`;
        const iconAst = unified().use(parse, { fragment: true, space: "svg" }).parse(icon.content);

        it("should only have the expected root attributes", () => {
            const properties = Object.keys(
                select(":root", iconAst)?.properties ?? {}
            ).sort();
            expect(properties).toStrictEqual(["viewBox", "xmlns", "fill", "width", "height"].sort());
        });

        it(`should have a viewbox of ${expectedViewbox}`, () => {
            const viewBox = select(":root", iconAst)?.properties.viewBox;
            expect(viewBox).toStrictEqual(expectedViewbox);
        });

        it(`should have a width and height of ${expectedSize}`, () => {
            const properties = select(":root", iconAst)?.properties;
            expect(properties).not.toBeUndefined();

            const { width, height } = properties!;
            expect(width).toStrictEqual(expectedSize);
            expect(height).toStrictEqual(expectedSize);
        });

        it("should have an xml namespace", () => {
            const xmlns = select(":root", iconAst)?.properties.xmlns;
            expect(xmlns).toBe("http://www.w3.org/2000/svg");
        });

        it("should have no groups (<g>) or masks (<mask>) or clip path(<clipPath>)", () => {
            const groupNodes = selectAll("g, mask, clipPath", iconAst);

            expect(nodeSources(groupNodes, icon.content)).toStrictEqual([]);
        });

        it("should not have <path>s, <polygon>s, <circle>s and <rect>s with a stroke", () => {
            const nodesWithUndefinedFill = selectAll(
                "path[stroke], circle[stroke], polygon[stroke], rect[stroke]",
                iconAst
            );

            expect(nodeSources(nodesWithUndefinedFill, icon.content)).toStrictEqual(
                []
            );
        });

        const expectedFillColors = [...RichAllowedIconFillColors, "none"];

        const expectedFillsString = expectedFillColors.join(",");

        it(`should have no nodes that use fill colors other than [${expectedFillsString}]`, () => {
            const nodesWithInvalidFill = selectAll("[fill]", iconAst).filter(
                node => {
                    return node.properties.fill && !expectedFillColors.includes(node.properties.fill.toString());
                }
            );

            expect(nodeSources(nodesWithInvalidFill, icon.content)).toStrictEqual(
                []
            );
        });
    });
});

function nodeSources(nodes: ReturnType<typeof selectAll>, iconSource: string) {
    return nodes.map(node =>
        iconSource.substring(
            node.position!.start.offset!,
            node.position!.end.offset! - node.position!.start.offset!
        )
    );
}
