import { Button, Content, Heading, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                {({ close }) => (
                    <>
                        <Heading>Fascinating Frog Facts!</Heading>
                        <Content>
                            Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                        </Content>
                        <Button onPress={close}>
                            Save
                        </Button>
                    </>
                )}
            </Modal>
        </ModalTrigger>
    );
}
