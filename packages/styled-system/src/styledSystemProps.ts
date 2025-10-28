// this file will contain handlers for all the style props
import type { Property } from "csstype";
import type { ComponentProps, JSX, JSXElementConstructor } from "react";

import type { ResponsiveProp } from "./responsive/useResponsiveValue.tsx";
import type {
    BackgroundColorValue,
    BorderRadiusValue,
    BorderValue,
    BoxShadowValue,
    ColorValue,
    ColumnGapValue,
    ComplexMarginValue,
    ComplexPaddingValue,
    FillValue,
    FontFamilyValue,
    FontSizeValue,
    FontWeightValue,
    GapValue,
    GridAutoColumnsValue,
    GridAutoRowsValue,
    GridColumSpanValue,
    GridRowSpanValue,
    GridTemplateAreasValue,
    GridTemplateColumnsValue,
    GridTemplateRowsValue,
    HeightValue,
    LineHeightValue,
    OutlineValue,
    RowGapValue,
    SimpleMarginValue,
    SimplePaddingValue,
    StrokeValue,
    UNSAFE_BackgroundColorValue,
    UNSAFE_BorderRadiusValue,
    UNSAFE_BorderValue,
    UNSAFE_BoxShadowValue,
    UNSAFE_ColorValue,
    UNSAFE_ComplexMarginValue,
    UNSAFE_ComplexPaddingValue,
    UNSAFE_FillValue,
    UNSAFE_FontFamilyValue,
    UNSAFE_FontSizeValue,
    UNSAFE_FontWeightValue,
    UNSAFE_GapValue,
    UNSAFE_GridAutoColumnsValue,
    UNSAFE_GridAutoRowsValue,
    UNSAFE_GridTemplateColumnsValue,
    UNSAFE_GridTemplateRowsValue,
    UNSAFE_HeightValue,
    UNSAFE_LineHeightValue,
    UNSAFE_OutlineValue,
    UNSAFE_RowGapValue,
    UNSAFE_SimpleMarginValue,
    UNSAFE_SimplePaddingValue,
    UNSAFE_StrokeValue,
    UNSAFE_WidthValue,
    WidthValue
} from "./tokens/tokenMappings.ts";

export const UnsafePrefix = "UNSAFE_";

export interface StyledSystemProps extends UnsafeStyledSystemProps {
    /**
   * Sets the `align-content` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/align-content}
   */
    alignContent?: ResponsiveProp<Property.AlignContent>;

    /**
   * Sets the `align-items` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/align-items}
   */
    alignItems?: ResponsiveProp<Property.AlignItems>;

    /**
   * Sets the `align-self` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/align-self}
   */
    alignSelf?: ResponsiveProp<Property.AlignSelf>;

    /**
   * Sets the `aspect-ratio` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/aspect-ratio}
   */
    aspectRatio?: ResponsiveProp<Property.AspectRatio>;

    /**
     * Sets the `background-color` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_backgroundColor`** property
     */
    backgroundColor?: ResponsiveProp<BackgroundColorValue>;

    /**
     * Sets the `background-color` property when active.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_backgroundColor`** property
     */
    backgroundColorActive?: ResponsiveProp<BackgroundColorValue>;

    /**
     * Sets the `background-color` property when focused.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_backgroundColor`** property
     */
    backgroundColorFocus?: ResponsiveProp<BackgroundColorValue>;

    /**
     * Sets the `background-color` property when hovered.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_backgroundColor`** property
     */
    backgroundColorHover?: ResponsiveProp<BackgroundColorValue>;

    /**
   * Sets the `background-image` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/background-image}
   */
    backgroundImage?: ResponsiveProp<Property.BackgroundImage>;

    /**
   * Sets the `background-position` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/background-position}
   */
    backgroundPosition?: ResponsiveProp<Property.BackgroundPosition>;

    /**
   * Sets the `background-repeat` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/background-repeat}
   */
    backgroundRepeat?: ResponsiveProp<Property.BackgroundRepeat>;

    /**
   * Sets the `background-size` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/background-size}
   */
    backgroundSize?: ResponsiveProp<Property.BackgroundSize>;

    /**
     * Sets the `border` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_border`** property
     */
    border?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border` property when active.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_border`** property
     */
    borderActive?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-bottom` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderBottom`** property
     */
    borderBottom?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-bottom` property when active.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderBottom`** property
     */
    borderBottomActive?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-bottom` property when focused.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderBottom`** property
     */
    borderBottomFocus?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-bottom` property when hovered.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderBottom`** property
     */
    borderBottomHover?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-bottom-left-radius` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderBottomLeftRadius`** property
     */
    borderBottomLeftRadius?: ResponsiveProp<BorderRadiusValue>;

    /**
     * Sets the `border-bottom-right-radius` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderBottomRightRadius`** property
     */
    borderBottomRightRadius?: ResponsiveProp<BorderRadiusValue>;

    /**
     * Sets the `border` property when focused.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_border`** property
     */
    borderFocus?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border` property when hovered.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_border`** property
     */
    borderHover?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-left` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderLeft`** property
     */
    borderLeft?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-left` property when active.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderLeft`** property
     */
    borderLeftActive?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-left` property when focused.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderLeft`** property
     */
    borderLeftFocus?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-left` property when hovered.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderLeft`** property
     */
    borderLeftHover?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-radius` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderRadius`** property
     */
    borderRadius?: ResponsiveProp<BorderRadiusValue>;

    /**
     * Sets the `border-right` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderRight`** property
     */
    borderRight?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-right` property when active.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderRight`** property
     */
    borderRightActive?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-right` property when focused.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderRight`** property
     */
    borderRightFocus?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-right` property when hovered.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderRight`** property
     */
    borderRightHover?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-top` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderTop`** property
     */
    borderTop?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-top` property when active.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderTop`** property
     */
    borderTopActive?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-top` property when focused.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderTop`** property
     */
    borderTopFocus?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-top` property when hovered.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderTop`** property
     */
    borderTopHover?: ResponsiveProp<BorderValue>;

    /**
     * Sets the `border-top-left-radius` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderTopLeftRadius`** property
     */
    borderTopLeftRadius?: ResponsiveProp<BorderRadiusValue>;

    /**
     * Sets the `border-top-right-radius` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_borderTopRightRadius`** property
     */
    borderTopRightRadius?: ResponsiveProp<BorderRadiusValue>;

    /**
   * Sets the `bottom` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/bottom}
   */
    bottom?: ResponsiveProp<Property.Bottom>;

    /**
     * Sets the `box-shadow` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_boxShadow`** property
     */
    boxShadow?: ResponsiveProp<BoxShadowValue>;

    /**
     * Sets the `box-shadow` property when active.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_boxShadow`** property
     */
    boxShadowActive?: ResponsiveProp<BoxShadowValue>;

    /**
     * Sets the `box-shadow` property when focused.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_boxShadow`** property
     */
    boxShadowFocus?: ResponsiveProp<BoxShadowValue>;

    /**
     * Sets the `box-shadow` property when hovered.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_boxShadow`** property
     */
    boxShadowHover?: ResponsiveProp<BoxShadowValue>;

    /**
     * Sets the `color` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_color`** property
     */
    color?: ResponsiveProp<ColorValue>;

    /**
     * Sets the `color` property when active.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_color`** property
     */
    colorActive?: ResponsiveProp<ColorValue>;

    /**
     * Sets the `color` property when focused.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_color`** property
     */
    colorFocus?: ResponsiveProp<ColorValue>;

    /**
     * Sets the `color` property when hovered.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_color`** property
     */
    colorHover?: ResponsiveProp<ColorValue>;

    /**
     * Sets the `column-gap` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_columnGap`** property
     */
    columnGap?: ResponsiveProp<ColumnGapValue>;

    /**
   * Sets the `content` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/content}
   */
    content?: ResponsiveProp<Property.Content>;

    /**
   * Sets the `content-visibility` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/content-visibility}
   */
    contentVisibility?: ResponsiveProp<Property.ContentVisibility>;

    /**
   * Sets the `cursor` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/cursor}
   */
    cursor?: ResponsiveProp<Property.Cursor>;

    /**
   * Sets the `cursor` property when hovered.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/cursor}
   */
    cursorHover?: ResponsiveProp<Property.Cursor>;

    /**
   * Sets the `display` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/display}
   */
    display?: ResponsiveProp<Property.Display>;

    /**
     * Sets the `fill` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_fill`** property
     */
    fill?: ResponsiveProp<FillValue>;

    /**
     * Sets the `fill` property when focused.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_fill`** property
     */
    fillFocus?: ResponsiveProp<FillValue>;

    /**
     * Sets the `fill` property when hovered.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_fill`** property
     */
    fillHover?: ResponsiveProp<FillValue>;

    /**
   * Sets the `filter` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/filter}
   */
    filter?: ResponsiveProp<Property.Filter>;

    /**
   * Sets the `flex` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/flex}
   */
    flex?: ResponsiveProp<Property.Flex>;

    /**
   * Sets the `flex-basis` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/flex-basis}
   */
    flexBasis?: ResponsiveProp<Property.FlexBasis>;

    /**
   * Sets the `flex-direction` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/flex-direction}
   */
    flexDirection?: ResponsiveProp<Property.FlexDirection>;

    /**
   * Sets the `flex-flow` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/flex-flow}
   */
    flexFlow?: ResponsiveProp<Property.FlexFlow>;

    /**
   * Sets the `flex-grow` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/flex-grow}
   */
    flexGrow?: ResponsiveProp<Property.FlexGrow>;

    /**
   * Sets the `flex-shrink` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/flex-shrink}
   */
    flexShrink?: ResponsiveProp<Property.FlexShrink>;

    /**
   * Sets the `flex-wrap` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/flex-wrap}
   */
    flexWrap?: ResponsiveProp<Property.FlexWrap>;

    /**
     * Sets the `font-family` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_fontFamily`** property
     */
    fontFamily?: ResponsiveProp<FontFamilyValue>;

    /**
     * Sets the `font-size` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_fontSize`** property
     */
    fontSize?: ResponsiveProp<FontSizeValue>;

    /**
   * Sets the `font-style` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/font-style}
   */
    fontStyle?: ResponsiveProp<Property.FontStyle>;

    /**
     * Sets the `font-weight` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_fontWeight`** property
     */
    fontWeight?: ResponsiveProp<FontWeightValue>;

    /**
     * Sets the `gap` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_gap`** property
     */
    gap?: ResponsiveProp<GapValue>;

    /**
   * Sets the `grid` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid}
   */
    grid?: ResponsiveProp<Property.Grid>;

    /**
   * Sets the `grid-area` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-area}
   */
    gridArea?: ResponsiveProp<Property.GridArea>;

    /**
     * Sets the `grid-auto-columns` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_gridAutoColumns`** property
     */
    gridAutoColumns?: ResponsiveProp<GridAutoColumnsValue>;

    /**
   * Sets the `grid-auto-flow` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-auto-flow}
   */
    gridAutoFlow?: ResponsiveProp<Property.GridAutoFlow>;

    /**
     * Sets the `grid-auto-rows` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_gridAutoRows`** property
     */
    gridAutoRows?: ResponsiveProp<GridAutoRowsValue>;

    /**
   * Sets the `grid-column` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-column}
   */
    gridColumn?: ResponsiveProp<Property.GridColumn>;

    /**
   * Sets the `grid-column-end` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-column-end}
   */
    gridColumnEnd?: ResponsiveProp<Property.GridColumnEnd>;

    /**
     * Sets the `grid-column-span` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_gridColumnSpan`** property
     */
    gridColumnSpan?: ResponsiveProp<GridColumSpanValue>;

    /**
   * Sets the `grid-column-start` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-column-start}
   */
    gridColumnStart?: ResponsiveProp<Property.GridColumnStart>;

    /**
   * Sets the `grid-row` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-row}
   */
    gridRow?: ResponsiveProp<Property.GridRow>;

    /**
   * Sets the `grid-row-end` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-row-end}
   */
    gridRowEnd?: ResponsiveProp<Property.GridRowEnd>;

    /**
     * Sets the `grid-row-span` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_gridRowSpan`** property
     */
    gridRowSpan?: ResponsiveProp<GridRowSpanValue>;

    /**
   * Sets the `grid-row-start` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-row-start}
   */
    gridRowStart?: ResponsiveProp<Property.GridRowStart>;

    /**
   * Sets the `grid-template` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-template}
   */
    gridTemplate?: ResponsiveProp<Property.GridTemplate>;

    /**
   * Sets the `grid-template-areas` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/grid-template-areas}
   */
    gridTemplateAreas?: ResponsiveProp<GridTemplateAreasValue>;

    /**
     * Sets the `grid-template-columns` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_gridTemplateColumns`** property
     */
    gridTemplateColumns?: ResponsiveProp<GridTemplateColumnsValue>;

    /**
     * Sets the `grid-template-rows` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_gridTemplateRows`** property
     */
    gridTemplateRows?: ResponsiveProp<GridTemplateRowsValue>;

    /**
     * Sets the `height` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_height`** property
     */
    height?: ResponsiveProp<HeightValue>;

    /**
   * Sets the `justify-content` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/justify-content}
   */
    justifyContent?: ResponsiveProp<Property.JustifyContent>;

    /**
   * Sets the `justify-items` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/justify-items}
   */
    justifyItems?: ResponsiveProp<Property.JustifyItems>;

    /**
   * Sets the `justify-self` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/justify-self}
   */
    justifySelf?: ResponsiveProp<Property.JustifySelf>;

    /**
   * Sets the `left` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/left}
   */
    left?: ResponsiveProp<Property.Left>;

    /**
   * Sets the `letter-spacing` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/letter-spacing}
   */
    letterSpacing?: ResponsiveProp<Property.LetterSpacing>;

    /**
     * Sets the `line-height` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_lineHeight`** property
     */
    lineHeight?: ResponsiveProp<LineHeightValue>;

    /**
     * Sets the `margin` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_margin`** property
     */
    margin?: ResponsiveProp<ComplexMarginValue>;

    /**
     * Sets the `margin-bottom` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_marginBottom`** property
     */
    marginBottom?: ResponsiveProp<SimpleMarginValue>;

    /**
     * Sets the `margin-left` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_marginLeft`** property
     */
    marginLeft?: ResponsiveProp<SimpleMarginValue>;

    /**
     * Sets the `margin-right` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_marginRight`** property
     */
    marginRight?: ResponsiveProp<SimpleMarginValue>;

    /**
     * Sets the `margin-top` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_marginTop`** property
     */
    marginTop?: ResponsiveProp<SimpleMarginValue>;

    /**
     * Sets the horizontal margin properties (`margin-left` and `margin-right`).
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_marginX`** property
     */
    marginX?: ResponsiveProp<SimpleMarginValue>;

    /**
     * Sets the vertical margin properties (`margin-top` and `margin-bottom`).
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_marginY`** property
     */
    marginY?: ResponsiveProp<SimpleMarginValue>;

    /**
     * Sets the `max-height` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_maxHeight`** property
     */
    maxHeight?: ResponsiveProp<HeightValue>;

    /**
     * Sets the `max-width` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_maxWidth`** property
     */
    maxWidth?: ResponsiveProp<WidthValue>;

    /**
     * Sets the `min-height` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_minHeight`** property
     */
    minHeight?: ResponsiveProp<HeightValue>;

    /**
     * Sets the `min-width` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_minWidth`** property
     */
    minWidth?: ResponsiveProp<WidthValue>;

    /**
   * Sets the `object-fit` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/object-fit}
   */
    objectFit?: ResponsiveProp<Property.ObjectFit>;

    /**
   * Sets the `object-position` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/object-position}
   */
    objectPosition?: ResponsiveProp<Property.ObjectPosition>;

    /**
   * Sets the `opacity` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/opacity}
   */
    opacity?: ResponsiveProp<Property.Opacity>;

    /**
   * Sets the `opacity` property when active.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/opacity}
   */
    opacityActive?: ResponsiveProp<Property.Opacity>;

    /**
   * Sets the `opacity` property when focused.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/opacity}
   */
    opacityFocus?: ResponsiveProp<Property.Opacity>;

    /**
   * Sets the `opacity` property when hovered.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/opacity}
   */
    opacityHover?: ResponsiveProp<Property.Opacity>;

    /**
   * Sets the `order` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/order}
   */
    order?: ResponsiveProp<Property.Order>;

    /**
   * Sets the `outline` property.
   * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_outline`** property
   */
    outline?: ResponsiveProp<OutlineValue>;

    /**
   * Sets the `outline` property when focused.
   * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_outlineFocus`** property
   */
    outlineFocus?: ResponsiveProp<OutlineValue>;

    /**
   * Sets the `overflow` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/overflow}
   */
    overflow?: ResponsiveProp<Property.Overflow>;

    /**
   * Sets the `overflow-x` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/overflow-x}
   */
    overflowX?: ResponsiveProp<Property.OverflowX>;

    /**
   * Sets the `overflow-y` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/overflow-y}
   */
    overflowY?: ResponsiveProp<Property.OverflowY>;

    /**
     * Sets the `padding` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_padding`** property
     */
    padding?: ResponsiveProp<ComplexPaddingValue>;

    /**
     * Sets the `padding-bottom` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_paddingBottom`** property
     */
    paddingBottom?: ResponsiveProp<SimplePaddingValue>;

    /**
     * Sets the `padding-left` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_paddingLeft`** property
     */
    paddingLeft?: ResponsiveProp<SimplePaddingValue>;

    /**
     * Sets the `padding-right` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_paddingRight`** property
     */
    paddingRight?: ResponsiveProp<SimplePaddingValue>;

    /**
     * Sets the `padding-top` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_paddingTop`** property
     */
    paddingTop?: ResponsiveProp<SimplePaddingValue>;

    /**
     * Sets the horizontal padding properties (`padding-left` and `padding-right`).
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_paddingX`** property
     */
    paddingX?: ResponsiveProp<SimplePaddingValue>;

    /**
     * Sets the vertical padding properties (`padding-top` and `padding-bottom`).
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_paddingY`** property
     */
    paddingY?: ResponsiveProp<SimplePaddingValue>;

    /**
   * Sets the `pointer-events` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/pointer-events}
   */
    pointerEvents?: ResponsiveProp<Property.PointerEvents>;

    /**
   * Sets the `position` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/position}
   */
    position?: ResponsiveProp<Property.Position>;

    /**
   * Sets the `resize` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/resize}
   */
    resize?: ResponsiveProp<Property.Resize>;

    /**
   * Sets the `right` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/right}
   */
    right?: ResponsiveProp<Property.Right>;

    /**
     * Sets the `row-gap` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_rowGap`** property
     */
    rowGap?: ResponsiveProp<RowGapValue>;

    /**
     * Sets the `stroke` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_stroke`** property
     */
    stroke?: ResponsiveProp<StrokeValue>;

    /**
   * Sets the `text-align` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/text-align}
   */
    textAlign?: ResponsiveProp<Property.TextAlign | "justify-all">;

    /**
   * Sets the `text-decoration` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/text-decoration}
   */
    textDecoration?: ResponsiveProp<Property.TextDecoration>;

    /**
   * Sets the `text-overflow` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/text-overflow}
   */
    textOverflow?: ResponsiveProp<Property.TextOverflow>;

    /**
   * Sets the `text-transform` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/text-transform}
   */
    textTransform?: ResponsiveProp<Property.TextTransform>;

    /**
   * Sets the `top` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/top}
   */
    top?: ResponsiveProp<Property.Top>;

    /**
   * Sets the `transform` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/transform}
   */
    transform?: ResponsiveProp<Property.Transform>;

    /**
   * Sets the `transform-origin` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/transform-origin}
   */
    transformOrigin?: ResponsiveProp<Property.TransformOrigin>;

    /**
   * Sets the `transform-style` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/transform-style}
   */
    transformStyle?: ResponsiveProp<Property.TransformStyle>;

    /**
   * Sets the `transition` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/transition}
   */
    transition?: ResponsiveProp<Property.Transition>;

    /**
   * Sets the `vertical-align` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/vertical-align}
   */
    verticalAlign?: ResponsiveProp<Property.VerticalAlign>;

    /**
   * Sets the `visibility` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/visibility}
   */
    visibility?: ResponsiveProp<Property.Visibility>;

    /**
   * Sets the `white-space` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/white-space}
   */
    whiteSpace?: ResponsiveProp<Property.WhiteSpace>;

    /**
     * Sets the `width` property.
     * This property only accept **token values** from the **SCALE**. To specify any other values, use the **`UNSAFE_width`** property
     */
    width?: ResponsiveProp<WidthValue>;

    /**
   * Sets the `will-change` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/will-change}
   */
    willChange?: ResponsiveProp<Property.WillChange>;

    /**
   * Sets the `word-break` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/word-break}
   */
    wordBreak?: ResponsiveProp<Property.WordBreak>;

    /**
   * Sets the `z-index` property.
   * @see {@link https://developer.mozilla.org/docs/Web/CSS/z-index}
   */
    zIndex?: ResponsiveProp<Property.ZIndex>;
}

export interface UnsafeStyledSystemProps {
    /**
     * Sets the `background-color` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`backgroundColor`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_backgroundColor?: ResponsiveProp<UNSAFE_BackgroundColorValue>;

    /**
     * Sets the `background-color` property when active.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`backgroundColorActive`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_backgroundColorActive?: ResponsiveProp<UNSAFE_BackgroundColorValue>;

    /**
     * Sets the `background-color` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`backgroundColorFocus`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_backgroundColorFocus?: ResponsiveProp<UNSAFE_BackgroundColorValue>;

    /**
     * Sets the `background-color` property when hovered.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`backgroundColorHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_backgroundColorHover?: ResponsiveProp<UNSAFE_BackgroundColorValue>;

    /**
     * Sets the `border` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`border`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_border?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border` property when active.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderActive`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderActive?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-bottom` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderBottom`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderBottom?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-bottom` property when active.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderBottomActive`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderBottomActive?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-bottom` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderBottomFocus`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderBottomFocus?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-bottom` property when hovered.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderBottomHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderBottomHover?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-bottom-left-radius` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderBottomLeftRadius`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderBottomLeftRadius?: ResponsiveProp<UNSAFE_BorderRadiusValue>;

    /**
     * Sets the `border-bottom-right-radius` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderBottomRightRadius`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderBottomRightRadius?: ResponsiveProp<UNSAFE_BorderRadiusValue>;

    /**
     * Sets the `border` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderFocus`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderFocus?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border` property when hovered.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderHover?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-left` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderLeft`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderLeft?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-left` property when active.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderLeftActive`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderLeftActive?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-left` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderLeftFocus`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderLeftFocus?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-left` property when hovered.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderLeftHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderLeftHover?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-radius` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderRadius`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderRadius?: ResponsiveProp<UNSAFE_BorderRadiusValue>;

    /**
     * Sets the `border-right` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderRight`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderRight?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-right` property when active.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderRightActive`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderRightActive?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-right` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderRightFocus`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderRightFocus?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-right` property when hovered.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderRightHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderRightHover?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-top` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderTop`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderTop?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-top` property when active.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderTopActive`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderTopActive?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-top` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderTopFocus`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderTopFocus?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-top` property when hovered.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderTopHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderTopHover?: ResponsiveProp<UNSAFE_BorderValue>;

    /**
     * Sets the `border-top-left-radius` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderTopLeftRadius`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderTopLeftRadius?: ResponsiveProp<UNSAFE_BorderRadiusValue>;

    /**
     * Sets the `border-top-right-radius` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`borderTopRightRadius`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_borderTopRightRadius?: ResponsiveProp<UNSAFE_BorderRadiusValue>;

    /**
     * Sets the `box-shadow` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`boxShadow`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_boxShadow?: ResponsiveProp<UNSAFE_BoxShadowValue>;
    /**
     * Sets the `box-shadow` property when active.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`boxShadowActive`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_boxShadowActive?: ResponsiveProp<UNSAFE_BoxShadowValue>;
    /**
     * Sets the `box-shadow` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`boxShadowFocus`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_boxShadowFocus?: ResponsiveProp<UNSAFE_BoxShadowValue>;
    /**
     * Sets the `box-shadow` property when hovered.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`boxShadowHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_boxShadowHover?: ResponsiveProp<UNSAFE_BoxShadowValue>;
    /**
     * Sets the `color` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`color`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_color?: ResponsiveProp<UNSAFE_ColorValue>;
    /**
     * Sets the `color` property when active.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`colorActive`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_colorActive?: ResponsiveProp<UNSAFE_ColorValue>;
    /**
     * Sets the `color` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`colorFocus`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_colorFocus?: ResponsiveProp<UNSAFE_ColorValue>;
    /**
     * Sets the `color` property when hovered.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`colorHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_colorHover?: ResponsiveProp<UNSAFE_ColorValue>;
    /**
     * Sets the `column-gap` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`columnGap`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_columnGap?: ResponsiveProp<UNSAFE_GapValue>;

    /**
     * Sets the `fill` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`fill`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_fill?: ResponsiveProp<UNSAFE_FillValue>;
    /**
     * Sets the `fill` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`fillFocus`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_fillFocus?: ResponsiveProp<UNSAFE_FillValue>;
    /**
     * Sets the `fill` property when hovered.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`fillHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_fillHover?: ResponsiveProp<UNSAFE_FillValue>;
    /**
     * Sets the `font-family` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`fontFamily`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_fontFamily?: ResponsiveProp<UNSAFE_FontFamilyValue>;

    /**
     * Sets the `font-size` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`fontSize`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_fontSize?: ResponsiveProp<UNSAFE_FontSizeValue>;

    /**
     * Sets the `font-weight` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`fontWeight`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_fontWeight?: ResponsiveProp<UNSAFE_FontWeightValue>;

    /**
     * Sets the `gap` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`gap`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_gap?: ResponsiveProp<UNSAFE_GapValue>;

    /**
     * Sets the `grid-auto-columns` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`gridAutoColumns`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_gridAutoColumns?: ResponsiveProp<UNSAFE_GridAutoColumnsValue>;

    /**
     * Sets the `grid-auto-rows` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`gridAutoRows`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_gridAutoRows?: ResponsiveProp<UNSAFE_GridAutoRowsValue>;
    /**
     * Sets the `grid-column-span` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`gridColumnSpan`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_gridColumnSpan?: ResponsiveProp<GridColumSpanValue>;
    /**
     * Sets the `grid-row-span` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`gridRowSpan`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_gridRowSpan?: ResponsiveProp<GridRowSpanValue>;
    /**
     * Sets the `grid-template-columns` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`gridTemplateColumns`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_gridTemplateColumns?: ResponsiveProp<UNSAFE_GridTemplateColumnsValue>;

    /**
     * Sets the `grid-template-rows` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`gridTemplateRows`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_gridTemplateRows?: ResponsiveProp<UNSAFE_GridTemplateRowsValue>;

    /**
     * Sets the `height` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`height`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_height?: ResponsiveProp<UNSAFE_HeightValue>;

    /**
     * Sets the `line-height` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`lineHeight`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_lineHeight?: ResponsiveProp<UNSAFE_LineHeightValue>;

    /**
     * Sets the `margin` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`margin`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_margin?: ResponsiveProp<UNSAFE_ComplexMarginValue>;

    /**
     * Sets the `margin-bottom` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`marginBottom`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_marginBottom?: ResponsiveProp<UNSAFE_SimpleMarginValue>;

    /**
     * Sets the `margin-left` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`marginLeft`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_marginLeft?: ResponsiveProp<UNSAFE_SimpleMarginValue>;

    /**
     * Sets the `margin-right` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`marginRight`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_marginRight?: ResponsiveProp<UNSAFE_SimpleMarginValue>;

    /**
     * Sets the `margin-top` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`marginTop`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_marginTop?: ResponsiveProp<UNSAFE_SimpleMarginValue>;

    /**
     * Sets the horizontal margin (`margin-left` and `margin-right`) property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`marginX`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_marginX?: ResponsiveProp<UNSAFE_SimpleMarginValue>;

    /**
     * Sets the vertical margin (`margin-top` and `margin-bottom`) property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`marginY`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_marginY?: ResponsiveProp<UNSAFE_SimpleMarginValue>;

    /**
     * Sets the `max-height` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`maxHeight`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_maxHeight?: ResponsiveProp<UNSAFE_HeightValue>;

    /**
     * Sets the `max-width` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`maxWidth`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_maxWidth?: ResponsiveProp<UNSAFE_WidthValue>;

    /**
     * Sets the `min-height` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`minHeight`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_minHeight?: ResponsiveProp<UNSAFE_HeightValue>;

    /**
     * Sets the `min-width` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`minWidth`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_minWidth?: ResponsiveProp<UNSAFE_WidthValue>;

    /**
     * Sets the `outline` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`outline`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_outline?: ResponsiveProp<UNSAFE_OutlineValue>;

    /**
     * Sets the `outline` property when focused.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`outlineHover`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_outlineFocus?: ResponsiveProp<UNSAFE_OutlineValue>;

    /**
     * Sets the `padding` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`padding`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_padding?: ResponsiveProp<UNSAFE_ComplexPaddingValue>;

    /**
     * Sets the `padding-bottom` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`paddingBottom`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_paddingBottom?: ResponsiveProp<UNSAFE_SimplePaddingValue>;

    /**
     * Sets the `padding-left` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`paddingLeft`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_paddingLeft?: ResponsiveProp<UNSAFE_SimplePaddingValue>;

    /**
     * Sets the `padding-right` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`paddingRight`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_paddingRight?: ResponsiveProp<UNSAFE_SimplePaddingValue>;

    /**
     * Sets the `padding-top` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`paddingTop`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_paddingTop?: ResponsiveProp<UNSAFE_SimplePaddingValue>;

    /**
     * Sets the horizontal padding (`padding-left` and `padding-right`) property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`paddingX`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_paddingX?: ResponsiveProp<UNSAFE_SimplePaddingValue>;

    /**
     * Sets the vertical padding (`padding-top` and `padding-bottom`) property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`paddingY`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_paddingY?: ResponsiveProp<UNSAFE_SimplePaddingValue>;

    /**
     * Sets the `row-gap` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`rowGap`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_rowGap?: ResponsiveProp<UNSAFE_RowGapValue>;

    /**
     * Sets the `stroke` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`stroke`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_stroke?: ResponsiveProp<UNSAFE_StrokeValue>;

    /**
     * Sets the `width` property.
     *
     * If you want to use a **token value** from the **SCALE**, use the **`width`** property instead.
     *
     * This property is marked as **UNSAFE** because you're opting out of the intended values of the design system.
     */
    UNSAFE_width?: ResponsiveProp<UNSAFE_WidthValue>;
}

export type StyledComponentProps<T>
    = T extends keyof JSX.IntrinsicElements | JSXElementConstructor<unknown> ?
        Omit<ComponentProps<T>, keyof StyledSystemProps> & StyledSystemProps :
        Omit<T, keyof StyledSystemProps> & StyledSystemProps;
