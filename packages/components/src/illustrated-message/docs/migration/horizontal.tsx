import { Content, Heading, Inline, Stack, SvgImage } from "@hopper-ui/components";

import { NoResults } from "../../assets/index.ts";

export default function Example() {
    return (
        <Inline alignY="center" gap="stack-lg">
            <SvgImage stroke="neutral" src={NoResults} aria-label="No Results" />
            <Stack gap="stack-sm">
                <Heading>No results found</Heading>
                <Content color="neutral-weak">Please try another search term.</Content>
            </Stack>
        </Inline>
    );
}
