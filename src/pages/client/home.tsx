import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Form, InputNumber, message, Pagination, Rate, Row, Spin, Tabs } from "antd";
import { FormProps } from "antd/lib";
import { Children, useEffect, useState } from "react";
import { getBookAPI, getCategoryAPI } from "services/api";
import "styles/home.scss"

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const HomePage = () => {


    useEffect(() => {
        const successMessage = localStorage.getItem("successMessage");
        if (successMessage) {
            message.success(successMessage);
            localStorage.removeItem("successMessage");
        }
    }, []);

    const items = [
        {
            key: '1',
            label: "Phổ biến",
            Children: <></>
        },
        {
            key: '2',
            label: "Hàng mới",
            Children: <></>
        },
        {
            key: '3',
            label: "Giá thấp đến Cao",
            Children: <></>
        },
        {
            key: '44',
            label: "Giá cao đến Thấp",
            Children: <></>
        },
    ]
    //list product
    const [listBook, setListBook] = useState<IBookTable[]>([]);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);


    //fetch book
    useEffect(() => {
        fetchBook();
    }, [current, pageSize])


    const fetchBook = async () => {
        setIsLoading(true)
        let query = `current=${current}&pageSize=${pageSize}`
        if (filter) {
            query += `&${filter}`
        }
        if (sortQuery) { query += `&${sortQuery}` }

        const res = await getBookAPI(query);
        if (res && res.data) {
            setListBook(res.data.result)
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
    }


    const handleOnchangePage = (pagination: { current: number, pageSize: number }) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrent(1);
        }
    };


    //sort and filter
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");
    const [sortQuery, setSortQuery] = useState<string>("sort=-sold")




    //select 
    const [listCategory, setListCategory] = useState<{
        label: string;
        value: string
    }[]>([]);


    useEffect(() => {
        const fecthCategory = async () => {
            const res = await getCategoryAPI();
            if (res && res.data) {
                const d = res.data.map(item => {
                    return { label: item, value: item }
                })
                setListCategory(d)
            }
        }
        fecthCategory()
    }, [])
    //form
    const [form] = Form.useForm();


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };
    return (
        <div>
            <div className="homepage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={4} sm={0} xs={0} >
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: '10px' }}>
                            <span style={{ fontWeight: "bold" }}><FilterTwoTone style={{ marginRight: "5px" }} />Bộ lọc tìm kiếm</span>
                            {/* <ReloadOutlined title="Reset" onClick={() => form.resetFieldslick} /> */}
                        </div>
                        <Divider />
                        <Form onFinish={onFinish}
                            form={form}
                        >
                            <Form.Item
                                name="category"
                                label="Danh mục sản phẩm"
                                labelCol={{ span: 24 }}

                            >
                                <Checkbox.Group>
                                    <Row>
                                        {listCategory.map((item, index) => {
                                            return (<Col span={24} key={`index-${index}`} style={{ margin: '5px' }}>
                                                <Checkbox value={item.value}>
                                                    {item.label}
                                                </Checkbox>
                                            </Col>)
                                        })}

                                    </Row>

                                </Checkbox.Group>

                            </Form.Item>
                            <Form.Item
                                label="Khoảng giá"
                                labelCol={{ span: 24 }}
                                style={{ fontWeight: "bold" }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item name={["range", "from"]}>
                                        <InputNumber name="from"
                                            min={0}
                                            placeholder="đ từ"
                                            formatter={(value) =>
                                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            }
                                        ></InputNumber>
                                    </Form.Item>
                                    <span>-</span>
                                    <Form.Item name={["range", "to"]}>
                                        <InputNumber name="to"
                                            min={0}
                                            placeholder="đ đến"
                                            formatter={(value) =>
                                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            }
                                        ></InputNumber>
                                    </Form.Item>
                                </div>
                                {/* onclick */}
                                <div className="">
                                    <Button style={{ width: "100%" }} type="primary">Áp dụng</Button>
                                </div>

                            </Form.Item>
                            <Divider />
                            <Form.Item
                                label="Đánh giá"
                                labelCol={{ span: 24 }}
                            >
                                <div >
                                    <Rate value={5} style={{ color: "#ffce3d", fontSize: "15px" }}></Rate>
                                    <span className="ant-rate-text"></span>
                                </div>
                                <div >
                                    <Rate value={4} style={{ color: "#ffce3d", fontSize: "15px" }}></Rate>
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div >
                                    <Rate value={3} style={{ color: "#ffce3d", fontSize: "15px" }}></Rate>
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div >
                                    <Rate value={2} style={{ color: "#ffce3d", fontSize: "15px" }}></Rate>
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                                <div >
                                    <Rate value={1} style={{ color: "#ffce3d", fontSize: "15px" }}></Rate>
                                    <span className="ant-rate-text">trở lên</span>
                                </div>
                            </Form.Item>

                        </Form>
                    </Col>
                    <Col md={20} xs={24} >
                        <Spin spinning={isLoading} tip="Loading...">
                            <Row>
                                <Tabs defaultActiveKey="1" items={items} />
                            </Row>
                            <Row className="customize-row">
                                {listBook.map((item, index) => {
                                    return (<div className="column" key={`book-${index}`}>
                                        <div className="wrapper">
                                            <div className="thumbnail">
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="" />
                                            </div>
                                            <div className="text">{item.mainText}</div>
                                            <div className="price"> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</div>
                                            <div className="rating">
                                                <Rate disabled value={5} style={{ color: "#ffce3d", fontSize: "12px" }}></Rate>
                                                <span>Đã bán {item.sold ?? 0}</span>
                                            </div>
                                        </div>
                                    </div>)
                                })}

                            </Row>
                            <Divider />
                            <div className="" style={{ marginTop: 30 }}></div>
                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                <Pagination
                                    current={current}
                                    pageSize={pageSize}

                                    total={total}

                                    onChange={(p, s) => handleOnchangePage({ current: p, pageSize: s })}
                                />
                            </Row>
                        </Spin>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default HomePage;