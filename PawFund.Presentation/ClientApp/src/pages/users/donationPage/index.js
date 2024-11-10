import { memo, useEffect, useState } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { ROUTER } from "utils/router";
import { CiBank } from "react-icons/ci";
import donationService from "services/donationServices";
import Loading from "component/Loading";

function DonationPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fecthData = async () => {
    setLoading(true);
    try {
      const dataResult = await donationService.getAll();
      setDonations(dataResult.data);
      setLoading(false);
      console.log(dataResult.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <>
      {loading && <Loading />}
      <div className="donation-page">
        <Breadcrumb name="Chi Tiết Quyên Góp" />
        <div className="container">
          <div className="donation__content row">
            <div className="col-lg-8 col-md-12 donation__text">
              <h2 className="text-capitalize">Tôi Muốn Ủng Hộ</h2>
              <hr className="small-divider left" />
              <p>
                Mọi hoạt động cứu hộ của Hanoi Pet Adoption hoàn toàn dựa trên
                các khoản quyên góp từ cộng đồng. Chi phí hàng tháng của nhóm
                bao gồm tiền thuê nhà, tiền viện phí, thức ăn, điện, nước, thuốc
                men và đồ dùng, bỉm tã, lương hỗ trợ các bạn tình nguyện viên
                dọn dẹp... Nhóm rất cần sự giúp đỡ của các bạn để có thể duy trì
                nhà chung cũng như đội cứu hộ. Chỉ cần cố định 50k - 100k hàng
                tháng là các bạn đã giúp đỡ được cho nhóm và các bé rất nhiều!
              </p>
              <p>
                Chi phí sẽ được chia đều cho các bé khác còn nằm viện và gây
                dựng nhà chung. Ngoài ra Nhóm cũng tiếp nhận quyên góp bằng hiện
                vật như quần áo cũ (để lót chuồng), bỉm, găng tay y tế, thức ăn,
                cát vệ sinh v.v...
              </p>
              <p>
                <strong>*Lưu ý:</strong> nhóm không dùng zalo và{" "}
                <strong>KHÔNG BAO GIỜ</strong> yêu cầu Mạnh Thường Quân cung cấp
                thông tin thẻ hoặc mã OTP
              </p>
              <p className="donation__list">
                🧧*Danh sách mạnh thường quân quyên góp cho nhóm sẽ được cập
                nhật tại đây:
                <ul>
                  <li>
                    2024: <a href="">Xem tại đây</a>
                  </li>
                  <li>
                    2023: <a href="">Xem tại đây</a>
                  </li>
                  <li>
                    2022: <a href="">Xem tại đây</a>
                  </li>
                  <li>
                    2021: <a href="">Xem tại đây</a>
                  </li>
                  <li>
                    {" "}
                    Tài khoản nhận quyên góp của nhóm. Chi phí sẽ được chia đều
                    cho các bé khác còn nằm viện và gây dựng nhà chung.
                  </li>
                  <strong>
                    {" "}
                    <CiBank /> MB Bank
                  </strong>
                  <li> LE HUY HOANG</li>
                  <li> 0337245164</li>
                  <strong>
                    {" "}
                    <CiBank /> VietComBank
                  </strong>
                  <li> NGUYEN VAN THANH LAM</li>
                  <li> 0123456789</li>
                  <strong>
                    {" "}
                    <CiBank /> MOMO
                  </strong>
                  <li> LE HUY HOANG</li>
                  <li> 0337245164</li>
                  <strong> 🗳️ Địa điểm đặt hòm quyên góp:</strong>
                  <li> UTH</li>
                  <li> Thành Phố Hồ Chí Minh</li>
                </ul>
                <div className="button-submit">
                  <Link to={ROUTER.USER.CONTACT} className="primary-btn">
                    Ủng Hộ Ngay
                  </Link>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(DonationPage);
