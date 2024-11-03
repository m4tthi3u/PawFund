import { memo, useEffect, useState } from "react";
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import axios from "axios";
import { VolunteerCard } from "component";
import { TbDog } from "react-icons/tb";


function VolunteerPage() {
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
        <div className="volunteer-page">
            <Breadcrumb name="Chi Tiết Tình Nguyện Viên" />
            <div className="container">
                <div className="volunteer__content row">
                    <div className="col-lg-8 col-md-12 volunteer__text">
                        <h2 className="text-capitalize">giới thiệu tình nguyện viên cứu hộ chó mèo</h2>
                        <hr className="small-divider left" />
                        <p>
                        Hoạt động cứu hộ của PawFund chỉ có thể thành công nhờ sự chung sức từ cộng đồng và các Tình nguyện viên. Có nhiều cách để bạn đóng góp phần của mình để thay đổi cuộc sống của một chú chó hay mèo: trở thành Người chăm sóc tạm thời (Foster), Tình nguyện tại nhà chung hay Tình nguyện viên cứu hộ. Hãy tham khảo thêm thông tin bên dưới.
                        </p>
                        <h2 className="text-capitalize">Thông tin tình nguyện viên</h2>
                        <hr className="small-divider left" />
                        <strong>TNV Foster </strong>
                        <p>
                        Foster là người giúp nhóm chăm sóc tạm thời trong thời gian các bé chưa tìm được chủ. Đây có thể là các bé khỏe mạnh hoặc cần chăm sóc đặc biệt hơn. Nếu bạn không thể nhận nuôi, hãy mở cửa để cho các bé một mái ấm tạm thời, giúp các bé khỏe mạnh hơn, ngoan ngoãn hơn cũng như tận hưởng tình thương từ một người yêu động vật, đồng thời giúp chúng tôi giảm tải khối lượng công việc.                       
                        </p>
                        <p className="volunteer__list">
                            <ul>
                            <li>
                            <TbDog /> Người nhận nuôi tạm thời (Foster) chịu trách nhiệm cung cấp nơi ở, thức ăn, nước uống, các vật dụng cần thiết và tình thương cho bé.
                            </li>
                            <li>
                            <TbDog /> Trong trường hợp cần thiết, foster đảm nhận việc theo dõi quá trình chữa trị cho bé, đảm bảo chế độ ăn theo yêu cầu và giúp huấn luyện bé. Mọi chi phí y tế sẽ do Hanoi Pet Adoption chi trả. Foster có thể đóng góp vào chi phí này nhưng không bắt buộc.
                            </li>
                            <li>  
                            <TbDog /> Foster cần thông báo ngay cho người phụ trách bé nếu có bất cứ phát sinh gì xảy ra: ốm đau, biểu hiện lạ, hành vi khác thường v.v... 
                            </li>
                            <li> 
                            <TbDog /> Không tự ý chuyển động vật mà tôi nhận chăm sóc tạm thời sang người khác chăm sóc hoặc nhận nuôi nếu không có sự đồng ý từ nhóm HPA.
                            </li>
                            </ul>
                        <h2 className="text-capitalize">TNV Dọn Dẹp Nhà Chung</h2>
                        <hr className="small-divider left" />
                        <ul>
                            <li>
                            Các bé chó mèo sau khi được cứu hộ và đã ổn định sẽ được chuyển về nhà chung trong quá trình chờ tìm chủ/foster. Các bé cần người giúp cho ăn uống đúng chế độ, dọn dẹp và chăm sóc y tế nếu cần. Tình nguyện viên nhà chung đảm nhận khối lượng công việc lớn khi phải quản lý khoảng 70 bé mèo và hơn 10 bé chó. Công việc này cần tính kiên nhẫn, cẩn thận, trách nhiệm cao và có tình thương với chó mèo. Tình nguyện viên có thể đăng ký giúp theo buổi lẻ. Với những người có thể làm cố định theo ca và làm 5 ngày mỗi tuần có thể được nhận trợ cấp công việc.
                            </li>
                            <li> 
                            <TbDog />Tuổi 20+.
                            </li>
                            <li> 
                            <TbDog />Có kinh nghiệm nuôi chó/mèo.
                            </li>
                            <li> 
                            <TbDog />Chăm chỉ, sạch sẽ và có trách nhiệm.
                            </li>
                            <li> 
                            <TbDog />Đảm bảo được thời gian đến nhà chung
                            </li>
                            <li> 
                            <TbDog />Đảm bảo giữ bí mật địa chỉ nhà chung để tránh những thành phần xấu và chủ nuôi vô trách nhiệm đến vứt bỏ các bé.
                            </li>
                            <li> 
                            <TbDog />Không ngại bẩn khi dọn vệ sinh, không sợ mùi
                            </li>
                        </ul>
                        <h2 className="text-capitalize">TNV Cứu hộ</h2>
                        <hr className="small-divider left" />
                        <ul>
                            <li>
                            Khi một bé chó hay mèo gặp nạn, cần cứu các bé càng sớm càng tốt để tránh trường hợp các bé lang thang gặp kẻ xấu hoặc bị xe tông. Vì thế, Tình nguyện viên cứu hộ đóng vai trò quan trọng trong việc các bé có sống sót và được giải cứu kịp thời hay không. Công việc này đòi hỏi việc di chuyển bất ngờ, thậm chí vào đêm khuya hay ngày nghỉ, có thể phải đi xa. Ngoài ra, Tình nguyện viên cũng cần được trang bị kiến thức để bảo đảm an toàn cho bản thân khi cứu hộ.                            </li>
                            <li> 
                            <TbDog />Tuổi 20+.
                            </li>
                            <li> 
                            <TbDog />Có kinh nghiệm nuôi chó/mèo.
                            </li>
                            <li> 
                            <TbDog />Có khả năng tiếp cận hiện trường trong các khung giờ linh hoạt.
                            </li>
                        </ul>
                        <h2 className="text-capitalize">TNV Vận Chuyển</h2>
                        <hr className="small-divider left" />
                        <ul>
                            <li>
                            Ngoài các tình huống cứu hộ, Hanoi Pet Adoption còn cần các bạn giúp vận chuyển chó/mèo từ nhà chung tới bệnh viện, nhà foster hoặc chủ nuôi v.v... Hoặc nhận đồ quyên góp cho Nhóm và chuyển về nhà chung.
                            </li>
                            <li> 
                            <TbDog />Tuổi 20+.
                            </li>
                            <li> 
                            <TbDog />Có phương tiện di chuyển riêng và có tinh thần trách nhiệm
                            </li>
                        </ul>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(VolunteerPage);
