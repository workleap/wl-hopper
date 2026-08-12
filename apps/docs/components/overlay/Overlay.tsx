import clsx from "clsx";
import { useEffect, useState } from "react";

import "./overlay.css";

interface OverlayProps {
    isOpen: boolean;
}

const Overlay = ({ isOpen }: OverlayProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationDirection, setAnimationDirection] = useState<"opening" | "closing">("opening");

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setAnimationDirection("opening");
        } else {
            setAnimationDirection("closing");
        }

        const animationTimeout = setTimeout(() => {
            setIsAnimating(false);
        }, 300);

        return () => clearTimeout(animationTimeout);
    }, [isOpen]);

    if (!isOpen && !isAnimating) {
        return null;
    }

    const overlayClassName = clsx(
        "hd-overlay",
        isAnimating && "hd-overlay--is-animating",
        `hd-overlay--${animationDirection}`
    );

    return <div className={overlayClassName}></div>;
};

export default Overlay;
