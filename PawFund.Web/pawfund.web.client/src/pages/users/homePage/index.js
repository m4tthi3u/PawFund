import { memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import dog1Img from "assets/users/image/categories/dog1.jpg";
import "./style.scss";

const HomePage = () => {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };

    return (
        <>
        {/*Categories Begin*/}
        <div className="container container__categories__slider">
            <Carousel responsive={responsive} className="categories__slider">
                <div className="categories__slider__item" style ={{backgroundImage: `url(${dog1Img})`}}>
                    chó
                </div>
            </Carousel>
        </div>
        {/*Categories End*/}
        </>
    );
};

export default memo(HomePage);