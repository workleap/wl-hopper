import { SearchField, Span, Stack, useDebounce } from "@hopper-ui/components";
import { useEffect, useState } from "react";

export default function Example() {
    const [inputValue, setInputValue] = useState(""); // We use a state for immediate input updates
    const [debouncedQuery, setDebouncedQuery] = useDebounce("", 400); // Debounced API calls
    const [results, setResults] = useState<unknown[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleInputChange = (value: string) => {
        setInputValue(value); // Update input immediately for responsiveness
        setDebouncedQuery(value); // Trigger debounced search
        if (value.trim()) setIsSearching(true);
    };

    // Effect runs only after user stops typing for 400ms
    useEffect(() => {
        if (debouncedQuery.trim()) {
            searchAPI(debouncedQuery).then((data: unknown[]) => {
                setResults(data);
                setIsSearching(false);
            });
        } else {
            setResults([]);
            setIsSearching(false);
        }
    }, [debouncedQuery]);

    return (
        <Stack>
            <SearchField
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            {isSearching && <Span>Searching...</Span>}
            {/* <SearchResults results={results} /> */}
        </Stack>
    );
}

function searchAPI(query: string): Promise<unknown[]> {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: `Result for "${query}" 1` },
                { id: 2, name: `Result for "${query}" 2` },
                { id: 3, name: `Result for "${query}" 3` }
            ]);
        }, 1000);
    });
}
