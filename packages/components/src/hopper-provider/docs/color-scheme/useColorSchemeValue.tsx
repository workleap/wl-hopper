import { Div, useColorSchemeValue } from "@hopper-ui/components";

export default function Example() {
    const color = useColorSchemeValue("#fff", "#000");
    const backgroundColor = useColorSchemeValue("#ff9048", "#fee2bb");

    return (
        <Div UNSAFE_color={color} UNSAFE_backgroundColor={backgroundColor}>
            Content
        </Div>
    );
}
