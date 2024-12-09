import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import accountService from '../../../Service/AccountService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function AccountCreate() {
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

        await accountService.create(formData)
            .then((res) => {
                message.success("Tạo tài khoản thành công!");
                navigate("/accounts/list");
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
                    <Link to="/accounts/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to account list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Account</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={onFinish}>
                            <div className="form_area_">
                                <div className="title_form_">Account Information</div>

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
                                            <label htmlFor="role">Role</label>
                                            <input type="text" className="form-control" name="roleID" id="roleID" placeholder="Enter Role" />
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

export default AccountCreate;
