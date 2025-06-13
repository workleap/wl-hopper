import { Div, Illustration, Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div UNSAFE_height="30rem">
            <Illustration backgroundColor="primary-weak" orientation="vertical" UNSAFE_width="12rem" padding="core_160">
                <Image alt="frog" src="/cute-frog.png" />
            </Illustration>
        </Div>
    );
}
