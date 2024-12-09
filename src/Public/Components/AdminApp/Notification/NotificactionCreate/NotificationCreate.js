import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import notificationService from '../../../Service/NotificationService';
import bookingService from '../../../Service/BookingService';  // Assuming there's a service to fetch bookings
import customerService from '../../../Service/CustomerService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function NotificationCreate() {
    const [bookings, setBookings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    
    const loadBookings = async () => {
        try {
            const res = await bookingService.getList();
            const filteredBookings = res.data.filter(
                (bookings) => bookings.status === "Đã đặt chỗ"
            );
            
            setBookings(filteredBookings);
        } catch (err) {
            console.error(err);
            message.error("Failed to load bookings");
        }
    };

    
    const loadCustomers = async () => {
        try {
            const res = await customerService.adminListCustomer();
            setCustomers(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load customers");
        }
    };

    const onFinish = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let inputs = $('#formCreate input, #formCreate textarea');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return;
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await notificationService.adminCreateNotification(formData)
            .then((res) => {
                message.success("Tạo thành công!");
                navigate("/notification/list");
            })
            .catch((err) => {
                console.error(err);
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
            });
    };

    useEffect(() => {
        loadBookings();
        loadCustomers();
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/notifications/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to notification list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Create New Notification</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={onFinish}>
                            <div className="form_area_">
                                <div className="title_form_">Notification Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <input type="text" className="form-control" name="title" id="title" placeholder="Enter Title" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="subtiltle">Subtitle</label>
                                            <input type="text" className="form-control" name="subtiltle" id="subtiltle" placeholder="Enter Subtitle" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="body">Body</label>
                                            <textarea className="form-control" name="body" id="body" rows="3" placeholder="Enter Body"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="bookingID">Booking</label>
                                            <select className="form-control" name="bookingID" id="bookingID">
                                                {bookings.map((booking) => (
                                                    <option key={booking.bookingID} value={booking.bookingID}>
                                                        {booking.bookingID}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="customerID">Customer</label>
                                            <select className="form-control" name="customerID" id="customerID">
                                                {customers.map((customer) => (
                                                    <option key={customer.customerID} value={customer.customerID}>
                                                        {customer.fullName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select className="form-control" name="status" id="status">
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button" onClick={() => navigate(-1)}>Back</button>
                                <button className="btn_create" id="btnCreate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default NotificationCreate;
