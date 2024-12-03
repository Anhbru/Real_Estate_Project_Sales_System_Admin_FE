import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import salesPolicyService from "../../../Service/SalePolicyService";
import paymentProcessService from "../../../Service/PaymentProcessService";

function PaymentProcessUpdate() {
    const [paymentprocess, setPaymentProcess] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form] = Form.useForm();
    const [sales, setSales] = useState([]);

    const getListProject = async () => {
        await salesPolicyService.adminListSalesPolicy()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setSales(res.data)
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

    const createZone = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang chỉnh sửa...');

        let data = {};
        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');

        for (let input of inputs) {
            let key = $(input).attr('id');
            let value = $(input).val();

            if (!value) {
                const label = $(input).prev('label').text() || 'Trường dữ liệu';
                alert(`${label} không được bỏ trống!`);
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
                return;
            }

            data[key] = value;
        }

        data.status = data.status === 'true';

        try {
            const res = await paymentProcessService.adminUpdate(id, data);
            console.log("create payment process", res.data);
            message.success("Update payment process thành công!");
            navigate("/paymentprocesses/list");
        } catch (err) {
            console.error("Error update payment process:", err);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        } finally {
            $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
        }
    };

    const detail = async () => {
        await paymentProcessService.adminDetail(id)
            .then((res) => {
                console.log("detail paymentprocess", res.data);
                setPaymentProcess(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        getListProject();
        detail();
    }, [form, id, loading])

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/paymentprocesss/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to list
                    </Link>
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
                                            <label htmlFor="paymentProcessName">PaymentProcessName</label>
                                            <input type="text" className="form-control" name="paymentProcessName"
                                                   id="paymentProcessName"
                                                   defaultValue={paymentprocess.paymentProcessName}
                                                   placeholder="Enter your PaymentProcessName"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="status">status</label>
                                            <select name="status" id="status" className="form-select">
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="salesPolicyID">SalesPolicyID</label>
                                            <select name="salesPolicyID" id="salesPolicyID" className="form-control">
                                                {
                                                    sales.map((sale) => {
                                                        return (
                                                            <option key={sale.salesPolicyID}
                                                                    value={sale.salesPolicyID}>
                                                                {sale.salesPolicyType} - {sale.projectName}
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

export default PaymentProcessUpdate
