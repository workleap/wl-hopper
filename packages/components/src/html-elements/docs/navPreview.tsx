import { LI, Link, Nav, UL } from "@hopper-ui/components";

export default function Example() {
    return (
        <Nav color="neutral-weak">
            <UL>
                <LI>
                    <Link href="#">Missions</Link>
                </LI>
                <LI>
                    <Link href="#">Launches</Link>
                </LI>
                <LI>
                    <Link href="#">Careers</Link>
                </LI>
            </UL>
        </Nav>
    );
}
