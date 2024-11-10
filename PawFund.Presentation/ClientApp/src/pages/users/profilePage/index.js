import Loading from "component/Loading";
import React, { memo, useEffect, useState } from "react";
import authService from "services/authServices";
import "./style.scss";
import userPetService from "services/userPetService";
import donationService from "services/donationServices";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [dataUserPet, setDataUserPet] = useState();
  const [dataUserDonation, setDataUserDonation] = useState();

  const getUserProfile = async () => {
    try {
      const data = await authService.checkStatus();
      setDataUser(data.data);
      console.log("dataUser: ", data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserDonation = async () => {
    try {
      const data = await donationService.getById(data.id);
      setDataUserDonation(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPets = async () => {
    try {
      const data = await userPetService.userPet();
      setDataUserPet(data.data.reverse());
      console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTotalAdoptedPet = () => {
    if (dataUserPet && dataUserPet.length > 0) {
      const pendingCount = dataUserPet.filter(
        (item) => item.status === "Adopted"
      ).length;
      return pendingCount;
    } else {
      return 0;
    }
  };

  const handleTotalDonation = () => {
    if (dataUserDonation && dataUserDonation.length > 0) {
      const pendingCount = dataUserDonation.reduce(
        (total, item) => total + item.amount,
        0
      );
      return pendingCount;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    getUserProfile();
    getUserPets();
    getUserDonation();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div id="table-profile" className="container">
        <div>
          <div style={{ marginBottom: 12 }}>
            <h3>Thông tin tài khoản</h3>
          </div>
          <div>
            <p>Tên: {dataUser?.username}</p>
            <p>
              Email:{" "}
              {dataUserPet && dataUserPet[0]?.user.email
                ? dataUserPet[0]?.user.email
                : ""}
            </p>
            <p>
              Số lượng pet đã nhận nuôi thành công: {handleTotalAdoptedPet()}
            </p>
            <p>Tổng số tiền đã ủng hộ: {handleTotalDonation()}</p>
          </div>
        </div>
        <div>
          <div>
            <section>
              <h1>Danh sách nhận nuôi</h1>
              <div className="tbl-header">
                <table cellPadding={0} cellSpacing={0} border={0}>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Hình ảnh</th>
                      <th>Tên</th>
                      <th>Mã thú cưng</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="tbl-content">
                <table cellPadding={0} cellSpacing={0} border={0}>
                  <tbody>
                    {dataUserPet?.map((item, index) => (
                      <tr>
                        <td>{++index}</td>
                        <td>
                          <img
                            src={item.pet.imageUrl}
                            alt=""
                            style={{
                              width: 80,
                              height: 80,
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>{item.pet.name}</td>
                        <td>{item.id}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProfilePage);
