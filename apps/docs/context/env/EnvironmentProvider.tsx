"use client";

import { type ReactNode, createContext, useContext } from "react";
import { env } from "./env.ts";

interface Context {
    logRocketAppId?: string;
}

export const EnvironmentContext = createContext<Context | null>(null);

interface EnvironmentContextProviderProps {
    children: ReactNode;
}

export const EnvironmentContextProvider = ({ children }: EnvironmentContextProviderProps) => (
    <EnvironmentContext.Provider value={env}>{children}</EnvironmentContext.Provider>
);

export const useEnvironmentContext = () => {
    const context = useContext(EnvironmentContext);

    if (context === null) {
        throw new Error("useEnvironmentContext must be used within an EnvironmentContextProvider");
    }

    return context;
};
