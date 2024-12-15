import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import bookingService from "../../../Service/BookingService";
import paymentService from "../../../Service/PaymentService";
import BackButton from "../../../../Utils/BackButton";

function PaymentCreate() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const getListZone = async () => {
        await bookingService.getList()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setBookings(res.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })

    }

    const createPayment = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await paymentService.adminCreate(formData)
            .then((res) => {
                console.log("create property", res.data)
                message.success("Create payment success!")
                navigate("/payments/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
            })
    }

    useEffect(() => {
        getListZone();
    }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/payments/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to payment list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Payments</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createPayment}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="bookingId">Booking</label>
                                            <select name="bookingId" id="bookingId" className="form-control">
                                                {
                                                    bookings.map((booking) => {
                                                        return (
                                                            <option key={booking.bookingID}
                                                                    value={booking.bookingID}>
                                                                {booking.customerName} - {booking.projectName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <BackButton/>
                                <button id="btnCreate" className="btn_create" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PaymentCreate
