import { Content, Div, Heading, Illustration, Image, Tile } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div UNSAFE_width="20rem">
            <Tile id="buy">
                 <Illustration backgroundColor="primary-weak">
                    <Image alt="frog" src="/cute-frog.png" />
                </Illustration>
                <Heading>Buy a ticket</Heading>
                <Content>
                    Tickets are not refundable and not transferable. A confirmation email will be sent
                    within the next few minutes
                </Content>
            </Tile>
        </Div>
    );
}
