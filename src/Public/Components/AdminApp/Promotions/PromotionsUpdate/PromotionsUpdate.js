import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import promotionService from '../../../Service/PromotionService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function PromotionUpdate() {
    const [promotion, setPromotion] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

    const detailPromotion = async () => {
        try {
            const res = await promotionService.adminDetailPromotion(id);
            setPromotion(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load promotion details");
        }
    };

    const updatePromotion = async () => {
        $('#btnUpdate').prop('disabled', true).text('Saving...');

        try {
            const formData = new FormData($('#formUpdate')[0]);
            await promotionService.adminUpdatePromotion(id, formData);
            message.success("Promotion updated successfully");
            navigate("/promotions/list");
        } catch (err) {
            console.error(err);
            message.error("Failed to update promotion");
            $('#btnUpdate').prop('disabled', false).text('Save Changes');
        }
    };

    useEffect(() => {
        detailPromotion();
    }, [id]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Promotion</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updatePromotion}>
                            <div className="form_area_">
                                <div className="title_form_">Promotion Information</div>

                                <div className="form-group">
                                    <label htmlFor="promotionName">Promotion Name</label>
                                    <input type="text" className="form-control" name="promotionName"
                                        id="promotionName" defaultValue={promotion?.promotionName}
                                        placeholder="Enter Promotion Name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" name="description" id="description"
                                        defaultValue={promotion?.description}
                                        placeholder="Enter Description" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input type="date" className="form-control" name="startDate" id="startDate"
                                        defaultValue={promotion?.startDate ? new Date(promotion.startDate).toISOString().slice(0, 10) : ""}
                                        placeholder="Enter Start Date" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="endDate">End Date</label>
                                    <input type="date" className="form-control" name="endDate" id="endDate"
                                        defaultValue={promotion?.endDate ? new Date(promotion.endDate).toISOString().slice(0, 10) : ""}
                                        placeholder="Enter End Date" />
                                </div>



                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-control" name="status" id="status" defaultValue={promotion?.status}>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="salesPolicyType">Sales Policy Type</label>
                                    <textarea className="form-control" name="salesPolicyType" id="salesPolicyType"
                                        defaultValue={promotion?.salesPolicyType}
                                        placeholder="Enter Sales Policy Type" />
                                </div>

                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button className="btn_create" id="btnUpdate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default PromotionUpdate;
