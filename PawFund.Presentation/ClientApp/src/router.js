// import { render } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/users/homePage";
import { ROUTER } from "./utils/router";
import MasterLayout from "./pages/users/theme/masterLayout";
import ProfilePage from "./pages/users/profilePage";
import AdoptPage from "./pages/users/adoptPage";
import AdoptDetailPage from "./pages/users/adoptDetailPage";

const renderUserRouter = () => {
    const userRouters = [
        {
            path: ROUTER.USER.HOME,
            Component: <HomePage />
        },
        {
            path: ROUTER.USER.PROFILE,
            Component: <ProfilePage />
        },
        {
            path: ROUTER.USER.ADOPT,
            Component: <AdoptPage />,
        },
        {
            path: ROUTER.USER.ADOPTS,
            Component: <AdoptDetailPage />,
        },
        
        
    ];

    return (
        <MasterLayout>
            <Routes>
                {userRouters.map((item, key) => (
                    <Route key={key} path={item.path} element={item.Component} />
                ))}
            </Routes>
        </MasterLayout>
    );
};

const RouterCustom = () => {
    return renderUserRouter();
};

export default RouterCustom;