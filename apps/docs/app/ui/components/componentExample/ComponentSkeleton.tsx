import clsx from "clsx";

interface ComponentSkeletonProps {
    overlay?: boolean;
}

const PreviewSkeleton = ({ overlay = false }: ComponentSkeletonProps) => (
    <div
        className={clsx("hd-component-example-skeleton", {
            "hd-component-example-skeleton__overlay": overlay
        })}
    />
);

export default PreviewSkeleton;
