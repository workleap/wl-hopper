import { useEffect, useState } from "react";

export const useProgressVisibility = (isLoading?: boolean) => {
    const [isProgressVisible, setIsProgressVisible] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (isLoading) {
            timeout = setTimeout(() => {
                setIsProgressVisible(true);
            }, 1000);
        } else {
            setIsProgressVisible(false);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isLoading, setIsProgressVisible]);

    return isProgressVisible;
};
