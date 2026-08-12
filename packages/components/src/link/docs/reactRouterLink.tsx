import { HopperProvider, Link } from "@hopper-ui/components";
import { RouterProvider, createMemoryRouter, useNavigate } from "react-router-dom";

export default function App() {
    const router = createMemoryRouter([
        {
            path: "/123",
            element: (
                <>
                    Navigated Successfully! <Example />
                </>
            )
        },
        {
            path: "*",
            element: <Example />
        }
    ]);

    return <RouterProvider router={router} />;
}

function Example() {
    const navigate = useNavigate();

    return (
        <HopperProvider colorScheme="light" navigate={navigate}>
            <Link href="/123">Go to next router page</Link>
        </HopperProvider>
    );
}
