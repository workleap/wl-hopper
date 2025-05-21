import { Button, Content, Heading, Modal, ModalTrigger, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <Stack gap="stack-md">
            <ModalTrigger>
                <Button variant="secondary">Open responsive modal</Button>
                <Modal
                    size={{
                        base: "fullscreenTakeover",
                        md: "md"
                    }}
                >
                    <Heading>Fascinating Frog Facts!</Heading>
                    <Content>
                        Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                    </Content>
                </Modal>
            </ModalTrigger>
        </Stack>
    );
}
