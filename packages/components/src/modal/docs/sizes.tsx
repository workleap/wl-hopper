import { Button, Content, Heading, Modal, type ModalProps, ModalTrigger, Stack } from "@hopper-ui/components";

export default function Example() {
    const modal = (size: ModalProps["size"]) => (
        <ModalTrigger>
            <Button variant="secondary">Open {size?.toString()} modal</Button>
            <Modal size={size}>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                </Content>
            </Modal>
        </ModalTrigger>
    );

    return (
        <Stack gap="stack-md">
            {modal("sm")}
            {modal("md")}
            {modal("lg")}
            {modal("xl")}
            {modal("fullscreen")}
            {modal("fullscreenTakeover")}
        </Stack>
    );
}
