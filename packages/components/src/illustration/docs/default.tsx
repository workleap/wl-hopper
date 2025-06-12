import { Illustration, Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <Illustration backgroundColor="primary-weak" UNSAFE_height="12rem" padding="core_160">
            <Image alt="frog" src="/cute-frog.png" />
        </Illustration>
    );
}
