import { Button, Div, H1, HopperProvider, HtmlHeader, Link, Main, useColorSchemeContext } from "@hopper-ui/components";
import { Outlet, useHref, useNavigate } from "react-router-dom";

export function Layout() {
    const navigate = useNavigate();

    return (
        // eslint-disable-next-line react-compiler/react-compiler
        <HopperProvider locale="en-US" navigate={navigate} useHref={useHref} withBodyStyle defaultColorScheme="dark">
            <InnerLayout />
        </HopperProvider>
    );
}

function InnerLayout() {
    const { setColorScheme, colorScheme } = useColorSchemeContext();

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
                    UNSAFE_width="200px"
                >
                    <Button
                        size="sm"
                        variant="secondary"
                        onPress={() => {
                            setColorScheme(colorScheme === "light" ? "dark" : "light");
                        }}
                    >Change Theme</Button>
                </Div>
            </HtmlHeader>
            <Main padding="inset-lg">
                <Outlet />
            </Main>
        </Div>
    );
}
