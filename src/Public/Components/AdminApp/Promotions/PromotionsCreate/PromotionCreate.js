import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import promotionService from '../../../Service/PromotionService';
import Header from "../../../Shared/Admin/Header/Header";
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
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/promotions/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to promotion list
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
                                            <label htmlFor="promotion_name">Promotion Name</label>
                                            <input type="text" className="form-control" name="promotion_name"
                                                   id="promotion_name" placeholder="Enter your Promotion Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <input type="text" className="form-control" name="description"
                                                   id="description" placeholder="Enter your Description"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="start_date">Start Date</label>
                                            <input type="date" className="form-control" name="start_date"
                                                   id="start_date" placeholder="Enter Start Date"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="end_date">End Date</label>
                                            <input type="date" className="form-control" name="end_date"
                                                   id="end_date" placeholder="Enter End Date"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="sales_policy_id">Sales Policy ID</label>
                                            <input type="text" className="form-control" name="sales_policy_id"
                                                   id="sales_policy_id" placeholder="Enter Sales Policy ID"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="sales_policy_type">Sales Policy Type</label>
                                            <input type="text" className="form-control" name="sales_policy_type"
                                                   id="sales_policy_type" placeholder="Enter Sales Policy Type"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select className="form-control" name="status" id="status">
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button className="btn_create" type="submit" id="btnCreate">Create</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default PromotionCreate;
