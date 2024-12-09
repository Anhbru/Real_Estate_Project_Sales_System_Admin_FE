import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import notificationService from '../../../Service/NotificationService';
import customerService from '../../../Service/CustomerService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function NotificationUpdate() {
    const [notification, setNotification] = useState({});
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

    const detailNotification = async () => {
        try {
            const res = await notificationService.adminDetailNotification(id);
            setNotification(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load notification details");
        }
    };

    const loadCustomers = async () => {
        try {
            const res = await customerService.adminListCustomer();
            setCustomers(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load customer list");
        }
    };

    const updateNotification = async () => {
        $('#btnUpdate').prop('disabled', true).text('Saving...');

        try {
            const formData = new FormData($('#formUpdate')[0]);
            await notificationService.adminUpdateNotification(id, formData);
            message.success("Notification updated successfully");
            navigate("/notification/list");
        } catch (err) {
            console.error(err);
            message.error("Failed to update notification");
            $('#btnUpdate').prop('disabled', false).text('Save Changes');
        }
    };

    useEffect(() => {
        detailNotification();
        loadCustomers();
    }, [id]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Notification</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updateNotification}>
                            <div className="form_area_">
                                <div className="title_form_">Notification Information</div>

                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" name="title" id="title"
                                        defaultValue={notification?.title}
                                        placeholder="Enter Title" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subtiltle">Subtitle</label>
                                    <input type="text" className="form-control" name="subtiltle" id="subtiltle"
                                        defaultValue={notification?.subtiltle}
                                        placeholder="Enter Subtitle" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="body">Body</label>
                                    <textarea className="form-control" name="body" id="body" rows="3"
                                        defaultValue={notification?.body}
                                        placeholder="Enter Body"></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="createdTime">Created Time</label>
                                    <input type="text" className="form-control" name="createdTime" id="createdTime"
                                        defaultValue={notification?.createdTime}
                                        placeholder="Enter Created Time" disabled />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-control" name="status" id="status" defaultValue={notification?.status}>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="customerID">Customer</label>
                                    <select className="form-control" name="customerID" id="customerID" defaultValue={notification?.customerID}>
                                        {customers.map((customer) => (
                                            <option key={customer.customerID} value={customer.customerID}>
                                                {customer.fullName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button" onClick={() => navigate("/notifications/list")}>Back</button>
                                <button className="btn_create" id="btnUpdate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default NotificationUpdate;
