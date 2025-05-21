import { Collection, ComboBox, ComboBoxItem, ComboBoxSection, Header } from "@hopper-ui/components";

const OPTIONS_WITH_SECTIONS = [
    {
        role: "Operations", children: [
            { id: 2, role: "Project Coordinator" },
            { id: 3, role: "QA Specialist" },
            { id: 4, role: "System Administrator" }
        ]
    },
    {
        role: "Creative Department", children: [
            { id: 6, role: "Designer" },
            { id: 7, role: "Designer" },
            { id: 8, role: "UX Researcher" }
        ]
    }
];

export default function Example() {
    return (
        <ComboBox
            items={OPTIONS_WITH_SECTIONS}
            label="Section"
        >
            {section => {
                const { role: sectionName, children } = section;

                return (
                    <ComboBoxSection id={sectionName}>
                        <Header>{sectionName}</Header>
                        <Collection items={children}>
                            {item => <ComboBoxItem id={item.id}>{item.role}</ComboBoxItem>}
                        </Collection>
                    </ComboBoxSection>
                );
            }}
        </ComboBox>
    );
}
