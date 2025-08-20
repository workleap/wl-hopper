import { Content, Heading, Illustration, Image, Inline, Tile } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline
            wrap={{
                base: true,
                md: false
            }}
        >
            <Tile id="buy" orientation="horizontal">
                <Image alt="frog" src="/cute-frog.png" />
                <Heading>Buy a ticket</Heading>
                <Content>
                    Tickets are not refundable and not transferable. A confirmation email will be sent
                    within the next few minutes.
                </Content>
            </Tile>
            <Tile id="buy" orientation="horizontal">
                <Illustration backgroundColor="primary-weak">
                    <Image alt="frog" src="/cute-frog.png" width="100%" />
                </Illustration>
                <Heading>Buy a ticket</Heading>
                <Content>
                    Tickets are not refundable and not transferable. A confirmation email will be sent
                    within the next few minutes.
                </Content>
            </Tile>
        </Inline>
    );
}
