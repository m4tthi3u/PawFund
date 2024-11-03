import { memo, useEffect, useState } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import axios from "axios";
import { ContactCard } from "component";
import { TbDog } from "react-icons/tb";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { CiBank } from "react-icons/ci";


function ContactPage() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await axios.get("https://localhost:7112/api/Donation/GetDonations");
                setDonations(response.data);
            } catch (err) {
                setError("Failed to fetch donation data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="contact-page">
            <Breadcrumb name="Thông tin liên hệ" />
            <div className="container">
                <div className="contact__content row">
                    <div className="col-lg-8 col-md-12 contact__text">
                        <h2 className="text-capitalize">Thông tin liên hệ
                        </h2>
                        <hr className="small-divider left" />
                        <p className="contact__list">
                            <ul>
                            <li>
                            <AiOutlineMail /> pawfund@gmail.com
                            </li>
                            <li>
                            <AiOutlinePhone /> 0123.456.789
                            </li>
                            <li>  
                            <CiLocationOn /> UTH - Thành Phố Hồ Chí Minh
                            </li>
                            </ul>
                        <h2 className="text-capitalize">Tài khoản quyên góp
                        </h2>
                        <hr className="small-divider left" />
                        <ul>
                            <li>
                            Chi phí sẽ được chia đều cho các bé khác còn nằm viện và gây dựng nhà chung.
                            </li>
                            <strong> <CiBank /> MB Bank</strong>
                            <li> 
                            LE HUY HOANG
                            </li>
                            <li> 
                            0337245164
                            </li>
                            <li> 
                            Chi nhánh Vũng Tàu
                            </li>
                            <li>-------------</li>
                            <strong> <CiBank /> VietComBank</strong>
                            <li> 
                            NGUYEN VAN THANH LAM
                            </li>
                            <li> 
                            0123456789
                            </li>
                            <li> 
                            Chi nhánh TP.HCM
                            </li>
                            <li>-------------</li>
                            <strong> <CiBank /> MOMO</strong>
                            <li> 
                            LE HUY HOANG
                            </li>
                            <li> 
                            0337245164
                            </li>
                            <li> 
                            Chi nhánh Vũng Tàu
                            </li>
                            <li>-------------</li>
                            <strong> <CiBank /> PayPal</strong>
                            <li> 
                            pawfund@gmail.com
                            </li>
                        </ul>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ContactPage);
