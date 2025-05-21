import { Content, Heading, IllustratedMessage, Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <IllustratedMessage>
            <Image src="/frog.jpg" alt="No Results" />
            <Heading>No results found</Heading>
            <Content>It seems like there’s nothing here for now. Hop on and add something new!</Content>
        </IllustratedMessage>
    );
}
