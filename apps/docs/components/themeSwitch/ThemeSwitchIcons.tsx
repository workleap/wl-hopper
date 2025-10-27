import type { SVGProps } from "react";
import "./themeSwitchIcons.css";

export interface IconTypes {
    iconProps?: SVGProps<SVGSVGElement>;
    icon?: "sun" | "moon";
}

const icons = {
    "sun": (
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.333}
            d="M8 11.333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666ZM8 .667V2M8 14v1.333M2.813 2.813l.947.947M12.24 12.24l.947.947M.667 8H2M14 8h1.333M2.813 13.187l.947-.947M12.24 3.76l.947-.947"
        />
    ),
    "moon": (
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.333}
            d="M13.975 8.527A6 6 0 1 1 7.448 2a4.667 4.667 0 0 0 6.527 6.527Z"
        />
    )
};

const Icon = ({ iconProps, icon = "sun" }: IconTypes) => (
    <svg
        {...iconProps}
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        className="hd-icon"
    >
        {icons[icon]}
    </svg>
);

export default Icon;
