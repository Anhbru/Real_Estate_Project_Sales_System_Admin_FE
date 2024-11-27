import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import paymentProcessService from "../../../Service/PaymentProcessService";
import paymentProcessDetailService from "../../../Service/PaymentProcessDetailService";

function PaymentProcessCreate() {
    const [paymentProcesses, setPaymentProcesses] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const createZone = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let data = [];

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return
            }

             data[$(inputs[i]).attr('id')] = $(inputs[i]).val();
        }

        console.log(data);

        const formData = new FormData($("#formCreate")[0]);

        await paymentProcessDetailService.adminCreate(formData)
            .then((res) => {
                console.log("create paymentprocess", res.data)
                message.success("Tạo payment process detail thành công!")
                navigate("/paymentprocessesdetail/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
            })
    }

    const getList = async () => {
        await paymentProcessService.getList()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setPaymentProcesses(res.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })

    }

    useEffect(() => {
        getList();
    }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/paymentprocessesdetail/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to payment process detail list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Payment Process Detail</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createZone}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="paymentStage">PaymentStage</label>
                                            <input type="text" className="form-control" name="paymentStage"
                                                   id="paymentStage"
                                                   placeholder="Enter your paymentStage"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="percentage">Percentage</label>
                                            <input type="text" className="form-control" name="percentage"
                                                   id="percentage"
                                                   placeholder="Enter your percentage"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="durationDate">DurationDate</label>
                                            <input type="text" className="form-control" name="durationDate"
                                                   id="durationDate"
                                                   placeholder="Enter your durationDate"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="amount">Amount</label>
                                            <input type="text" className="form-control" name="amount"
                                                   id="amount"
                                                   placeholder="Enter your amount"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form_el mt-3">
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" name="description" id="description" rows="6"></textarea>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="paymentProcessID">PaymentProcessID</label>
                                            <select name="paymentProcessID" id="paymentProcessID" className="form-control">
                                                {
                                                    paymentProcesses.map((payment) => {
                                                        return (
                                                            <option key={payment.paymentProcessID}
                                                                    value={payment.paymentProcessID}>
                                                                {payment.paymentProcessName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button id="btnCreate" className="btn_create" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PaymentProcessCreate
