"use client";

import { ArrowIcon } from "@/components/icon";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { Button as HopperButton, HopperProvider } from "@hopper-ui/components";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export const ComponentsCard = () => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <Link href="/components/component-list" className="hd-home-sample__item hd-home-sample__item-components">
            <div className="hd-home-sample__title-wrap">
                <h3 className="hd-home-sample__title">Components <span className="hd-home-sample__title-tag">Preview</span> <ArrowIcon className="hd-home-sample__title-icon" /></h3>
            </div>
            <p className="hd-home-sample__tagline">An accessible suite of components powered by
                react-aria.
            </p>
            <div className="hd-home-sample-components">
                <div className="hd-home-sample-components__item-wrapper">
                    <div className="hd-home-sample-components__item">
                        <Image
                            src={`https://cdn.platform.workleap.com/hopper/webdoc/component-avatar-group-${colorMode}.png`}
                            width="137"
                            height="32"
                            alt="Avatar Group component preview"
                        />
                    </div>
                </div>
                <div className="hd-home-sample-components__item-wrapper">
                    <div className="hd-home-sample-components__item">
                        <Image
                            src={`https://cdn.platform.workleap.com/hopper/webdoc/component-select-field-${colorMode}.png`}
                            width="220"
                            height="40"
                            alt="Select Field component preview"
                        />
                    </div>
                </div>
                <div className="hd-home-sample-components__item-wrapper">
                    <div className="hd-home-sample-components__item">
                        <HopperProvider colorScheme={colorMode}>
                            <div className="hd-home-sample-components__buttons">
                                <HopperButton excludeFromTabOrder>Confirm</HopperButton>
                                <HopperButton excludeFromTabOrder variant="secondary">I need
                                    help
                                </HopperButton>
                            </div>
                        </HopperProvider>
                    </div>
                </div>
                <div className="hd-home-sample-components__item-wrapper">
                    <div className="hd-home-sample-components__item">
                        <Image
                            src={`https://cdn.platform.workleap.com/hopper/webdoc/component-radio-group-${colorMode}.png`}
                            width="99"
                            height="48"
                            alt="Radio Group Component preview"
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};
