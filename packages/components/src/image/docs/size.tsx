import { Image, Inline } from "@hopper-ui/components";

export default function Example() {
    return (
        <Inline>
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="200px" height="auto" />
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="300px" height="auto" />
            <Image src="/frog.jpg" alt="Frog" UNSAFE_width="400px" height="auto" />
        </Inline>
    );
}
