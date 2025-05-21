import { Avatar, Stack } from "@hopper-ui/components";
import { type ReactEventHandler, useEffect, useState } from "react";

function useAsyncImage(src: string, retryCount = 5, delay = 250) {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);
    const [failureCount, setFailureCount] = useState(0);

    useEffect(() => {
        if (isLoaded || failureCount >= retryCount) {
            return;
        }

        const loadImage = () => {
            const image: HTMLImageElement = new Image();

            image.src = currentSrc;

            image.onload = () => {
                setIsLoaded(true);
            };

            image.onerror = () => {
                if (failureCount < retryCount) {
                    setFailureCount(prevCount => prevCount + 1);
                    setCurrentSrc(src); // Trigger retry by resetting src
                }
            };
        };

        const timeoutId = setTimeout(loadImage, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [currentSrc, isLoaded, failureCount, retryCount, delay, src]);

    const onError: ReactEventHandler<HTMLImageElement> | undefined = () => {
        if (failureCount < retryCount) {
            setFailureCount(prevCount => prevCount + 1);
            setCurrentSrc(src); // Manually trigger retry
        }
    };

    return [isLoaded ? currentSrc : undefined, onError, failureCount] as const;
}

export default function Example() {
    const [src, handleError, failureCount] = useAsyncImage("https://example.com/image.jpg");
    const [src2, handleError2, failureCount2] = useAsyncImage("https://i.pravatar.cc/96?img=1");

    return (
        <Stack>
            <Stack alignX="center">
                <Avatar name="John Doe"
                    src={src}
                    imageProps={{ onError: handleError }}
                />
                <p>The avatar failed to load <strong>{failureCount}</strong> times.</p>
            </Stack>
            <Stack alignX="center">
                <Avatar name="John Doe"
                    src={src2}
                    imageProps={{ onError: handleError2 }}
                />
                <p>The avatar failed to load <strong>{failureCount2}</strong> times.</p>
            </Stack>
        </Stack>
    );
}
