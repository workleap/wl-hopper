import { Tag, TagGroup } from "@hopper-ui/components";

export default function Example() {
    return (
        <TagGroup aria-label="Jobs">
            <Tag id="1" href="https://www.google.com">Google</Tag>
            <Tag id="2" href="https://www.bing.com">Bing</Tag>
            <Tag id="3" href="https://www.yahoo.com">Yahoo</Tag>
        </TagGroup>
    );
}
