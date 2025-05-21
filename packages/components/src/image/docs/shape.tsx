import { Image, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="300px" shape="rounded" />
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="300px" shape="circular" />
        </Inline>
    );
}
