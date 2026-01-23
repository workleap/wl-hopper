"use client";

import IconTable from "@/app/ui/icons/iconTable/IconTable.tsx";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { HopperProvider, SearchField } from "@hopper-ui/components";
import { SparklesIcon, SparklesRichIcon, iconNames, richIconNames } from "@hopper-ui/icons";
import { memo, useContext, useState, type ReactNode } from "react";
import { Radio, RadioGroup, type RadioProps } from "react-aria-components";
import "./switcher.css";

interface SwitcherProps {
    type: "react" | "svg";
    iconType: "icon" | "richIcon";
    headLine: string;
}

type AvailableSizes = "sm" | "md" | "lg" | "xl";

const Switcher = memo(({ type, headLine, iconType = "icon" }: SwitcherProps) => {
    const { colorScheme, theme } = useContext(ThemeContext);
    const [filter, setFilter] = useState("");
    const [selectedSize, setSelectedSize] = useState<AvailableSizes>(iconType === "icon" ? "md" : "lg");

    const Icon = iconType === "icon" ? SparklesIcon : SparklesRichIcon;
    const iconList = iconType === "icon" ? iconNames : richIconNames;

    const onTextFieldChange = (value: string) => {
        setFilter(value);
    };

    return (
        <>
            <div>{headLine}</div>
            <div className="hd-switcher__wrapper">
                <RadioGroup className="hd-switcher-picker" defaultValue={selectedSize} onChange={value => setSelectedSize(value as AvailableSizes)}>
                    {iconType === "icon" && <SwitcherChoice value="sm" preview={<SparklesIcon size="sm" />} />}
                    <SwitcherChoice value="md" preview={<Icon size="md" />} />
                    <SwitcherChoice value="lg" preview={<Icon size="lg" />} />
                    {iconType === "richIcon" && <SwitcherChoice value="xl" preview={<SparklesRichIcon size="xl" />} />}
                </RadioGroup>
                <HopperProvider theme={theme} colorScheme={colorScheme}>
                    <SearchField aria-label="Filter icons" placeholder="Search" value={filter} onChange={onTextFieldChange} />
                </HopperProvider>
                <IconTable type={type} size={selectedSize} filter={filter} items={iconList} />
            </div>
        </>
    );
});

Switcher.displayName = "Switcher";

interface SwitcherChoiceProps extends RadioProps {
    preview: ReactNode;
    value: AvailableSizes;
}

const SizeMap = {
    sm: {
        title: "Small",
        size: "16x16px"
    },
    md: {
        title: "Medium",
        size: "24x24px"
    },
    lg: {
        title: "Large",
        size: "32x32px"
    },
    xl: {
        title: "Extra Large",
        size: "40x40px"
    }
};

function SwitcherChoice({ preview, value, ...rest }: SwitcherChoiceProps) {
    const { title, size } = SizeMap[value];

    return (
        <Radio className="hd-switcher-choice" value={value} {...rest}>
            <div className="hd-switcher-choice-wrapper">
                <div className="hd-switcher-choice-infos">
                    <span className="hd-switcher-choice-infos__title">{title}</span>
                    <span className="hd-switcher-choice-infos__size">{size}</span>
                </div>
                <div className="hd-switcher-choice-preview">
                    {preview}
                </div>
            </div>
        </Radio>
    );
}

export default Switcher;
