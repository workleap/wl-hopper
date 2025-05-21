import { Inline, Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Link isDisabled variant="primary" href="#">Learn more</Link>
            <Link isDisabled variant="secondary" href="#">Learn more</Link>
        </Inline>
    );
}
