import { Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    const items = [
        {
            id: "red-eye-tree",
            header: "Red-Eyed Tree Frog",
            content: "The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest."
        },
        {
            id: "poison-dart",
            header: "Poison Dart Frog",
            content: "The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters."
        },
        {
            id: "goliath",
            header: "Goliath Frog",
            content: "The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa."
        }
    ];

    return (
        <Tabs aria-label="Frogs">
            <TabList>
                {items.map(({ id, header }) => (
                    <Tab id={id}>{header}</Tab>
                ))}
            </TabList>
            {items.map(({ id, content }) => (
                <TabPanel id={id} padding="inset-md">
                    {content}
                </TabPanel>
            ))}
        </Tabs>
    );
}
