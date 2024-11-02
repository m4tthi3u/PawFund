import { memo } from "react";
import "./style.scss";
import { AiOutlineHome, AiFillEye } from "react-icons/ai";
import { generatePath, Link } from 'react-router-dom';
import { ROUTER } from "utils/router";

const DonationCard = ({ img, type, amount, description, status }) => {
    return (
        <div className="donation__item pl-pr-10">
            <div className="donation__item__pic" style={{ background: `url(${img})` }}>
                <ul className="donation__item__pic__hover">
                    <li>
                        <Link to={ROUTER.USER.DONATE}>
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
            <div className="donation__item__text">
                <h6>
                    <p>Loại: <Link to={generatePath(ROUTER.USER.DONATE, { id: 1 })}>{type}</Link></p>
                    <p>Số lượng: {amount}</p>
                    <p>Trạng thái: {status}</p>
                    <p>Mô tả: {description}</p>
                </h6>
            </div>
        </div>
    );
};

export default memo(DonationCard);
