import { memo, useEffect, useState } from "react";
import "./styles.scss";
import { AiOutlineDownCircle, AiOutlineFacebook, AiOutlineMenu, AiOutlineShoppingCart, AiOutlineUpCircle } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineTikTok } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { formatter } from "utils/fomater";
import { AiOutlineHome } from "react-icons/ai";
import { ROUTER } from "utils/router";
import { AiOutlinePhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";




const Header = () => {
    const location = useLocation();
    const [isShowHumberger, setShowHumberger] = useState(false);
    const [isHome, setIsHome] = useState(location.pathname.length <= 1);
    const [iShowCategories, setShowCategories] = useState(true);
    const [menus, setMenus] = useState([
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
                    name: "Tất Cả",
                    path: "",
                },
                {
                    name: "Chó",
                    path: "",
                },
                {
                    name: "Mèo",
                    path: "",
                },
                {
                    name: "Khác",
                    path: "",
                },
            ],
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
            name: "Liên Hệ ",
            path: ROUTER.USER.CONTACT,
        },
    ]);

    const categories = [
        "Tất Cả",
        "Chó",
        "Mèo",
        "Khác",
    ];

    useEffect(() => {
        const isHome = location.pathname.length <= 1;
        setIsHome(isHome);
        setShowCategories(isHome);
    }, [location]);

    return (
        <>
            <div className={`humberger__menu__overlay${isShowHumberger ? " active" : ""}`}
                onClick={() => setShowHumberger(false)} />
            <div
                className={`humberger__menu__wrapper${isShowHumberger ? " show" : ""}`}
            >
                <div className="header__logo">
                    <h1>PawFund</h1>
                </div>
                <div className="humberger__menu__home">
                    <ul>
                        <li>
                            <Link to={""}>
                                <AiOutlineShoppingCart /> <span>1</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="header__home__price">
                        Nhà: <span>{formatter(1001230)}</span>
                    </div>
                </div>
                <div className="humberger__menu__widget">
                    <div className="header__top__right__auth">
                        <Link to={""}>
                            <AiOutlineUser /> Đăng nhập
                        </Link>
                    </div>
                </div>
                <div className="humberger__menu__nav">
                    <ul>
                        {menus.map((menu, menuKey) => (<li key={menuKey} to ={menu.path}>
                            <Link
                             to={menu.path}
                             onClick={() => {
                                const newMenus = [...menus];
                                newMenus [menuKey].isShowSubmenu = !newMenus [menuKey].isShowSubmenu;
                                setMenus (newMenus);
                             }}
                            >
                            {menu.name}
                            {menu.child && (
                                menu.isShowSubmenu ? (
                                    <AiOutlineDownCircle/>
                                )
                                : (<AiOutlineUpCircle/>)
                            )}
                            </Link>
                            {menu.child && (
                                <ul className={`header__menu__dropdown ${menu.isShowSubmenu ? "show__submenu" : ""}`}>
                                    {menu.child.map((childItem, childKey) => (
                                        <li key ={`${menuKey}-${childKey}`}>
                                         <Link to={childItem.name.path}>{childItem.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>))}
                    </ul>
                </div>
                <div className="header__top__right__social">
                    <Link to={""}>
                        <AiOutlineFacebook />
                    </Link>
                    <Link to={""}>
                        <AiOutlineInstagram />
                    </Link>
                    <Link to={""}>
                        <AiOutlineLinkedin />
                    </Link>
                    <Link to={""}>
                        <AiOutlineTikTok />
                    </Link>
                </div>
                <div className="humberger__menu__contact">
                    <ul>
                        <li>
                            <MdEmail/> pawfund@gmail.com
                        </li>
                        <li>Miễn phí thú cưng tận nhà {formatter(2000000)}</li>
                    </ul>
                </div>
            </div>

            <div className="header__top">
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
                    <div className="col-lg-3">
                        <div className="header__logo">
                            <h1>PawFund</h1>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <nav className="header__menu">
                            <ul>
                                {menus?.map((menu, menuKey) => (
                                    <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                                        <Link to={menu?.path}>{menu?.name}</Link>
                                        {menu.child && (
                                            <ul className="header__menu__dropdown">
                                                {menu.child.map((childItem, childKey) => (
                                                    <li key={`${menuKey}-${childKey}`}>
                                                        <Link to={childItem.path}>{childItem.name}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                    </div>
                    <div className="col-lg-3">
                        <div className="header__home">
                            <div className="header__home__pet">
                                <span>{formatter(1000000)}</span>
                            </div>
                            <ul>
                                <li>
                                    <Link to= {ROUTER.USER.HOME_CART}>
                                        <AiOutlineHome /> <span>2</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="humberger__open">
                            <AiOutlineMenu onClick={() => setShowHumberger(true)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row hero__categories_container">
                    <div className="col-lg-3 col-lg-12 col-md-12 col-sm-12 col-xs-12 hero__categories">
                        <div className="hero__categories__all" onClick={() => setShowCategories(!iShowCategories)}>
                            <AiOutlineMenu />
                            Danh sách thú cưng
                        </div>
                        {/* {iShowCategories && ( */}
                        <ul className={iShowCategories ? "" : "hidden"}>
                            {
                                categories.map((category,key) => (
                                <li key={key}>
                                    <Link to={ROUTER.USER.ADOPT}>{category}</Link>
                                </li>
                            ))}
                        </ul>
                        {/* )}   */}
                    </div>
                    <div className="col-lg-9 col-lg-12 col-md-12 col-sm-12 col-xs-12 hero__search__container">
                        <div className="hero__search">
                            <div className="hero__search__form">
                                <form>
                                    <input type="text" placeholder="Bạn muốn tìm gì?" />
                                    <button type="submit">Tìm Kiếm</button>
                                </form>
                            </div>
                            <div className="hero__search__phone">
                                <div className="hero__search__phone__icon">
                                    <AiOutlinePhone />
                                </div>
                                <div className="hero__search__phone__text">
                                    <p>0123.456.789</p>
                                    <span>Hỗ Trợ 24/7</span>
                                </div>
                            </div>
                        </div>
                        {
                        isHome && (
                            <div className="hero__item">
                                <div className="hero__text">
                                    <span>Trung tâm Pawfund</span>
                                    <h2>Cún yêu <br />
                                        ngoan ngoãn</h2>
                                    <p>Hãy nhận nuôi chúng em</p>
                                    <Link to={ROUTER.USER.ADOPT} className="primary-btn">Nhận Nuôi Ngay</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>

    );
}

export default memo(Header);