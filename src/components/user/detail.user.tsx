import { FORMATE_DATE_VN } from "services/helper";
import { Badge, Descriptions, Drawer } from "antd";
import { Avatar } from "antd";
import dayjs from "dayjs";

interface IProps {
    openViewDetail: boolean;
    setOpenViewDetail: (v: boolean) => void;
    dataViewDetail: IUserTable | null;
    setDataViewDetail: (v: IUserTable | null) => void;
}

const DetailUser = (props: IProps) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props


    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataViewDetail?.avatar}`


    return (
        <>

            <Drawer title="Detail User" onClose={onClose} open={openViewDetail} width={800}>
                <Descriptions title="User Info" bordered column={2}>
                    <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataViewDetail?.fullName}</Descriptions.Item>

                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phone}</Descriptions.Item>

                    <Descriptions.Item label="Role" >
                        <Badge status="processing" text={dataViewDetail?.role} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Avatar" >
                        <Avatar size={40} src={urlAvatar}>USER</Avatar>
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At">{dayjs(dataViewDetail?.createdAt).format(FORMATE_DATE_VN)}</Descriptions.Item>
                    <Descriptions.Item label="Updated At">{dayjs(dataViewDetail?.updatedAt).format(FORMATE_DATE_VN)}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}

export default DetailUser