import { Collection, Header, Select, SelectItem, SelectSection } from "@hopper-ui/components";

const OPTIONS = [
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
        <Select items={OPTIONS} label="Section">
            {section => {
                const { role: sectionName, children } = section;

                return (
                    <SelectSection id={sectionName}>
                        <Header>{sectionName}</Header>
                        <Collection items={children}>
                            {item => <SelectItem id={item.id}>{item.role}</SelectItem>}
                        </Collection>
                    </SelectSection>
                );
            }}
        </Select>
    );
}
