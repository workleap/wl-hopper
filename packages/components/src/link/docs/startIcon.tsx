import { Inline, Link, Text } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Link variant="primary" href="#">
                <SparklesIcon slot="start-icon" />
                <Text>Learn more</Text>
            </Link>
            <Link variant="secondary" href="#">
                <SparklesIcon slot="start-icon" />
                <Text>Learn more</Text>
            </Link>
        </Inline>
    );
}
