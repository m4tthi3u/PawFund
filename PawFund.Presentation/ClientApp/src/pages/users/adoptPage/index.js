import { memo } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import featured1Img from "assets/users/image/featured/featured1.jpg";
import featured2Img from "assets/users/image/featured/featured2.jpg";
import featured3Img from "assets/users/image/featured/featured3.jpg";
import featured4Img from "assets/users/image/featured/featured4.jpg";
import featured5Img from "assets/users/image/featured/featured5.jpg";
import featured6Img from "assets/users/image/featured/featured6.jpg";
import chuotImg from "assets/users/image/featured/chuot.jpg";
import { AdoptCard } from "component";

const AdoptPage = () => {

    const adopt = [
        {
            img: featured1Img,
            name: "MiMi",
            age: "Trẻ",
            gender: "Cái",
            vaccinated: true,
        },
        {
            img: featured2Img,
            name: "Xuzi",
            age: "Trẻ",
            gender: "Cái",
            vaccinated: true,
        },
        {
            img: featured3Img,
            name: "Luna",
            age: "Trẻ",
            gender: "Cái",
            vaccinated: true,
        },
        {
            img: featured4Img,
            name: "Pu",
            age: "Trẻ",
            gender: "Đực",
            vaccinated: true,
        },
        {
            img: featured5Img,
            name: "Muối",
            age: "Trẻ",
            gender: "Đực",
            vaccinated: true,
        },
        {
            img: featured6Img,
            name: "Chuối",
            age: "Trẻ",
            gender: "Cái",
            vaccinated: true,
        },
        {
            img: chuotImg,
            name: "Chít Chít",
            age: "Trẻ",
            gender: "Cái",
            vaccinated: true,
        },
    ];

    return (
        <>
        <Breadcrumb name="Danh Sách Thú Cưng"/>
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12"> 
                    <div className="sidebar">
                        <div className="sidebar__item">
                            <h2> Tên</h2>
                            <input type="text"/>
                        </div>
                        <div className="sidebar__item">
                            <h2> Giới Tính</h2>
                            <select className="gender-select" name="gender">
                                <option value="all">Tất cả</option>
                                <option value="male">Đực</option>
                                <option value="female">Cái</option>
                                <option value="unknown">Chưa rõ</option>
                            </select>
                        </div>
                        <div className="sidebar__item">
                            <h2>Độ Tuổi</h2>
                            <select className="age-select" name="age">
                                <option value="all">Tất cả</option>
                                <option value="young">Trẻ</option>
                                <option value="adult">Trưởng thành</option>
                                <option value="old">Già</option>
                            </select>
                        </div>
                        <div className="sidebar__item">
                            <h2>Triệt Sản</h2>
                            <select className="neutered-select" name="neutered-status">
                                <option value="all">Tất cả</option>
                                <option value="yes">Có</option>
                                <option value="no">Không</option>
                                <option value="unknown">Chưa rõ</option>
                            </select>
                        </div>
                        <div className="sidebar__item">
                            <h2>Màu</h2>
                            <select className="color-select" name="color">
                                <option value="all">Tất cả</option>
                                <option value="8">Đen</option>
                                <option value="9">Trắng</option>
                                <option value="10">Vàng</option>
                                <option value="11">Đen Trắng</option>
                                <option value="12">Trắng vàng</option>
                                <option value="13">Mướp</option>
                                <option value="14">Tam Thể</option>
                                <option value="15">Nhị Thể</option>
                                <option value="16">Đồi Mồi</option>
                                <option value="17">Xám</option>
                                <option value="18">Xiêm</option>
                                <option value="19">Nâu</option>
                                <option value="20">Nâu vàng</option>
                                <option value="21">Đen vàng</option>
                                <option value="22">Trắng xám</option>
                                <option value="23">Trắng Nâu</option>
                            </select>
                        </div>
                        <div className="sidebar__item"></div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                        {adopt.map((item, key) => (
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={key}>
                                <AdoptCard 
                                    name={item.name}
                                    age={item.age} 
                                    gender={item.gender} 
                                    vaccinated={item.vaccinated} 
                                    img={item.img} 
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
        </>
    );
};

export default memo(AdoptPage);