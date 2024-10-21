import { memo } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTikTok } from "react-icons/ai";


const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 ">
                    <div className="footer__about">
                        <h1 className="footer__about__logo">PawFund</h1>
                        <ul>
                            <li>Địa chỉ: UTH</li>
                            <li>Phone: 01234566678</li>
                            <li>Email: pawfund@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 ">
                    <div className="footer__widget">
                        <h6>PawFund</h6>
                        <ul>
                            <li>
                                <Link to="">Liên Hệ</Link>
                            </li>
                            <li>
                                <Link to="">Thông tin về chúng tôi</Link>
                            </li>
                            <li>
                                <Link to="">Thú cưng</Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link to="">Thông tin tài khoản</Link>
                            </li>
                            <li>
                                <Link to="">Nhà</Link>
                            </li>
                            <li>
                                <Link to="">Danh sách ưa thích</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="footer__widget">
                        <h6>Khuyến mãi và ưu đãi</h6>
                        <p>Đăng kí nhận thông tin tại đây</p>
                        <form action="#">
                            <div className="input-group">
                                <input type="text" placeholder="Nhập email" />
                                <button type="submit" className="button-submit">
                                    Đăng kí
                                </button>
                            </div>
                            <div className="footer__widget__social">
                                <div>
                                    <AiOutlineFacebook/>
                                </div>
                                <div>
                                    <AiOutlineInstagram/>
                                </div>
                                <div>
                                    <AiOutlineLinkedin/>
                                </div>
                                <div>
                                    <AiOutlineTikTok/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);