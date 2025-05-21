
import { Div, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div
            // This will only center text on screens 768px and wider, not on small screens
            backgroundColor="primary"
            textAlign={{ sm: "center" }}
            UNSAFE_width="30rem"
            maxWidth="100%"
            padding="inset-md"
        >
            <Text>Text Content</Text>
        </Div>
    );
}
