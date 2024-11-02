import { memo } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { Quantity } from "component";
import { AiOutlineClose } from "react-icons/ai";

const ShoppingCartPage = () => {
  return (
    <>
      <Breadcrumb name="Nhà" />
      <div className="container">
        <div className="table_cart">
          <table>
            <thead>
              <tr>
                <th>Tên</th>
                <th>Số Lượng</th>
                <th>Trạng Thái Yêu Cầu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="shopping__cart__item">
                  <img 
                  src="https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J"
                  alt="adopt-pic" />
                  <h4>Buddy</h4>
                </td>
                <td><Quantity quantityy="1" hasAddToCart={false}/></td>
                <td>Chờ Phản Hồi</td>
                <td className="icon_close">
                  <AiOutlineClose />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="shopping__countinue">
              <h3>Mã Thành Viên</h3>
            <div className="shopping__discount">
              <input placeholder="Nhập mã thành viên" />
              <button type="button" className="button-submit">Áp Dụng</button>
            </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="shopping__checkout">
              <h2>Tổng Đơn: </h2>
              <ul>
                <li>Số Lượng: <span>{1}</span></li>
                <li>Trạng Thái Yêu Cầu: <span>Đã Được Chấp Thuận</span></li>
              </ul>
              <button type="button" className="button-submit">
                Nhận Nuôi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ShoppingCartPage);
