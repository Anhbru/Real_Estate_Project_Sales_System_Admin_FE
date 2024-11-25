import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import customerService from '../../../Service/CustomerService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function CustomerCreate() {
    const navigate = useNavigate();

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

        await customerService.adminCreateCustomer(formData)
            .then((res) => {
                message.success("Tạo thành công!");
                navigate("/customers/list");
            })
            .catch((err) => {
                console.error(err);
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
            });
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/customers/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to customer list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Customer</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={onFinish}>
                            <div className="form_area_">
                                <div className="title_form_">Customer Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" name="email" id="email" placeholder="Enter Email" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" name="password" id="password" placeholder="Enter Password" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="confirmPass">Confirm Password</label>
                                            <input type="password" className="form-control" name="confirmPass" id="confirmPass" placeholder="Confirm Password" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input type="text" className="form-control" name="fullName" id="fullName" placeholder="Enter Full Name" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="dateOfBirth">Date of Birth</label>
                                            <input type="date" className="form-control" name="dateOfBirth" id="dateOfBirth" placeholder="Enter Date of Birth" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                            <input type="text" className="form-control" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone Number" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="identityCardNumber">Identity Card Number</label>
                                            <input type="text" className="form-control" name="identityCardNumber" id="identityCardNumber" placeholder="Enter Identity Card Number" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="nationality">Nationality</label>
                                            <input type="text" className="form-control" name="nationality" id="nationality" placeholder="Enter Nationality" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="placeofOrigin">Place of Origin</label>
                                            <input type="text" className="form-control" name="placeofOrigin" id="placeofOrigin" placeholder="Enter Place of Origin" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="placeOfResidence">Place of Residence</label>
                                            <input type="text" className="form-control" name="placeOfResidence" id="placeOfResidence" placeholder="Enter Place of Residence" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="dateOfExpiry">Date of Expiry</label>
                                            <input type="text" className="form-control" name="dateOfExpiry" id="dateOfExpiry" placeholder="Enter Date of Expiry" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="taxcode">Tax Code</label>
                                            <input type="text" className="form-control" name="taxcode" id="taxcode" placeholder="Enter Tax Code" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="bankName">Bank Name</label>
                                            <input type="text" className="form-control" name="bankName" id="bankName" placeholder="Enter Bank Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="bankNumber">Bank Number</label>
                                            <input type="text" className="form-control" name="bankNumber" id="bankNumber" placeholder="Enter Bank Number" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="address">Address</label>
                                    <textarea className="form-control" name="address" id="address" placeholder="Enter Address" />
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

export default CustomerCreate;
