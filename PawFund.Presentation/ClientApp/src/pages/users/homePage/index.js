import React, { useEffect, useState, memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bannerImg from "assets/users/image/categories/banner.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./style.scss";
import { AdoptCard } from "component";
import petService from "services/petServices"; // Import the petService

const HomePage = () => {
    const [pets, setPets] = useState([]);

    // Fetch data from API using petService
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await petService.getAll();
                setPets(response.data);
            } catch (error) {
                console.error("Error fetching pets data:", error);
            }
        };
        fetchPets();
    }, []);

    // Responsive settings for Carousel
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

    // Group pets by species for Tabs
    const groupedPets = pets.reduce(
        (acc, pet) => {
            const groupKey = pet.species;
            if (!acc[groupKey]) acc[groupKey] = [];
            acc[groupKey].push(pet);
            return acc;
        },
        { all: pets }
    );

    // Render Featured Products with Tabs
    const renderFeaturedProducts = (data) => {
        const tabList = [];
        const tabPanels = [];

        Object.keys(data).forEach((key, index) => {
            tabList.push(<Tab key={index}>{key === "all" ? "All" : key}</Tab>);

            const tabPanelItems = data[key].map((pet, j) => (
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={j}>
                    <AdoptCard
                        name={pet.name}
                        age={`${pet.age} years`}
                        gender={pet.gender}
                        description={pet.description}
                        img={pet.imageUrl}
                    />
                </div>
            ));
            tabPanels.push(<TabPanel key={index}><div className="row">{tabPanelItems}</div></TabPanel>);
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
            {/* Categories Begin */}
            <div className="container container__categories__slider">
                <Carousel responsive={responsive} className="categories__slider">
                    {pets.map((pet, key) => (
                        <div
                            className="categories__slider__item"
                            style={{ backgroundImage: `url(${pet.imageUrl})` }}
                            key={key}
                        >
                            <p>Name: {pet.name}</p>
                            <p>Age: {pet.age} years</p>
                            <p>Gender: {pet.gender}</p>
                            <p>Status: {pet.status}</p>
                            <button className="adopt-button">Adopt</button>
                        </div>
                    ))}
                </Carousel>
            </div>
            {/* Categories End */}

            {/* Featured Begin */}
            <div className="container">
                <div className="featured">
                    <div className="section-title">
                        <h2>All Pets</h2>
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
