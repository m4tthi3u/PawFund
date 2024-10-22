import { memo, useState } from "react";
import "./styles.scss";
import { AiOutlineFacebook, AiOutlineMenu } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineTikTok } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { formatter } from "utils/fomater";
import { AiOutlineHome } from "react-icons/ai";
import { ROUTER } from "utils/router";
import { AiOutlinePhone } from "react-icons/ai";




const Header = () => {
    const [iShowCategories, setShowCategories] = useState (true);
    const [menu] = useState([
        {
            name: "Trang Chủ",
            path: ROUTER.USER.HOME,
        },
        {
            name: "Nhận Nuôi",
            path: ROUTER.USER.ADOPT,
            isShowSubmenu: false,
            child: [
                {
                    name: "Chó",
                    path: "",
                },
                {
                    name: "mèo",
                    path: "",
                },
            ]
        },
        {
            name: "Ủng Hộ",
            path: ROUTER.USER.DONATE,
        },
        {
            name: "Tình Nguyện Viên",
            path: ROUTER.USER.VOLUNTEER,
        },
        {
            name: "Tin Tức",
            path: ROUTER.USER.NEWS,
        },
        {
            name: "Liên Hệ ",
            path: ROUTER.USER.CONTACT,
        },
    ])
    return (
        <>
        <div className= "header__top">
            <div className="container">
                <div className="row">
                    <div className="col-6 header__top_left">
                        <ul>
                            <li><AiOutlineMail />
                            pawfund@gmail.com 
                            </li>
                            <li>Miễn phí thú cưng tận nhà {formatter(2000000)} </li>
                        </ul>
                    </div>
                    <div className="col-6 header__top-right">
                       <ul>
                        <li>
                            <Link to={""}>
                                <AiOutlineFacebook />
                            </Link>
                        </li>
                        <li>
                            <Link to={""}>
                                <AiOutlineInstagram />
                            </Link>
                        </li>
                        <li>
                            <Link to={""}>
                                <AiOutlineLinkedin />
                            </Link>  
                        </li>
                        <li>
                            <Link to={""}>
                                <AiOutlineTikTok />
                            </Link>
                        </li>
                        <li>
                            <Link to={""}>
                                <AiOutlineUser />
                            </Link>
                            <span>Đăng nhập</span>
                        </li>
                       </ul>
                    </div>
                </div>
            </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3">
                        <div className="header__logo">
                            <h1>PawFund</h1>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <nav className="header__menu">
                           <ul>
                            { menu?.map((menu, menuKey) => (
                                    <li key = {menuKey} className={menuKey === 0 ? "active": ""}>
                                        <Link to ={menu?.path}>{menu?.name}</Link>
                                        {
                                            menu.child && (
                                                <ul className="header__menu__dropdown">
                                                    {
                                                        menu.child.map((childItem, childKey) => (
                                                            <li key = {`${menuKey}-${childKey}`}>
                                                                <Link to={childItem.path}>{childItem.name}</Link>
                                                            </li>
                                                        ))} 
                                                </ul>
                                            )
                                        }
                                    </li>
                                ))}
                           </ul>
                        </nav>  

                    </div>
                    <div className="col-xl-3">
                        <div className="header__home">
                            <div className="header__home__pet">
                                <span>{formatter(1000000)}</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to="#">
                                        <AiOutlineHome /> <span>2</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row hero__categories_container">
                    <div className="col-lg-3 hero__categories">
                        <div className="hero__categories__all" onClick={()=> setShowCategories(!iShowCategories)}>
                            <AiOutlineMenu/>
                            Danh sách thú cưng
                        </div>
                        {/* {iShowCategories && ( */}
                        <ul className={iShowCategories ? "" : "hidden"}>
                        <li>
                            <Link to={"#"}>Tất cả</Link>
                        </li>
                        <li>
                            <Link to={"#"}>Chó</Link>
                        </li>
                        <li>
                            <Link to={"#"}>Mèo</Link>
                        </li>
                        <li>
                            <Link to={"#"}>Khác</Link>
                        </li>
                    </ul>
                        {/* )}   */}
                    </div>
                    <div className="col-lg-9 hero__search__container">
                        <div className="hero__search">
                            <div className="hero__search__form">
                                <form>
                                    <input type="text" placeholder="Bạn muốn tìm gì?"/>
                                    <button type="submit">Tìm Kiếm</button>
                                </form>
                            </div>
                            <div className="hero__search__phone">
                                <div className="hero__search__phone__icon">
                                    <AiOutlinePhone/>
                                </div>
                                <div className="hero__search__phone__text">
                                    <p>0123.456.789</p>
                                    <span>Hỗ Trợ 24/7</span>
                                </div>
                            </div>
                        </div>
                        <div className="hero__item">
                            <div className="hero__text">
                                <span>Trung tâm Pawfund</span>
                                <h2>Cún yêu <br />                                    
                                 ngoan ngoãn</h2>
                                 <p>Hãy nhận nuôi chúng em</p>
                                 <Link to="" className="primary-btn">Nhận Nuôi Ngay</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
        
    );
};

export default memo(Header);