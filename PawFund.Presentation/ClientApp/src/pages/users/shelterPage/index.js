import { memo, useEffect, useState } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import Loading from "component/Loading";
import { shelterService } from "services/shelterServices";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

const ShelterPage = () => {
  const [shelters, setShelters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShelters = async () => {
    setLoading(true);
    try {
      const result = await shelterService.getAll();
      setShelters(result.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load shelters");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShelters();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <Breadcrumb name="Trung Tâm" />
      <div className="container">
        <div className="shelters__content">
          <div className="section-title">
            <h2>Các Trung Tâm Cứu Hộ</h2>
          </div>
          <div className="row">
            {shelters.map((shelter) => (
              <div
                key={shelter.id}
                className="col-lg-4 col-md-6 col-sm-12 mb-4"
              >
                <div className="shelter-card">
                  <div className="shelter-card__body">
                    <h3 className="shelter-card__title">{shelter.name}</h3>
                    <div className="shelter-card__info">
                      <p className="shelter-card__address">
                        <CiLocationOn />
                        {shelter.address}
                      </p>
                      <p className="shelter-card__contact">
                        <AiOutlinePhone />
                        {shelter.phoneNumber}
                      </p>
                      <p className="shelter-card__email">
                        <AiOutlineMail />
                        {shelter.email}
                      </p>
                    </div>
                    <p className="shelter-card__description">
                      {shelter.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ShelterPage);
