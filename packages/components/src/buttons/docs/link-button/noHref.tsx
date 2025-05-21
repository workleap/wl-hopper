import { LinkButton } from "@hopper-ui/components";

export default function Example() {
    return (
        <LinkButton
            onPress={() => {
                window.alert("You clicked the link button!");
            }}
        >
            Learn more
        </LinkButton>
    );
}
