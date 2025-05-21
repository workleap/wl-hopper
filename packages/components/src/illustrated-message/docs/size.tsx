import { Content, Heading, IllustratedMessage, Image, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="core_480" alignX="center">
            <IllustratedMessage size="sm">
                <Image src="/frog.jpg" alt="Frog" />
                <Heading>No results found</Heading>
                <Content>It seems like there’s nothing here for now. Hop on and add something new.</Content>
            </IllustratedMessage>
            <IllustratedMessage size="md">
                <Image src="/frog.jpg" alt="Frog" />
                <Heading>No results found</Heading>
                <Content>It seems like there’s nothing here for now. Hop on and add something new.</Content>
            </IllustratedMessage>
            <IllustratedMessage size="lg">
                <Image src="/frog.jpg" alt="Frog" />
                <Heading>No results found</Heading>
                <Content>It seems like there’s nothing here for now. Hop on and add something new.</Content>
            </IllustratedMessage>
        </Stack>

    );
}
