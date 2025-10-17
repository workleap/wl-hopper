
import { TextField, useDebounce } from "@hopper-ui/components";
import { useEffect, useState } from "react";

export default function Example() {
    const [inputValue, setInputValue] = useState("");
    const [debouncedEmail, setDebouncedEmail] = useDebounce("", 400);
    const [isValid, setIsValid] = useState(true);
    const [isValidating, setIsValidating] = useState(false);

    const handleInputChange = (value: string) => {
        setInputValue(value); // Update input immediately for responsiveness
        setDebouncedEmail(value); // Trigger debounced validation
        if (value)  {
            setIsValidating(true);
        }
    };

    useEffect(() => {
        if (debouncedEmail) {
            const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail);
            setIsValid(isEmailValid);
        }
        setIsValidating(false);
    }, [debouncedEmail]);

    return (
        <TextField
            type="email"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your email"
            description={isValidating ? "Validating..." : undefined}
            errorMessage={"Invalid email"}
            isInvalid={!isValid && !isValidating && !!inputValue}
        />
    );
}
