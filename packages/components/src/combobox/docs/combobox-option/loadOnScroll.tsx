import { ComboBox, ComboBoxItem, useAsyncList } from "@hopper-ui/components";

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
        <ComboBox
            label="Roles"
            items={list.items}
            isLoading={list.isLoading}
            onLoadMore={list.loadMore}
            listBoxProps={{
                maxHeight: "core_1280"
            }}
        >
            {item => {
                return <ComboBoxItem id={item.name}>{item.name}</ComboBoxItem>;
            }}
        </ComboBox>
    );
}
