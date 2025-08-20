import { Content, Div, Heading, Tile } from "@hopper-ui/components";
import { useCallback, useState } from "react";

export default function Example() {
    const [isSelected, setIsSelected] = useState(false);
    const handleChange = useCallback(() => {
        setIsSelected(x => !x);
    }, [setIsSelected]);

    return (
        <Div UNSAFE_width="20rem">
            <Tile id="buy" isSelected={isSelected} onChange={handleChange}>
                <Heading>Buy a ticket</Heading>
                <Content>Purchase a ticket for any of our space travel adventure.</Content>
            </Tile>
        </Div>
    );
}
