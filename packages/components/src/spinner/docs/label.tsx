import { Spinner, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline alignY="end">
            <Spinner size="sm">Loading...</Spinner>
            <Spinner>Loading...</Spinner>
            <Spinner size="lg">Loading...</Spinner>
        </Inline>
    );
}
