// The current pipeline is not configured to build both mcp-server and docs apps (as it would be slow and unnecessary for most cases).
// We keep this lightweight mock of aiFiles.ts to make sure mcp-server tests pass.
// This approach is flaky and should be replaced with a more robust solution in the future.
// Currently we MANUALLY copy the below content from apps/docs/dist/ai-docs/index.ts
// ---------------------------------------------------------------------------------

// Auto-generated file - do not edit manually
const files = {
    "ai": {
        "figmaConventions": {
            "path": "/ai/figma-conventions.md",
            "size": 2124,
            "estimatedTokens": 607
        }
    },
    "changelogs": {
        "path": "/changelogs.md",
        "size": 110659,
        "estimatedTokens": 31617
    },
    "components": {
        "api": {
            "brief": {
                "accordion": {
                    "path": "/components/api/brief/Accordion.json",
                    "size": 12811,
                    "estimatedTokens": 3661
                },
                "alert": {
                    "path": "/components/api/brief/Alert.json",
                    "size": 15134,
                    "estimatedTokens": 4324
                },
                "alertTrigger": {
                    "path": "/components/api/brief/AlertTrigger.json",
                    "size": 781,
                    "estimatedTokens": 224
                },
                "avatar": {
                    "path": "/components/api/brief/Avatar.json",
                    "size": 3850,
                    "estimatedTokens": 1100
                },
                "avatarGroup": {
                    "path": "/components/api/brief/AvatarGroup.json",
                    "size": 3495,
                    "estimatedTokens": 999
                },
                "badge": {
                    "path": "/components/api/brief/Badge.json",
                    "size": 3177,
                    "estimatedTokens": 908
                },
                "box": {
                    "path": "/components/api/brief/Box.json",
                    "size": 310,
                    "estimatedTokens": 89
                },
                "button": {
                    "path": "/components/api/brief/Button.json",
                    "size": 21818,
                    "estimatedTokens": 6234
                },
                "buttonGroup": {
                    "path": "/components/api/brief/ButtonGroup.json",
                    "size": 3710,
                    "estimatedTokens": 1060
                },
                "calendar": {
                    "path": "/components/api/brief/Calendar.json",
                    "size": 16940,
                    "estimatedTokens": 4840
                },
                "callout": {
                    "path": "/components/api/brief/Callout.json",
                    "size": 3239,
                    "estimatedTokens": 926
                },
                "card": {
                    "path": "/components/api/brief/Card.json",
                    "size": 2557,
                    "estimatedTokens": 731
                },
                "checkbox": {
                    "path": "/components/api/brief/Checkbox.json",
                    "size": 20647,
                    "estimatedTokens": 5900
                },
                "checkboxField": {
                    "path": "/components/api/brief/CheckboxField.json",
                    "size": 3158,
                    "estimatedTokens": 903
                },
                "checkboxGroup": {
                    "path": "/components/api/brief/CheckboxGroup.json",
                    "size": 18346,
                    "estimatedTokens": 5242
                },
                "comboBox": {
                    "path": "/components/api/brief/ComboBox.json",
                    "size": 17827,
                    "estimatedTokens": 5094
                },
                "compactCallout": {
                    "path": "/components/api/brief/CompactCallout.json",
                    "size": 3054,
                    "estimatedTokens": 873
                },
                "content": {
                    "path": "/components/api/brief/Content.json",
                    "size": 2337,
                    "estimatedTokens": 668
                },
                "contextualHelp": {
                    "path": "/components/api/brief/ContextualHelp.json",
                    "size": 23366,
                    "estimatedTokens": 6676
                },
                "customModal": {
                    "path": "/components/api/brief/CustomModal.json",
                    "size": 14334,
                    "estimatedTokens": 4096
                },
                "datePicker": {
                    "path": "/components/api/brief/DatePicker.json",
                    "size": 22723,
                    "estimatedTokens": 6493
                },
                "dateRangePicker": {
                    "path": "/components/api/brief/DateRangePicker.json",
                    "size": 23299,
                    "estimatedTokens": 6657
                },
                "disclosure": {
                    "path": "/components/api/brief/Disclosure.json",
                    "size": 12505,
                    "estimatedTokens": 3573
                },
                "disclosureHeader": {
                    "path": "/components/api/brief/DisclosureHeader.json",
                    "size": 1049,
                    "estimatedTokens": 300
                },
                "disclosurePanel": {
                    "path": "/components/api/brief/DisclosurePanel.json",
                    "size": 11394,
                    "estimatedTokens": 3256
                },
                "divider": {
                    "path": "/components/api/brief/Divider.json",
                    "size": 12253,
                    "estimatedTokens": 3501
                },
                "errorMessage": {
                    "path": "/components/api/brief/ErrorMessage.json",
                    "size": 1911,
                    "estimatedTokens": 546
                },
                "flex": {
                    "path": "/components/api/brief/Flex.json",
                    "size": 1776,
                    "estimatedTokens": 508
                },
                "floatingBadge": {
                    "path": "/components/api/brief/FloatingBadge.json",
                    "size": 3092,
                    "estimatedTokens": 884
                },
                "footer": {
                    "path": "/components/api/brief/Footer.json",
                    "size": 2336,
                    "estimatedTokens": 668
                },
                "form": {
                    "path": "/components/api/brief/Form.json",
                    "size": 1019,
                    "estimatedTokens": 292
                },
                "grid": {
                    "path": "/components/api/brief/Grid.json",
                    "size": 2926,
                    "estimatedTokens": 836
                },
                "header": {
                    "path": "/components/api/brief/Header.json",
                    "size": 2336,
                    "estimatedTokens": 668
                },
                "heading": {
                    "path": "/components/api/brief/Heading.json",
                    "size": 826,
                    "estimatedTokens": 236
                },
                "helperMessage": {
                    "path": "/components/api/brief/HelperMessage.json",
                    "size": 800,
                    "estimatedTokens": 229
                },
                "hopperProvider": {
                    "path": "/components/api/brief/HopperProvider.json",
                    "size": 55,
                    "estimatedTokens": 16
                },
                "icon": {
                    "path": "/components/api/brief/Icon.json",
                    "size": 1866,
                    "estimatedTokens": 534
                },
                "iconList": {
                    "path": "/components/api/brief/IconList.json",
                    "size": 2509,
                    "estimatedTokens": 717
                },
                "illustratedMessage": {
                    "path": "/components/api/brief/IllustratedMessage.json",
                    "size": 2567,
                    "estimatedTokens": 734
                },
                "illustration": {
                    "path": "/components/api/brief/Illustration.json",
                    "size": 2818,
                    "estimatedTokens": 806
                },
                "image": {
                    "path": "/components/api/brief/Image.json",
                    "size": 2511,
                    "estimatedTokens": 718
                },
                "inline": {
                    "path": "/components/api/brief/Inline.json",
                    "size": 2119,
                    "estimatedTokens": 606
                },
                "label": {
                    "path": "/components/api/brief/Label.json",
                    "size": 608,
                    "estimatedTokens": 174
                },
                "link": {
                    "path": "/components/api/brief/Link.json",
                    "size": 18862,
                    "estimatedTokens": 5390
                },
                "linkButton": {
                    "path": "/components/api/brief/LinkButton.json",
                    "size": 18732,
                    "estimatedTokens": 5352
                },
                "listBox": {
                    "path": "/components/api/brief/ListBox.json",
                    "size": 19384,
                    "estimatedTokens": 5539
                },
                "listBoxItem": {
                    "path": "/components/api/brief/ListBoxItem.json",
                    "size": 17830,
                    "estimatedTokens": 5095
                },
                "listBoxSection": {
                    "path": "/components/api/brief/ListBoxSection.json",
                    "size": 11558,
                    "estimatedTokens": 3303
                },
                "menu": {
                    "path": "/components/api/brief/Menu.json",
                    "size": 16020,
                    "estimatedTokens": 4578
                },
                "menuItem": {
                    "path": "/components/api/brief/MenuItem.json",
                    "size": 16841,
                    "estimatedTokens": 4812
                },
                "menuSection": {
                    "path": "/components/api/brief/MenuSection.json",
                    "size": 12817,
                    "estimatedTokens": 3662
                },
                "menuTrigger": {
                    "path": "/components/api/brief/MenuTrigger.json",
                    "size": 1862,
                    "estimatedTokens": 532
                },
                "modal": {
                    "path": "/components/api/brief/Modal.json",
                    "size": 14309,
                    "estimatedTokens": 4089
                },
                "modalTrigger": {
                    "path": "/components/api/brief/ModalTrigger.json",
                    "size": 781,
                    "estimatedTokens": 224
                },
                "multiSelect": {
                    "path": "/components/api/brief/MultiSelect.json",
                    "size": 17830,
                    "estimatedTokens": 5095
                },
                "numberField": {
                    "path": "/components/api/brief/NumberField.json",
                    "size": 22780,
                    "estimatedTokens": 6509
                },
                "paragraph": {
                    "path": "/components/api/brief/Paragraph.json",
                    "size": 721,
                    "estimatedTokens": 206
                },
                "passwordField": {
                    "path": "/components/api/brief/PasswordField.json",
                    "size": 26229,
                    "estimatedTokens": 7494
                },
                "popover": {
                    "path": "/components/api/brief/Popover.json",
                    "size": 19205,
                    "estimatedTokens": 5488
                },
                "popoverBase": {
                    "path": "/components/api/brief/PopoverBase.json",
                    "size": 18330,
                    "estimatedTokens": 5238
                },
                "popoverTrigger": {
                    "path": "/components/api/brief/PopoverTrigger.json",
                    "size": 783,
                    "estimatedTokens": 224
                },
                "radio": {
                    "path": "/components/api/brief/Radio.json",
                    "size": 16943,
                    "estimatedTokens": 4841
                },
                "radioGroup": {
                    "path": "/components/api/brief/RadioGroup.json",
                    "size": 18332,
                    "estimatedTokens": 5238
                },
                "rangeCalendar": {
                    "path": "/components/api/brief/RangeCalendar.json",
                    "size": 7452,
                    "estimatedTokens": 2130
                },
                "richIcon": {
                    "path": "/components/api/brief/RichIcon.json",
                    "size": 2100,
                    "estimatedTokens": 600
                },
                "searchField": {
                    "path": "/components/api/brief/SearchField.json",
                    "size": 27224,
                    "estimatedTokens": 7779
                },
                "segmentedControl": {
                    "path": "/components/api/brief/SegmentedControl.json",
                    "size": 3607,
                    "estimatedTokens": 1031
                },
                "segmentedControlItem": {
                    "path": "/components/api/brief/SegmentedControlItem.json",
                    "size": 2717,
                    "estimatedTokens": 777
                },
                "select": {
                    "path": "/components/api/brief/Select.json",
                    "size": 17825,
                    "estimatedTokens": 5093
                },
                "spinner": {
                    "path": "/components/api/brief/Spinner.json",
                    "size": 2564,
                    "estimatedTokens": 733
                },
                "stack": {
                    "path": "/components/api/brief/Stack.json",
                    "size": 2118,
                    "estimatedTokens": 606
                },
                "submenuTrigger": {
                    "path": "/components/api/brief/SubmenuTrigger.json",
                    "size": 449,
                    "estimatedTokens": 129
                },
                "svgImage": {
                    "path": "/components/api/brief/SvgImage.json",
                    "size": 2343,
                    "estimatedTokens": 670
                },
                "switch": {
                    "path": "/components/api/brief/Switch.json",
                    "size": 17411,
                    "estimatedTokens": 4975
                },
                "switchField": {
                    "path": "/components/api/brief/SwitchField.json",
                    "size": 3144,
                    "estimatedTokens": 899
                },
                "tab": {
                    "path": "/components/api/brief/Tab.json",
                    "size": 16572,
                    "estimatedTokens": 4735
                },
                "tabList": {
                    "path": "/components/api/brief/TabList.json",
                    "size": 12590,
                    "estimatedTokens": 3598
                },
                "tabPanel": {
                    "path": "/components/api/brief/TabPanel.json",
                    "size": 12589,
                    "estimatedTokens": 3597
                },
                "tabs": {
                    "path": "/components/api/brief/Tabs.json",
                    "size": 14198,
                    "estimatedTokens": 4057
                },
                "tag": {
                    "path": "/components/api/brief/Tag.json",
                    "size": 17380,
                    "estimatedTokens": 4966
                },
                "tagGroup": {
                    "path": "/components/api/brief/TagGroup.json",
                    "size": 17155,
                    "estimatedTokens": 4902
                },
                "text": {
                    "path": "/components/api/brief/Text.json",
                    "size": 826,
                    "estimatedTokens": 236
                },
                "textArea": {
                    "path": "/components/api/brief/TextArea.json",
                    "size": 28159,
                    "estimatedTokens": 8046
                },
                "textField": {
                    "path": "/components/api/brief/TextField.json",
                    "size": 27657,
                    "estimatedTokens": 7902
                },
                "tile": {
                    "path": "/components/api/brief/Tile.json",
                    "size": 19240,
                    "estimatedTokens": 5498
                },
                "tileGroup": {
                    "path": "/components/api/brief/TileGroup.json",
                    "size": 14212,
                    "estimatedTokens": 4061
                },
                "toggleButton": {
                    "path": "/components/api/brief/ToggleButton.json",
                    "size": 19701,
                    "estimatedTokens": 5629
                },
                "tooltip": {
                    "path": "/components/api/brief/Tooltip.json",
                    "size": 12530,
                    "estimatedTokens": 3580
                },
                "tooltipTrigger": {
                    "path": "/components/api/brief/TooltipTrigger.json",
                    "size": 2876,
                    "estimatedTokens": 822
                },
                "Summary": {
                    "path": "/components/api/brief/_summary.json",
                    "size": 1679,
                    "estimatedTokens": 480
                }
            },
            "full": {
                "accordion": {
                    "path": "/components/api/full/Accordion.json",
                    "size": 89527,
                    "estimatedTokens": 25580
                },
                "alert": {
                    "path": "/components/api/full/Alert.json",
                    "size": 91850,
                    "estimatedTokens": 26243
                },
                "alertTrigger": {
                    "path": "/components/api/full/AlertTrigger.json",
                    "size": 781,
                    "estimatedTokens": 224
                },
                "avatar": {
                    "path": "/components/api/full/Avatar.json",
                    "size": 80632,
                    "estimatedTokens": 23038
                },
                "avatarGroup": {
                    "path": "/components/api/full/AvatarGroup.json",
                    "size": 80277,
                    "estimatedTokens": 22937
                },
                "badge": {
                    "path": "/components/api/full/Badge.json",
                    "size": 79959,
                    "estimatedTokens": 22846
                },
                "box": {
                    "path": "/components/api/full/Box.json",
                    "size": 77153,
                    "estimatedTokens": 22044
                },
                "button": {
                    "path": "/components/api/full/Button.json",
                    "size": 98534,
                    "estimatedTokens": 28153
                },
                "buttonGroup": {
                    "path": "/components/api/full/ButtonGroup.json",
                    "size": 80492,
                    "estimatedTokens": 22998
                },
                "calendar": {
                    "path": "/components/api/full/Calendar.json",
                    "size": 93656,
                    "estimatedTokens": 26759
                },
                "callout": {
                    "path": "/components/api/full/Callout.json",
                    "size": 80021,
                    "estimatedTokens": 22864
                },
                "card": {
                    "path": "/components/api/full/Card.json",
                    "size": 79339,
                    "estimatedTokens": 22669
                },
                "checkbox": {
                    "path": "/components/api/full/Checkbox.json",
                    "size": 97363,
                    "estimatedTokens": 27818
                },
                "checkboxField": {
                    "path": "/components/api/full/CheckboxField.json",
                    "size": 79940,
                    "estimatedTokens": 22840
                },
                "checkboxGroup": {
                    "path": "/components/api/full/CheckboxGroup.json",
                    "size": 95062,
                    "estimatedTokens": 27161
                },
                "comboBox": {
                    "path": "/components/api/full/ComboBox.json",
                    "size": 94604,
                    "estimatedTokens": 27030
                },
                "compactCallout": {
                    "path": "/components/api/full/CompactCallout.json",
                    "size": 79836,
                    "estimatedTokens": 22811
                },
                "content": {
                    "path": "/components/api/full/Content.json",
                    "size": 79119,
                    "estimatedTokens": 22606
                },
                "contextualHelp": {
                    "path": "/components/api/full/ContextualHelp.json",
                    "size": 100082,
                    "estimatedTokens": 28595
                },
                "customModal": {
                    "path": "/components/api/full/CustomModal.json",
                    "size": 91050,
                    "estimatedTokens": 26015
                },
                "datePicker": {
                    "path": "/components/api/full/DatePicker.json",
                    "size": 99439,
                    "estimatedTokens": 28412
                },
                "dateRangePicker": {
                    "path": "/components/api/full/DateRangePicker.json",
                    "size": 100015,
                    "estimatedTokens": 28576
                },
                "disclosure": {
                    "path": "/components/api/full/Disclosure.json",
                    "size": 89221,
                    "estimatedTokens": 25492
                },
                "disclosureHeader": {
                    "path": "/components/api/full/DisclosureHeader.json",
                    "size": 77892,
                    "estimatedTokens": 22255
                },
                "disclosurePanel": {
                    "path": "/components/api/full/DisclosurePanel.json",
                    "size": 88171,
                    "estimatedTokens": 25192
                },
                "divider": {
                    "path": "/components/api/full/Divider.json",
                    "size": 88969,
                    "estimatedTokens": 25420
                },
                "errorMessage": {
                    "path": "/components/api/full/ErrorMessage.json",
                    "size": 78754,
                    "estimatedTokens": 22502
                },
                "flex": {
                    "path": "/components/api/full/Flex.json",
                    "size": 77068,
                    "estimatedTokens": 22020
                },
                "floatingBadge": {
                    "path": "/components/api/full/FloatingBadge.json",
                    "size": 79874,
                    "estimatedTokens": 22822
                },
                "footer": {
                    "path": "/components/api/full/Footer.json",
                    "size": 79118,
                    "estimatedTokens": 22606
                },
                "form": {
                    "path": "/components/api/full/Form.json",
                    "size": 1019,
                    "estimatedTokens": 292
                },
                "grid": {
                    "path": "/components/api/full/Grid.json",
                    "size": 75765,
                    "estimatedTokens": 21648
                },
                "header": {
                    "path": "/components/api/full/Header.json",
                    "size": 79118,
                    "estimatedTokens": 22606
                },
                "heading": {
                    "path": "/components/api/full/Heading.json",
                    "size": 77669,
                    "estimatedTokens": 22192
                },
                "helperMessage": {
                    "path": "/components/api/full/HelperMessage.json",
                    "size": 77643,
                    "estimatedTokens": 22184
                },
                "hopperProvider": {
                    "path": "/components/api/full/HopperProvider.json",
                    "size": 55,
                    "estimatedTokens": 16
                },
                "icon": {
                    "path": "/components/api/full/Icon.json",
                    "size": 78648,
                    "estimatedTokens": 22471
                },
                "iconList": {
                    "path": "/components/api/full/IconList.json",
                    "size": 79291,
                    "estimatedTokens": 22655
                },
                "illustratedMessage": {
                    "path": "/components/api/full/IllustratedMessage.json",
                    "size": 79349,
                    "estimatedTokens": 22672
                },
                "illustration": {
                    "path": "/components/api/full/Illustration.json",
                    "size": 79600,
                    "estimatedTokens": 22743
                },
                "image": {
                    "path": "/components/api/full/Image.json",
                    "size": 79293,
                    "estimatedTokens": 22656
                },
                "inline": {
                    "path": "/components/api/full/Inline.json",
                    "size": 76877,
                    "estimatedTokens": 21965
                },
                "label": {
                    "path": "/components/api/full/Label.json",
                    "size": 77451,
                    "estimatedTokens": 22129
                },
                "link": {
                    "path": "/components/api/full/Link.json",
                    "size": 95578,
                    "estimatedTokens": 27308
                },
                "linkButton": {
                    "path": "/components/api/full/LinkButton.json",
                    "size": 95448,
                    "estimatedTokens": 27271
                },
                "listBox": {
                    "path": "/components/api/full/ListBox.json",
                    "size": 96100,
                    "estimatedTokens": 27458
                },
                "listBoxItem": {
                    "path": "/components/api/full/ListBoxItem.json",
                    "size": 94607,
                    "estimatedTokens": 27031
                },
                "listBoxSection": {
                    "path": "/components/api/full/ListBoxSection.json",
                    "size": 88335,
                    "estimatedTokens": 25239
                },
                "menu": {
                    "path": "/components/api/full/Menu.json",
                    "size": 92736,
                    "estimatedTokens": 26496
                },
                "menuItem": {
                    "path": "/components/api/full/MenuItem.json",
                    "size": 93618,
                    "estimatedTokens": 26748
                },
                "menuSection": {
                    "path": "/components/api/full/MenuSection.json",
                    "size": 89594,
                    "estimatedTokens": 25599
                },
                "menuTrigger": {
                    "path": "/components/api/full/MenuTrigger.json",
                    "size": 1862,
                    "estimatedTokens": 532
                },
                "modal": {
                    "path": "/components/api/full/Modal.json",
                    "size": 91025,
                    "estimatedTokens": 26008
                },
                "modalTrigger": {
                    "path": "/components/api/full/ModalTrigger.json",
                    "size": 781,
                    "estimatedTokens": 224
                },
                "multiSelect": {
                    "path": "/components/api/full/MultiSelect.json",
                    "size": 94607,
                    "estimatedTokens": 27031
                },
                "numberField": {
                    "path": "/components/api/full/NumberField.json",
                    "size": 99496,
                    "estimatedTokens": 28428
                },
                "paragraph": {
                    "path": "/components/api/full/Paragraph.json",
                    "size": 77564,
                    "estimatedTokens": 22162
                },
                "passwordField": {
                    "path": "/components/api/full/PasswordField.json",
                    "size": 102945,
                    "estimatedTokens": 29413
                },
                "popover": {
                    "path": "/components/api/full/Popover.json",
                    "size": 95921,
                    "estimatedTokens": 27406
                },
                "popoverBase": {
                    "path": "/components/api/full/PopoverBase.json",
                    "size": 95046,
                    "estimatedTokens": 27156
                },
                "popoverTrigger": {
                    "path": "/components/api/full/PopoverTrigger.json",
                    "size": 783,
                    "estimatedTokens": 224
                },
                "radio": {
                    "path": "/components/api/full/Radio.json",
                    "size": 93659,
                    "estimatedTokens": 26760
                },
                "radioGroup": {
                    "path": "/components/api/full/RadioGroup.json",
                    "size": 95048,
                    "estimatedTokens": 27157
                },
                "rangeCalendar": {
                    "path": "/components/api/full/RangeCalendar.json",
                    "size": 84234,
                    "estimatedTokens": 24067
                },
                "richIcon": {
                    "path": "/components/api/full/RichIcon.json",
                    "size": 78882,
                    "estimatedTokens": 22538
                },
                "searchField": {
                    "path": "/components/api/full/SearchField.json",
                    "size": 103940,
                    "estimatedTokens": 29698
                },
                "segmentedControl": {
                    "path": "/components/api/full/SegmentedControl.json",
                    "size": 80389,
                    "estimatedTokens": 22969
                },
                "segmentedControlItem": {
                    "path": "/components/api/full/SegmentedControlItem.json",
                    "size": 79499,
                    "estimatedTokens": 22714
                },
                "select": {
                    "path": "/components/api/full/Select.json",
                    "size": 94602,
                    "estimatedTokens": 27030
                },
                "spinner": {
                    "path": "/components/api/full/Spinner.json",
                    "size": 79346,
                    "estimatedTokens": 22671
                },
                "stack": {
                    "path": "/components/api/full/Stack.json",
                    "size": 76876,
                    "estimatedTokens": 21965
                },
                "submenuTrigger": {
                    "path": "/components/api/full/SubmenuTrigger.json",
                    "size": 449,
                    "estimatedTokens": 129
                },
                "svgImage": {
                    "path": "/components/api/full/SvgImage.json",
                    "size": 79125,
                    "estimatedTokens": 22608
                },
                "switch": {
                    "path": "/components/api/full/Switch.json",
                    "size": 94127,
                    "estimatedTokens": 26894
                },
                "switchField": {
                    "path": "/components/api/full/SwitchField.json",
                    "size": 79926,
                    "estimatedTokens": 22836
                },
                "tab": {
                    "path": "/components/api/full/Tab.json",
                    "size": 93288,
                    "estimatedTokens": 26654
                },
                "tabList": {
                    "path": "/components/api/full/TabList.json",
                    "size": 89306,
                    "estimatedTokens": 25516
                },
                "tabPanel": {
                    "path": "/components/api/full/TabPanel.json",
                    "size": 89305,
                    "estimatedTokens": 25516
                },
                "tabs": {
                    "path": "/components/api/full/Tabs.json",
                    "size": 90914,
                    "estimatedTokens": 25976
                },
                "tag": {
                    "path": "/components/api/full/Tag.json",
                    "size": 94157,
                    "estimatedTokens": 26902
                },
                "tagGroup": {
                    "path": "/components/api/full/TagGroup.json",
                    "size": 93871,
                    "estimatedTokens": 26821
                },
                "text": {
                    "path": "/components/api/full/Text.json",
                    "size": 77669,
                    "estimatedTokens": 22192
                },
                "textArea": {
                    "path": "/components/api/full/TextArea.json",
                    "size": 104875,
                    "estimatedTokens": 29965
                },
                "textField": {
                    "path": "/components/api/full/TextField.json",
                    "size": 104373,
                    "estimatedTokens": 29821
                },
                "tile": {
                    "path": "/components/api/full/Tile.json",
                    "size": 95956,
                    "estimatedTokens": 27416
                },
                "tileGroup": {
                    "path": "/components/api/full/TileGroup.json",
                    "size": 90928,
                    "estimatedTokens": 25980
                },
                "toggleButton": {
                    "path": "/components/api/full/ToggleButton.json",
                    "size": 96417,
                    "estimatedTokens": 27548
                },
                "tooltip": {
                    "path": "/components/api/full/Tooltip.json",
                    "size": 89246,
                    "estimatedTokens": 25499
                },
                "tooltipTrigger": {
                    "path": "/components/api/full/TooltipTrigger.json",
                    "size": 2876,
                    "estimatedTokens": 822
                },
                "Summary": {
                    "path": "/components/api/full/_summary.json",
                    "size": 1679,
                    "estimatedTokens": 480
                }
            }
        },
        "concepts": {
            "clientSideRouting": {
                "path": "/components/concepts/client-side-routing.md",
                "size": 5968,
                "estimatedTokens": 1706
            },
            "colorSchemes": {
                "path": "/components/concepts/color-schemes.md",
                "size": 4954,
                "estimatedTokens": 1416
            },
            "controlledMode": {
                "path": "/components/concepts/controlled-mode.md",
                "size": 3846,
                "estimatedTokens": 1099
            },
            "forms": {
                "path": "/components/concepts/forms.md",
                "size": 10973,
                "estimatedTokens": 3136
            },
            "index": {
                "path": "/components/concepts/index.md",
                "size": 50034,
                "estimatedTokens": 14296
            },
            "internationalization": {
                "path": "/components/concepts/internationalization.md",
                "size": 2270,
                "estimatedTokens": 649
            },
            "layout": {
                "path": "/components/concepts/layout.md",
                "size": 9817,
                "estimatedTokens": 2805
            },
            "slots": {
                "path": "/components/concepts/slots.md",
                "size": 8575,
                "estimatedTokens": 2450
            },
            "styledSystem": {
                "path": "/components/concepts/styled-system.md",
                "size": 1109,
                "estimatedTokens": 317
            },
            "theming": {
                "path": "/components/concepts/theming.md",
                "size": 2310,
                "estimatedTokens": 660
            }
        },
        "full": {
            "a": {
                "path": "/components/full/A.md",
                "size": 513,
                "estimatedTokens": 147
            },
            "accordion": {
                "path": "/components/full/Accordion.md",
                "size": 30495,
                "estimatedTokens": 8713
            },
            "address": {
                "path": "/components/full/Address.md",
                "size": 646,
                "estimatedTokens": 185
            },
            "alert": {
                "path": "/components/full/Alert.md",
                "size": 28681,
                "estimatedTokens": 8195
            },
            "article": {
                "path": "/components/full/Article.md",
                "size": 712,
                "estimatedTokens": 204
            },
            "aside": {
                "path": "/components/full/Aside.md",
                "size": 702,
                "estimatedTokens": 201
            },
            "avatar": {
                "path": "/components/full/Avatar.md",
                "size": 21833,
                "estimatedTokens": 6238
            },
            "badge": {
                "path": "/components/full/Badge.md",
                "size": 7637,
                "estimatedTokens": 2182
            },
            "box": {
                "path": "/components/full/Box.md",
                "size": 3970,
                "estimatedTokens": 1135
            },
            "button": {
                "path": "/components/full/Button.md",
                "size": 52309,
                "estimatedTokens": 14946
            },
            "buttonGroup": {
                "path": "/components/full/ButtonGroup.md",
                "size": 9437,
                "estimatedTokens": 2697
            },
            "calendar": {
                "path": "/components/full/Calendar.md",
                "size": 28413,
                "estimatedTokens": 8118
            },
            "callout": {
                "path": "/components/full/Callout.md",
                "size": 9912,
                "estimatedTokens": 2832
            },
            "card": {
                "path": "/components/full/Card.md",
                "size": 15338,
                "estimatedTokens": 4383
            },
            "checkbox": {
                "path": "/components/full/Checkbox.md",
                "size": 48811,
                "estimatedTokens": 13946
            },
            "checkboxGroup": {
                "path": "/components/full/CheckboxGroup.md",
                "size": 33817,
                "estimatedTokens": 9662
            },
            "comboBox": {
                "path": "/components/full/ComboBox.md",
                "size": 95476,
                "estimatedTokens": 27279
            },
            "compactCallout": {
                "path": "/components/full/CompactCallout.md",
                "size": 7892,
                "estimatedTokens": 2255
            },
            "content": {
                "path": "/components/full/Content.md",
                "size": 3281,
                "estimatedTokens": 938
            },
            "contextualHelp": {
                "path": "/components/full/ContextualHelp.md",
                "size": 41933,
                "estimatedTokens": 11981
            },
            "datePicker": {
                "path": "/components/full/DatePicker.md",
                "size": 35996,
                "estimatedTokens": 10285
            },
            "dateRangePicker": {
                "path": "/components/full/DateRangePicker.md",
                "size": 40072,
                "estimatedTokens": 11450
            },
            "disclosure": {
                "path": "/components/full/Disclosure.md",
                "size": 35309,
                "estimatedTokens": 10089
            },
            "div": {
                "path": "/components/full/Div.md",
                "size": 2989,
                "estimatedTokens": 854
            },
            "divider": {
                "path": "/components/full/Divider.md",
                "size": 11117,
                "estimatedTokens": 3177
            },
            "errorMessage": {
                "path": "/components/full/ErrorMessage.md",
                "size": 4443,
                "estimatedTokens": 1270
            },
            "flex": {
                "path": "/components/full/Flex.md",
                "size": 12405,
                "estimatedTokens": 3545
            },
            "floatingBadge": {
                "path": "/components/full/FloatingBadge.md",
                "size": 8223,
                "estimatedTokens": 2350
            },
            "footer": {
                "path": "/components/full/Footer.md",
                "size": 3251,
                "estimatedTokens": 929
            },
            "form": {
                "path": "/components/full/Form.md",
                "size": 6790,
                "estimatedTokens": 1940
            },
            "grid": {
                "path": "/components/full/Grid.md",
                "size": 15166,
                "estimatedTokens": 4334
            },
            "header": {
                "path": "/components/full/Header.md",
                "size": 3254,
                "estimatedTokens": 930
            },
            "heading": {
                "path": "/components/full/Heading.md",
                "size": 3659,
                "estimatedTokens": 1046
            },
            "helperMessage": {
                "path": "/components/full/HelperMessage.md",
                "size": 1458,
                "estimatedTokens": 417
            },
            "hopperProvider": {
                "path": "/components/full/HopperProvider.md",
                "size": 4514,
                "estimatedTokens": 1290
            },
            "htmlButton": {
                "path": "/components/full/HtmlButton.md",
                "size": 539,
                "estimatedTokens": 154
            },
            "htmlFooter": {
                "path": "/components/full/HtmlFooter.md",
                "size": 851,
                "estimatedTokens": 244
            },
            "htmlHeader": {
                "path": "/components/full/HtmlHeader.md",
                "size": 893,
                "estimatedTokens": 256
            },
            "htmlInput": {
                "path": "/components/full/HtmlInput.md",
                "size": 479,
                "estimatedTokens": 137
            },
            "htmlSection": {
                "path": "/components/full/HtmlSection.md",
                "size": 777,
                "estimatedTokens": 222
            },
            "icon": {
                "path": "/components/full/Icon.md",
                "size": 5301,
                "estimatedTokens": 1515
            },
            "iconList": {
                "path": "/components/full/IconList.md",
                "size": 4887,
                "estimatedTokens": 1397
            },
            "illustratedMessage": {
                "path": "/components/full/IllustratedMessage.md",
                "size": 9375,
                "estimatedTokens": 2679
            },
            "illustration": {
                "path": "/components/full/Illustration.md",
                "size": 5351,
                "estimatedTokens": 1529
            },
            "image": {
                "path": "/components/full/Image.md",
                "size": 9008,
                "estimatedTokens": 2574
            },
            "img": {
                "path": "/components/full/Img.md",
                "size": 457,
                "estimatedTokens": 131
            },
            "inline": {
                "path": "/components/full/Inline.md",
                "size": 7130,
                "estimatedTokens": 2038
            },
            "label": {
                "path": "/components/full/Label.md",
                "size": 1771,
                "estimatedTokens": 506
            },
            "link": {
                "path": "/components/full/Link.md",
                "size": 42673,
                "estimatedTokens": 12193
            },
            "linkButton": {
                "path": "/components/full/LinkButton.md",
                "size": 41775,
                "estimatedTokens": 11936
            },
            "listbox": {
                "path": "/components/full/Listbox.md",
                "size": 95964,
                "estimatedTokens": 27419
            },
            "main": {
                "path": "/components/full/Main.md",
                "size": 719,
                "estimatedTokens": 206
            },
            "menu": {
                "path": "/components/full/Menu.md",
                "size": 103390,
                "estimatedTokens": 29540
            },
            "modal": {
                "path": "/components/full/Modal.md",
                "size": 75650,
                "estimatedTokens": 21615
            },
            "nav": {
                "path": "/components/full/Nav.md",
                "size": 781,
                "estimatedTokens": 224
            },
            "numberField": {
                "path": "/components/full/NumberField.md",
                "size": 43357,
                "estimatedTokens": 12388
            },
            "paragraph": {
                "path": "/components/full/Paragraph.md",
                "size": 3680,
                "estimatedTokens": 1052
            },
            "passwordField": {
                "path": "/components/full/PasswordField.md",
                "size": 49164,
                "estimatedTokens": 14047
            },
            "popover": {
                "path": "/components/full/Popover.md",
                "size": 35932,
                "estimatedTokens": 10267
            },
            "popoverBase": {
                "path": "/components/full/PopoverBase.md",
                "size": 24622,
                "estimatedTokens": 7035
            },
            "radioGroup": {
                "path": "/components/full/RadioGroup.md",
                "size": 65444,
                "estimatedTokens": 18699
            },
            "rangeCalendar": {
                "path": "/components/full/RangeCalendar.md",
                "size": 20716,
                "estimatedTokens": 5919
            },
            "richIcon": {
                "path": "/components/full/RichIcon.md",
                "size": 7290,
                "estimatedTokens": 2083
            },
            "searchField": {
                "path": "/components/full/SearchField.md",
                "size": 52358,
                "estimatedTokens": 14960
            },
            "segmentedControl": {
                "path": "/components/full/SegmentedControl.md",
                "size": 13318,
                "estimatedTokens": 3806
            },
            "select": {
                "path": "/components/full/Select.md",
                "size": 170159,
                "estimatedTokens": 48617
            },
            "span": {
                "path": "/components/full/Span.md",
                "size": 703,
                "estimatedTokens": 201
            },
            "spinner": {
                "path": "/components/full/Spinner.md",
                "size": 4613,
                "estimatedTokens": 1318
            },
            "stack": {
                "path": "/components/full/Stack.md",
                "size": 6939,
                "estimatedTokens": 1983
            },
            "switch": {
                "path": "/components/full/Switch.md",
                "size": 30709,
                "estimatedTokens": 8774
            },
            "table": {
                "path": "/components/full/Table.md",
                "size": 1193,
                "estimatedTokens": 341
            },
            "tabs": {
                "path": "/components/full/Tabs.md",
                "size": 97317,
                "estimatedTokens": 27805
            },
            "tag": {
                "path": "/components/full/Tag.md",
                "size": 39012,
                "estimatedTokens": 11147
            },
            "tagGroup": {
                "path": "/components/full/TagGroup.md",
                "size": 72141,
                "estimatedTokens": 20612
            },
            "text": {
                "path": "/components/full/Text.md",
                "size": 2751,
                "estimatedTokens": 786
            },
            "textArea": {
                "path": "/components/full/TextArea.md",
                "size": 56004,
                "estimatedTokens": 16002
            },
            "textField": {
                "path": "/components/full/TextField.md",
                "size": 55426,
                "estimatedTokens": 15836
            },
            "tile": {
                "path": "/components/full/Tile.md",
                "size": 42388,
                "estimatedTokens": 12111
            },
            "tileGroup": {
                "path": "/components/full/TileGroup.md",
                "size": 20543,
                "estimatedTokens": 5870
            },
            "toggleButton": {
                "path": "/components/full/ToggleButton.md",
                "size": 44271,
                "estimatedTokens": 12649
            },
            "tooltip": {
                "path": "/components/full/Tooltip.md",
                "size": 20554,
                "estimatedTokens": 5873
            },
            "uL": {
                "path": "/components/full/UL.md",
                "size": 732,
                "estimatedTokens": 210
            },
            "componentList": {
                "path": "/components/full/component-list.md",
                "size": 17899,
                "estimatedTokens": 5114
            },
            "orbiterToHopper": {
                "path": "/components/full/orbiter-to-hopper.md",
                "size": 5021,
                "estimatedTokens": 1435
            }
        },
        "index": {
            "path": "/components/index.md",
            "size": 2043988,
            "estimatedTokens": 583997
        },
        "usage": {
            "a": {
                "path": "/components/usage/A.md",
                "size": 513,
                "estimatedTokens": 147
            },
            "accordion": {
                "path": "/components/usage/Accordion.md",
                "size": 15275,
                "estimatedTokens": 4365
            },
            "address": {
                "path": "/components/usage/Address.md",
                "size": 646,
                "estimatedTokens": 185
            },
            "alert": {
                "path": "/components/usage/Alert.md",
                "size": 12275,
                "estimatedTokens": 3508
            },
            "article": {
                "path": "/components/usage/Article.md",
                "size": 712,
                "estimatedTokens": 204
            },
            "aside": {
                "path": "/components/usage/Aside.md",
                "size": 702,
                "estimatedTokens": 201
            },
            "avatar": {
                "path": "/components/usage/Avatar.md",
                "size": 12753,
                "estimatedTokens": 3644
            },
            "badge": {
                "path": "/components/usage/Badge.md",
                "size": 3361,
                "estimatedTokens": 961
            },
            "box": {
                "path": "/components/usage/Box.md",
                "size": 3654,
                "estimatedTokens": 1044
            },
            "button": {
                "path": "/components/usage/Button.md",
                "size": 13373,
                "estimatedTokens": 3821
            },
            "buttonGroup": {
                "path": "/components/usage/ButtonGroup.md",
                "size": 5541,
                "estimatedTokens": 1584
            },
            "calendar": {
                "path": "/components/usage/Calendar.md",
                "size": 7735,
                "estimatedTokens": 2210
            },
            "callout": {
                "path": "/components/usage/Callout.md",
                "size": 6226,
                "estimatedTokens": 1779
            },
            "card": {
                "path": "/components/usage/Card.md",
                "size": 12362,
                "estimatedTokens": 3532
            },
            "checkbox": {
                "path": "/components/usage/Checkbox.md",
                "size": 7767,
                "estimatedTokens": 2220
            },
            "checkboxGroup": {
                "path": "/components/usage/CheckboxGroup.md",
                "size": 10869,
                "estimatedTokens": 3106
            },
            "comboBox": {
                "path": "/components/usage/ComboBox.md",
                "size": 23819,
                "estimatedTokens": 6806
            },
            "compactCallout": {
                "path": "/components/usage/CompactCallout.md",
                "size": 4365,
                "estimatedTokens": 1248
            },
            "content": {
                "path": "/components/usage/Content.md",
                "size": 515,
                "estimatedTokens": 148
            },
            "contextualHelp": {
                "path": "/components/usage/ContextualHelp.md",
                "size": 1270,
                "estimatedTokens": 363
            },
            "datePicker": {
                "path": "/components/usage/DatePicker.md",
                "size": 6835,
                "estimatedTokens": 1953
            },
            "dateRangePicker": {
                "path": "/components/usage/DateRangePicker.md",
                "size": 9379,
                "estimatedTokens": 2680
            },
            "disclosure": {
                "path": "/components/usage/Disclosure.md",
                "size": 9413,
                "estimatedTokens": 2690
            },
            "div": {
                "path": "/components/usage/Div.md",
                "size": 2989,
                "estimatedTokens": 854
            },
            "divider": {
                "path": "/components/usage/Divider.md",
                "size": 1025,
                "estimatedTokens": 293
            },
            "errorMessage": {
                "path": "/components/usage/ErrorMessage.md",
                "size": 1815,
                "estimatedTokens": 519
            },
            "flex": {
                "path": "/components/usage/Flex.md",
                "size": 10436,
                "estimatedTokens": 2982
            },
            "floatingBadge": {
                "path": "/components/usage/FloatingBadge.md",
                "size": 4757,
                "estimatedTokens": 1360
            },
            "footer": {
                "path": "/components/usage/Footer.md",
                "size": 486,
                "estimatedTokens": 139
            },
            "form": {
                "path": "/components/usage/Form.md",
                "size": 5476,
                "estimatedTokens": 1565
            },
            "grid": {
                "path": "/components/usage/Grid.md",
                "size": 12422,
                "estimatedTokens": 3550
            },
            "header": {
                "path": "/components/usage/Header.md",
                "size": 489,
                "estimatedTokens": 140
            },
            "heading": {
                "path": "/components/usage/Heading.md",
                "size": 2737,
                "estimatedTokens": 782
            },
            "helperMessage": {
                "path": "/components/usage/HelperMessage.md",
                "size": 608,
                "estimatedTokens": 174
            },
            "hopperProvider": {
                "path": "/components/usage/HopperProvider.md",
                "size": 4380,
                "estimatedTokens": 1252
            },
            "htmlButton": {
                "path": "/components/usage/HtmlButton.md",
                "size": 539,
                "estimatedTokens": 154
            },
            "htmlFooter": {
                "path": "/components/usage/HtmlFooter.md",
                "size": 851,
                "estimatedTokens": 244
            },
            "htmlHeader": {
                "path": "/components/usage/HtmlHeader.md",
                "size": 893,
                "estimatedTokens": 256
            },
            "htmlInput": {
                "path": "/components/usage/HtmlInput.md",
                "size": 479,
                "estimatedTokens": 137
            },
            "htmlSection": {
                "path": "/components/usage/HtmlSection.md",
                "size": 777,
                "estimatedTokens": 222
            },
            "icon": {
                "path": "/components/usage/Icon.md",
                "size": 3047,
                "estimatedTokens": 871
            },
            "iconList": {
                "path": "/components/usage/IconList.md",
                "size": 1902,
                "estimatedTokens": 544
            },
            "illustratedMessage": {
                "path": "/components/usage/IllustratedMessage.md",
                "size": 6382,
                "estimatedTokens": 1824
            },
            "illustration": {
                "path": "/components/usage/Illustration.md",
                "size": 2024,
                "estimatedTokens": 579
            },
            "image": {
                "path": "/components/usage/Image.md",
                "size": 3209,
                "estimatedTokens": 917
            },
            "img": {
                "path": "/components/usage/Img.md",
                "size": 457,
                "estimatedTokens": 131
            },
            "inline": {
                "path": "/components/usage/Inline.md",
                "size": 5095,
                "estimatedTokens": 1456
            },
            "label": {
                "path": "/components/usage/Label.md",
                "size": 1201,
                "estimatedTokens": 344
            },
            "link": {
                "path": "/components/usage/Link.md",
                "size": 10439,
                "estimatedTokens": 2983
            },
            "linkButton": {
                "path": "/components/usage/LinkButton.md",
                "size": 9785,
                "estimatedTokens": 2796
            },
            "listbox": {
                "path": "/components/usage/Listbox.md",
                "size": 21418,
                "estimatedTokens": 6120
            },
            "main": {
                "path": "/components/usage/Main.md",
                "size": 719,
                "estimatedTokens": 206
            },
            "menu": {
                "path": "/components/usage/Menu.md",
                "size": 25716,
                "estimatedTokens": 7348
            },
            "modal": {
                "path": "/components/usage/Modal.md",
                "size": 19894,
                "estimatedTokens": 5684
            },
            "nav": {
                "path": "/components/usage/Nav.md",
                "size": 781,
                "estimatedTokens": 224
            },
            "numberField": {
                "path": "/components/usage/NumberField.md",
                "size": 5491,
                "estimatedTokens": 1569
            },
            "paragraph": {
                "path": "/components/usage/Paragraph.md",
                "size": 2947,
                "estimatedTokens": 842
            },
            "passwordField": {
                "path": "/components/usage/PasswordField.md",
                "size": 3829,
                "estimatedTokens": 1094
            },
            "popover": {
                "path": "/components/usage/Popover.md",
                "size": 9712,
                "estimatedTokens": 2775
            },
            "popoverBase": {
                "path": "/components/usage/PopoverBase.md",
                "size": 831,
                "estimatedTokens": 238
            },
            "radioGroup": {
                "path": "/components/usage/RadioGroup.md",
                "size": 12517,
                "estimatedTokens": 3577
            },
            "rangeCalendar": {
                "path": "/components/usage/RangeCalendar.md",
                "size": 9805,
                "estimatedTokens": 2802
            },
            "richIcon": {
                "path": "/components/usage/RichIcon.md",
                "size": 4859,
                "estimatedTokens": 1389
            },
            "searchField": {
                "path": "/components/usage/SearchField.md",
                "size": 5726,
                "estimatedTokens": 1636
            },
            "segmentedControl": {
                "path": "/components/usage/SegmentedControl.md",
                "size": 5981,
                "estimatedTokens": 1709
            },
            "select": {
                "path": "/components/usage/Select.md",
                "size": 26967,
                "estimatedTokens": 7705
            },
            "span": {
                "path": "/components/usage/Span.md",
                "size": 703,
                "estimatedTokens": 201
            },
            "spinner": {
                "path": "/components/usage/Spinner.md",
                "size": 1613,
                "estimatedTokens": 461
            },
            "stack": {
                "path": "/components/usage/Stack.md",
                "size": 4905,
                "estimatedTokens": 1402
            },
            "switch": {
                "path": "/components/usage/Switch.md",
                "size": 5063,
                "estimatedTokens": 1447
            },
            "table": {
                "path": "/components/usage/Table.md",
                "size": 1193,
                "estimatedTokens": 341
            },
            "tabs": {
                "path": "/components/usage/Tabs.md",
                "size": 31965,
                "estimatedTokens": 9133
            },
            "tag": {
                "path": "/components/usage/Tag.md",
                "size": 8273,
                "estimatedTokens": 2364
            },
            "tagGroup": {
                "path": "/components/usage/TagGroup.md",
                "size": 17066,
                "estimatedTokens": 4876
            },
            "text": {
                "path": "/components/usage/Text.md",
                "size": 1927,
                "estimatedTokens": 551
            },
            "textArea": {
                "path": "/components/usage/TextArea.md",
                "size": 7698,
                "estimatedTokens": 2200
            },
            "textField": {
                "path": "/components/usage/TextField.md",
                "size": 7940,
                "estimatedTokens": 2269
            },
            "tile": {
                "path": "/components/usage/Tile.md",
                "size": 7298,
                "estimatedTokens": 2086
            },
            "tileGroup": {
                "path": "/components/usage/TileGroup.md",
                "size": 4655,
                "estimatedTokens": 1330
            },
            "toggleButton": {
                "path": "/components/usage/ToggleButton.md",
                "size": 8400,
                "estimatedTokens": 2400
            },
            "tooltip": {
                "path": "/components/usage/Tooltip.md",
                "size": 6131,
                "estimatedTokens": 1752
            },
            "uL": {
                "path": "/components/usage/UL.md",
                "size": 732,
                "estimatedTokens": 210
            },
            "componentList": {
                "path": "/components/usage/component-list.md",
                "size": 17899,
                "estimatedTokens": 5114
            },
            "orbiterToHopper": {
                "path": "/components/usage/orbiter-to-hopper.md",
                "size": 5021,
                "estimatedTokens": 1435
            }
        },
        "utilities": {
            "index": {
                "path": "/components/utilities/index.md",
                "size": 8011,
                "estimatedTokens": 2289
            },
            "useDebounce": {
                "path": "/components/utilities/useDebounce.md",
                "size": 7843,
                "estimatedTokens": 2241
            }
        }
    },
    "gettingStarted": {
        "components": {
            "path": "/getting-started/components.md",
            "size": 11896,
            "estimatedTokens": 3399
        },
        "figmaCodeGeneration": {
            "path": "/getting-started/figma-code-generation.md",
            "size": 6910,
            "estimatedTokens": 1975
        },
        "index": {
            "path": "/getting-started/index.md",
            "size": 22298,
            "estimatedTokens": 6371
        },
        "installation": {
            "path": "/getting-started/installation.md",
            "size": 2256,
            "estimatedTokens": 645
        },
        "javascript": {
            "path": "/getting-started/javascript.md",
            "size": 2656,
            "estimatedTokens": 759
        },
        "llms": {
            "path": "/getting-started/llms.md",
            "size": 845,
            "estimatedTokens": 242
        },
        "mcpServer": {
            "path": "/getting-started/mcp-server.md",
            "size": 5027,
            "estimatedTokens": 1437
        },
        "react": {
            "path": "/getting-started/react.md",
            "size": 3412,
            "estimatedTokens": 975
        },
        "textCrop": {
            "path": "/getting-started/text-crop.md",
            "size": 1891,
            "estimatedTokens": 541
        }
    },
    "icons": {
        "brief": {
            "svgIcons": {
                "iconLibrary": {
                    "path": "/icons/brief/SVG-icons/icon-library.md",
                    "size": 968,
                    "estimatedTokens": 277
                },
                "index": {
                    "path": "/icons/brief/SVG-icons/index.md",
                    "size": 2390,
                    "estimatedTokens": 683
                },
                "richIconLibrary": {
                    "path": "/icons/brief/SVG-icons/rich-icon-library.md",
                    "size": 1272,
                    "estimatedTokens": 364
                }
            },
            "advanced": {
                "designingAnIcon": {
                    "path": "/icons/brief/advanced/designing-an-icon.md",
                    "size": 2550,
                    "estimatedTokens": 729
                }
            },
            "index": {
                "path": "/icons/brief/index.md",
                "size": 7791,
                "estimatedTokens": 2226
            },
            "overview": {
                "introduction": {
                    "path": "/icons/brief/overview/introduction.md",
                    "size": 1506,
                    "estimatedTokens": 431
                }
            },
            "reactIcons": {
                "iconLibrary": {
                    "path": "/icons/brief/react-icons/icon-library.md",
                    "size": 434,
                    "estimatedTokens": 124
                },
                "index": {
                    "path": "/icons/brief/react-icons/index.md",
                    "size": 1496,
                    "estimatedTokens": 428
                },
                "richIconLibrary": {
                    "path": "/icons/brief/react-icons/rich-icon-library.md",
                    "size": 913,
                    "estimatedTokens": 261
                }
            }
        },
        "data": {
            "path": "/icons/data.json",
            "size": 153337,
            "estimatedTokens": 43811
        },
        "full": {
            "svgIcons": {
                "iconLibrary": {
                    "path": "/icons/full/SVG-icons/icon-library.md",
                    "size": 79572,
                    "estimatedTokens": 22735
                },
                "index": {
                    "path": "/icons/full/SVG-icons/index.md",
                    "size": 93290,
                    "estimatedTokens": 26655
                },
                "richIconLibrary": {
                    "path": "/icons/full/SVG-icons/rich-icon-library.md",
                    "size": 13568,
                    "estimatedTokens": 3877
                }
            },
            "advanced": {
                "designingAnIcon": {
                    "path": "/icons/full/advanced/designing-an-icon.md",
                    "size": 2550,
                    "estimatedTokens": 729
                }
            },
            "index": {
                "path": "/icons/full/index.md",
                "size": 189569,
                "estimatedTokens": 54163
            },
            "overview": {
                "introduction": {
                    "path": "/icons/full/overview/introduction.md",
                    "size": 1506,
                    "estimatedTokens": 431
                }
            },
            "reactIcons": {
                "iconLibrary": {
                    "path": "/icons/full/react-icons/icon-library.md",
                    "size": 79022,
                    "estimatedTokens": 22578
                },
                "index": {
                    "path": "/icons/full/react-icons/index.md",
                    "size": 92374,
                    "estimatedTokens": 26393
                },
                "richIconLibrary": {
                    "path": "/icons/full/react-icons/rich-icon-library.md",
                    "size": 13203,
                    "estimatedTokens": 3773
                }
            }
        }
    },
    "llmsFull": {
        "path": "/llms-full.md",
        "size": 2767960,
        "estimatedTokens": 790846
    },
    "llms": {
        "path": "/llms.md",
        "size": 4138,
        "estimatedTokens": 1183
    },
    "styledSystem": {
        "concepts": {
            "customComponents": {
                "path": "/styled-system/concepts/custom-components.md",
                "size": 2674,
                "estimatedTokens": 764
            },
            "htmlElements": {
                "path": "/styled-system/concepts/html-elements.md",
                "size": 913,
                "estimatedTokens": 261
            },
            "responsiveStyles": {
                "path": "/styled-system/concepts/responsive-styles.md",
                "size": 3415,
                "estimatedTokens": 976
            },
            "styling": {
                "path": "/styled-system/concepts/styling.md",
                "size": 24448,
                "estimatedTokens": 6986
            }
        },
        "escapeHatches": {
            "path": "/styled-system/escape-hatches.md",
            "size": 3658,
            "estimatedTokens": 1046
        },
        "index": {
            "path": "/styled-system/index.md",
            "size": 33771,
            "estimatedTokens": 9649
        },
        "overview": {
            "introduction": {
                "path": "/styled-system/overview/introduction.md",
                "size": 2122,
                "estimatedTokens": 607
            }
        },
        "unsafePropsData": {
            "path": "/styled-system/unsafe-props-data.json",
            "size": 1888,
            "estimatedTokens": 540
        }
    },
    "tokens": {
        "core": {
            "borderRadius": {
                "path": "/tokens/core/border-radius.md",
                "size": 2029,
                "estimatedTokens": 580
            },
            "color": {
                "path": "/tokens/core/color.md",
                "size": 33127,
                "estimatedTokens": 9465
            },
            "dimensions": {
                "path": "/tokens/core/dimensions.md",
                "size": 3111,
                "estimatedTokens": 889
            },
            "fontFamily": {
                "path": "/tokens/core/font-family.md",
                "size": 1983,
                "estimatedTokens": 567
            },
            "fontSize": {
                "path": "/tokens/core/font-size.md",
                "size": 2663,
                "estimatedTokens": 761
            },
            "fontWeight": {
                "path": "/tokens/core/font-weight.md",
                "size": 2061,
                "estimatedTokens": 589
            },
            "index": {
                "path": "/tokens/core/index.md",
                "size": 55431,
                "estimatedTokens": 15838
            },
            "letterSpacing": {
                "path": "/tokens/core/letter-spacing.md",
                "size": 2485,
                "estimatedTokens": 710
            },
            "lineHeight": {
                "path": "/tokens/core/line-height.md",
                "size": 2413,
                "estimatedTokens": 690
            },
            "motion": {
                "path": "/tokens/core/motion.md",
                "size": 5418,
                "estimatedTokens": 1548
            },
            "shadow": {
                "path": "/tokens/core/shadow.md",
                "size": 2055,
                "estimatedTokens": 588
            }
        },
        "index": {
            "path": "/tokens/index.md",
            "size": 418409,
            "estimatedTokens": 119546
        },
        "maps": {
            "sharegate": {
                "dark": {
                    "all": {
                        "path": "/tokens/maps/sharegate/dark/all.json",
                        "size": 139725,
                        "estimatedTokens": 39922
                    },
                    "coreBorderRadius": {
                        "path": "/tokens/maps/sharegate/dark/core-borderRadius.json",
                        "size": 915,
                        "estimatedTokens": 262
                    },
                    "coreColor": {
                        "path": "/tokens/maps/sharegate/dark/core-color.json",
                        "size": 25089,
                        "estimatedTokens": 7169
                    },
                    "coreDuration": {
                        "path": "/tokens/maps/sharegate/dark/core-duration.json",
                        "size": 693,
                        "estimatedTokens": 198
                    },
                    "coreFontFamily": {
                        "path": "/tokens/maps/sharegate/dark/core-fontFamily.json",
                        "size": 598,
                        "estimatedTokens": 171
                    },
                    "coreFontSize": {
                        "path": "/tokens/maps/sharegate/dark/core-fontSize.json",
                        "size": 1314,
                        "estimatedTokens": 376
                    },
                    "coreFontWeight": {
                        "path": "/tokens/maps/sharegate/dark/core-fontWeight.json",
                        "size": 875,
                        "estimatedTokens": 250
                    },
                    "coreLetterSpacing": {
                        "path": "/tokens/maps/sharegate/dark/core-letterSpacing.json",
                        "size": 1233,
                        "estimatedTokens": 353
                    },
                    "coreLineHeight": {
                        "path": "/tokens/maps/sharegate/dark/core-lineHeight.json",
                        "size": 1144,
                        "estimatedTokens": 327
                    },
                    "coreShadow": {
                        "path": "/tokens/maps/sharegate/dark/core-shadow.json",
                        "size": 626,
                        "estimatedTokens": 179
                    },
                    "coreSize": {
                        "path": "/tokens/maps/sharegate/dark/core-size.json",
                        "size": 2111,
                        "estimatedTokens": 604
                    },
                    "coreTimingFunction": {
                        "path": "/tokens/maps/sharegate/dark/core-timingFunction.json",
                        "size": 529,
                        "estimatedTokens": 152
                    },
                    "core": {
                        "path": "/tokens/maps/sharegate/dark/core.json",
                        "size": 34947,
                        "estimatedTokens": 9985
                    },
                    "semanticBorderRadius": {
                        "path": "/tokens/maps/sharegate/dark/semantic-borderRadius.json",
                        "size": 815,
                        "estimatedTokens": 233
                    },
                    "semanticBottomOffset": {
                        "path": "/tokens/maps/sharegate/dark/semantic-bottomOffset.json",
                        "size": 1334,
                        "estimatedTokens": 382
                    },
                    "semanticColor": {
                        "path": "/tokens/maps/sharegate/dark/semantic-color.json",
                        "size": 77119,
                        "estimatedTokens": 22034
                    },
                    "semanticFontFamily": {
                        "path": "/tokens/maps/sharegate/dark/semantic-fontFamily.json",
                        "size": 6269,
                        "estimatedTokens": 1792
                    },
                    "semanticFontSize": {
                        "path": "/tokens/maps/sharegate/dark/semantic-fontSize.json",
                        "size": 4833,
                        "estimatedTokens": 1381
                    },
                    "semanticFontWeight": {
                        "path": "/tokens/maps/sharegate/dark/semantic-fontWeight.json",
                        "size": 4778,
                        "estimatedTokens": 1366
                    },
                    "semanticLineHeight": {
                        "path": "/tokens/maps/sharegate/dark/semantic-lineHeight.json",
                        "size": 4943,
                        "estimatedTokens": 1413
                    },
                    "semanticMarginSize": {
                        "path": "/tokens/maps/sharegate/dark/semantic-marginSize.json",
                        "size": 1402,
                        "estimatedTokens": 401
                    },
                    "semanticPaddingSize": {
                        "path": "/tokens/maps/sharegate/dark/semantic-paddingSize.json",
                        "size": 1579,
                        "estimatedTokens": 452
                    },
                    "semanticShadow": {
                        "path": "/tokens/maps/sharegate/dark/semantic-shadow.json",
                        "size": 650,
                        "estimatedTokens": 186
                    },
                    "semanticTopOffset": {
                        "path": "/tokens/maps/sharegate/dark/semantic-topOffset.json",
                        "size": 1278,
                        "estimatedTokens": 366
                    },
                    "semantic": {
                        "path": "/tokens/maps/sharegate/dark/semantic.json",
                        "size": 104780,
                        "estimatedTokens": 29938
                    }
                },
                "light": {
                    "all": {
                        "path": "/tokens/maps/sharegate/light/all.json",
                        "size": 184630,
                        "estimatedTokens": 52752
                    },
                    "coreBorderRadius": {
                        "path": "/tokens/maps/sharegate/light/core-borderRadius.json",
                        "size": 915,
                        "estimatedTokens": 262
                    },
                    "coreColor": {
                        "path": "/tokens/maps/sharegate/light/core-color.json",
                        "size": 25089,
                        "estimatedTokens": 7169
                    },
                    "coreDuration": {
                        "path": "/tokens/maps/sharegate/light/core-duration.json",
                        "size": 693,
                        "estimatedTokens": 198
                    },
                    "coreFontFamily": {
                        "path": "/tokens/maps/sharegate/light/core-fontFamily.json",
                        "size": 598,
                        "estimatedTokens": 171
                    },
                    "coreFontSize": {
                        "path": "/tokens/maps/sharegate/light/core-fontSize.json",
                        "size": 1314,
                        "estimatedTokens": 376
                    },
                    "coreFontWeight": {
                        "path": "/tokens/maps/sharegate/light/core-fontWeight.json",
                        "size": 875,
                        "estimatedTokens": 250
                    },
                    "coreLetterSpacing": {
                        "path": "/tokens/maps/sharegate/light/core-letterSpacing.json",
                        "size": 1233,
                        "estimatedTokens": 353
                    },
                    "coreLineHeight": {
                        "path": "/tokens/maps/sharegate/light/core-lineHeight.json",
                        "size": 1144,
                        "estimatedTokens": 327
                    },
                    "coreShadow": {
                        "path": "/tokens/maps/sharegate/light/core-shadow.json",
                        "size": 626,
                        "estimatedTokens": 179
                    },
                    "coreSize": {
                        "path": "/tokens/maps/sharegate/light/core-size.json",
                        "size": 2111,
                        "estimatedTokens": 604
                    },
                    "coreTimingFunction": {
                        "path": "/tokens/maps/sharegate/light/core-timingFunction.json",
                        "size": 529,
                        "estimatedTokens": 152
                    },
                    "core": {
                        "path": "/tokens/maps/sharegate/light/core.json",
                        "size": 34947,
                        "estimatedTokens": 9985
                    },
                    "semanticBorderRadius": {
                        "path": "/tokens/maps/sharegate/light/semantic-borderRadius.json",
                        "size": 815,
                        "estimatedTokens": 233
                    },
                    "semanticBottomOffset": {
                        "path": "/tokens/maps/sharegate/light/semantic-bottomOffset.json",
                        "size": 1334,
                        "estimatedTokens": 382
                    },
                    "semanticColor": {
                        "path": "/tokens/maps/sharegate/light/semantic-color.json",
                        "size": 122024,
                        "estimatedTokens": 34864
                    },
                    "semanticFontFamily": {
                        "path": "/tokens/maps/sharegate/light/semantic-fontFamily.json",
                        "size": 6269,
                        "estimatedTokens": 1792
                    },
                    "semanticFontSize": {
                        "path": "/tokens/maps/sharegate/light/semantic-fontSize.json",
                        "size": 4833,
                        "estimatedTokens": 1381
                    },
                    "semanticFontWeight": {
                        "path": "/tokens/maps/sharegate/light/semantic-fontWeight.json",
                        "size": 4778,
                        "estimatedTokens": 1366
                    },
                    "semanticLineHeight": {
                        "path": "/tokens/maps/sharegate/light/semantic-lineHeight.json",
                        "size": 4943,
                        "estimatedTokens": 1413
                    },
                    "semanticMarginSize": {
                        "path": "/tokens/maps/sharegate/light/semantic-marginSize.json",
                        "size": 1402,
                        "estimatedTokens": 401
                    },
                    "semanticPaddingSize": {
                        "path": "/tokens/maps/sharegate/light/semantic-paddingSize.json",
                        "size": 1579,
                        "estimatedTokens": 452
                    },
                    "semanticShadow": {
                        "path": "/tokens/maps/sharegate/light/semantic-shadow.json",
                        "size": 650,
                        "estimatedTokens": 186
                    },
                    "semanticTopOffset": {
                        "path": "/tokens/maps/sharegate/light/semantic-topOffset.json",
                        "size": 1278,
                        "estimatedTokens": 366
                    },
                    "semantic": {
                        "path": "/tokens/maps/sharegate/light/semantic.json",
                        "size": 149685,
                        "estimatedTokens": 42768
                    }
                }
            },
            "workleap": {
                "dark": {
                    "all": {
                        "path": "/tokens/maps/workleap/dark/all.json",
                        "size": 139647,
                        "estimatedTokens": 39900
                    },
                    "coreBorderRadius": {
                        "path": "/tokens/maps/workleap/dark/core-borderRadius.json",
                        "size": 915,
                        "estimatedTokens": 262
                    },
                    "coreColor": {
                        "path": "/tokens/maps/workleap/dark/core-color.json",
                        "size": 25089,
                        "estimatedTokens": 7169
                    },
                    "coreDuration": {
                        "path": "/tokens/maps/workleap/dark/core-duration.json",
                        "size": 693,
                        "estimatedTokens": 198
                    },
                    "coreFontFamily": {
                        "path": "/tokens/maps/workleap/dark/core-fontFamily.json",
                        "size": 598,
                        "estimatedTokens": 171
                    },
                    "coreFontSize": {
                        "path": "/tokens/maps/workleap/dark/core-fontSize.json",
                        "size": 1314,
                        "estimatedTokens": 376
                    },
                    "coreFontWeight": {
                        "path": "/tokens/maps/workleap/dark/core-fontWeight.json",
                        "size": 875,
                        "estimatedTokens": 250
                    },
                    "coreLetterSpacing": {
                        "path": "/tokens/maps/workleap/dark/core-letterSpacing.json",
                        "size": 1233,
                        "estimatedTokens": 353
                    },
                    "coreLineHeight": {
                        "path": "/tokens/maps/workleap/dark/core-lineHeight.json",
                        "size": 1144,
                        "estimatedTokens": 327
                    },
                    "coreShadow": {
                        "path": "/tokens/maps/workleap/dark/core-shadow.json",
                        "size": 626,
                        "estimatedTokens": 179
                    },
                    "coreSize": {
                        "path": "/tokens/maps/workleap/dark/core-size.json",
                        "size": 2111,
                        "estimatedTokens": 604
                    },
                    "coreTimingFunction": {
                        "path": "/tokens/maps/workleap/dark/core-timingFunction.json",
                        "size": 529,
                        "estimatedTokens": 152
                    },
                    "core": {
                        "path": "/tokens/maps/workleap/dark/core.json",
                        "size": 34947,
                        "estimatedTokens": 9985
                    },
                    "semanticBorderRadius": {
                        "path": "/tokens/maps/workleap/dark/semantic-borderRadius.json",
                        "size": 815,
                        "estimatedTokens": 233
                    },
                    "semanticBottomOffset": {
                        "path": "/tokens/maps/workleap/dark/semantic-bottomOffset.json",
                        "size": 1334,
                        "estimatedTokens": 382
                    },
                    "semanticColor": {
                        "path": "/tokens/maps/workleap/dark/semantic-color.json",
                        "size": 77119,
                        "estimatedTokens": 22034
                    },
                    "semanticFontFamily": {
                        "path": "/tokens/maps/workleap/dark/semantic-fontFamily.json",
                        "size": 6189,
                        "estimatedTokens": 1769
                    },
                    "semanticFontSize": {
                        "path": "/tokens/maps/workleap/dark/semantic-fontSize.json",
                        "size": 4833,
                        "estimatedTokens": 1381
                    },
                    "semanticFontWeight": {
                        "path": "/tokens/maps/workleap/dark/semantic-fontWeight.json",
                        "size": 4778,
                        "estimatedTokens": 1366
                    },
                    "semanticLineHeight": {
                        "path": "/tokens/maps/workleap/dark/semantic-lineHeight.json",
                        "size": 4945,
                        "estimatedTokens": 1413
                    },
                    "semanticMarginSize": {
                        "path": "/tokens/maps/workleap/dark/semantic-marginSize.json",
                        "size": 1402,
                        "estimatedTokens": 401
                    },
                    "semanticPaddingSize": {
                        "path": "/tokens/maps/workleap/dark/semantic-paddingSize.json",
                        "size": 1579,
                        "estimatedTokens": 452
                    },
                    "semanticShadow": {
                        "path": "/tokens/maps/workleap/dark/semantic-shadow.json",
                        "size": 650,
                        "estimatedTokens": 186
                    },
                    "semanticTopOffset": {
                        "path": "/tokens/maps/workleap/dark/semantic-topOffset.json",
                        "size": 1278,
                        "estimatedTokens": 366
                    },
                    "semantic": {
                        "path": "/tokens/maps/workleap/dark/semantic.json",
                        "size": 104702,
                        "estimatedTokens": 29915
                    }
                },
                "light": {
                    "all": {
                        "path": "/tokens/maps/workleap/light/all.json",
                        "size": 184552,
                        "estimatedTokens": 52730
                    },
                    "coreBorderRadius": {
                        "path": "/tokens/maps/workleap/light/core-borderRadius.json",
                        "size": 915,
                        "estimatedTokens": 262
                    },
                    "coreColor": {
                        "path": "/tokens/maps/workleap/light/core-color.json",
                        "size": 25089,
                        "estimatedTokens": 7169
                    },
                    "coreDuration": {
                        "path": "/tokens/maps/workleap/light/core-duration.json",
                        "size": 693,
                        "estimatedTokens": 198
                    },
                    "coreFontFamily": {
                        "path": "/tokens/maps/workleap/light/core-fontFamily.json",
                        "size": 598,
                        "estimatedTokens": 171
                    },
                    "coreFontSize": {
                        "path": "/tokens/maps/workleap/light/core-fontSize.json",
                        "size": 1314,
                        "estimatedTokens": 376
                    },
                    "coreFontWeight": {
                        "path": "/tokens/maps/workleap/light/core-fontWeight.json",
                        "size": 875,
                        "estimatedTokens": 250
                    },
                    "coreLetterSpacing": {
                        "path": "/tokens/maps/workleap/light/core-letterSpacing.json",
                        "size": 1233,
                        "estimatedTokens": 353
                    },
                    "coreLineHeight": {
                        "path": "/tokens/maps/workleap/light/core-lineHeight.json",
                        "size": 1144,
                        "estimatedTokens": 327
                    },
                    "coreShadow": {
                        "path": "/tokens/maps/workleap/light/core-shadow.json",
                        "size": 626,
                        "estimatedTokens": 179
                    },
                    "coreSize": {
                        "path": "/tokens/maps/workleap/light/core-size.json",
                        "size": 2111,
                        "estimatedTokens": 604
                    },
                    "coreTimingFunction": {
                        "path": "/tokens/maps/workleap/light/core-timingFunction.json",
                        "size": 529,
                        "estimatedTokens": 152
                    },
                    "core": {
                        "path": "/tokens/maps/workleap/light/core.json",
                        "size": 34947,
                        "estimatedTokens": 9985
                    },
                    "semanticBorderRadius": {
                        "path": "/tokens/maps/workleap/light/semantic-borderRadius.json",
                        "size": 815,
                        "estimatedTokens": 233
                    },
                    "semanticBottomOffset": {
                        "path": "/tokens/maps/workleap/light/semantic-bottomOffset.json",
                        "size": 1334,
                        "estimatedTokens": 382
                    },
                    "semanticColor": {
                        "path": "/tokens/maps/workleap/light/semantic-color.json",
                        "size": 122024,
                        "estimatedTokens": 34864
                    },
                    "semanticFontFamily": {
                        "path": "/tokens/maps/workleap/light/semantic-fontFamily.json",
                        "size": 6189,
                        "estimatedTokens": 1769
                    },
                    "semanticFontSize": {
                        "path": "/tokens/maps/workleap/light/semantic-fontSize.json",
                        "size": 4833,
                        "estimatedTokens": 1381
                    },
                    "semanticFontWeight": {
                        "path": "/tokens/maps/workleap/light/semantic-fontWeight.json",
                        "size": 4778,
                        "estimatedTokens": 1366
                    },
                    "semanticLineHeight": {
                        "path": "/tokens/maps/workleap/light/semantic-lineHeight.json",
                        "size": 4945,
                        "estimatedTokens": 1413
                    },
                    "semanticMarginSize": {
                        "path": "/tokens/maps/workleap/light/semantic-marginSize.json",
                        "size": 1402,
                        "estimatedTokens": 401
                    },
                    "semanticPaddingSize": {
                        "path": "/tokens/maps/workleap/light/semantic-paddingSize.json",
                        "size": 1579,
                        "estimatedTokens": 452
                    },
                    "semanticShadow": {
                        "path": "/tokens/maps/workleap/light/semantic-shadow.json",
                        "size": 650,
                        "estimatedTokens": 186
                    },
                    "semanticTopOffset": {
                        "path": "/tokens/maps/workleap/light/semantic-topOffset.json",
                        "size": 1278,
                        "estimatedTokens": 366
                    },
                    "semantic": {
                        "path": "/tokens/maps/workleap/light/semantic.json",
                        "size": 149607,
                        "estimatedTokens": 42745
                    }
                }
            }
        },
        "overview": {
            "introduction": {
                "path": "/tokens/overview/introduction.md",
                "size": 4884,
                "estimatedTokens": 1396
            }
        },
        "semantic": {
            "color": {
                "path": "/tokens/semantic/color.md",
                "size": 322454,
                "estimatedTokens": 92130
            },
            "elevation": {
                "path": "/tokens/semantic/elevation.md",
                "size": 2915,
                "estimatedTokens": 833
            },
            "index": {
                "path": "/tokens/semantic/index.md",
                "size": 356129,
                "estimatedTokens": 101752
            },
            "shape": {
                "path": "/tokens/semantic/shape.md",
                "size": 2183,
                "estimatedTokens": 624
            },
            "space": {
                "path": "/tokens/semantic/space.md",
                "size": 11418,
                "estimatedTokens": 3263
            },
            "typography": {
                "path": "/tokens/semantic/typography.md",
                "size": 16957,
                "estimatedTokens": 4845
            }
        }
    }
};

export { files };
