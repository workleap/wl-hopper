import { useCallback } from "react";

export const useTruncatedText = (): (value: string, limit?: number) => string => {
    const truncateText = useCallback((inputText: string, limit?: number) => {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        const segments = segmenter.segment(inputText);
        let truncatedText = "";
        let count = 0;

        for (const segment of segments) {
            if (limit && count + segment.segment.length > limit) {
                break;
            }
            truncatedText += segment.segment;
            count += segment.segment.length;
        }

        return truncatedText;
    }, []);

    return truncateText;
};
