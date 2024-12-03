import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import paymentProcessService from "../../../Service/PaymentProcessService";
import salesPolicyService from "../../../Service/SalePolicyService";

function PaymentProcessCreate() {
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const createZone2 = async () => {
        const $btnCreate = $('#btnCreate');
        $btnCreate.prop('disabled', true).text('Đang tạo mới...');

        const inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let input of inputs) {
            const $input = $(input);
            if (!$input.val()) {
                const label = $input.attr('data-label') || $input.prev('label').text() || 'Trường dữ liệu';
                alert(`${label} không được bỏ trống!`);
                $btnCreate.prop('disabled', false).text('Tạo mới');
                return;
            }
        }

        try {
            const formData = new FormData($("#formCreate")[0]);
            formData.delete('status');
            formData.append('status', $('#status').val() === 'true');

            const res = await paymentProcessService.adminCreate(formData);
            console.log("create payment process", res.data);
            message.success("Tạo payment process thành công!");
            navigate("/paymentprocesses/list");
        } catch (err) {
            console.error("Error creating payment process:", err);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        } finally {
            $btnCreate.prop('disabled', false).text('Tạo mới');
        }
    };

    const createZone = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let data = {};
        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');

        for (let input of inputs) {
            let key = $(input).attr('id');
            let value = $(input).val();

            if (!value) {
                const label = $(input).prev('label').text() || 'Trường dữ liệu';
                alert(`${label} không được bỏ trống!`);
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return;
            }

            data[key] = value;
        }

        data.status = data.status === 'true';

        try {
            const res = await paymentProcessService.adminCreate(data);
            console.log("create payment process", res.data);
            message.success("Tạo payment process thành công!");
            navigate("/paymentprocesses/list");
        } catch (err) {
            console.error("Error creating payment process:", err);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        } finally {
            $('#btnCreate').prop('disabled', false).text('Tạo mới');
        }
    };

    const getList = async () => {
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

    useEffect(() => {
        getList();
    }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/paymentprocesses/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to payment process list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Zone</h1>
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
                                                   placeholder="Enter your PaymentProcessName"/>
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

export default PaymentProcessCreate
