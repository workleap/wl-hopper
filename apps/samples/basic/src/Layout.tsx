import { Button, Div, H1, HopperProvider, HtmlHeader, Inline, Link, Main, useColorSchemeContext, useThemeContext } from "@hopper-ui/components";
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
                <Link href="/store">Store</Link>
                <Div
                    position="absolute"
                    top="10px"
                    right="10px"
                    display="fixed"
                >
                    <Inline>
                        <Button
                            size="sm"
                            variant="secondary"
                            onPress={() => {
                                setColorScheme(colorScheme === "light" ? "dark" : "light");
                            }}
                        >
                            Change Color Scheme
                        </Button>
                        <Button
                            size="sm"
                            variant="secondary"
                            onPress={() => {
                                setTheme(theme === "workleap" ? "sharegate" : "workleap");
                            }}
                        >
                            Change Theme
                        </Button>
                    </Inline>
                </Div>
            </HtmlHeader>
            <Main padding="inset-lg">
                <Outlet />
            </Main>
        </Div>
    );
}
