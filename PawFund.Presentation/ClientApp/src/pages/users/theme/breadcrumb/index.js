import { memo } from "react";
import "./styles.scss";
import {Link} from "react-router-dom";
import {ROUTER} from "utils/router";

const BreadCrumb = (progs) => {
    return <div className="breadcrumb">
        <div className="breadcrumb__text">
            <h2>PawFund</h2>
            <div className="breadcrumb__option">
                <ul>
                    <li className="link">
                        <Link to={ROUTER.USER.HOME}>Trang Chủ</Link>
                    </li>
                    <li>{progs.name}</li>
                </ul>
            </div>
        </div>
    </div>;
};

export default memo(BreadCrumb);