import { Card, H3, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card gap="inline-lg" padding="inset-squish-lg" UNSAFE_maxWidth="30rem" width="100%">
            <H3>Developer</H3>
            <Text>
                A developer builds and maintains software, ensuring functionality, performance, and alignment with project goals.
            </Text>
            <Text>Start date : <em>September 13th</em></Text>
        </Card>
    );
}
