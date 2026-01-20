import { ToggleButton } from "@/components/toggleButton/ToggleButton";

import Icon from "@/components/themeSwitch/ColorSwitchIcons";
import type { ColorScheme } from "@/context/theme/ThemeProvider";
import clsx from "clsx";

import "./colorSchemeSwitch.css";

interface ColorSchemeSwitchProps {
    text?: string;
    className?: string;
    onChange: () => void;
    colorScheme: ColorScheme;
}

const ColorSchemeSwitch = ({ text, className, colorScheme, onChange }: ColorSchemeSwitchProps) => {
    if (colorScheme) {
        return (
            <ToggleButton
                className={clsx("hd-color-scheme-switch__button", className)}
                onChange={onChange}
                aria-label="Toggle theme"
            >
                <Icon icon={colorScheme === "dark" ? "sun" : "moon"} />
                <span>{text}</span>
            </ToggleButton>
        );
    }

    return null;
};

export default ColorSchemeSwitch;
