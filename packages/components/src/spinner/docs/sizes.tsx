import { Spinner, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline alignY="end">
            <Spinner size="sm" aria-label="Loading..." />
            <Spinner aria-label="Loading..." />
            <Spinner size="lg" aria-label="Loading..." />
        </Inline>
    );
}
