import { memo } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import featured1Img from "assets/users/image/featured/featured1.jpg";
// import featured2Img from "assets/users/image/featured/featured2.jpg";
// import featured3Img from "assets/users/image/featured/featured3.jpg";
// import featured4Img from "assets/users/image/featured/featured4.jpg";
// import featured5Img from "assets/users/image/featured/featured5.jpg";
import featured7Img from "assets/users/image/featured/featured7.jpg";

const AdoptDetailPage = () => {
const imgs = [featured1Img, featured7Img];
    return (
        <>
        <Breadcrumb name="Chi Tiết Thú Cưng"/>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 adopt__detail__pic">
                    <img src={featured1Img} alt="adopt-pic" />
                    <div className="main">
                        {
                            imgs.map((item, key) => (
                                <img src={item} alt="adopt-pic" key={key} />
                            ))}
                    </div>
                </div>
                <div className="col-lg-6 adopt__detail__pic">
                    <h2>MiMi</h2>
                </div>
            </div>
        </div>
        </>
    );
};

export default memo(AdoptDetailPage);