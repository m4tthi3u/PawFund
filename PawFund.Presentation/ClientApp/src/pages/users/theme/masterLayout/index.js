import { memo } from "react";
import Footer from "../footer";
import Header from "../header";
import { Outlet } from "react-router-dom";

const MasterLayout = ({ ...props }) => {
  return (
    <div {...props}>
      <Header />
      {/* {children} */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default memo(MasterLayout);
