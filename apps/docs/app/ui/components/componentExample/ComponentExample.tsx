"use client";

import clsx from "clsx";
import { memo, useEffect, useState, type ReactNode } from "react";

import { CodeIcon, Icon, StackblitzIcon } from "@/components/icon";
import { ToggleButton } from "@/components/toggleButton/ToggleButton.tsx";
import { useToggle } from "@/hooks/useToggle.ts";

import ComponentPreviewWrapper from "./ComponentPreviewWrapper.tsx";

import ComponentSkeleton from "@/app/ui/components/componentExample/ComponentSkeleton.tsx";
import LinkButton from "@/components/button/LinkButton.tsx";
import "./componentExample.css";

interface CommonProps {
    src: string;
    className?: string;
    isOpen?: boolean;
    hideStackblitzButton?: boolean;
}

interface CodeProps extends CommonProps {
    type: "code";
    code: ReactNode;
}

interface PreviewProps extends CommonProps {
    type: "preview";
    preview: ReactNode;
}

interface BothProps extends CommonProps {
    type: "both";
    code: ReactNode;
    preview: ReactNode;
}

export type ComponentExampleProps = CodeProps | PreviewProps | BothProps;

const ComponentExample = memo(({
    src,
    type = "both",
    className,
    isOpen = false,
    hideStackblitzButton,
    ...props
}: ComponentExampleProps) => {
    const [showCode, toggleShowCode] = useToggle(isOpen);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const showBothComponent = type === "both";
    const showPreviewComponent = type === "preview" || showBothComponent;
    const showCodeComponent = (showBothComponent && showCode) || type === "code";

    if (!src) {
        return null;
    }

    if (isLoading) {
        return <div data-usage={type} className="hd-component-example__skeleton"><ComponentSkeleton /></div>;
    }

    const renderToggleButton = () => {
        if (!showBothComponent) {
            return null;
        }

        return (
            <ToggleButton isSelected={showCode}
                className="hd-component-preview-wrapper__action"
                aria-label="Show code"
                onPress={toggleShowCode}
            >
                <CodeIcon />
            </ToggleButton>
        );
    };

    const openInStackblitzButton = (
        <LinkButton variant="secondary" size="sm" href="https://stackblitz.com/edit/hopper-sandbox?file=src%2FComponent.tsx" target="_blank">
            Open in Stackblitz
            <Icon src={StackblitzIcon} slot="end-icon" />
        </LinkButton>
    );

    const renderPreviewComponent = () => {
        if (!showPreviewComponent) {
            return null;
        }

        return (
            <ComponentPreviewWrapper
                openInStackblitzButton={hideStackblitzButton ? null : openInStackblitzButton}
                preview={(type === "preview" || type === "both") ? (props as PreviewProps | BothProps).preview : undefined}
                toggleButton={renderToggleButton()}
            />
        );
    };

    const renderCodeComponent = () => {
        return (
            <div className={clsx("hd-component-code", showCodeComponent && "hd-component-code--expanded")}>
                {(type === "code" || type === "both") ? (props as CodeProps | BothProps).code : undefined}
            </div>
        );
    };

    return (
        <div data-usage={type}
            className={clsx("hd-component-example", showCodeComponent && "hd-component-example--expanded", className)}
        >
            {renderPreviewComponent()}
            {renderCodeComponent()}
        </div>
    );
});

ComponentExample.displayName = "ComponentExample";

export default ComponentExample;
