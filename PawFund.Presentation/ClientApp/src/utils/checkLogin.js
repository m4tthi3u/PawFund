const { default: authService } = require("services/authServices");

export const handleCheckLogin = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const dataUser = authService.checkStatus();
  if (!dataUser) {
    return false;
  }
  return true;
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // return decodedToken;
};
