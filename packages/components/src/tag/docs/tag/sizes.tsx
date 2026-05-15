import { Inline, Tag } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Tag id="intern" size="xs">Intern</Tag>
            <Tag id="designer" size="sm">Designer</Tag>
            <Tag id="developer" size="md">Developer</Tag>
            <Tag id="manager" size="lg">Manager</Tag>
        </Inline>
    );
}
