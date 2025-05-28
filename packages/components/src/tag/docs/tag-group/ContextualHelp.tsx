import { ContextualHelp, Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs" contextualHelp={<ContextualHelp>These are all possible jobs</ContextualHelp>}>
            <Tag id="designer">Designer</Tag>
            <Tag id="developer">Developer</Tag>
            <Tag id="manager">Manager</Tag>
        </TagGroup>
    );
}
