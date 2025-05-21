import { Card, H2, H3, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card padding="inset-squish-lg" width="3/4" gap="stack-md">
            <H2>Roles</H2>
            <Card gap="stack-md" padding="inset-squish-lg" variant="second-level">
                <H3>Manager</H3>
                <Text>A manager leads team operations, aligns goals, and fosters a productive work environment to achieve results.</Text>
            </Card>
        </Card>
    );
}
