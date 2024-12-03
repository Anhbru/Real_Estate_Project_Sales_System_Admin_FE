import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message, Select } from 'antd';
import promotionService from '../../../Service/PromotionService';
import salesPolicyService from '../../../Service/SalePolicyService'; 
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function PromotionCreate() {
    const navigate = useNavigate();
    const [salesPolicies, setSalesPolicies] = useState([]);
    useEffect(() => {
        const fetchSalesPolicies = async () => {
            try {
                const res = await salesPolicyService.adminListSalesPolicy();
                if (res.status === 200) {
                    setSalesPolicies(res.data); // res.data phải chứa danh sách Sales Policies
                } else {
                    message.error("Failed to fetch sales policies");
                }
            } catch (error) {
                console.error("Error fetching sales policies:", error);
                message.error("Error fetching sales policies");
            }
        };

        fetchSalesPolicies();
    }, []);
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
                                            <label htmlFor="salesPolicyID">Sales Policy</label>
                                            <Select
                                                name="salesPolicyID"
                                                id="salesPolicyID"
                                                className="form-control"
                                                placeholder="Select a Sales Policy"
                                                options={salesPolicies.map(policy => ({
                                                    label: policy.salesPolicyType, // Hiển thị Sales Policy Type
                                                    value: policy.salesPolicyID,   // Lưu Sales Policy ID
                                                }))}
                                            />
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
