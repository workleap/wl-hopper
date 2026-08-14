import { type StyledComponentProps, useStyledSystem } from "@hopper-ui/styled-system";
import clsx from "clsx";
import { type CSSProperties, type ForwardedRef, type KeyboardEvent, type ReactNode, forwardRef } from "react";
import { FocusScope, useKeyboard } from "react-aria";
import { useContextProps } from "react-aria-components";

import { ButtonGroup, CloseButton } from "../../buttons/index.ts";
import { useLocalizedString } from "../../i18n/index.ts";
import { type BaseComponentDOMProps, cssModule } from "../../utils/index.ts";

import { ActionBarContext } from "./ActionBarContext.ts";

import styles from "./ActionBar.module.css";

export const GlobalActionBarCssSelector = "hop-ActionBar";

export interface ActionBarSelectionTextValues {
    /**
     * The number of selected items the ActionBar is linked to.
     */
    selectedItemCount: number | "all";
}

export interface ActionBarProps extends StyledComponentProps<BaseComponentDOMProps> {
    /**
     * The action buttons to display.
     */
    children: ReactNode;
    /**
     * The number of selected items the ActionBar is linked to. When 0, the ActionBar is hidden.
     * @default 0
     */
    selectedItemCount?: number | "all";
    /**
     * Replaces the whole selection sentence, for collections whose items aren't generically named
     * ("3 people selected"). Accepts a node, or a function receiving the count. The consumer owns
     * pluralization and grammatical agreement in each locale they support.
     */
    selectionText?: ReactNode | ((values: ActionBarSelectionTextValues) => ReactNode);
    /**
     * Handler called when the ActionBar's close button is pressed, or the Escape key is pressed.
     */
    onClearSelection?: () => void;
    /**
     * Handler called when a key is pressed while focus is within the ActionBar.
     */
    onKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

function ActionBar(props: ActionBarProps, ref: ForwardedRef<HTMLDivElement>) {
    [props, ref] = useContextProps(props, ref, ActionBarContext);
    const stringFormatter = useLocalizedString();

    const { stylingProps, ...ownProps } = useStyledSystem(props);
    const {
        children,
        className,
        style,
        slot,
        selectedItemCount = 0,
        selectionText,
        onClearSelection,
        onKeyDown,
        ...otherProps
    } = ownProps;

    const { keyboardProps } = useKeyboard({
        onKeyDown: event => {
            if (event.key === "Escape") {
                onClearSelection?.();
            } else {
                event.continuePropagation();
            }
        }
    });

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);
        keyboardProps.onKeyDown?.(event);
    };

    if (selectedItemCount === 0) {
        return null;
    }

    const resolvedSelectionText =
        selectionText !== undefined
            ? typeof selectionText === "function"
                ? selectionText({ selectedItemCount })
                : selectionText
            : selectedItemCount === "all"
              ? stringFormatter.format("ActionBar.selectedAll")
              : stringFormatter.format("ActionBar.selected", { count: selectedItemCount });

    const classNames = clsx(
        GlobalActionBarCssSelector,
        cssModule(styles, "hop-ActionBar"),
        stylingProps.className,
        className
    );

    const mergedStyles: CSSProperties = {
        ...stylingProps.style,
        ...style
    };

    return (
        <FocusScope restoreFocus>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- the keydown listener only observes Escape bubbling from focusable children to clear the selection; the container itself isn't interactive. */}
            <div
                role="group"
                {...otherProps}
                ref={ref}
                className={classNames}
                style={mergedStyles}
                slot={slot ?? undefined}
                onKeyDown={handleKeyDown}
            >
                <div className={cssModule(styles, "hop-ActionBar__selection")}>
                    <CloseButton
                        className={cssModule(styles, "hop-ActionBar__close-button")}
                        aria-label={stringFormatter.format("ActionBar.clearSelectionAriaLabel")}
                        onPress={onClearSelection}
                    />
                    <span aria-live="polite" className={cssModule(styles, "hop-ActionBar__text")}>
                        {resolvedSelectionText}
                    </span>
                </div>
                <ButtonGroup size="sm" className={cssModule(styles, "hop-ActionBar__actions")}>
                    {children}
                </ButtonGroup>
            </div>
        </FocusScope>
    );
}

/**
 * An action bar shows contextual actions for the items a user has currently selected in a collection.
 *
 * [View Documentation](https://hopper.workleap.design/components/ActionBar)
 */
const _ActionBar = forwardRef<HTMLDivElement, ActionBarProps>(ActionBar);
_ActionBar.displayName = "ActionBar";

export { _ActionBar as ActionBar };
