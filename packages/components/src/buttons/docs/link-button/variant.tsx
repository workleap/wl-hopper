import { Inline, LinkButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <LinkButton href="https://www.google.com" variant="primary">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="secondary">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="upsell">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="danger">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="ghost-primary">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="ghost-secondary">Help</LinkButton>
            <LinkButton href="https://www.google.com" variant="ghost-danger">Help</LinkButton>
        </Inline>
    );
}
