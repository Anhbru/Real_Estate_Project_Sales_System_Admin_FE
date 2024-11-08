import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import promotionService from '../../../Service/PromotionService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function PromotionCreate() {
    const navigate = useNavigate();

    const onFinish = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return;
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await promotionService.adminCreatePromotion(formData)
            .then((res) => {
                console.log("create promotion", res.data);
                message.success("Tạo thành công!");
                navigate("/promotions/list");
            })
            .catch((err) => {
                console.log(err);
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
            });
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/promotions/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to promotion list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Promotion</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={onFinish}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="promotionName">Promotion Name</label>
                                            <input type="text" className="form-control" name="promotionName"
                                                   id="promotionName" placeholder="Enter Promotion Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea className="form-control" name="description"
                                                      id="description" placeholder="Enter Description" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="startDate">Start Date</label>
                                            <input type="date" className="form-control" name="startDate"
                                                   id="startDate" placeholder="Enter Start Date" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="endDate">End Date</label>
                                            <input type="date" className="form-control" name="endDate"
                                                   id="endDate" placeholder="Enter End Date" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="salesPolicyID">Sales PolicyID</label>
                                            <textarea className="form-control" name="salesPolicyID"
                                                      id="salesPolicyID" placeholder="Enter Sales PolicyID" />
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

export default PromotionCreate;
