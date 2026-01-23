import Header from "@/app/ui/layout/header/Header";
import { EnvironmentContextProvider } from "@/context/env/EnvironmentProvider";
import { RACProvider } from "@/context/rac/RACProvider";
import { ThemeProvider } from "@/context/theme/ThemeProvider";
import "@hopper-ui/tokens/fonts.css";

import type { ReactNode } from "react";
import "./globals.css";
import "./layout.css";

export const metadata = {
    title: {
        template: "%s | Hopper Design System",
        default: "Hopper Design System"
    },
    description: "Explore Workleap's Design System, where icons, tokens, and components are handpicked for ultimate simplicity and accessibility"
};

export default function RootLayout({ children }: {
    children: ReactNode;
}) {
    const setInitialTheme = `
    function getUserPreference() {
      if(window.localStorage.getItem("hdColorScheme")) {
        return window.localStorage.getItem("hdColorScheme");
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
    }
    function getUserTheme() {
      if(window.localStorage.getItem("hdTheming")) {
        return window.localStorage.getItem("hdTheming");
      }
      return "workleap";
    }
    document.documentElement.dataset.colorScheme = getUserPreference();
    document.documentElement.dataset.theme = getUserTheme();
  `;

    return (
        <html lang="en" suppressHydrationWarning>
            <body id="App" className="hd-layout">
                <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
                <EnvironmentContextProvider>
                    <ThemeProvider>
                        <RACProvider>
                            <Header />
                            <div className="hd-header__shadow" role="presentation">
                                <div className="hd-header-shadow-block hd-header-shadow-block-1"></div>
                                <div className="hd-header-shadow-block hd-header-shadow-block-2"></div>
                                <div className="hd-header-shadow-block hd-header-shadow-block-3"></div>
                            </div>
                            {children}
                        </RACProvider>
                    </ThemeProvider>
                </EnvironmentContextProvider>
            </body>
        </html>
    );
}
