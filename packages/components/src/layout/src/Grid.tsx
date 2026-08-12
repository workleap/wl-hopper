import type { DivProps } from "@hopper-ui/styled-system";
import { Div } from "@hopper-ui/styled-system";
import { type Ref, forwardRef } from "react";

export interface GridProps extends Omit<
    DivProps,
    | "display"
    | "gridAutoRows"
    | "gridTemplateAreas"
    | "gridTemplateColumns"
    | "gridTemplateRows"
    | "gridAutoColumns"
    | "gridAutoFlow"
    | "UNSAFE_gridAutoRows"
    | "UNSAFE_gridTemplateColumns"
    | "UNSAFE_gridTemplateRows"
    | "UNSAFE_gridAutoColumns"
> {
    /**
     * Whether or not the element generate line breaks before or after himself.
     */
    inline?: boolean;

    /**
     * An alias for the css grid-auto-rows property.
     */
    autoRows?: DivProps["gridAutoRows"];

    /**
     * An alias for the css grid-template-areas property.
     */
    areas?: DivProps["gridTemplateAreas"];

    /**
     * An alias for the css grid-template-columns property.
     */
    templateColumns?: DivProps["gridTemplateColumns"];

    /**
     * An alias for the css grid-template-rows property.
     */
    templateRows?: DivProps["gridTemplateRows"];

    /**
     * An alias for the css grid-auto-columns property.
     */
    autoColumns?: DivProps["gridAutoColumns"];

    /**
     * An alias for the css grid-auto-flow property.
     */
    autoFlow?: DivProps["gridAutoFlow"];

    /**
     * An alias for the css grid-auto-rows property.
     */
    UNSAFE_autoRows?: DivProps["UNSAFE_gridAutoRows"];

    /**
     * An alias for the css grid-template-columns property.
     */
    UNSAFE_templateColumns?: DivProps["UNSAFE_gridTemplateColumns"];

    /**
     * An alias for the css grid-template-rows property.
     */
    UNSAFE_templateRows?: DivProps["UNSAFE_gridTemplateRows"];

    /**
     * An alias for the css grid-auto-columns property.
     */
    UNSAFE_autoColumns?: DivProps["UNSAFE_gridAutoColumns"];
}

function Grid(props: GridProps, ref: Ref<HTMLDivElement>) {
    const {
        autoRows,
        areas,
        templateColumns,
        templateRows,
        autoColumns,
        autoFlow,
        inline,
        UNSAFE_autoRows,
        UNSAFE_templateColumns,
        UNSAFE_templateRows,
        UNSAFE_autoColumns,
        ...otherProps
    } = props;

    return (
        <Div
            ref={ref}
            display={inline ? "inline-grid" : "grid"}
            gridAutoRows={autoRows}
            gridTemplateAreas={areas}
            gridTemplateColumns={templateColumns}
            gridTemplateRows={templateRows}
            gridAutoColumns={autoColumns}
            gridAutoFlow={autoFlow}
            UNSAFE_gridAutoRows={UNSAFE_autoRows}
            UNSAFE_gridTemplateColumns={UNSAFE_templateColumns}
            UNSAFE_gridTemplateRows={UNSAFE_templateRows}
            UNSAFE_gridAutoColumns={UNSAFE_autoColumns}
            {...otherProps}
        />
    );
}

/**
 * The Grid component is used to create a grid container and provides some shortcuts for the grid properties.
 *
 * [View Documentation](https://hopper.workleap.design/components/Grid)
 */
const _Grid = forwardRef<HTMLDivElement, GridProps>(Grid);
_Grid.displayName = "Grid";

export { _Grid as Grid };
