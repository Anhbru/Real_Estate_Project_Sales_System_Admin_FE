import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import customerService from '../../../Service/CustomerService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function CustomerUpdate() {
    const [customer, setCustomer] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

    const detailCustomer = async () => {
        try {
            const res = await customerService.adminDetailCustomer(id);
            setCustomer(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load customer details");
        }
    };

    const updateCustomer = async () => {
        $('#btnUpdate').prop('disabled', true).text('Saving...');

        try {
            const formData = new FormData($('#formUpdate')[0]);
            await customerService.adminUpdateCustomer(id, formData);
            message.success("Customer updated successfully");
            navigate("/customers/list");
        } catch (err) {
            console.error(err);
            message.error("Failed to update customer");
            $('#btnUpdate').prop('disabled', false).text('Save Changes');
        }
    };

    useEffect(() => {
        detailCustomer();
    }, [id]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Customer</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updateCustomer}>
                            <div className="form_area_">
                                <div className="title_form_">Customer Information</div>

                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input type="text" className="form-control" name="fullName"
                                        id="fullName" defaultValue={customer?.fullName}
                                        placeholder="Enter Full Name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input type="text" className="form-control" name="phoneNumber" id="phoneNumber"
                                        defaultValue={customer?.phoneNumber}
                                        placeholder="Enter Phone Number" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="identityCardNumber">Identity Card Number</label>
                                    <input type="text" className="form-control" name="identityCardNumber"
                                        id="identityCardNumber" defaultValue={customer?.identityCardNumber}
                                        placeholder="Enter Identity Card Number" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nationality">Nationality</label>
                                    <input type="text" className="form-control" name="nationality" id="nationality"
                                        defaultValue={customer?.nationality}
                                        placeholder="Enter Nationality" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="placeOfResidence">Place of Residence</label>
                                    <input type="text" className="form-control" name="placeOfResidence" id="placeOfResidence"
                                        defaultValue={customer?.placeOfResidence}
                                        placeholder="Enter Place of Residence" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-control" name="status" id="status" defaultValue={customer?.status}>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" id="email"
                                        defaultValue={customer?.email}
                                        placeholder="Enter Email" />
                                </div>
                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button" onClick={() => navigate("/customers/list")}>Back</button>
                                <button className="btn_create" id="btnUpdate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default CustomerUpdate;
