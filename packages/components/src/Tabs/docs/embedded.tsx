import { Button, Heading, Inline, Tab, TabList, TabPanel, Tabs, Text } from "@hopper-ui/components";
import { PlusIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Tabs aria-label="Frogs" variant="heading">
            <Inline justifyItems="space-between" alignY="flex-end">
                <Heading>Goal</Heading>
                <TabList>
                    <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                    <Tab id="poison-dart">Poison Dart Frog</Tab>
                    <Tab id="goliath">Goliath Frog</Tab>
                </TabList>
                <Button>
                    <PlusIcon />
                    <Text>New goal</Text>
                </Button>
            </Inline>
            <TabPanel id="red-eye-tree" paddingTop="inset-lg">
                The Red-Eyed Tree Frog (Agalychnis callidryas) is a vibrant nocturnal climber with bright green skin, red eyes, and blue-striped sides, using its colors to startle predators before blending into the rainforest.
            </TabPanel>
            <TabPanel id="poison-dart" paddingTop="inset-lg">
                The Poison Dart Frog (Dendrobatidae) is a tiny but highly toxic amphibian, flaunting brilliant shades of yellow, blue, or red to warn predators, with some species' toxins historically used by Indigenous hunters.
            </TabPanel>
            <TabPanel id="goliath" paddingTop="inset-lg">
                The Goliath Frog (Conraua goliath) is the largest frog in the world, reaching up to 12 inches long and 7 pounds, yet it doesn't croak, relying instead on movement to communicate in the fast-flowing rivers of West Africa.
            </TabPanel>
        </Tabs>
    );
}
