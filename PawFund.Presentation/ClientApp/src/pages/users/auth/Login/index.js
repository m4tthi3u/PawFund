import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import authService from "services/authServices";
import Loading from "component/Loading";
import { ROUTER } from "utils/router";
import { IoMdArrowRoundBack } from "react-icons/io";

const Login = () => {
  const [dataLogin, setDataLogin] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resultLogin = await authService.login(dataLogin);
      console.log(resultLogin);
      setLoading(false);
      localStorage.setItem("token", resultLogin.data.token);
      window.location.href = ROUTER.USER.HOME;
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Tài khoản hoặc mật khẩu không đúng !");
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div id="login-wrapper">
        <div className="container">
          <div className="screen">
            <div className="screen__content">
              <div className="login__footer-back">
                <Link
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "12px",
                    color: "#333",
                    textDecoration: "none",
                  }}
                  to={ROUTER.USER.HOME}
                >
                  <IoMdArrowRoundBack style={{ marginRight: "8px" }} /> Trang
                  chủ
                </Link>
              </div>
              <div className="login-header">
                <h2>Đăng nhập</h2>
              </div>
              <form className="login" onSubmit={(e) => handleLogin(e)}>
                <div className="login__field">
                  <i className="login__icon fas fa-user" />
                  <input
                    type="text"
                    className="login__input"
                    placeholder="Tài khoản"
                    onChange={(e) =>
                      setDataLogin((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock" />
                  <input
                    type="password"
                    className="login__input"
                    placeholder="Mật khẩu"
                    onChange={(e) =>
                      setDataLogin((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
                <button className="button login__submit">
                  <span className="button__text">Đăng nhập</span>
                  <i className="button__icon fas fa-chevron-right" />
                </button>
              </form>
              <div className="login__footer">
                <div
                  className="login__footer-back"
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Bạn chưa có tài khoản,
                  <Link
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      marginLeft: "4px",
                    }}
                    to={ROUTER.USER.REGISTER}
                  >
                    {"  "}
                    đăng ký ngay
                  </Link>
                </div>
              </div>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4" />
              <span className="screen__background__shape screen__background__shape3" />
              <span className="screen__background__shape screen__background__shape2" />
              <span className="screen__background__shape screen__background__shape1" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
