"use client";

import { useContext, type ReactNode } from "react";
import { FeatureFlagContext } from "@/context/feature/FeatureFlagProvider.tsx";

interface FeatureFlagProps {
    flag: string;
    children: ReactNode;
}

const FeatureFlag = ({ flag, children }: FeatureFlagProps) => {
    const featureFlags = useContext(FeatureFlagContext);

    return featureFlags[flag] ? children : null;
};

export default FeatureFlag;
