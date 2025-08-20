import { Content, Div, Heading, Tile } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div UNSAFE_width="20rem">
            <Tile isSelected id="buy">
                <Heading>Buy a ticket</Heading>
                <Content>Purchase a ticket for any of our space travel adventure.</Content>
            </Tile>
        </Div>
    );
}
