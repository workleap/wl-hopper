import { Paragraph, SearchField, Stack, useDebounce } from "@hopper-ui/components";
import { useEffect, useState } from "react";

export default function Example() {
    const [inputValue, setInputValue] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useDebounce("", 400);
    const [results, setResults] = useState<string[]>([]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
        setDebouncedQuery(value);
    };

    useEffect(() => {
        if (debouncedQuery.trim()) {
            // Simulate search - only runs after 400ms of no typing
            const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
            const filtered = fruits.filter(fruit =>
                fruit.toLowerCase().includes(debouncedQuery.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    return (
        <Stack>
            <SearchField
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search fruits..."
                label="Search"
            />
            <Paragraph>Results: {results.join(", ")}</Paragraph>
        </Stack>
    );
}
