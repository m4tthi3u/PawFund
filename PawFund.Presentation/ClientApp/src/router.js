// import { render } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/users/homePage";
import { ROUTER } from "./utils/router";
import MasterLayout from "./pages/users/theme/masterLayout";
import ProfilePage from "./pages/users/profilePage";
import AdoptPage from "./pages/users/adoptPage";
import AdoptDetailPage from "./pages/users/adoptDetailPage";
import HomeCartPage from "pages/users/homeCartPage";
import DonationPage from "pages/users/donationPage";
import VolunteerPage from "pages/users/volunteerPage";
import ContactPage from "pages/users/contactPage";
import Login from "pages/users/auth/Login";
import Register from "pages/users/auth/Register";
import EventPage from "pages/users/eventPage";
import ShelterPage from "pages/users/shelterPage";

const renderUserRouter = () => {
  const userRouters = [
    {
      path: ROUTER.USER.HOME,
      Component: <HomePage />,
    },
    {
      path: ROUTER.USER.PROFILE,
      Component: <ProfilePage />,
    },
    {
      path: ROUTER.USER.ADOPT,
      Component: <AdoptPage />,
    },
    {
      path: ROUTER.USER.ADOPTS,
      Component: <AdoptDetailPage />,
    },
    {
      path: ROUTER.USER.HOME_CART,
      Component: <HomeCartPage />,
    },
    {
      path: ROUTER.USER.DONATE,
      Component: <DonationPage />,
    },
    {
      path: ROUTER.USER.VOLUNTEER,
      Component: <VolunteerPage />,
    },
    {
      path: ROUTER.USER.CONTACT,
      Component: <ContactPage />,
    },
    {
      path: ROUTER.USER.EVENTS,
      Component: <EventPage />
    },
    {
      path: ROUTER.USER.SHELTER,
      Component: <ShelterPage />,
    }
  ];

  return (
    // <MasterLayout>
    <Routes>
      <Route element={<MasterLayout />}>
        {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.Component} />
        ))}
      </Route>
      <Route path={ROUTER.USER.LOGIN} element={<Login />} />
      <Route path={ROUTER.USER.REGISTER} element={<Register />} />
      {/* {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.Component} />
        ))} */}
    </Routes>
    // </MasterLayout>
  );
};

const RouterCustom = () => {
  return renderUserRouter();
};

export default RouterCustom;
