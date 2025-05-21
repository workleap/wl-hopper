import { Link, Inline } from "@hopper-ui/components";
import { SparklesIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Inline>
            <Link aria-label="Clean" variant="primary" href="#">
                <SparklesIcon />
            </Link>
            <Link aria-label="Clean" variant="secondary" href="#">
                <SparklesIcon />
            </Link>
        </Inline>
    );
}
