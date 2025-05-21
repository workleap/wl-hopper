import { Link, Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack padding="inset-xl">
            <Text size="xs">
                Would you like to <Link size="inherit" href="#">learn more</Link> about this role?
            </Text>
            <Link size="xs" href="#">learn more</Link>
            <Link size="sm" href="#">learn more</Link>
            <Link size="md" href="#">learn more</Link>
            <Link size="lg" href="#">learn more</Link>
            <Link size="xl" href="#">learn more</Link>
            <Link size="2xl" href="#">learn more</Link>
        </Stack>
    );
}
