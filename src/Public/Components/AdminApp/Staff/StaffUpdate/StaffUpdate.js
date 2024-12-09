import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Input, message, Select, Button } from 'antd';
import staffService from '../../../Service/StaffService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";

const { Option } = Select;

function StaffUpdate() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

   
    const detailStaff = async () => {
        try {
            const res = await staffService.detail(id);
            if (res.data) {
                const staff = res.data;
                
                form.setFieldsValue({
                    ...staff,
                    email: staff.account?.email || '',
                });
            }
        } catch (err) {
            console.error(err);
            message.error("Failed to load staff details");
        }
    };

    
    const updateStaff = async (data) => {
        setLoading(true);
        try {
            await staffService.update(data, id);
            message.success("Staff updated successfully");
            navigate("/staff/list");
        } catch (err) {
            console.error(err);
            message.error("Failed to update staff");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detailStaff();
    }, [id]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Staff</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={updateStaff}
                            className="form_create_custom_"
                        >
                            <div className="form_area_">
                                <div className="title_form_">Staff Information</div>

                                <Form.Item
                                    label="Full Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter the Full Name' }]}
                                >
                                    <Input placeholder="Enter Full Name" />
                                </Form.Item>

                                <Form.Item
                                    label="Date Of Birth"
                                    name="dateOfBirth"
                                    rules={[{ required: true, message: 'Please enter Phone Number' }]}
                                >
                                    <Input placeholder="Enter Date Of Birth (2001-07-13)" />
                                </Form.Item>

                                <Form.Item
                                    label="Personal Email"
                                    name="personalEmail"
                                    rules={[{ required: true, message: 'Please enter Email' }]}
                                >
                                    <Input placeholder="Enter Email" disabled />
                                </Form.Item>

                                <Form.Item
                                    label="Identity Card"
                                    name="identityCardNumber"
                                    rules={[{ required: true, message: 'Please enter Identity Card Number' }]}
                                >
                                    <Input placeholder="Enter Identity Card Number" />
                                </Form.Item>

                                <Form.Item
                                    label="Nationality"
                                    name="nationality"
                                    rules={[{ required: true, message: 'Please enter Nationality' }]}
                                >
                                    <Input placeholder="Enter Nationality" />
                                </Form.Item>

                                <Form.Item
                                    label="Place of Residence"
                                    name="placeOfResidence"
                                    rules={[{ required: true, message: 'Please enter Place of Residence' }]}
                                >
                                    <Input placeholder="Enter Place of Residence" />
                                </Form.Item>

                                <Form.Item
                                    label="Status"
                                    name="status"
                                    rules={[{ required: true, message: 'Please select Status' }]}
                                >
                                    <Select placeholder="Select Status">
                                        <Option value={true}>Active</Option>
                                        <Option value={false}>Inactive</Option>
                                    </Select>
                                </Form.Item>
                            </div>

                            <div className="footer_form_">
                                <Link to="/staff/list" className="btn_back">Back</Link>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="btn_create"
                                    loading={loading}
                                >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default StaffUpdate;
