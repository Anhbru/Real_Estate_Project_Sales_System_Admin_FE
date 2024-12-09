import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import staffService from '../../../Service/StaffService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function StaffCreate() {
    const navigate = useNavigate();

    const onFinish = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let inputs = $('#formCreate input, #formCreate select, #formCreate textarea');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return;
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await staffService.create(formData)
            .then(() => {
                message.success("Tạo nhân viên thành công!");
                navigate("/staff/list");
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
                    <Link to="/staff/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to staff list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Staff</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={onFinish}>
                            <div className="form_area_">
                                <div className="title_form_">Staff Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Enter Full Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="password">Email</label>
                                            <input type="text" className="form-control" name="email" id="email" placeholder="Enter Password" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Nationality</label>
                                            <input type="text" className="form-control" name="nationality" id="nationality" placeholder="Enter Full Name" />
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
                                            <label htmlFor="dateOfBirth">Date of Birth</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name="dateOfBirth"
                                                id="dateOfBirth"
                                                placeholder="Enter Date Of Birth (YYYY-MM-DD)"
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    
                                                    e.target.value = value; 
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="confirmPass">Confirm Password</label>
                                            <input type="password" className="form-control" name="confirmPass" id="confirmPass" placeholder="Confirm Password" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                   
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="personalEmail">Personal Email</label>
                                            <input type="text" className="form-control" name="personalEmail" id="personalEmail" placeholder="Enter Full Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="placeOfOrigin">Place of Origin</label>
                                            <input type="text" className="form-control" name="placeOfOrigin" id="placeOfOrigin" placeholder="Enter Place of Origin" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="placeOfResidence">Place of Residence</label>
                                            <input type="text" className="form-control" name="placeOfResidence" id="placeOfResidence" placeholder="Enter Place of Residence" />
                                        </div>
                                    </div>
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

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="identityCardNumber">Identity Card Number</label>
                                            <input type="text" className="form-control" name="identityCardNumber" id="identityCardNumber" placeholder="Enter Identity Card Number" />
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

export default StaffCreate;
