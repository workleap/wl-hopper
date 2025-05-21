import { Select, SelectItem, useAsyncList } from "@hopper-ui/components";

interface Character {
    name: string;
}

export default function Example() {
    const list = useAsyncList<Character>({
        async load({ signal, cursor }) {
            const res = await fetch(cursor || "https://pokeapi.co/api/v2/pokemon", {
                signal
            });
            const json = await res.json();

            return {
                items: json.results,
                cursor: json.next
            };
        }
    });

    return (
        <Select
            aria-label="list of options"
            items={list.items}
            isLoading={list.isLoading}
            onLoadMore={list.loadMore}
            listBoxProps={{
                maxHeight: "core_1280"
            }}
        >
            {item => {
                const { name } = item;

                return <SelectItem id={name}>{name}</SelectItem>;
            }}
        </Select>
    );
}
