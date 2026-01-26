
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout.tsx";
import { MainPage } from "./MainPage.tsx";
import { StorePage } from "./StorePage.tsx";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/store" element={<StorePage />} />
            </Route>
        </Routes>
    );
}
