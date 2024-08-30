import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AdminPath } from "./admin.routes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routeGenerator } from "../utils/routesGenerator";
import { UserPath } from "./user.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import MainLayout from "../components/layout/MainLayout";
import HomeLayout from "../components/layout/HomeLayout";
import { PublicPath } from "./public.routes";
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App>
                <HomeLayout />
            </App>
        ),
        children: routeGenerator(PublicPath),
    },
    {
        path: "/admin",
        element: (
            <App>
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            </App>
        ),
        children: routeGenerator(AdminPath),
    },
    {
        path: "/user",
        element: (
            <App>
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            </App>
        ),
        children: routeGenerator(UserPath),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;
