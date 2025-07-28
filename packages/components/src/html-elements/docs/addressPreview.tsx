import { Address, Link } from "@hopper-ui/components";

export default function Example() {
    return (
        <Address color="neutral-weak">
            <Link href="mailto:media@spacex.com">media@spacex.com</Link>
            <br />
            <Link href="tel:+13103636000">(310) 363-6000</Link>
        </Address>
    );
}
