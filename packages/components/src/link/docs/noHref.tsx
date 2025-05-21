import { Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <Link
            onPress={() => {
                window.alert("You clicked the link!");
            }}
        >
            Learn more
        </Link>
    );
}
