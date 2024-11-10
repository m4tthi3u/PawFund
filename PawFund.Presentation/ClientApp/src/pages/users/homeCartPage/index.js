import { memo, useEffect, useState } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { Quantity } from "component";
import { AiOutlineClose } from "react-icons/ai";
import userPetService from "services/userPetService";
import Loading from "component/Loading";
import { handleCheckLogin } from "utils/checkLogin";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";

const ShoppingCartPage = () => {
  const [dataCart, setDataCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetCart = () => {
    const dataAdop = localStorage.getItem("list_adoption");
    if (dataAdop) {
      const listAdoption = JSON.parse(dataAdop);
      // return listAdoption;
      setDataCart(listAdoption);
    }
    return [];
  };

  const handleDeletedItemCart = (id, name) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa pet ${name} này?`
    );

    if (isConfirmed) {
      const dataCart = localStorage.getItem("list_adoption");
      if (dataCart) {
        const currentList = JSON.parse(dataCart);
        const updatedList = currentList.filter((item) => item.id !== id);
        localStorage.setItem("list_adoption", JSON.stringify(updatedList));
        // console.log(`Item với id ${id} đã bị xóa.`);
        alert(`Đã xóa pet ${name} ra khỏi nhà pet !`);
        handleGetCart();
      } else {
        console.log("Không tìm thấy danh sách trong localStorage.");
      }
    } else {
      console.log("Hủy bỏ xóa item.");
    }
  };

  const handleAdoption = async (data) => {
    setLoading(true);
    try {
      const resultData = await userPetService.adoptPet(data.id);
      console.log("resultData: ", resultData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdot = async () => {
    if (!handleCheckLogin()) {
      navigate(ROUTER.USER.LOGIN);
    } else {
      dataCart.forEach((data) => {
        handleAdoption(data);
        alert("Nhận nuôi pets thành công, vui lòng đợi admin liên hệ !");
        localStorage.removeItem("list_adoption");
        navigate(ROUTER.USER.PROFILE);
      });
    }
  };

  useEffect(() => {
    handleGetCart();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Breadcrumb name="Nhà" />
      <div className="container">
        <div className="table_cart">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Hình ảnh</th>
                <th>Tên</th>
                <th>Số Lượng</th>
                <th>Trạng Thái Yêu Cầu</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {dataCart.length > 0 ? (
                <>
                  {dataCart.map((item, index) => (
                    <tr>
                      <td>{++index}</td>
                      <td className="shopping__cart__item">
                        <img src={`${item.imageUrl}`} alt="adopt-pic" />
                        <h4>{item.name}</h4>
                      </td>
                      <td>
                        <h4>{item.name}</h4>
                      </td>
                      <td>
                        <Quantity quantityy="1" hasAddToCart={false} />
                      </td>
                      <td>{item.status}</td>
                      <td
                        className="icon_close"
                        onClick={() =>
                          handleDeletedItemCart(item.id, item.name)
                        }
                      >
                        <AiOutlineClose />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <>
                  <div>
                    <p>Chưa có thú cưng nào</p>
                  </div>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="shopping__countinue">
              <h3>Mã Thành Viên</h3>
              <div className="shopping__discount">
                <input placeholder="Nhập mã thành viên" />
                <button type="button" className="button-submit">
                  Áp Dụng
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="shopping__checkout">
              <h2>Tổng Đơn: </h2>
              <ul>
                <li>
                  Số Lượng: <span>{dataCart.length}</span>
                </li>
                <li>
                  Trạng Thái Yêu Cầu: <span>Đang chờ Admin liên hệ</span>
                </li>
              </ul>
              <button
                type="button"
                className="button-submit"
                onClick={handleAdot}
                style={{ cursor: "pointer" }}
              >
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
