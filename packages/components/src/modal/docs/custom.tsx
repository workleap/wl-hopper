import { Button, Content, CustomModal, Heading, Image, ModalTrigger, Stack } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <CustomModal padding="inset-lg">
                {({ close }) => (
                    <Stack>
                        <Button variant="secondary" onPress={close}>Close</Button>
                        <Heading>Fascinating Frog Facts!</Heading>
                        <Content>
                            Frogs are amphibians, meaning they can live both in water and on land! With their powerful legs, some species can jump over 20 times their body length—that’s like a human leaping over a school bus!
                        </Content>
                        <Image src="/frog.jpg" alt="Frog" />
                    </Stack>
                )}
            </CustomModal>
        </ModalTrigger>
    );
}
