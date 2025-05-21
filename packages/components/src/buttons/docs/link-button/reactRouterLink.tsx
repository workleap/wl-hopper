import { HopperProvider, LinkButton, Text } from "@hopper-ui/components";
import { createMemoryRouter, RouterProvider, useNavigate } from "react-router-dom";

export default function App() {
    const router = createMemoryRouter([{
        path: "/123",
        element: (
            <Text>
                Navigated Successfully!
            </Text>
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

    return (
        // Set up the HopperProvider at the root of your app.
        <HopperProvider colorScheme="light" navigate={navigate}>
            <LinkButton href="/123">Go to next router page</LinkButton>
        </HopperProvider>

    );
}
