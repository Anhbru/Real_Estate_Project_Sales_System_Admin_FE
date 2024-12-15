import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import paymentService from "../../../Service/PaymentService";
import bookingService from "../../../Service/BookingService";
import customerService from "../../../Service/CustomerService";
import BackButton from '../../../../Utils/BackButton';

function PaymentUpdate() {
    const [bookings, setBookings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form] = Form.useForm();
    const [payment, setPayment] = useState([]);

    const getListBooking = async () => {
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
    const getListCustomer = async () => {
        await customerService.adminListCustomer()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setCustomers(res.data)
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
        $('#btnCreate').prop('disabled', true).text('Đang chỉnh sửa...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('type') !== 'file') {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
                return
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await paymentService.adminUpdatePayment(id, formData)
            .then((res) => {
                console.log("create payment", res.data)
                message.success("chỉnh sửa payment thành công!")
                navigate("/payments/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
            })
    }

    const detailPayment = async () => {
        await paymentService.adminDetail(id)
            .then((res) => {
                console.log("detail payment", res.data);
                setPayment(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        getListCustomer();
        getListBooking();
        detailPayment();
    }, [form, id, loading])

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
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createPayment}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-start form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Amount">Amount</label>
                                            <input type="text" className="form-control" name="Amount"
                                                   id="Amount" defaultValue={payment.amount}
                                                   placeholder="Enter your Amount"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Status">Status</label>
                                            <select name="Status" id="Status" className="form-control">
                                                <option value="true">ACTIVE</option>
                                                <option value="false">INACTIVE</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-start form_el mt-3">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="Content">Content</label>
                                            <textarea name="Content" className="form-control" id="Content" rows="10">
                                                {payment.content}
                                            </textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BookingID">Booking</label>
                                            <select name="BookingID" id="BookingID" className="form-control">
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

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="CustomerID">Customer</label>
                                            <select name="CustomerID" id="CustomerID" className="form-control">
                                                {
                                                    customers.map((customer) => {
                                                        return (
                                                            <option key={customer.customersID}
                                                                    value={customer.customersID}>
                                                                {customer.customersName}
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
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Hình ảnh</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="row">
                                    <img src={payment.imagePayment} alt="" id="imagePreview"
                                         style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentUpdate
