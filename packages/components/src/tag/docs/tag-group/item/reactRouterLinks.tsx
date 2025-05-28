import { HopperProvider, Tag, TagGroup } from "@hopper-ui/components";
import { createMemoryRouter, RouterProvider, useNavigate } from "react-router-dom";

export default function App() {
    const router = createMemoryRouter([{
        path: "/123",
        element: <>Navigated Successfully to page 1! <Example /></>
    }, {
        path: "/456",
        element: <>Navigated Successfully to page 2! <Example /></>
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
        <HopperProvider colorScheme="light" navigate={navigate}>
            <TagGroup aria-label="tag-group">
                <Tag id="1" href="/123">Page 1</Tag>
                <Tag id="2" href="/456">Page 2</Tag>
            </TagGroup>
        </HopperProvider>
    );
}
