---
"@hopper-ui/styled-system": patch
---

Extends some CSS property types

Changes:

- Updated the CssBorder type definition to include DataType.LineStyle.
- Added 0 as a valid value for GridAutoColumnsValue, GridAutoRowsValue, GridTemplateColumnsValue, GridTemplateRowsValue.
- Added additional values such as "-moz-max-content", "-moz-min-content", "-webkit-fit-content" and 0 to HeightValue.
- Added "normal" and 0 to LineHeightValue.
- Added "auto" and 0 to SimpleMarginValue and ComplexMarginValue. Added 0 to SimplePaddingValue and ComplexPaddingValue.
- Added 0 to RowGapValue.
- Added "none" to SizingValue.
- Added 0, "-moz-max-content", "-moz-min-content", "-webkit-fit-content", "-moz-fit-content", "-webkit-max-content", "intrinsic", and "min-intrinsic" to WidthValue.
