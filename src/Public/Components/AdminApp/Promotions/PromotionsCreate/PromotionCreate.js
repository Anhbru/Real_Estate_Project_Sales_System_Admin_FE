import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {Form, message, Select} from 'antd';
import promotionService from '../../../Service/PromotionService';
import salesPolicyService from '../../../Service/SalePolicyService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import BackButton from "../../../../Utils/BackButton";
import AlertMessageError from "../../../../Utils/AlertMessageError";

function PromotionCreate() {
    const navigate = useNavigate();
    const [salesPolicies, setSalesPolicies] = useState([]);
    useEffect(() => {
        const fetchSalesPolicies = async () => {
            try {
                const res = await salesPolicyService.adminListSalesPolicy();
                if (res.status === 200) {
                    setSalesPolicies(res.data);
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
    const onFinish = async (values) => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        try {
            const res = await promotionService.adminCreatePromotion(values);
            message.success("Tạo thành công!");
            navigate("/promotions/list");
        } catch (err) {
            console.error("Error:", err);
            message.error("Tạo thất bại");
            $('#btnCreate').prop('disabled', false).text('Tạo mới');
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
                AlertMessageError(err);
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
                        <Form
                            id="formCreate"
                            className="form_create_custom_"
                            onFinish={onFinish}
                            initialValues={{
                                promotionName: '',
                                description: '',
                                salesPolicyID: null,
                            }}
                        >
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <Form.Item
                                    label="Promotion Name"
                                    name="promotionName"
                                    rules={[{required: true, message: "Please enter promotion name!"}]}
                                >
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Promotion Name"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Description"
                                    name="description" // Không có quy tắc bắt buộc nhập
                                >
                                    <textarea
                                        className="form-control"
                                        placeholder="Enter Description"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Sales Policy"
                                    name="salesPolicyID"
                                    rules={[{required: true, message: "Please select a sales policy!"}]}
                                >
                                    <Select
                                        placeholder="Select a Sales Policy"
                                        options={salesPolicies.map(policy => ({
                                            label: policy.salesPolicyType,
                                            value: policy.salesPolicyID,
                                        }))}
                                    />
                                </Form.Item>
                            </div>

                            <div className="footer_form_">
                                <BackButton/>
                                <button className="btn_create" id="btnCreate" type="submit">Save</button>
                            </div>
                        </Form>

                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default PromotionCreate;
