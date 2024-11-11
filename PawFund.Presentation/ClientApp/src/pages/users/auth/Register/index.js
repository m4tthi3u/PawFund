import React, { useState } from "react";
import { Link } from "react-router-dom";
import userService from "services/userServiecs";
import Loading from "component/Loading";
import { ROUTER } from "utils/router";
import { IoMdArrowRoundBack } from "react-icons/io";

const Register = () => {
  const [dataRegister, setDataRegister] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password confirmation check
    if (dataRegister.password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    try {
      const dataResult = await userService.create(dataRegister);
      console.log(dataResult);
      setLoading(false);
      if (window.confirm("Đăng ký tài khoản thành công.")) {
        window.location.href = ROUTER.USER.LOGIN;
      }
    } catch (error) {
      console.error(error);
      setLoading(false);

      // Check if the error is a conflict (409)
      if (error.response && error.response.status === 409) {
        alert(
          "Email hoặc tên đăng nhập đã tồn tại. Vui lòng chọn email/tên đăng nhập khác!",
        );
      } else {
        alert("Đăng ký không thành công, hãy kiểm tra lại dữ liệu !");
      }
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
                <h2>Đăng ký tài khoản</h2>
              </div>
              <form className="login" onSubmit={(e) => handleRegister(e)}>
                <div className="login__field">
                  <i className="login__icon fas fa-user" />
                  <input
                    type="email"
                    className="login__input"
                    placeholder="Email"
                    value={dataRegister.email}
                    onChange={(e) =>
                      setDataRegister((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-user" />
                  <input
                    type="text"
                    value={dataRegister.username}
                    className="login__input"
                    placeholder="Tài khoản"
                    onChange={(e) =>
                      setDataRegister((prev) => ({
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
                    value={dataRegister.password}
                    placeholder="Mật khẩu"
                    onChange={(e) =>
                      setDataRegister((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock" />
                  <input
                    type="password"
                    className="login__input"
                    value={confirmPassword}
                    placeholder="Xác nhận mật khẩu"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button className="button login__submit">
                  <span className="button__text">Đăng ký</span>
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
                  Bạn đã có tài khoản,
                  <Link
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      marginLeft: "4px",
                    }}
                    to={ROUTER.USER.LOGIN}
                  >
                    {"  "}
                    đăng nhập ngay
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

export default Register;
