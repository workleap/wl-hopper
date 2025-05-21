import { Button, Card, Content, Flex, Heading, Image, Modal, ModalTrigger } from "@hopper-ui/components";

export default function Example() {
    return (
        <ModalTrigger>
            <Button variant="secondary">Open modal</Button>
            <Modal>
                <Heading>Fascinating Frog Facts!</Heading>
                <Content>
                    <Flex gap="stack-lg">
                        <Card flex={1}>
                            <Image objectFit="cover" alt="Frog" src="/frog.jpg" />
                            <Flex direction="column" gap="stack-sm" padding="inset-md" height="100%" justifyContent="space-between">
                                <Flex direction="column" gap="stack-sm">
                                    <Heading>Frog</Heading>
                                    <Content>
                                        Common frogs are found in ponds, marshes, and forests across the world. Unlike some of their flashier cousins, they rely on stealth and speed rather than bright colors to survive.
                                    </Content>
                                    <Button variant="secondary">Choose</Button>
                                </Flex>
                            </Flex>
                        </Card>
                        <Card flex={1}>
                            <Image objectFit="cover" alt="Mossy Frog" src="/mossy-frog.jpg" />
                            <Flex direction="column" gap="stack-sm" padding="inset-md" height="100%" justifyContent="space-between">
                                <Flex direction="column" gap="stack-sm">
                                    <Heading>Mossy Frog</Heading>
                                    <Content>
                                        A mossy tree frog with rough, bark-like skin, blending perfectly into its surroundings for camouflage and protection.
                                    </Content>
                                </Flex>
                                <Button variant="secondary">Choose</Button>
                            </Flex>
                        </Card>
                    </Flex>
                </Content>
            </Modal>
        </ModalTrigger>
    );
}
