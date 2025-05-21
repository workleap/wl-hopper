import { Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <Image srcSet="/frog.jpg 1x, /frog2x.jpg 2x" alt="Frog" UNSAFE_width="300px" />
    );
}
