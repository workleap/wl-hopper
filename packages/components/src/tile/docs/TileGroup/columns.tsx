import { Tile, TileGroup } from "../../src/index.ts";

export default function Example() {
    return (
        <TileGroup aria-label="Animals" numberOfColumns={4}>
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
            <Tile id="elephant">Elephant</Tile>
            <Tile id="giraffe">Giraffe</Tile>
            <Tile id="hippo">Hippo</Tile>
        </TileGroup>
    );
}
