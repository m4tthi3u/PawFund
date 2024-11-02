import { memo } from "react";
import "./style.scss";
import { ROUTER } from "utils/router";
import { Link} from "react-router-dom";

const Quantity = ({ hasAddToCart = true }) => { 
    return (
       <div className="quantity-container">
        <div className="quantity">
            <span className="qtybtn">-</span>
            <input type="number"  defaultValue={1} />
            <span className="qtybtn">+</span>
        </div>
        {
            hasAddToCart && (
                <Link to={ROUTER.USER.HOME_CART}>
                    <button type="submit" className="button-submit">Nhận Nuôi</button>
                </Link>
            )
        }
       </div>
    ); 
};

export default memo(Quantity);
