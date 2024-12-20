import { memo } from "react";
import "./style.scss";
import { AiOutlineHome, AiFillEye } from "react-icons/ai";
import { generatePath, Link } from "react-router-dom";
import { ROUTER } from "utils/router";

const AdoptCard = ({ img, name, age, gender, vaccinated, id }) => {
  return (
    <div className="featured__item pl-pr-10">
      <div
        className="featured__item__pic"
        style={{ background: `url(${img})` }}
      >
        <ul className="featured__item__pic__hover">
          <li>
            <Link to={generatePath(ROUTER.USER.ADOPTS, { id: id })}>
              <AiFillEye />
            </Link>
          </li>
          <li>
            <Link to={ROUTER.USER.HOME_CART}>
              <AiOutlineHome />
            </Link>
          </li>
        </ul>
      </div>
      <div className="featured__item__text">
        <h6>
          <p>
            Tên:{" "}
            <Link to={generatePath(ROUTER.USER.ADOPTS, { id: id })}>
              {name}
            </Link>
          </p>
          <p>Tuổi: {age}</p>
          <p>Giới tính: {gender}</p>
        </h6>
      </div>
    </div>
  );
};

export default memo(AdoptCard);
