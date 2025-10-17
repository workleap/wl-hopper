import { useDebounceCallback } from "@hopper-ui/components";
import { useEffect, useState } from "react";

export default function Example() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const handleResize = useDebounceCallback(() => {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, 100);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    return (
        <div>
            Window size: {dimensions.width} x {dimensions.height}
        </div>
    );
}
