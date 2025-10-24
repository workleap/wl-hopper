"use client";

import { ArrowIcon } from "@/components/icon";
import { ThemeContext } from "@/context/theme/ThemeProvider";
import { HopperProvider } from "@hopper-ui/components";
import {
    CalendarIcon,
    ChartBarIcon,
    CheckmarkIcon,
    DeleteIcon,
    EyeVisibleIcon,
    FilterIcon,
    FocusIcon,
    ItalicIcon,
    LightbulbIcon,
    LockIcon,
    MailIcon,
    NotebookIcon,
    PinIcon,
    ProfileIcon,
    ReactionIcon,
    RecurringIcon,
    RewindIcon,
    SearchIcon,
    ShareIcon,
    StarIcon,
    StickyIcon,
    SyncIcon,
    TeamIcon,
    ThumbsUpIcon,
    UnarchiveIcon,
    WarningIcon
} from "@hopper-ui/icons";
import Link from "next/link";
import { useContext } from "react";

export const IconsCard = () => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <Link
            className="hd-home-sample__item hd-home-sample__item-icons"
            href="/icons/overview/introduction"
        >
            <h3 className="hd-home-sample__title">
                Icons
                <ArrowIcon className="hd-home-sample__title-icon" />
            </h3>
            <p className="hd-home-sample__tagline">A set of commonly used interface icons.</p>
            <HopperProvider colorScheme={colorMode} className="hd-home-sample__icons">
                <div className="hd-home-sample__icons-row">
                    <CalendarIcon className="hd-home-sample__icons-icon" size="sm" />
                    <ChartBarIcon className="hd-home-sample__icons-icon" size="sm" />
                    <CheckmarkIcon className="hd-home-sample__icons-icon" size="sm" />
                    <FilterIcon
                        className="hd-home-sample__icons-icon hd-home-sample__icons-icon--strong"
                        size="sm"
                    />
                    <LightbulbIcon className="hd-home-sample__icons-icon" size="sm" />
                    <MailIcon className="hd-home-sample__icons-icon" size="sm" />
                    <SearchIcon
                        className="hd-home-sample__icons-icon hd-home-sample__icons-icon--strong"
                        size="sm"
                    />
                    <ShareIcon className="hd-home-sample__icons-icon" size="sm" />
                    <WarningIcon className="hd-home-sample__icons-icon" size="sm" />
                </div>
                <div className="hd-home-sample__icons-row">
                    <ThumbsUpIcon className="hd-home-sample__icons-icon" size="sm" />
                    <LockIcon
                        className="hd-home-sample__icons-icon hd-home-sample__icons-icon--active"
                        size="sm"
                    />
                    <ItalicIcon className="hd-home-sample__icons-icon" size="sm" />
                    <EyeVisibleIcon className="hd-home-sample__icons-icon" size="sm" />
                    <NotebookIcon
                        className="hd-home-sample__icons-icon hd-home-sample__icons-icon--strong"
                        size="sm"
                    />
                    <DeleteIcon className="hd-home-sample__icons-icon" size="sm" />
                    <StarIcon className="hd-home-sample__icons-icon" size="sm" />
                    <StickyIcon
                        className="hd-home-sample__icons-icon hd-home-sample__icons-icon--strong"
                        size="sm"
                    />
                    <ProfileIcon className="hd-home-sample__icons-icon" size="sm" />
                </div>
                <div className="hd-home-sample__icons-row hd-home-sample__icons-extra-row">
                    <FocusIcon
                        className="hd-home-sample__icons-icon hd-home-sample__icons-icon--strong"
                        size="sm"
                    />
                    <ReactionIcon className="hd-home-sample__icons-icon" size="sm" />
                    <PinIcon
                        className="hd-home-sample__icons-icon hd-home-sample__icons-icon--strong"
                        size="sm"
                    />
                    <SyncIcon className="hd-home-sample__icons-icon" size="sm" />
                    <UnarchiveIcon className="hd-home-sample__icons-icon" size="sm" />
                    <TeamIcon className="hd-home-sample__icons-icon" size="sm" />
                    <ShareIcon className="hd-home-sample__icons-icon" size="sm" />
                    <RewindIcon className="hd-home-sample__icons-icon" size="sm" />
                    <RecurringIcon className="hd-home-sample__icons-icon" size="sm" />
                </div>
            </HopperProvider>
        </Link>
    );
};
