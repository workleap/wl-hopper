import { ComboBox, ComboBoxItem, useFilter } from "@hopper-ui/components";
import { useMemo, useState } from "react";

const ROLE_OPTIONS = [
    { id: 1, name: "Designer" },
    { id: 2, name: "Developer" },
    { id: 3, name: "Manager" },
    { id: 4, name: "QA Engineer" },
    { id: 5, name: "Product Owner" },
    { id: 6, name: "Scrum Master" },
    { id: 7, name: "UX Researcher" },
    { id: 8, name: "Business Analyst" },
    { id: 9, name: "DevOps Engineer" },
    { id: 10, name: "Data Scientist" }
];

export default function Example() {
    const { startsWith } = useFilter({ sensitivity: "base" });
    const [filterValue, setFilterValue] = useState("");

    const filteredItems = useMemo(() => {
        return ROLE_OPTIONS.filter(item => startsWith(item.name, filterValue));
    }, [startsWith, filterValue]);

    return (
        <ComboBox
            items={filteredItems}
            inputValue={filterValue}
            onInputChange={setFilterValue}
            label="Roles"
        >
            {item => <ComboBoxItem id={item.id}>{item.name}</ComboBoxItem>}
        </ComboBox>
    );
}
