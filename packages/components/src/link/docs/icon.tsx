import { Inline, Link, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Link variant="primary" href="#">
                <Text>Learn more</Text>
                <SparklesIcon />
            </Link>
            <Link variant="secondary" href="#">
                <Text>Learn more</Text>
                <SparklesIcon />
            </Link>
        </Inline>
    );
}
