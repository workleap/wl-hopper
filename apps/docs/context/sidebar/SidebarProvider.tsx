"use client";

import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarProps | null>(null);

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isSidebarOpen) {
            return;
        }

        const handleEsc = (ev: KeyboardEvent) => {
            if (ev.key === "Escape") {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isSidebarOpen]);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    return <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>{children}</SidebarContext.Provider>;
}
