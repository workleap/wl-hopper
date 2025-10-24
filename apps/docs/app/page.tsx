import { IconsCard } from "@/app/ui/home-page/IconsCard.tsx";
import Wrapper from "@/app/ui/layout/wrapper/Wrapper";
import LinkButton from "@/components/button/LinkButton";
import {
    AccessibleIcon,
    ArrowIcon,
    DarkModeIcon,
    FontSizeIcon,
    InternationalIcon,
    LineHeightIcon,
    MarginIcon,
    SelectArrowIcon,
    TypescriptIcon
} from "@/components/icon";
import Link from "next/link";
import "./home.css";
import { ComponentsCard } from "./ui/home-page/ComponentsCard";
import { GithubButton } from "./ui/home-page/GithubButton";

export default function Home() {
    return (
        <Wrapper>
            <main className="hd-home">
                <div className="hd-home__heading">
                    <h1 className="hd-home__header">Leap into creativity</h1>
                    <p className="hd-home__tagline">Explore Workleap&apos;s Design System, where icons, tokens, and components are
                        handpicked for ultimate simplicity and accessibility.
                    </p>
                </div>
                <div className="hd-home__ctas">
                    <LinkButton href="/getting-started/overview/installation">Getting Started</LinkButton>
                    <GithubButton />
                </div>
                <div className="hd-home__features">
                    <div className="hd-home__feature-item">
                        <h2 className="hd-home__feature-title"><AccessibleIcon className="hd-home-feature-title__icon" />Accessible
                        </h2>
                        <p className="hd-home__feature-copy">
                            Built with accessibility in mind Hopper is based on React Aria Components
                        </p>
                    </div>
                    <div className="hd-home__feature-item">
                        <h2 className="hd-home__feature-title">
                            <InternationalIcon className="hd-home-feature-title__icon" />
                            International
                        </h2>
                        <p className="hd-home__feature-copy">
                            Experience is pushed further with internationalization.
                        </p>
                    </div>
                    <div className="hd-home__feature-item">
                        <h2 className="hd-home__feature-title">
                            <TypescriptIcon className="hd-home-feature-title__icon hd-icon-fill" />
                            Typescript
                        </h2>
                        <p className="hd-home__feature-copy">
                            Typescript based for reduced learning curve and error detection.
                        </p>
                    </div>
                    <div className="hd-home__feature-item">
                        <h2 className="hd-home__feature-title"><DarkModeIcon className="hd-home-feature-title__icon" />Dark
                            mode
                        </h2>
                        <p className="hd-home__feature-copy">
                            Switching from light to dark mode couldn&apos;t be easier.
                        </p>
                    </div>
                </div>
                <div className="hd-home-samples">
                    <div className="hd-home-samples__col hd-home-samples__main-wrapper">
                        <div className="hd-home-samples__row">
                            <div className="hd-home-samples__col">
                                <Link
                                    className="hd-home-sample__item hd-home-sample__item-colors"
                                    href="/tokens/semantic/color"
                                >
                                    <h3 className="hd-home-sample__title">
                                        Colors
                                        <ArrowIcon className="hd-home-sample__title-icon" />
                                    </h3>
                                    <div className="hd-home-sample__colors">
                                        <div className="hd-home-sample__colors-row">
                                            <span
                                                className="hd-home-sample__color hd-home-sample__color-rock-200"
                                            >
                                            </span>
                                            <span
                                                className="hd-home-sample__color hd-home-sample__color-rock-300"
                                            >
                                            </span>
                                            <span
                                                className="hd-home-sample__color hd-home-sample__color-rock-400"
                                            >
                                            </span>
                                            <span
                                                className="hd-home-sample__color hd-home-sample__color-rock-500"
                                            >
                                            </span>
                                        </div>
                                        <div className="hd-home-sample__colors-row">
                                            <span
                                                className="hd-home-sample__color hd-home-sample__color-sapphire-200"
                                            >
                                            </span>
                                            <span
                                                className="hd-home-sample__color hd-home-sample__color-sapphire-300"
                                            >
                                            </span>
                                            <span
                                                className="hd-home-sample__color hd-home-sample__color-sapphire-400"
                                            >
                                            </span>
                                            <span
                                                className="hd-home-sample__color hd-home-sample__color-sapphire-500"
                                            >
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <Link
                                    className="hd-home-sample__item hd-home-sample__item-sizes"
                                    href="/tokens/semantic/space"
                                >
                                    <h3 className="hd-home-sample__title">
                                        Sizes
                                        <ArrowIcon className="hd-home-sample__title-icon" />
                                    </h3>
                                    <div className="hd-home-sample__sizes">
                                        <div className="hd-home-sample__size hd-home-sample__size-16">
                                            <span className="hd-home-sample__size-text">16</span>
                                            <div className="hd-home-sample__size-bar"></div>
                                        </div>
                                        <div className="hd-home-sample__size hd-home-sample__size-24">
                                            <span className="hd-home-sample__size-text">24</span>
                                            <div className="hd-home-sample__size-bar"></div>
                                        </div>
                                        <div className="hd-home-sample__size hd-home-sample__size-32">
                                            <span className="hd-home-sample__size-text">32</span>
                                            <div className="hd-home-sample__size-bar"></div>
                                        </div>
                                        <div className="hd-home-sample__size hd-home-sample__size-40">
                                            <span className="hd-home-sample__size-text">40</span>
                                            <div className="hd-home-sample__size-bar"></div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="hd-home-samples__col">
                                <Link
                                    className="hd-home-sample__item hd-home-sample__item-text-styles"
                                    href="/tokens/semantic/typography"
                                >
                                    <h3 className="hd-home-sample__title">
                                        Text Styles
                                        <ArrowIcon className="hd-home-sample__title-icon" />
                                    </h3>
                                    <div className="hd-home-sample__text-styles">
                                        <div className="hd-home-sample__text-styles-col">
                                            <span className="hd-home-sample__text">
                                                A
                                                <span className="hd-home-sample__text-lowercase" >a
                                                </span>
                                            </span>
                                        </div>
                                        <div
                                            className="hd-home-sample__text-styles-col hd-home-sample__text-styles-controls"
                                        >
                                            <div className="hd-home-sample__control-knob-title">
                                                <span className="hd-home-sample__control-title">Regular</span>
                                                <SelectArrowIcon />
                                            </div>
                                            <div className="hd-home-sample__control-knob">
                                                <FontSizeIcon />
                                                <span className="hd-home-sample__control-knob-value">84</span>
                                            </div>
                                            <div className="hd-home-sample__control-knob">
                                                <LineHeightIcon />
                                                <span className="hd-home-sample__control-knob-value">96</span>
                                            </div>
                                            <div className="hd-home-sample__control-knob">
                                                <MarginIcon />
                                                <span className="hd-home-sample__control-knob-value">0</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <IconsCard />
                    </div>
                    <ComponentsCard />
                </div>
            </main>
        </Wrapper>
    );
}
