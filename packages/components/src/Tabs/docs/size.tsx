import { Stack, Tab, TabList, TabPanel, Tabs } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-md">
            <Tabs aria-label="Frogs">
                <TabList>
                    <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                    <Tab id="poison-dart">Poison Dart Frog</Tab>
                    <Tab id="goliath">Goliath Frog</Tab>
                </TabList>
                <TabPanel id="red-eye-tree" padding="inset-md">
                    The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
                </TabPanel>
                <TabPanel id="poison-dart" padding="inset-md">
                    The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
                </TabPanel>
                <TabPanel id="goliath" padding="inset-md">
                    The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
                </TabPanel>
            </Tabs>
            <Tabs aria-label="Frogs" size="md">
                <TabList>
                    <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                    <Tab id="poison-dart">Poison Dart Frog</Tab>
                    <Tab id="goliath">Goliath Frog</Tab>
                </TabList>
                <TabPanel id="red-eye-tree" padding="inset-md">
                    The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
                </TabPanel>
                <TabPanel id="poison-dart" padding="inset-md">
                    The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species’ toxins historically used by Indigenous hunters.
                </TabPanel>
                <TabPanel id="goliath" padding="inset-md">
                    The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn’t croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
                </TabPanel>
            </Tabs>
        </Stack>
    );
}
