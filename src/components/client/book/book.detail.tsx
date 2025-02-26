import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Divider, Rate, Row } from "antd";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { BsCartPlus } from 'react-icons/bs';
import 'components/client/book/book.detail.scss'
import { useRef, useState } from "react";
import ModalGallery from "./modal.gallery";

interface IProps {

}

const BookDetail = (props: IProps) => {

    const refGallery = useRef<ImageGallery>(null)

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const images = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];

    const handleOnclickImage = () => {
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery.current?.getCurrentIndex() ?? 0)
    }
    return (
        <div> <div style={{ backgroundColor: "#efefef", padding: "10px" }}>
            <div className="view-detail-book" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={10} sm={0} xs={0}>
                        <ImageGallery
                            ref={refGallery}
                            items={images}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            renderLeftNav={() => <></>}
                            renderRightNav={() => <></>}
                            slideOnThumbnailOver={true}
                            onClick={() => handleOnclickImage()}
                        />


                    </Col>
                    <Col md={14}
                    >
                        <div className="author">
                            Tác giả: <a href="#">Jo Hemmings</a>
                        </div>
                        <div className="title">
                            How Psychology Works - Hiểu Hết Về Não Bộ
                        </div>
                        <div className="rating">
                            <Rate
                                value={5}
                                disabled
                                style={{ color: "#ffce3d", fontSize: "12px" }}
                            />
                            <span className="sold">
                                <Divider type="vertical" />
                                Đã bán 6969
                            </span>
                        </div>
                        <div className="price">
                            <span className="currency">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(6969000)}
                            </span>
                        </div>
                        <div className="delivery">
                            <div>
                                <span className="left">Vận chuyển</span>
                                <span className="right">Miễn phí vận chuyển</span>
                            </div>
                        </div>
                        <div className="quantity">
                            <span className="left">Số lượng</span>
                            <span className="right">
                                <button>
                                    <MinusOutlined />
                                </button>
                                <input defaultValue={1} />
                                <button>
                                    <PlusOutlined />
                                </button>
                            </span>
                        </div>
                        <div className="buy">
                            <button className="cart">
                                <BsCartPlus className="icon-cart" />
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                            <button className="now">Mua ngay</button>
                        </div>
                    </Col>
                    <Col md={14} sm={24} >
                        <Col md={0} sm={24} xs={24}>
                            <ImageGallery
                                items={images}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                renderLeftNav={() => <></>}
                                renderRightNav={() => <></>}
                                slideOnThumbnailOver={true}
                                onClick={() => handleOnclickImage()}
                            />
                        </Col>
                    </Col>

                </Row>
            </div>
        </div>
            <ModalGallery isOpen={isOpenModalGallery} setIsOpen={setIsOpenModalGallery} currentIndex={currentIndex} title={"Hard Code"} items={images} />
        </div>
    );
};
export default BookDetail;