import { Div, Image } from "@hopper-ui/components";

export default function Example() {
    return (
        <Div UNSAFE_width="200px" UNSAFE_height="200px">
            <Image objectFit="cover" src="/frog.jpg" alt="Frog" />
        </Div>
    );
}
