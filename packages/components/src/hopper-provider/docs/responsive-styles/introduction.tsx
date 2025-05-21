import { Div, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div
            backgroundColor={{
                base: "core_moss-200",
                xs: "core_sapphire-200",
                sm: "core_moss-200",
                md: "core_sapphire-200",
                lg: "core_rock-200",
                xl: "core_sunken-treasure-200"
            }}
            UNSAFE_width="30rem"
            maxWidth="100%"
            padding="inset-md"
        >
            <Text>Resize the window to see the background color change!</Text>
        </Div>
    );
}
