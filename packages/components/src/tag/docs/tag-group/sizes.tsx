import { Stack, Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack>
            <TagGroup aria-label="Jobs" size="sm" >
                <Tag id="designer">Designer</Tag>
                <Tag id="developer">Developer</Tag>
                <Tag id="manager">Manager</Tag>
            </TagGroup>
            <TagGroup aria-label="Jobs" size="md" >
                <Tag id="designer">Designer</Tag>
                <Tag id="developer">Developer</Tag>
                <Tag id="manager">Manager</Tag>
            </TagGroup>
            <TagGroup aria-label="Jobs" size="lg" >
                <Tag id="designer">Designer</Tag>
                <Tag id="developer">Developer</Tag>
                <Tag id="manager">Manager</Tag>
            </TagGroup>
        </Stack>
    );
}
