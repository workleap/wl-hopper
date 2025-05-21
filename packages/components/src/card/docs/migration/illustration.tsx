import { Card, Flex, H3, Image, Stack, Text } from "@hopper-ui/components";

import planet from "./assets/planet.png";

export default function Example() {
    return (
        <Card UNSAFE_maxWidth="30rem" width="100%" overflow="hidden">
            <Flex UNSAFE_height="8rem" backgroundColor="primary-weak" alignItems="center" justifyContent="center">
                <Image src={planet.src} alt="Planet" />
            </Flex>
            <Stack padding="inset-lg">
                <H3 marginBottom="inline-lg">NASA Headquarters</H3>
                <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
            </Stack>
        </Card>
    );
}
