import { Card, H3, Inline, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline gap="inline-sm" wrap="wrap">
            <Card padding="inset-lg" UNSAFE_maxWidth="16rem" width="100%" gap="stack-md">
                <H3>XS Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="20rem" width="100%" gap="stack-md">
                <H3>SM Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%" gap="stack-md">
                <H3>MD Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="35rem" width="100%" gap="stack-md">
                <H3>LG Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
            <Card padding="inset-lg" UNSAFE_maxWidth="40rem" width="100%" gap="stack-md">
                <H3>XL Card</H3>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                </Text>
            </Card>
        </Inline>
    );
}
