import { ToggleButton } from "@/components/toggleButton/ToggleButton";

import Icon from "@/components/themeSwitch/ThemeSwitchIcons";
import type { ColorScheme } from "@/context/theme/ThemeProvider";
import clsx from "clsx";

import "./themeSwitch.css";

interface ThemeSwitchProps {
    text?: string;
    className?: string;
    onChange: () => void;
    colorScheme: ColorScheme;
}

const ThemeSwitch = ({ text, className, colorScheme, onChange }: ThemeSwitchProps) => {
    if (colorScheme) {
        return (
            <ToggleButton
                className={clsx("hd-theme-switch__button", className)}
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

export default ThemeSwitch;
