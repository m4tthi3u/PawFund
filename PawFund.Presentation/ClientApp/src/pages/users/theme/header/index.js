import { memo, useEffect, useState } from "react";
import "./styles.scss";
import {
  AiOutlineDownCircle,
  AiOutlineFacebook,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUpCircle,
} from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";
import { AiOutlineTikTok } from "react-icons/ai";
import { generatePath, Link, Route, useLocation } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { formatter } from "utils/fomater";
import { AiOutlineHome } from "react-icons/ai";
import { ROUTER } from "utils/router";
import { AiOutlinePhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import authService from "services/authServices";
import Loading from "component/Loading";
import {
  IoMdClose,
  IoMdNotifications,
  IoMdNotificationsOutline,
} from "react-icons/io";
import donationService from "services/donationServices";
import userService from "services/userServiecs";
import petService from "services/petServices";

const fortmatDate = (date) => {
  const newDate = new Date(date);

  const formattedDate = newDate.toLocaleString(); // mặc định định dạng theo locale
  return formattedDate;
};

const formatPrice = (price) => {
  return price.toLocaleString("vi-VN"); // 'vi-VN' là mã ngôn ngữ cho Việt Nam
};

const Header = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [donation, setDonation] = useState([]);
  const [pet, setPet] = useState([]);
  const [nocationStatus, setNocationStatus] = useState(1);
  const [isShowHumberger, setShowHumberger] = useState(false);
  const [isHome, setIsHome] = useState(location.pathname.length <= 1);
  const [iShowCategories, setShowCategories] = useState(true);
  const [showFormResultSearch, setShowFormResultSearch] = useState(false);
  const [valueSearch, setValueSearch] = useState();
  const [dataPetSearch, setDataPetSearch] = useState([]);

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

  const [dataUser, setDataUser] = useState();

  const categories = ["Tất Cả", "Chó", "Mèo", "Khác"];

  useEffect(() => {
    const isHome = location.pathname.length <= 1;
    setIsHome(isHome);
    setShowCategories(isHome);
  }, [location]);

  const checklogin = async () => {
    setLoading(true);
    try {
      const resultCheck = await authService.checkStatus();
      console.log(resultCheck);
      setLoading(false);
      setDataUser(resultCheck.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getAllDonations = async () => {
    try {
      const resultCheck = await donationService.getAll();

      setDonation(resultCheck.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPet = async () => {
    try {
      const resultCheck = await petService.getAll();
      setPet(resultCheck.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetNameUser = async (id) => {
    try {
      const resultCheck = await userService.getById(id);

      // setDonation(resultCheck.data.reverse());
      return resultCheck.data.username;
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetPets = async (id) => {
    try {
      const resultCheck = await petService.getById(id);

      return resultCheck.data.name;
    } catch (error) {
      console.error(error);
    }
  };

  const [donationMessages, setDonationMessages] = useState({});

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = {};

      for (const item of donation) {
        const nameUser = await handleGetNameUser(item.userId);
        const namePet = await handleGetPets(item.petId);
        messages[item.id] = `${nameUser} đã ủng hộ ${formatPrice(
          item.amount
        )} cho bé ${namePet ? namePet : "Thú cưng"}`;
      }

      setDonationMessages(messages);
    };

    fetchMessages();
  }, [donation]); // Chỉ gọi lại khi `donation` thay đổi

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (nocationStatus === 1) {
  //       getAllDonations();
  //     } else {
  //       getAllPet();
  //     }
  //   }, 3000);
  // }, [nocationStatus]);

  useEffect(() => {
    checklogin();
    // Tạo interval để gọi API mỗi 3 giây
    const intervalId = setInterval(() => {
      getAllDonations();
      getAllPet();
      handleGetCart();
    }, 3000);

    // Clear interval khi component bị unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = ROUTER.USER.LOGIN;
  };

  const handleGetCart = () => {
    const dataAdop = localStorage.getItem("list_adoption");
    if (dataAdop && dataAdop.length >= 0) {
      const currentList = JSON.parse(dataAdop);
      return currentList.length;
    } else {
      return 0;
    }
  };

  const handleSearch = (value) => {
    setValueSearch(value);
    const dataSearchPet = pet.filter((pet) => pet.name.includes(value));
    setDataPetSearch(dataSearchPet);
  };

  const handleShowSearch = () => {
    setShowFormResultSearch(true);
  };

  return (
    <>
      {loading && <Loading />}
      <div
        className={`humberger__menu__overlay${
          isShowHumberger ? " active" : ""
        }`}
        onClick={() => setShowHumberger(false)}
      />
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
            {menus.map((menu, menuKey) => (
              <li key={menuKey} to={menu.path}>
                <Link
                  to={menu.path}
                  onClick={() => {
                    const newMenus = [...menus];
                    newMenus[menuKey].isShowSubmenu =
                      !newMenus[menuKey].isShowSubmenu;
                    setMenus(newMenus);
                  }}
                >
                  {menu.name}
                  {menu.child &&
                    (menu.isShowSubmenu ? (
                      <AiOutlineDownCircle />
                    ) : (
                      <AiOutlineUpCircle />
                    ))}
                </Link>
                {menu.child && (
                  <ul
                    className={`header__menu__dropdown ${
                      menu.isShowSubmenu ? "show__submenu" : ""
                    }`}
                  >
                    {menu.child.map((childItem, childKey) => (
                      <li key={`${menuKey}-${childKey}`}>
                        <Link to={childItem.name.path}>{childItem.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
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
              <MdEmail /> pawfund@gmail.com
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
                <li>
                  <AiOutlineMail />
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
                {dataUser?.username ? (
                  <li>
                    <Link to={ROUTER.USER.PROFILE}>
                      <AiOutlineUser /> {dataUser.username}
                    </Link>
                    <span style={{ marginLeft: "16px" }} onClick={handleLogout}>
                      Đăng xuất
                    </span>
                  </li>
                ) : (
                  <li>
                    <Link to={ROUTER.USER.LOGIN}>
                      <AiOutlineUser />
                      <span>Đăng nhập</span>
                    </Link>
                    <Link
                      to={ROUTER.USER.REGISTER}
                      style={{ marginLeft: "8px" }}
                    >
                      {/* <AiOutlineUser /> */}
                      <span>Đăng ký</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <Link to={ROUTER.USER.HOME} className="header__logo">
              <h1>PawFund</h1>
            </Link>
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
                  <Link to={ROUTER.USER.HOME_CART}>
                    <AiOutlineHome /> <span>{handleGetCart()}</span>
                  </Link>
                </li>
                <li id="dropdown-notification">
                  <div className="popup">
                    <input type="checkbox" id="showNotifi" value={false} />
                    <label className="burger" htmlFor="showNotifi">
                      <div
                        style={{
                          backgroundColor: "transparent",
                          display: "flex",
                        }}
                      >
                        <IoMdNotificationsOutline />{" "}
                        <p
                          style={{
                            width: 10,
                            height: 10,
                            left: 14,
                            top: 1,
                            margin: 0,
                            position: "absolute",
                            backgroundColor: "#FFC107",
                            borderRadius: "50%",
                          }}
                        ></p>
                      </div>
                    </label>
                    <nav className="popup-window">
                      <legend>Thông báo</legend>
                      <div
                        style={{
                          display: "flex",
                          padding: "0 8px",
                          alignItems: "center",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          style={{ flex: 1, cursor: "pointer" }}
                          className={`title-notifi ${
                            nocationStatus === 1 && "active"
                          }`}
                          onClick={() => setNocationStatus(1)}
                        >
                          <p
                            style={{
                              fontSize: "13px",
                              margin: 0,
                              textAlign: "center",
                            }}
                          >
                            Quyên góp
                          </p>
                        </div>
                        <div
                          style={{ flex: 1, margin: 0, cursor: "pointer" }}
                          className={`title-notifi ${
                            nocationStatus === 2 && "active"
                          }`}
                          onClick={() => setNocationStatus(2)}
                        >
                          <p
                            style={{
                              fontSize: "13px",
                              margin: 0,
                              textAlign: "center",
                            }}
                          >
                            Thú cưng
                          </p>
                        </div>
                      </div>
                      <ul>
                        {nocationStatus === 1 ? (
                          <>
                            {donation.map((item, index) => (
                              <li key={index}>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 12,
                                    textAlign: "justify",
                                  }}
                                >
                                  <p>
                                    {item?.donationDate
                                      ? fortmatDate(item.donationDate)
                                      : "Đang cập nhật"}
                                  </p>
                                  <p>
                                    {donationMessages[item.id] || "Đang tải..."}
                                  </p>
                                </p>
                              </li>
                            ))}
                          </>
                        ) : (
                          <>
                            {pet.map((item, index) => (
                              <li key={index}>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: 12,
                                    textAlign: "justify",
                                  }}
                                >
                                  <Link
                                    to={generatePath(ROUTER.USER.ADOPTS, {
                                      id: item.id,
                                    })}
                                    style={{
                                      color: "inherit",
                                      textDecoration: "none",
                                    }}
                                  >
                                    <p style={{ marginBottom: 6 }}>
                                      Thú cưng mới chờ được nhận nuôi
                                    </p>
                                    <div style={{ display: "flex" }}>
                                      <div>
                                        <img
                                          src={
                                            item.imageUrl
                                              ? item.imageUrl
                                              : "https://ih1.redbubble.net/image.5465037493.9610/st,small,507x507-pad,600x600,f8f8f8.jpg"
                                          }
                                          alt={item.Leo}
                                          style={{
                                            width: 50,
                                            height: 50,
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                      <div style={{ flex: 1, marginLeft: 12 }}>
                                        <p>Tên: {item.name}</p>
                                        <div
                                          style={{ display: "flex", gap: 12 }}
                                        >
                                          <p>Tuổi: {item.age}</p>
                                          <p>Giới tính: {item.gender}</p>
                                        </div>
                                        <p className="line-clamp-2">
                                          Mô tả: {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </p>
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </nav>
                  </div>
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
            <div
              className="hero__categories__all"
              onClick={() => setShowCategories(!iShowCategories)}
            >
              <AiOutlineMenu />
              Danh sách thú cưng
            </div>
            {/* {iShowCategories && ( */}
            <ul className={iShowCategories ? "" : "hidden"}>
              {categories.map((category, key) => (
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
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    placeholder="Bạn muốn tìm gì?"
                    value={valueSearch}
                    onClick={handleShowSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <button type="submit">Tìm Kiếm</button>
                </form>
                {showFormResultSearch && (
                  <div
                    className="result-search--wrapper"
                    style={{
                      backgroundColor: "#fff",
                      padding: "12px",
                      boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.2)",
                      marginTop: "8px",
                      position: "absolute",
                      // display: "none",
                      top: "100%",
                      zIndex: 99,
                      gap: 12,
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        padding: "8px 12px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowFormResultSearch(false)}
                    >
                      <div>
                        <IoMdClose />
                      </div>
                    </div>
                    <div
                      style={{
                        maxHeight: "400px",
                        overflowY: "auto",
                        marginTop: 26,
                        display: "flex",
                        gap: 8,
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      {dataPetSearch.length > 0 ? (
                        <>
                          {dataPetSearch?.map((item, index) => (
                            <Link
                              to={generatePath(ROUTER.USER.ADOPTS, {
                                id: item.id,
                              })}
                              style={{
                                display: "flex",
                                gap: 12,
                                alignItems: "center",
                                border: "1px solid #ccc",
                                padding: "8px",
                                borderRadius: "4px",
                                position: "relative",
                                color: "#333",
                                textDecoration: "none",
                              }}
                            >
                              <div style={{ display: "flex" }}>
                                <img
                                  src={item.imageUrl}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    objectFit: "cover",
                                  }}
                                  alt="pet-image"
                                />
                              </div>
                              <div style={{ fontSize: 14 }}>
                                <p>Tên: {item.name}</p>
                                <div style={{ display: "flex", gap: 12 }}>
                                  <span>Tuổi: {item.age}</span>
                                  <span>Giới tính: {item.gender}</span>
                                  <span>Trạng thái: {item.status}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              display: "flex",
                              gap: 12,
                              alignItems: "center",
                              padding: "8px",
                              borderRadius: "4px",
                            }}
                          >
                            <div>
                              <p style={{ fontSize: 12, textAlign: "center" }}>
                                Chưa tìm thấy kết quả
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
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
            {isHome && (
              <div className="hero__item">
                <div className="hero__text">
                  <span>Trung tâm Pawfund</span>
                  <h2>
                    Cún yêu <br />
                    ngoan ngoãn
                  </h2>
                  <p>Hãy nhận nuôi chúng em</p>
                  <Link to={ROUTER.USER.ADOPT} className="primary-btn">
                    Nhận Nuôi Ngay
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Header);
