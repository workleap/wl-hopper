import { Paragraph, Stack, TextField, useDebounce } from "@hopper-ui/components";
import { useEffect } from "react";

export default function Example() {
    const [message, setMessage] = useDebounce("", 100);

    const handleInputChange = (text: string) => {
        setMessage(text);
    };

    // This effect will only run 100ms after the user stops typing
    useEffect(() => {
        if (message) {
            // eslint-disable-next-line no-console
            console.log("Debounced message:", message);
            // Perform some action with the debounced value
        }
    }, [message]);

    return (
        <Stack>
            <TextField
                onChange={handleInputChange}
                placeholder="Type something..."
            />
            <Paragraph>Debounced value: {message}</Paragraph>
        </Stack>
    );
}
