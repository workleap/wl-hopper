/* eslint-disable react/destructuring-assignment */
import { Button, getRootCSSClasses } from "@hopper-ui/components";
import { ArrowRightIcon, KebabIcon } from "@hopper-ui/icons";
import { Menu, MenuItem, MenuTrigger, Popover, SubmenuTrigger, type MenuItemProps, type MenuProps, type MenuTriggerProps, type PopoverProps } from "react-aria-components";

interface MyMenuButtonProps<T>
    extends MenuProps<T>, Omit<MenuTriggerProps, "children"> {
    label?: string;
}

function MyMenuButton<T extends object>(
    { label, children, ...props }: MyMenuButtonProps<T>
) {
    return (
        <MenuTrigger {...props}>
            <Button variant="secondary" aria-label={label}>
                <KebabIcon />
            </Button>
            <MyPopover
                placement="bottom start"
                // offset={4}
                style={{
                    background: "lightblue"
                }}
                offset={8}
                crossOffset={0}
            >
                <MyMenu {...props}>
                    {children}
                </MyMenu>
            </MyPopover>
        </MenuTrigger>
    );
}

function MyItem(
    props: Omit<MenuItemProps, "children"> & { children?: React.ReactNode }
) {
    const textValue = props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);

    return (
        <MenuItem
            {...props}
            textValue={textValue}
            style={{
                // padding: "16px",
                // marginLeft: "8px",
                // marginRight: "8px",
                boxSizing: "border-box",
                "inlineSize": "max-content",
                "minInlineSize": "12rem",
                "maxInlineSize": "20rem",
                "cursor": "pointer",
                "display": "flex",
                "alignItems": "center",
                "marginInline":  "var(--hop-space-inset-sm)",
                "paddingBlock": "0.625rem",
                "paddingInline": "var(--hop-space-inset-md)",
                color: "var(--hop-neutral-text)",
                textDecoration: "none",

                backgroundColor: "var(--background-color)",
                borderRadius: "var(--hop-shape-rounded-md)"
            }}
            className={({ isFocused, isOpen }) =>
                `my-item ${isFocused ? "focused" : ""} ${isOpen ? "open" : ""}`}
        >
            {({ hasSubmenu }) => (
                <>
                    {props.children}
                    {hasSubmenu && <ArrowRightIcon className="chevron" />}
                </>
            )}
        </MenuItem>
    );
}

const MyPopover = ({ style, ...rest }: PopoverProps) => {
    return (
        <Popover
            containerPadding={16}
            className={getRootCSSClasses("light")}
            {...rest}
            style={{
                boxSizing: "border-box",
                isolation: "isolate",
                display: "flex",
                flexShrink: 0,
                alignItems: "center",

                /* Don't be larger than full screen minus 2 * containerPadding. --container-padding is coming from JS */
                maxInlineSize: "calc(100vw - 2* 16px, 0))",
                fontFamily: "var(--hop-body-md-font-family)",
                fontSize: "var(--hop-body-md-font-size)",
                fontWeight: "var(--hop-body-md-font-weight)",
                lineHeight: "var(--hop-body-md-line-height)",
                color: "var(--hop-body-md-text-color)",
                backgroundColor: "var(--hop-neutral-surface)",
                border: "0.0625rem solid var(--hop-neutral-border-weak)",
                borderRadius: "var(--hop-shape-rounded-md)",
                outline: "none",
                boxShadow: "var(--hop-elevation-lifted)",
                transition: "opacity  var(--hop-easing-duration-2)",
                ...style
            }}
        />
    );
};

function MyMenu<T extends object>({ style, ...rest }: MenuProps<T>) {
    return (
        <Menu
            {...rest}

            style={{
                ...style,
                boxSizing: "border-box",
                overflowY: "auto",
                inlineSize: "max-content",
                minInlineSize: "12.5rem",
                maxInlineSize: "20rem",
                paddingBlock: "var(--hop-space-inset-sm)",
                outline: "none"
            }}
        />
    );
}

export const RACTest = () => {
    return (
        <MyMenuButton label="Edit">
            <MyItem>Manage Survey Settings</MyItem>
            <SubmenuTrigger>
                <MyItem>Export report</MyItem>
                <MyPopover
                    // offset={4}
                    offset={12}
                    crossOffset={-10}
                    style={{
                        background: "lightpink"
                    }}
                >
                    <MyMenu >
                        <MyItem>Download as PDF</MyItem>
                        <MyItem>Download as CSV</MyItem>
                    </MyMenu>
                </MyPopover>
            </SubmenuTrigger>
        </MyMenuButton>
    );
};
