import { Header, ListBox, ListBoxItem, ListBoxSection, type Selection } from "@hopper-ui/components";
import { useState } from "react";

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));

    return (
        <ListBox
            selectionMode="multiple"
            aria-label="list of options"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
        >
            <ListBoxSection aria-label="section">
                <Header>Self review</Header>
                <ListBoxItem id="1">Overdue</ListBoxItem>
                <ListBoxItem id="2">In progress</ListBoxItem>
                <ListBoxItem id="3">Submitted</ListBoxItem>
            </ListBoxSection>
            <ListBoxSection aria-label="section">
                <Header>Manager review</Header>
                <ListBoxItem id="4">Overdue</ListBoxItem>
                <ListBoxItem id="5">In progress</ListBoxItem>
                <ListBoxItem id="6">Submitted</ListBoxItem>
            </ListBoxSection>
        </ListBox>
    );
}
