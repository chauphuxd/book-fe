import { App, Modal, Table } from "antd";
import { useState } from "react";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { Buffer, File } from "buffer";
import Exceljs from 'exceljs'

interface IProps {
    openModalImport: boolean;
    setOpenModalImport: (v: boolean) => void;


}

interface IDataImport {
    fullName: string,
    email: string,
    phone: string
}

const { Dragger } = Upload;




const ImportUser = (props: IProps) => {
    const [dataImport, setDataImport] = useState<IDataImport[]>([])
    const { message } = App.useApp();
    const { openModalImport, setOpenModalImport } = props

    const uploadProps: UploadProps = {



        name: 'file',
        multiple: false,
        maxCount: 1,
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",


        customRequest({ file, onSuccess }) {
            setTimeout(() => {
                if (onSuccess) onSuccess("ok")
            }, 1000)
        },

        async onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj!;

                    //load file to buffer
                    const workbook = new Exceljs.Workbook();
                    const arrayBuffer = await file.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    await workbook.xlsx.load(buffer);

                    //read first row at data keys
                    let jsonData: IDataImport[] = [];
                    workbook.worksheets.forEach(function (sheet) {

                        let firstRow = sheet.getRow(1);
                        if (!firstRow.cellCount) return;
                        let keys = firstRow.values as any;
                        sheet.eachRow((row, rowNumber) => {
                            if (rowNumber == 1) return;
                            let values = row.values as any
                            let obj: any = {};
                            for (let i = 1; i < keys.length; i++) {
                                obj[keys[i]] = values[i];
                            }
                            jsonData.push(obj);
                        }
                        )
                    })
                    setDataImport(jsonData)
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <>
            <Modal width={700} title="Import Data User" open={openModalImport} onOk={() => setOpenModalImport(false)} onCancel={() => { setOpenModalImport(false); setDataImport([]) }} okText={"Import data"} maskClosable={false} okButtonProps={{ disabled: dataImport.length > 0 ? false : true }} destroyOnClose={true}>
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx
                    </p>
                </Dragger>
                <div style={{ paddingTop: 20 }}>
                    <Table
                        title={() => <span>Dữ liệu up load:</span>}
                        dataSource={dataImport}
                        columns={[
                            { dataIndex: 'fullName', title: 'Tên hiển thị' },
                            { dataIndex: 'email', title: 'Email' },
                            { dataIndex: 'phone', title: 'Số điẹn thoại' },
                        ]}

                    />
                </div>
            </Modal>
        </>
    )
}


export default ImportUser