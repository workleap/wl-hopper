import { Content, Div, Heading, Text, Tile } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div UNSAFE_width="20rem">
            <Tile id="buy">
                <Heading>Buy a ticket</Heading>
                <Content>Purchase a ticket for any of our ribbit adventures.</Content>
            </Tile>
        </Div>
    );
}
