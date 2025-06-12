import { Illustration, Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <Illustration backgroundColor="primary-weak" shape="rounded" UNSAFE_height="12rem">
            <Image alt="frog" src="/cute-frog.png" />
        </Illustration>
    );
}
