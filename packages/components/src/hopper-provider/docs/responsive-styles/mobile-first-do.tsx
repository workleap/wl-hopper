
import { Div, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div
            // This will center text on mobile, and left align it on screens 768px and wider
            backgroundColor="primary"
            textAlign={{ base: "center", sm: "left" }}
            UNSAFE_width="30rem"
            maxWidth="100%"
            padding="inset-md"
        >
            <Text>Text Content</Text>
        </Div>
    );
}
