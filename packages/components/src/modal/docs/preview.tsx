import { Button, Content, Heading, Modal, ModalTrigger, Text } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                    <Text size="sm">
                        Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                    </Text>
                    <Text size="sm">
                        Frogs don’t drink water with their mouths! Instead, they absorb moisture through their specialized skin patch on their belly and thighs.
                    </Text>
                </Content>
            </Modal>
        </ModalTrigger>
    );
}
