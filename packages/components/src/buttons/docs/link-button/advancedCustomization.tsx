import { LinkButton, LinkButtonContext, SlotProvider } from "@hopper-ui/components";

export default function Example() {
    return (
        <SlotProvider values={[
            [LinkButtonContext, { variant: "secondary", size: "sm" }]
        ]}
        >
            <LinkButton href="https://www.google.com">Help</LinkButton>
        </SlotProvider>
    );
}
