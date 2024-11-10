import { memo, useEffect, useState } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import featured1Img from "assets/users/image/featured/featured1.jpg";
import featured7Img from "assets/users/image/featured/featured7.jpg";
import {
  AiOutlineCopy,
  AiOutlineEye,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTikTok,
} from "react-icons/ai";
import { AdoptCard } from "component";
import axios from "axios";
import Quantity from "component/Quantity";
import petService from "services/petServices";
import Loading from "component/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "utils/router";
import userPetService from "services/userPetService";

const AdoptDetailPage = () => {
  const [image, setImage] = useState(null);
  const [pets, setPets] = useState([]);
  const [petsDetails, setPetsDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPetsDeatails = async () => {
    setLoading(true);
    try {
      const dataResult = await petService.getById(id);
      console.log(dataResult.data);
      setPetsDetails(dataResult.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPets = async () => {
    setLoading(true);
    try {
      const dataResult = await petService.getAll();
      console.log(dataResult);
      setPets(dataResult.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
    fetchPetsDeatails();
  }, [id]);

  const handleAdoption = async (data) => {
    const dataAdop = localStorage.getItem("list_adoption");
    if (!dataAdop || dataAdop.length <= 0) {
      localStorage.setItem("list_adoption", JSON.stringify([data]));
    } else {
      const currentList = JSON.parse(dataAdop);
      const exists = currentList.some((item) => item.id === data.id);
      if (!exists) {
        currentList.push(data);
        localStorage.setItem("list_adoption", JSON.stringify(currentList));
      }
    }
    navigate(ROUTER.USER.HOME_CART);
  };
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  const imgs = [featured1Img, featured7Img];

  return (
    <>
      {loading && <Loading />}
      <Breadcrumb name="Chi Tiết Thú Cưng" />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-xl-12 col-md-12 col-sm-12 col-sx-12 adopt__detail__pic">
            {/* {image ? (
              <img src={image} alt="adopt-pic" />
            ) : (
              <img
                src="https://www.princeton.edu/sites/default/files/styles/1x_full_2x_half_crop/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=Bg2K7j7J"
                alt="adopt-pic"
              />
            )} */}
            <img src={`${petsDetails?.imageUrl}`} alt="adopt-pic" />
          </div>
          <div className="col-lg-6 col-xl-12 col-md-12 col-sm-12 col-sx-12 adopt__detail__text">
            <h2>{`${petsDetails?.name}`}</h2>
            <div className="seen-icon">
              <AiOutlineEye />
              {`20 (lượt xem)`}
            </div>
            <p className="info__pet">
              <ul>
                <li>
                  <b>Giống:</b>{" "}
                  <span>
                    {petsDetails?.species === "Dog"
                      ? "Chó"
                      : petsDetails?.species}
                  </span>
                </li>
                {/* <li>
                  <b>Màu sắc:</b> <span> {petsDetails?.}</span>
                </li> */}
                <li>
                  <b>Tuổi:</b> <span>{petsDetails?.age}</span>{" "}
                </li>
                {/* <li>
                  <b>Cân nặng:</b> <span>2</span>{" "}
                </li> */}
                <li>
                  <b>Giới tính:</b>{" "}
                  <span>{petsDetails?.gender === "Male" ? "Đực" : "Cái"}</span>{" "}
                </li>
                <li>
                  <b>Mã:</b> <span>{petsDetails?.id}</span>{" "}
                </li>
                <li>
                  {" "}
                  <b>Nhận nuôi online bởi:</b>
                  <span></span>{" "}
                </li>
                <li>
                  <b>Liên hệ nhận nuôi:</b> <span></span>{" "}
                </li>
                <li>
                  <b>Chia Sẻ:</b>
                  {""}
                  <span>
                    <AiOutlineFacebook />
                    <AiOutlineInstagram />
                    <AiOutlineTikTok />
                    <AiOutlineLinkedin />
                    <AiOutlineCopy />
                  </span>
                </li>
              </ul>
            </p>
            {/* <Quantity /> */}
            <div className="quantity-container">
              <div className="quantity">
                <span className="qtybtn">-</span>
                <input type="number" defaultValue={1} />
                <span className="qtybtn">+</span>
              </div>
              <div onClick={() => handleAdoption(petsDetails)}>
                <button
                  type="submit"
                  className="button-submit"
                  style={
                    petsDetails?.status === "Adopted" ||
                    petsDetails?.status === "Pending"
                      ? { opacity: "0.6", cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
                  disabled={
                    petsDetails?.status === "Adopted" ||
                    petsDetails?.status === "Pending"
                      ? true
                      : false
                  }
                >
                  {petsDetails?.status === "Adopted" ||
                  petsDetails?.status === "Pending"
                    ? "Đã được nhận nuôi"
                    : "Nhận nuôi"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="adopt__detail__tab">
          <h4>Thông Tin Chi Tiết</h4>
          <ul>
            <li>Triệt sản</li>
            <li>Tiêm Dại</li>
            <li>Tiêm Phòng Bệnh</li>
            <li>Thân Thiện Với Người</li>
            <li>Thân Thiện Với Chó</li>
            <li>Thân Thiện Với Mèo</li>
            <li>Chế Độ Ăn Riêng</li>
            <li>Đi Vệ Sinh Đúng Chỗ</li>
          </ul>
          <p>
            <br />
            <strong>Tìm Hiểu Về Thú Cưng</strong>
          </p>
          <ul>
            <li>
              <p>
                Nhà bé đi nước ngoài không thể mang theo bé sang nên cần người
                chăm sóc.
              </p>
            </li>
          </ul>
          <p>
            <br />
            <strong>Quy Trình Nhận Nuôi</strong>
          </p>
          <ul>
            <li>
              <p>
                Trước khi quyết định nhận nuôi bé chó hay mèo nào, bạn hãy tự
                hỏi bản thân rằng mình đã sẵn sàng để chịu trách nhiệm cả đời
                cho bé chưa, cả về tài chính, nơi ở cũng như tinh thần. Việc
                nhận nuôi cần được sự đồng thuận lớn từ bản thân bạn cũng như
                gia đình và những người liên quan. Xin cân nhắc kỹ trước khi
                liên hệ với HPA về việc nhận nuôi.
              </p>
            </li>
            <li>
              <p>Bạn đã sẵn sàng? Hãy thực hiện các bước sau đây nhé:</p>
            </li>
            <li>
              <p>
                1️⃣ Tìm hiểu về thú cưng bạn muốn nhận nuôi trên trang web của
                PawFund.
              </p>
            </li>
            <li>
              <p>
                2️⃣ Liên hệ với Tình nguyện viên phụ trách bé để tìm hiểu thêm về
                bé.
              </p>
            </li>
            <li>
              <p>3️⃣ Tham gia phỏng vấn nhận nuôi.</p>
            </li>
            <li>
              <p>
                4️⃣ Chuẩn bị cơ sở vật chất, ký giấy tờ nhận nuôi và đóng tiền
                vía để đón bé về.
              </p>
            </li>
            <li>
              <p>
                5️⃣ Thường xuyên cập nhật về tình hình của bé, đặc biệt là khi có
                sự cố để được tư vấn kịp thời.
              </p>
            </li>
            <p>
              <br />
              <strong>❗ Lưu ý: </strong>
            </p>
            <li>
              <p>
                - Chỉ inbox 01 Tình nguyện viên phỏng vấn, KHÔNG NÊN inbox tất
                cả danh sách. Trường hợp TNV chưa phản hồi lại trong vòng 1
                ngày, vui lòng inbox cho Page.{" "}
              </p>
            </li>
            <li>
              <p>
                - Phần phỏng vấn có thể có nhiều câu hỏi mang tính chất riêng
                tư, vì vậy mong bạn hãy kiên nhẫn nhé!
              </p>
            </li>
            <li>
              <p>
                - Tiền vía mỗi bé sẽ khác nhau tùy thuộc vào tình trạng của bé
                khi cứu cũng như các dịch vụ y tế (tiêm phòng, triệt sản) đã
                thực hiện.{" "}
              </p>
            </li>
            <li>
              <p>
                - Tiền vía dùng để trả các khoản chi về y tế trước đây cho bé,
                cũng như để hỗ trợ chi phí chăm sóc, nuôi dưỡng các bé khác tại
                nhà chung.{" "}
              </p>
            </li>
            <li>
              <p>
                - Trường hợp không nuôi được tiếp cần trả lại cho Nhóm, không tự
                ý đem cho người khác.
              </p>
            </li>
            <li>
              <p>
                🐕‍🦺 Nếu bạn chỉ có thể chăm sóc tạm thời (foster), tham khảo
                thông tin tại mục Tình nguyện.
              </p>
            </li>
            <li>
              <p>
                🐈 Tìm hiểu thêm về chương trình Nhận nuôi Ảo ở banner cuối
                trang này.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="section-title">
        <h2>CÁC BÉ KHÁC</h2>
      </div>
      <div className="row">
        {pets.map((pet) => (
          <div key={pet.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
            <AdoptCard
              img={pet.imageUrl}
              name={pet.name}
              age={pet.age}
              gender={pet.gender}
              vaccinated={pet.vaccinated}
              id={pet.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default memo(AdoptDetailPage);
