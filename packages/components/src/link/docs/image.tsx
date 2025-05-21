import { Image, Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <Link href="#" borderRadius="rounded-md" overflow="hidden">
            <Image UNSAFE_width="150px" src="/frog.jpg" alt="Kermit Frog" />
        </Link>
    );
}

