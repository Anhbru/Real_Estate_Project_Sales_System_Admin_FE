import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import contractPaymentDetailService from '../../../Service/ContractPaymentDetailService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function ContractPaymentDetailsUpdate() {
    const [contractDetails, setContractDetails] = useState([]);
    const navigate = useNavigate();
    const { id, contractID } = useParams(); 
    const [form] = Form.useForm();

    const detailContractPaymentDetails = async () => {
        try {
            const res = await contractPaymentDetailService.adminUpdateContractPaymentDetail(id);
            setContractDetails(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load contract payment details");
        }
    };

    const updateContractPaymentDetails = async () => {
        $('#btnUpdate').prop('disabled', true).text('Saving...');

        try {
            const formData = new FormData($('#formUpdate')[0]);
            await contractPaymentDetailService.adminUpdateContractPaymentDetail(id, formData);
            message.success("Contract payment details updated successfully");

            // Quay lại trang danh sách theo contractID
            navigate(`/contractpaymentdetail/list/${contractID}`);
        } catch (err) {
            console.error(err);
            message.error("Failed to update contract payment details");
            $('#btnUpdate').prop('disabled', false).text('Save Changes');
        }
    };

    useEffect(() => {
        detailContractPaymentDetails();
    }, [id]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Contract Payment Details</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updateContractPaymentDetails}>
                            <div className="form_area_">
                                <div className="title_form_">Contract Payment Information</div>
                                
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-control" name="status" id="status" defaultValue={contractDetails?.status}>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <button
                                    className="btn_back"
                                    type="button"
                                    onClick={() => navigate(`/contractpaymentdetail/list/${contractID}`)}
                                >
                                    Back
                                </button>
                                <button className="btn_create" id="btnUpdate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default ContractPaymentDetailsUpdate;
