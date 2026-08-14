import { ActionBar, Box, Button, Checkbox, Stack } from "@hopper-ui/components";
import { useState } from "react";

const items = [
    { id: "1", label: "Design system audit" },
    { id: "2", label: "Update onboarding flow" },
    { id: "3", label: "Migrate legacy tokens" }
];

export default function Example() {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

    const toggleKey = (id: string, isSelected: boolean) => {
        setSelectedKeys(prev => {
            const next = new Set(prev);

            if (isSelected) {
                next.add(id);
            } else {
                next.delete(id);
            }

            return next;
        });
    };

    return (
        <Box position="relative" width="100%" UNSAFE_minHeight="11rem">
            <Stack gap="stack-sm">
                {items.map(item => (
                    <Checkbox
                        key={item.id}
                        isSelected={selectedKeys.has(item.id)}
                        onChange={isSelected => toggleKey(item.id, isSelected)}
                    >
                        {item.label}
                    </Checkbox>
                ))}
            </Stack>
            <ActionBar
                position="absolute"
                left="0"
                right="0"
                bottom="0"
                selectedItemCount={selectedKeys.size === items.length ? "all" : selectedKeys.size}
                onClearSelection={() => setSelectedKeys(new Set())}
            >
                <Button variant="secondary" size="sm">
                    Archive
                </Button>
                <Button variant="danger" size="sm">
                    Delete
                </Button>
            </ActionBar>
        </Box>
    );
}
