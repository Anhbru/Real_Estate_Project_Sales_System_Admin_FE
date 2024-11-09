import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import openSaleService from '../../../Service/OpenForSaleService';
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Header from "../../../Shared/Admin/Header/Header";
import { Link, useNavigate } from 'react-router-dom';
const OpenForSaleCreate = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        setLoading(true);
        const data = {
            ...values,
            startDate: values.startDate.format('YYYY-MM-DD HH:mm:ss'),
            endDate: values.endDate.format('YYYY-MM-DD HH:mm:ss'),
            checkinDate: values.checkinDate.format('YYYY-MM-DD HH:mm:ss'),
        };
        try {
            await openSaleService.adminCreateOpenSale(data);
            message.success('Open For Sale created successfully!');
            navigate("/openforsales/list");
        } catch (error) {
            message.error('Failed to create Open For Sale');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Create Open For Sale</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item label="Decision Name" name="decisionName" rules={[{ required: true, message: 'Please enter decision name' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: 'Please select start date' }]}>
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                            <Form.Item label="End Date" name="endDate" rules={[{ required: true, message: 'Please select end date' }]}>
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                            <Form.Item label="Checkin Date" name="checkinDate" rules={[{ required: true, message: 'Please select checkin date' }]}>
                                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                            </Form.Item>
                            <Form.Item label="Sale Type" name="saleType">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Reservation Price" name="reservationPrice">
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item label="Description" name="description">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item label="Project Category Detail ID" name="projectCategoryDetailID">
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Create Open For Sale
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default OpenForSaleCreate;
