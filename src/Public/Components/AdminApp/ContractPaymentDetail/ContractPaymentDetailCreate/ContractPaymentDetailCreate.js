import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message, Select } from 'antd';
import contractService from '../../../Service/ContractService';
import paymentPolicyService from '../../../Service/PaymentPolicyService';
import Header from '../../../Shared/Admin/Header/Header';
import Footer from '../../../Shared/Admin/Footer/Footer';
import Sidebar from '../../../Shared/Admin/Sidebar/Sidebar';
import $ from 'jquery';
import BackButton from '../../../../Utils/BackButton';

function ContractPaymentDetailCreate() {
    const navigate = useNavigate();
    const [contracts, setContracts] = useState([]);
    const [paymentPolicies, setPaymentPolicies] = useState([]);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const res = await contractService.getList();
                setContracts(res.data);
            } catch (err) {
                console.error(err);
                message.error('Failed to load contracts.');
            }
        };

        const fetchPaymentPolicies = async () => {
            try {
                const res = await paymentPolicyService.adminListPaymentPolicy();
                setPaymentPolicies(res.data);
            } catch (err) {
                console.error(err);
                message.error('Failed to load payment policies.');
            }
        };

        fetchContracts();
        fetchPaymentPolicies();
    }, []);

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

        await contractService.create(formData)
            .then((res) => {
                message.success('Tạo thành công!');
                navigate('/contract-payment-details/list');
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
                    <Link to="/contract-payment-details/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to contract payment details list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Contract Payment Detail</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={onFinish}>
                            <div className="form_area_">
                                <div className="title_form_">Contract Payment Detail Information</div>

                                <div className="form-group mt-3">
                                    <label htmlFor="paymentRate">Payment Rate</label>
                                    <input type="number" className="form-control" name="paymentRate" id="paymentRate" placeholder="Enter Payment Rate" />
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" name="description" id="description" placeholder="Enter Description" />
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="period">Period</label>
                                    <input type="text" className="form-control" name="period" id="period" placeholder="Enter Period" />
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="paidValue">Paid Value</label>
                                    <input type="number" className="form-control" name="paidValue" id="paidValue" placeholder="Enter Paid Value" />
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="paidValueLate">Paid Value Late</label>
                                    <input type="number" className="form-control" name="paidValueLate" id="paidValueLate" placeholder="Enter Paid Value Late" />
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="contractID">Contract</label>
                                    <Select
                                        className="form-control"
                                        showSearch
                                        placeholder="Select Contract"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                        name="contractID"
                                        id="contractID"
                                    >
                                        {contracts.map((contract) => (
                                            <Select.Option key={contract.contractID} value={contract.contractID}>
                                                {contract.contractCode}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="paymentPolicyID">Payment Policy</label>
                                    <Select
                                        className="form-control"
                                        showSearch
                                        placeholder="Select Payment Policy"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                        name="paymentPolicyID"
                                        id="paymentPolicyID"
                                    >
                                        {paymentPolicies.map((policy) => (
                                            <Select.Option key={policy.paymentPolicyID} value={policy.paymentPolicyID}>
                                                {policy.paymentPolicyName}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <BackButton />
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

export default ContractPaymentDetailCreate;
