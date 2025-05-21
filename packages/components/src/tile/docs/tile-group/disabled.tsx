import { Tile, TileGroup } from "../../src/index.ts";

export default function Example() {
    return (
        <TileGroup aria-label="Animals" isDisabled>
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
            <Tile id="elephant">Elephant</Tile>
        </TileGroup>
    );
}
