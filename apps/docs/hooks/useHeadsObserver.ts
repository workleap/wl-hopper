import { useEffect, useRef, useState } from "react";

const ELEMENTS = "[data-section-title], [data-subsection-title]";

function findAllFullyVisibleElements() {
    const elements = document.querySelectorAll(ELEMENTS);
    const visibleElements: string[] = [];

    elements.forEach(element => {
        const rect = element.getBoundingClientRect();

        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            visibleElements.push(element.id);
        }
    });

    return visibleElements;
}

export function useHeadsObserver() {
    const observer = useRef<IntersectionObserver | null>(null);
    const [activeId, setActiveId] = useState("");
    const [nextId, setNextId] = useState("");
    const [visibleElements, setVisibleElements] = useState<string[]>([]);

    useEffect(() => {
        const fullyVisibleElements = findAllFullyVisibleElements();
        setVisibleElements(fullyVisibleElements);
    }, []);

    useEffect(() => {
        if (visibleElements.length > 0 && !activeId) {
            setActiveId(visibleElements[0]);
        }
    }, [visibleElements, activeId]);

    useEffect(() => {
        const handleObserver = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
                if (entry?.isIntersecting) {
                    setNextId(entry.target.id);
                }
            });
        };

        observer.current = new IntersectionObserver(handleObserver, {
            threshold: 0.7
        });

        const elements = document.querySelectorAll(ELEMENTS);
        elements.forEach(elem => {
            return observer.current?.observe(elem);
        });

        return () => observer.current?.disconnect();
    }, [visibleElements, activeId]);

    const setNextActiveId = () => {
        if (nextId) {
            setActiveId(nextId);
            setNextId("");
        }
    };

    return { activeId, setNextActiveId };
}
