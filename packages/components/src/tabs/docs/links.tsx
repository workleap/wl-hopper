import { HopperProvider, Stack, Tab, TabList, Tabs } from "@hopper-ui/components";
import { createMemoryRouter, RouterProvider, useLocation, useNavigate } from "react-router-dom";

export default function Exemple() {
    const router = createMemoryRouter([
        {
            path: "/deleted",
            element: (
                <Stack>
                    <Example />
                    Deleted
                </Stack>
            )
        },
        {
            path: "/shared",
            element: (
                <Stack>
                    <Example />
                    Shared
                </Stack>
            )
        },
        {
            path: "/",
            element: (
                <Stack>
                    <Example />
                    Home
                </Stack>
            )
        }, {
            path: "*",
            element: <Example />
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

function Example() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <HopperProvider colorScheme="system" navigate={navigate}>
            <Tabs aria-label="Navigation" selectedKey={pathname}>
                <TabList>
                    <Tab id="/" href="/">Home</Tab>
                    <Tab id="/shared" href="/shared">Shared</Tab>
                    <Tab id="/deleted" href="/deleted">Deleted</Tab>
                </TabList>
            </Tabs>
        </HopperProvider>
    );
}
