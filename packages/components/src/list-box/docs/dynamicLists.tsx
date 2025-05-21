import { Collection, Header, ListBox, ListBoxItem, ListBoxSection } from "@hopper-ui/components";

const OPTIONS_WITH_SECTIONS = [
    {
        name: "Boy Names", children: [
            { id: 2, name: "Fred" },
            { id: 3, name: "Bob" },
            { id: 4, name: "Gabriel" }
        ]
    },
    {
        name: "Girl Names", children: [
            { id: 6, name: "Sarah" },
            { id: 7, name: "Louise" },
            { id: 8, name: "Karen2" }
        ]
    }
];

export default function Example() {
    return (
        <ListBox
            selectionMode="single"
            aria-label="Names"
            items={OPTIONS_WITH_SECTIONS}
        >
            {section => {
                return (
                    <ListBoxSection id={section.name}>
                        <Header>{section.name}</Header>
                        <Collection items={section.children}>
                            {item => <ListBoxItem id={item.name}>{item.name}</ListBoxItem>}
                        </Collection>
                    </ListBoxSection>
                );
            }}
        </ListBox>
    );
}
