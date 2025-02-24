import { CloudUploadOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import { getUserAPI } from 'services/api';
import { dateRangeValidate } from 'services/helper';
import DetailUser from './detail.user';
import CreateUser from './create.user';
import ImportUser from './data/import.user';

type TSearch = {
    fullName: string,
    email: string,
    createdAt: string,
    createdAtRange: string
}


export default function TableUser() {


    const columns: ProColumns<IUserTable>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'ID',
            dataIndex: '_id',
            hideInSearch: true,
            render: (text, entity) => (
                <Space size="middle">
                    <a onClick={() => {
                        setOpenViewDetail(true);
                        setDataViewDetail(entity);
                    }} href="#">{entity._id}</a>
                </Space>
            ),
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            copyable: true,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'date',
            sorter: true,
            hideInSearch: true


        },
        {
            title: 'Created At',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            sorter: true,
            hideInTable: true
        },
        {
            title: 'Action',
            render: () => (
                <Space size="middle">
                    <EditOutlined style={{ color: "#FFA500", cursor: "pointer" }} />
                    <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                </Space>
            ),
            hideInSearch: true


        }
    ];




    const [openViewDetail, setOpenViewDetail] = useState<boolean>(false);
    const [dataViewDetail, setDataViewDetail] = useState<IUserTable | null>(null);


    //modal create user
    const [openModal, setOpenModal] = useState<boolean>(false);

    const refreshTable = () => {
        actionRef.current?.reload();
    }

    // modal import user
    const [openModalImport, setOpenModalImport] = useState<boolean>(false);


    const actionRef = useRef<ActionType>();
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })


    return (
        <div>
            <ProTable<IUserTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(params, sort, filter);
                    let query = "";

                    // search
                    if (params) {
                        query += `current=${params.current}&pageSize=${params.pageSize}`
                        if (params.email) {
                            query += `&email=/${params.email}/i`
                        }
                        if (params.fullName) {
                            query += `&fullName=/${params.fullName}/i`
                        }
                        const createDateRange = dateRangeValidate(params.createdAtRange)
                        if (createDateRange) {
                            query += `&createdAt>=${createDateRange[0]}&createdAt<=${createDateRange[1]}`
                        }
                    }

                    //default

                    query += `&sort=-createdAt`;


                    //sort

                    if (sort && sort.createdAt) {
                        query += `&sort=${sort.createdAt === "ascend" ? "createdAt" : "-createdAt"}`
                    }

                    const res = await getUserAPI(query);
                    if (res.data) {
                        setMeta(res.data.meta)
                    }
                    return {
                        data: res.data?.result,
                        page: 1,
                        success: true,
                        total: res.data?.meta.total
                    }





                }}



                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    showSizeChanger: true,
                    total: meta.total,
                    showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} trên {total} rows</div>) }
                }}
                headerTitle="Table User"

                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<ExportOutlined />}
                        onClick={() => {

                            // setOpenModalImport(true);
                        }}
                        type="primary"

                    >
                        Export
                    </Button>,
                    <Button
                        key="button"
                        icon={<CloudUploadOutlined />}
                        onClick={() => {

                            setOpenModalImport(true);
                        }}
                        type="primary"

                    >
                        Import
                    </Button>,
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {

                            setOpenModal(true);
                        }}
                        type="primary"

                    >
                        Add New
                    </Button>,
                    <Dropdown
                        key="menu"
                        menu={{
                            items: [
                                {
                                    label: '1st item',
                                    key: '1',
                                },
                                {
                                    label: '2nd item',
                                    key: '2',
                                },
                                {
                                    label: '3rd item',
                                    key: '3',
                                },
                            ],
                        }}
                    >
                        <Button>
                            <EllipsisOutlined />
                        </Button>
                    </Dropdown>,
                ]}

            />
            <DetailUser openViewDetail={openViewDetail} setOpenViewDetail={setOpenViewDetail} dataViewDetail={dataViewDetail} setDataViewDetail={setDataViewDetail} />
            <CreateUser openModal={openModal} setOpenModal={setOpenModal} refreshTable={refreshTable} />
            <ImportUser openModalImport={openModalImport} setOpenModalImport={setOpenModalImport} />
        </div>
    );
};