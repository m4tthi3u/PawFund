import { memo } from "react";
import "./style.scss";
import { AiOutlineHome, AiFillEye } from "react-icons/ai";
import { generatePath, Link } from 'react-router-dom';
import { ROUTER } from "utils/router";

const ContactCard = ({ img, type, amount, description, status }) => {
    return (
        <div className="contact__item pl-pr-10">
            <div className="contact__item__pic" style={{ background: `url(${img})` }}>
                <ul className="contact__item__pic__hover">
                    <li>
                        <Link to={ROUTER.USER.CONTACT}>
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
            <div className="contact__item__text">
                <h6>
                    <p>Loại: <Link to={generatePath(ROUTER.USER.CONTACT, { id: 1 })}>{type}</Link></p>
                    <p>Số lượng: {amount}</p>
                    <p>Trạng thái: {status}</p>
                    <p>Mô tả: {description}</p>
                </h6>
            </div>
        </div>
    );
};

export default memo(ContactCard);
