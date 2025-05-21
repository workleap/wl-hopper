import { Card, H3, Image, Stack, Text } from "@hopper-ui/components";

import SpaceLandscape from "./assets/space-landscape.png";

export default function Example() {
    return (
        <Card UNSAFE_maxWidth="30rem" width="100%" overflow="hidden">
            <Image src={SpaceLandscape.src} alt="Space landscape" objectFit="cover" width="100%" UNSAFE_height="8rem" />
            <Stack padding="inset-lg">
                <H3>NASA Headquarters</H3>
                <Text>NASA Headquarters, officially known as Mary W. Jackson NASA Headquarters or NASA HQ and formerly named Two Independence Square, is a low-rise office building in the two-building Independence Square complex at 300 E Street SW in Washington, D.C.</Text>
            </Stack>
        </Card>
    );
}
