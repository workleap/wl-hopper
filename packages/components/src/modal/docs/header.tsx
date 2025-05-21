import { Button, Content, Header, Heading, Link, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Heading>Fascinating Frog Facts!</Heading>
                <Header>
                    <Link
                        isExternal
                        href="https://en.wikipedia.org/wiki/Frog"
                        size="sm"
                    >
                        Wikipedia
                    </Link>
                </Header>
                <Content>
                    Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Content>
            </Modal>
        </ModalTrigger>
    );
}
