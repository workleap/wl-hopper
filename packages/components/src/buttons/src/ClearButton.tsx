import { DismissIcon } from "@hopper-ui/icons";
import { type ForwardedRef, forwardRef } from "react";
import { useContextProps } from "react-aria-components";

import { useLocalizedString } from "../../i18n/index.ts";

import { ClearButtonContext } from "./ClearButtonContext.ts";
import { EmbeddedButton, type EmbeddedButtonProps } from "./EmbeddedButton.tsx";

export const GlobalClearButtonCssSelector = "hop-ClearButton";

export interface ClearButtonProps extends EmbeddedButtonProps {}

function ClearButton(props: ClearButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    [props, ref] = useContextProps(props, ref, ClearButtonContext);
    const stringFormatter = useLocalizedString();

    const {
        "aria-label": ariaLabel = stringFormatter.format("ClearButton.clearAriaLabel"),
        size = "md",
        ...otherProps
    } = props;

    return (
        <EmbeddedButton ref={ref} aria-label={ariaLabel} size={size} {...otherProps}>
            <DismissIcon />
        </EmbeddedButton>
    );
}

/**
 * ClearButtons are used to initialize an action. ClearButton labels express what action will occur when the user interacts with it.
 */
const _ClearButton = forwardRef<HTMLButtonElement, ClearButtonProps>(ClearButton);

_ClearButton.displayName = "ClearButton";

export { _ClearButton as ClearButton };
