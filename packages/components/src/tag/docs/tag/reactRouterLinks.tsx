import { HopperProvider, Tag } from "@hopper-ui/components";
import { RouterProvider, createMemoryRouter, useNavigate } from "react-router-dom";

export default function App() {
    const router = createMemoryRouter([
        {
            path: "/123",
            element: (
                <>
                    Navigated Successfully to page 1! <Example />
                </>
            )
        },
        {
            path: "/456",
            element: (
                <>
                    Navigated Successfully to page 2! <Example />
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
            <Tag id="1" href="/123">
                Page 1
            </Tag>
        </HopperProvider>
    );
}
