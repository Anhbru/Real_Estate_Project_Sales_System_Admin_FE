import {Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import paymentService from '../../../Service/PaymentService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";

function PaymentDetail() {
    const [payment, setPayment] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [form] = Form.useForm();

    const detailPayment = async () => {
        await paymentService.adminDetail(id)
            .then((res) => {
                console.log("detail payment", res.data);
                setPayment(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        detailPayment();
    }, [form, id, loading])


    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/payments/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to payment list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>A01.01</h1>
                </div>
                {/* End Page Title */}
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">
                                    General information
                                </p>
                                <a href={"/payments/update/" + payment.paymentID} className="edit_tab_">Edit</a>
                            </div>

                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-4">
                                        <p className="key_">Amount: </p>
                                        <p className="val_ text-truncate">{payment.amount}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-4">
                                        <p className="key_">Status: </p>
                                        <p className="val_ text-truncate">{payment.status ? "Active" : "Inactive"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PaymentDetail
