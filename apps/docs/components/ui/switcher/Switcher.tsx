"use client";

import React, { useState } from "react";
import { RadioGroup, Radio } from "react-aria-components";
import { IconTable } from "@/components/iconTable/IconTable";
import * as IconLibrary from "@hopper-ui/icons";
import { LI, UL } from "@hopper-ui/styled-system";
import { HopperProvider } from "@hopper-ui/components";

import "./switcher.css";

interface SwitcherProps {
    type: string;
}

interface HandleChange {
    (value: string): void;
}

const Switcher = React.memo(({ type }: SwitcherProps) => {
    const [selectedSize, setSelectedSize] = useState("md");

    const handleChange: HandleChange = value => {
        setSelectedSize(value);
    };

    console.log(IconLibrary);

    const List = () => {
        const listItems = IconLibrary.iconNames.map(name => {
            return (
                <LI key={name}>
                    a
                </LI>);
        });

        return (
            <UL>
                {listItems}
            </UL>
        );
    };

    return (
        <HopperProvider colorScheme="light">
            <div className="hd-switcher">
            <List />
            <RadioGroup className="hd-switcher-picker" defaultValue={selectedSize} onChange={handleChange}>
                <div className="hd-switcher-choices">
                    <Radio className="hd-switcher-choice" value="sm">
                        <div className="hd-switcher-choice-wrapper">
                            <div className="hd-switcher-choice-infos">
                                <span className="hd-switcher-choice-infos__title">Small</span>
                                <span className="hd-switcher-choice-infos__size">16x16px</span>
                            </div>
                            <div className="hd-switcher-choice-preview hd-switcher-choice-preview--small">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* eslint-disable-next-line max-len */}
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.51752 0.998291C5.8466 0.998291 6.13725 1.21282 6.23422 1.52729L7.14653 4.48587L9.57189 5.56283C9.84286 5.68315 10.0175 5.95181 10.0175 6.24829C10.0175 6.54477 9.84286 6.81343 9.57189 6.93375L7.14653 8.01071L6.23422 10.9693C6.13725 11.2838 5.8466 11.4983 5.51752 11.4983C5.18843 11.4983 4.89779 11.2838 4.80082 10.9693L3.88851 8.01071L1.46314 6.93375C1.19217 6.81343 1.01752 6.54477 1.01752 6.24829C1.01752 5.95181 1.19217 5.68315 1.46314 5.56283L3.88851 4.48587L4.80082 1.52729C4.89779 1.21282 5.18843 0.998291 5.51752 0.998291ZM5.51752 4.29351L5.22138 5.25388C5.15751 5.46101 5.00715 5.63038 4.80905 5.71834L3.61558 6.24829L4.80905 6.77824C5.00715 6.8662 5.15751 7.03557 5.22138 7.2427L5.51752 8.20307L5.81366 7.2427C5.87753 7.03557 6.02788 6.8662 6.22599 6.77824L7.41945 6.24829L6.22599 5.71834C6.02788 5.63038 5.87753 5.46101 5.81366 5.25388L5.51752 4.29351ZM9.50031 3.74829C9.50031 3.33408 9.83609 2.99829 10.2503 2.99829H11.5003V1.74829C11.5003 1.33408 11.8361 0.998291 12.2503 0.998291C12.6645 0.998291 13.0003 1.33408 13.0003 1.74829V2.99829H14.2503C14.6645 2.99829 15.0003 3.33408 15.0003 3.74829C15.0003 4.1625 14.6645 4.49829 14.2503 4.49829H13.0003V5.74829C13.0003 6.1625 12.6645 6.49829 12.2503 6.49829C11.8361 6.49829 11.5003 6.1625 11.5003 5.74829V4.49829H10.2503C9.83609 4.49829 9.50031 4.1625 9.50031 3.74829ZM8.00012 12.2499C8.00012 11.8357 8.33591 11.4999 8.75012 11.4999H10.0001V10.2499C10.0001 9.83573 10.3359 9.49994 10.7501 9.49994C11.1643 9.49994 11.5001 9.83573 11.5001 10.2499V11.4999H12.7501C13.1643 11.4999 13.5001 11.8357 13.5001 12.2499C13.5001 12.6642 13.1643 12.9999 12.7501 12.9999H11.5001V14.2499C11.5001 14.6642 11.1643 14.9999 10.7501 14.9999C10.3359 14.9999 10.0001 14.6642 10.0001 14.2499V12.9999H8.75012C8.33591 12.9999 8.00012 12.6642 8.00012 12.2499Z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </Radio>
                    <Radio className="hd-switcher-choice" value="md">
                        <div className="hd-switcher-choice-wrapper">
                            <div className="hd-switcher-choice-infos">
                                <span className="hd-switcher-choice-infos__title">Medium</span>
                                <span className="hd-switcher-choice-infos__size">24x24px</span>
                            </div>
                            <div className="hd-switcher-choice-preview hd-switcher-choice-preview--medium">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* eslint-disable-next-line max-len */}
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17 3C17.4142 3 17.75 3.33579 17.75 3.75V5.25C17.75 5.66421 17.4142 6 17 6C16.5858 6 16.25 5.66421 16.25 5.25V3.75C16.25 3.33579 16.5858 3 17 3ZM9.00385 3.00165C9.33817 3.00165 9.63212 3.22293 9.72459 3.54422L11.0491 8.14642L14.5761 9.82439C14.8374 9.94871 15.0038 10.2123 15.0038 10.5016C15.0038 10.791 14.8374 11.0546 14.5761 11.1789L11.0491 12.8569L9.72459 17.4591C9.63212 17.7804 9.33817 18.0016 9.00385 18.0016C8.66952 18.0016 8.37557 17.7804 8.2831 17.4591L6.95857 12.8569L3.43163 11.1789C3.17032 11.0546 3.00385 10.791 3.00385 10.5016C3.00385 10.2123 3.17032 9.94871 3.43163 9.82439L6.95857 8.14642L8.2831 3.54422C8.37557 3.22293 8.66952 3.00165 9.00385 3.00165ZM9.00385 6.46337L8.30661 8.88597C8.24719 9.09243 8.10208 9.2635 7.90808 9.35579L5.4996 10.5016L7.90808 11.6475C8.10208 11.7398 8.24719 11.9109 8.30661 12.1173L9.00385 14.5399L9.70108 12.1173C9.7605 11.9109 9.90561 11.7398 10.0996 11.6475L12.5081 10.5016L10.0996 9.35579C9.90561 9.2635 9.7605 9.09243 9.70108 8.88597L9.00385 6.46337ZM17.75 8.75C17.75 8.33579 17.4142 8 17 8C16.5858 8 16.25 8.33579 16.25 8.75V10.25C16.25 10.6642 16.5858 11 17 11C17.4142 11 17.75 10.6642 17.75 10.25V8.75ZM13 7C13 6.58579 13.3358 6.25 13.75 6.25H15.25C15.6642 6.25 16 6.58579 16 7C16 7.41421 15.6642 7.75 15.25 7.75H13.75C13.3358 7.75 13 7.41421 13 7ZM18.75 6.25C18.3358 6.25 18 6.58579 18 7C18 7.41421 18.3358 7.75 18.75 7.75H20.25C20.6642 7.75 21 7.41421 21 7C21 6.58579 20.6642 6.25 20.25 6.25H18.75ZM15 13C15.4142 13 15.75 13.3358 15.75 13.75V15.25C15.75 15.6642 15.4142 16 15 16C14.5858 16 14.25 15.6642 14.25 15.25V13.75C14.25 13.3358 14.5858 13 15 13ZM15.75 18.75C15.75 18.3358 15.4142 18 15 18C14.5858 18 14.25 18.3358 14.25 18.75V20.25C14.25 20.6642 14.5858 21 15 21C15.4142 21 15.75 20.6642 15.75 20.25V18.75ZM11 17C11 16.5858 11.3358 16.25 11.75 16.25H13.25C13.6642 16.25 14 16.5858 14 17C14 17.4142 13.6642 17.75 13.25 17.75H11.75C11.3358 17.75 11 17.4142 11 17ZM16.75 16.25C16.3358 16.25 16 16.5858 16 17C16 17.4142 16.3358 17.75 16.75 17.75H18.25C18.6642 17.75 19 17.4142 19 17C19 16.5858 18.6642 16.25 18.25 16.25H16.75Z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </Radio>
                    <Radio className="hd-switcher-choice" value="lg">
                        <div className="hd-switcher-choice-wrapper">
                            <div className="hd-switcher-choice-infos">
                                <span className="hd-switcher-choice-infos__title">Large</span>
                                <span className="hd-switcher-choice-infos__size">32x32px</span>
                            </div>
                            <div className="hd-switcher-choice-preview hd-switcher-choice-preview--large">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* eslint-disable-next-line max-len */}
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 4C12.9388 4 13.3263 4.28603 13.4556 4.70533L15.3472 10.8398L20.4058 13.0861C20.7671 13.2465 21 13.6047 21 14C21 14.3953 20.7671 14.7535 20.4058 14.9139L15.3472 17.1602L13.4556 23.2947C13.3263 23.714 12.9388 24 12.5 24C12.0612 24 11.6737 23.714 11.5444 23.2947L9.65276 17.1602L4.59417 14.9139C4.23288 14.7535 4 14.3953 4 14C4 13.6047 4.23288 13.2465 4.59417 13.0861L9.65276 10.8398L11.5444 4.70533C11.6737 4.28603 12.0612 4 12.5 4ZM12.5 8.39363L11.4299 11.8639C11.3448 12.14 11.1443 12.3658 10.8801 12.4831L7.46409 14L10.8801 15.5169C11.1443 15.6342 11.3448 15.86 11.4299 16.1361L12.5 19.6064L13.5701 16.1361C13.6552 15.86 13.8557 15.6342 14.1199 15.5169L17.5359 14L14.1199 12.4831C13.8557 12.3658 13.6552 12.14 13.5701 11.8639L12.5 8.39363ZM18 9C18 8.44772 18.4477 8 19 8H21C21.5523 8 22 8.44772 22 9C22 9.55228 21.5523 10 21 10H19C18.4477 10 18 9.55228 18 9ZM25 8C24.4477 8 24 8.44772 24 9C24 9.55228 24.4477 10 25 10H27C27.5523 10 28 9.55228 28 9C28 8.44772 27.5523 8 27 8H25ZM23 4C23.5523 4 24 4.44772 24 5V7C24 7.55228 23.5523 8 23 8C22.4477 8 22 7.55228 22 7V5C22 4.44772 22.4477 4 23 4ZM24 11C24 10.4477 23.5523 10 23 10C22.4477 10 22 10.4477 22 11V13C22 13.5523 22.4477 14 23 14C23.5523 14 24 13.5523 24 13V11ZM16 23C16 22.4477 16.4477 22 17 22H19C19.5523 22 20 22.4477 20 23C20 23.5523 19.5523 24 19 24H17C16.4477 24 16 23.5523 16 23ZM23 22C22.4477 22 22 22.4477 22 23C22 23.5523 22.4477 24 23 24H25C25.5523 24 26 23.5523 26 23C26 22.4477 25.5523 22 25 22H23ZM21 18C21.5523 18 22 18.4477 22 19V21C22 21.5523 21.5523 22 21 22C20.4477 22 20 21.5523 20 21V19C20 18.4477 20.4477 18 21 18ZM22 25C22 24.4477 21.5523 24 21 24C20.4477 24 20 24.4477 20 25V27C20 27.5523 20.4477 28 21 28C21.5523 28 22 27.5523 22 27V25Z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </Radio>
                </div>
            </RadioGroup>
            {selectedSize === "sm" && <IconTable type={type} size={type === "react" ? "sm" : "16"} />}
            {selectedSize === "md" && <IconTable type={type} size={type === "react" ? "md" : "24"} />}
            {selectedSize === "lg" && <IconTable type={type} size={type === "react" ? "lg" : "32"} />}
        </div>
    </HopperProvider>
    );
});

export default Switcher;
