import { Div, H1, HopperProvider, HtmlHeader, Inline, Link, Main, SegmentedControl, SegmentedControlItem, useColorSchemeContext, useThemeContext, type Key } from "@hopper-ui/components";
import { Outlet, useHref, useNavigate } from "react-router-dom";

export function Layout() {
    const navigate = useNavigate();

    return (
        <HopperProvider locale="en-US" navigate={navigate} useHref={useHref} withBodyStyle defaultColorScheme="dark">
            <InnerLayout />
        </HopperProvider>
    );
}

function InnerLayout() {
    const { setColorScheme, colorScheme } = useColorSchemeContext();
    const { setTheme, theme } = useThemeContext();

    return (
        <Div>
            <HtmlHeader borderBottom="neutral" padding="inset-sm">
                <H1>React App</H1>
                <Link href="/">Main Page</Link> &nbsp;
                <Link href="/store">Store</Link> &nbsp;
                <Div
                    position="absolute"
                    top="10px"
                    right="10px"
                    display="fixed"
                >
                    <Inline>
                        <SegmentedControl
                            size="sm"
                            aria-label="Color scheme"
                            selectedKey={colorScheme}
                            onSelectionChange={(key: Key) => setColorScheme(key as "light" | "dark")}
                        >
                            <SegmentedControlItem id="light">Light</SegmentedControlItem>
                            <SegmentedControlItem id="dark">Dark</SegmentedControlItem>
                        </SegmentedControl>
                        <SegmentedControl
                            size="sm"
                            aria-label="Theme"
                            selectedKey={theme}
                            onSelectionChange={(key: Key) => setTheme(key as "workleap" | "sharegate")}
                        >
                            <SegmentedControlItem id="workleap">Workleap</SegmentedControlItem>
                            <SegmentedControlItem id="sharegate">Sharegate</SegmentedControlItem>
                        </SegmentedControl>
                    </Inline>
                </Div>
            </HtmlHeader>
            <Main padding="inset-lg">
                <Outlet />
            </Main>
        </Div>
    );
}
