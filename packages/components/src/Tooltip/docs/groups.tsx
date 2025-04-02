import { Stack, Tab, TabList, Tabs, Tag, TagGroup, Tooltip, TooltipTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <Tabs aria-label="frogs">
                <TabList>
                    <Tab id="red-eye-tree">Red-Eyed Tree Frog</Tab>
                    <TooltipTrigger>
                        <Tab id="poison-dart">Poison Da..</Tab>
                        <Tooltip>Poison Dart Frog</Tooltip>
                    </TooltipTrigger>
                    <Tab id="goliath">Goliath Frog</Tab>
                </TabList>
            </Tabs>
            <TagGroup aria-label="tags" size="sm" label="Small">
                <Tag id="1">Red-Eyed Tree Frog</Tag>
                <TooltipTrigger>
                    <Tag id="2">Poison Da...</Tag>
                    <Tooltip>Poison Dart Frog</Tooltip>
                </TooltipTrigger>
                <Tag id="3">Goliath Frog</Tag>
            </TagGroup>
        </Stack>
    );
}
