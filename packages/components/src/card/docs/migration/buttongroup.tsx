import { Button, ButtonGroup, Card, H3, Stack, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <Card gap="stack-md" padding="inset-lg" UNSAFE_maxWidth="30rem" width="100%">
            <H3>NASA Headquarters</H3>
            <Stack>
                <Text>
                    300 E. Street SW, Suite 5R30
                    <br />
                    Washington, DC 20546
                    <br />
                    (202) 358-0001 (Office)
                    <br />
                    (202) 358-4338 (Fax)
                    <br />
                </Text>
                <em>Any trespassers are going to be sent in space.</em>
            </Stack>
            <ButtonGroup>
                <Button>Plan a visit</Button>
                <Button variant="secondary">Cancel a booking</Button>
            </ButtonGroup>
        </Card>
    );
}
