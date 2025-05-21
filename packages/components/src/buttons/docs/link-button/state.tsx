import { Inline, LinkButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <LinkButton href="https://www.google.com" isDisabled variant="primary">Help</LinkButton>
            <LinkButton href="https://www.google.com" isDisabled variant="ghost-primary">Help</LinkButton>
        </Inline>
    );
}
