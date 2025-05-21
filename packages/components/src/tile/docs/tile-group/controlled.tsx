import type { Key } from "@hopper-ui/components";
import { useState } from "react";

import { Tile, TileGroup } from "../../src/index.ts";

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState<Set<Key>>();

    const handleSelectionChange = (keys: Set<Key>) => {
        setSelectedKeys(keys);
    };

    return (
        <TileGroup aria-label="Animals"
            selectedKeys={selectedKeys}
            onSelectionChange={handleSelectionChange}
        >
            <Tile id="frog">Frog</Tile>
            <Tile id="camel">Camel</Tile>
            <Tile id="elephant">Elephant</Tile>
        </TileGroup>
    );
}
