import React, { useEffect, useState, memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bannerImg from "assets/users/image/categories/banner.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./style.scss";
import { AdoptCard } from "component";
import petService from "services/petServices";
import { Link, Router, useNavigate } from "react-router-dom";
import { ROUTER } from "utils/router";
import userPetService from "services/userPetService";
import Loading from "component/Loading";

const handleCheckCard = (id) => {
  const dataAdop = localStorage.getItem("list_adoption");
  if (dataAdop && dataAdop.length >= 0) {
    const currentList = JSON.parse(dataAdop);
    const exists = currentList.some((item) => item.id === id);
    if (exists) {
      return true;
    }
  }
  return false;
};

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      const response = await petService.getAll();
      setPets(response.data.filter((item) => item.status === "Available"));
    } catch (error) {
      console.error("Error fetching pets data:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // const handleAdoption = async (data) => {
  //   setLoading(true);
  //   try {
  //     const resultData = await userPetService.adoptPet(data.id);
  //     console.log("resultData: ", resultData.data);
  //     alert(
  //       `Bạn đã gửi yêu cầu nhận nuôi ${data?.name} thành công, vui lòng đợi admin duyệt !`
  //     );
  //     fetchPets();
  //   } catch (error) {
  //     console.log(error);
  //     alert(
  //       `Bạn đã gửi yêu cầu nhận nuôi ${data?.name} thất bại, vui lòng liên hệ admin !`
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

  const groupedPets = pets.reduce(
    (acc, pet) => {
      if (!acc.all) acc.all = { title: "Tất cả", products: [] };
      acc.all.products.push(pet);

      if (pet.species === "Dog") {
        if (!acc.Dogs) acc.Dogs = { title: "Chó", products: [] };
        acc.Dogs.products.push(pet);
      } else if (pet.species === "Cat") {
        if (!acc.Cats) acc.Cats = { title: "Mèo", products: [] };
        acc.Cats.products.push(pet);
      } else {
        if (!acc.Others) acc.Others = { title: "Khác", products: [] };
        acc.Others.products.push(pet);
      }

      return acc;
    },
    {
      all: { title: "Tất cả", products: [] },
      Dogs: { title: "Chó", products: [] },
      Cats: { title: "Mèo", products: [] },
      Others: { title: "Khác", products: [] },
    }
  );

  const renderFeaturedProducts = (data) => {
    const tabList = [];
    const tabPanels = [];

    Object.keys(data).forEach((key, index) => {
      tabList.push(<Tab key={index}>{data[key].title}</Tab>);

      const tabPanelItems = Array.isArray(data[key].products)
        ? data[key].products.map((pet, j) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={j}>
              <AdoptCard
                name={pet.name}
                age={`${pet.age} years`}
                gender={pet.gender}
                description={pet.description}
                img={pet.imageUrl}
                id={pet.id}
              />
            </div>
          ))
        : [];

      tabPanels.push(
        <TabPanel key={index}>
          <div className="row">{tabPanelItems}</div>
        </TabPanel>
      );
    });

    return (
      <Tabs>
        <TabList>{tabList}</TabList>
        {tabPanels}
      </Tabs>
    );
  };

  return (
    <>
      {loading && <Loading />}
      {/* Categories Begin */}
      <div className="container container__categories__slider">
        <Carousel responsive={responsive} className="categories__slider">
          {pets.map((pet, key) => (
            <div
              className="categories__slider__item"
              style={{ backgroundImage: `url(${pet.imageUrl})` }}
              key={key}
            >
              <p>Tên: {pet.name}</p>
              <h>Tuổi: {pet.age} years</h>
              <j>Giới Tính: {pet.gender}</j>
              <k>Trạng Thái: {pet.status}</k>
              <div onClick={() => handleAdoption(pet)}>
                <button className="adopt-button">
                  {handleCheckCard(pet.id)
                    ? "Đã thêm vào nhà pet"
                    : "Nhận nuôi"}
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* Categories End */}

      {/* Featured Begin */}
      <div className="container">
        <div className="featured">
          <div className="section-title">
            <h2>Tất Cả</h2>
          </div>
          {renderFeaturedProducts(groupedPets)}
        </div>
      </div>
      {/* Featured End */}

      {/* Banner Begin */}
      <div className="container">
        <div className="banner">
          <div className="banner__pic">
            <img src={bannerImg} alt="banner" />
          </div>
        </div>
      </div>
      {/* Banner End */}
    </>
  );
};

export default memo(HomePage);
