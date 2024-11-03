import { memo, useEffect, useState } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import axios from "axios";
import { AdoptCard } from "component";

const AdoptPage = () => {
    const [adoptPets, setAdoptPets] = useState([]);
    const [filteredPets, setFilteredPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [nameFilter, setNameFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("all");
    const [ageFilter, setAgeFilter] = useState("all");
    const [vaccinatedFilter, setVaccinatedFilter] = useState("all");
    const [colorFilter, setColorFilter] = useState("all");

    useEffect(() => {
        const fetchAdoptPets = async () => {
            try {
                const response = await axios.get("https://localhost:7112/api/Pets/GetPets");
                setAdoptPets(response.data); 
                setFilteredPets(response.data);
            } catch (err) {
                setError("Failed to fetch pets data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdoptPets();
    }, []);

    useEffect(() => {
        filterPets();
    }, [nameFilter, genderFilter, ageFilter, vaccinatedFilter, colorFilter]);

    const filterPets = () => {
        let filtered = adoptPets;

        if (nameFilter) {
            filtered = filtered.filter(pet =>
                pet.name.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }
        if (genderFilter !== "all") {
            filtered = filtered.filter(pet => pet.gender.toLowerCase() === genderFilter);
        }
        if (ageFilter !== "all") {
            filtered = filtered.filter(pet => pet.ageGroup === ageFilter); 
        }
        if (vaccinatedFilter !== "all") {
            const vaccinated = vaccinatedFilter === "yes";
            filtered = filtered.filter(pet => pet.vaccinated === vaccinated); 
        }
        if (colorFilter !== "all") {
            filtered = filtered.filter(pet => pet.colorId === colorFilter); 
        }

        setFilteredPets(filtered);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Breadcrumb name="Danh Sách Thú Cưng" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12"> 
                        <div className="sidebar">
                            <div className="sidebar__item">
                                <h2>Tên</h2>
                                <input
                                    type="text"
                                    value={nameFilter}
                                    onChange={(e) => setNameFilter(e.target.value)}
                                    placeholder="Nhập tên thú cưng"
                                />
                            </div>
                            <div className="sidebar__item">
                                <h2>Giới Tính</h2>
                                <select
                                    className="gender-select"
                                    value={genderFilter}
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="unknown">Unknown</option>
                                </select>
                            </div>
                            <div className="sidebar__item">
                                <h2>Độ Tuổi</h2>
                                <select
                                    className="age-select"
                                    value={ageFilter}
                                    onChange={(e) => setAgeFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="young">Young</option>
                                    <option value="adult">Adult</option>
                                    <option value="old">Old</option>
                                </select>
                            </div>
                            <div className="sidebar__item">
                                <h2>Triệt Sản</h2>
                                <select
                                    className="vaccinated-select"
                                    value={vaccinatedFilter}
                                    onChange={(e) => setVaccinatedFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="sidebar__item">
                                <h2>Màu</h2>
                                <select
                                    className="color-select"
                                    value={colorFilter}
                                    onChange={(e) => setColorFilter(e.target.value)}
                                >
                                    <option value="all">All</option>
                                    <option value="8">Đen</option>
                                    <option value="9">Trắng</option>
                                    <option value="10">Vàng</option>
                                    <option value="11">Đen Trắng</option>
                                    <option value="12">Trắng vàng</option>
                                    <option value="13">Mướp</option>
                                    <option value="14">Tam Thể</option>
                                    <option value="15">Nhị Thể</option>
                                    <option value="16">Đồi Mồi</option>
                                    <option value="17">Xám</option>
                                    <option value="18">Xiêm</option>
                                    <option value="19">Nâu</option>
                                    <option value="20">Nâu vàng</option>
                                    <option value="21">Đen vàng</option>
                                    <option value="22">Trắng xám</option>
                                    <option value="23">Trắng Nâu</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            {filteredPets.map((pet) => (
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={pet.id}>
                                    <AdoptCard 
                                        name={pet.name}
                                        age={pet.age}
                                        gender={pet.gender}
                                        vaccinated={pet.vaccinated}
                                        img={pet.imageUrl} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(AdoptPage);
