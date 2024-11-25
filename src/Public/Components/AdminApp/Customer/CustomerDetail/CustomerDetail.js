import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import customerService from '../../../Service/CustomerService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerDetail() {
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const detailCustomer = async () => {
        try {
            console.log("Fetching customer details for ID:", id);
            const res = await customerService.adminDetailCustomer(id);
            console.log("Detail customer response:", res.data);
            if (res.data) {
                setCustomer(res.data);
            } else {
                message.warning('Customer not found');
            }
        } catch (err) {
            console.error("Error fetching customer details:", err);
            message.error('Failed to load customer details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detailCustomer();
    }, [id]);

    if (loading) return <Spin tip="Loading..." />;

    if (!customer || Object.keys(customer).length === 0) {
        return <div>No customer data available.</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/customers/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to customer list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>{customer.fullName}</h1>
                </div>
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">General information</p>
                                <Link to={`/customers/update/${customer.customerID}`} className="edit_tab_">Edit</Link>
                            </div>
                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Full Name: </p>
                                        <p className="val_ text-truncate">{customer.fullName}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Phone Number: </p>
                                        <p className="val_ text-truncate">{customer.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">ID Card: </p>
                                        <p className="val_ text-truncate">{customer.identityCardNumber}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Nationality: </p>
                                        <p className="val_ text-truncate">{customer.nationality}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Address: </p>
                                        <p className="val_ text-truncate">{customer.placeOfResidence}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Status: </p>
                                        <p
                                            className="val_ text-truncate"
                                            style={{ color: customer.status ? 'green' : 'red' }} 
                                        >
                                            {customer.status ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Email: </p>
                                        <p className="val_ text-truncate">{customer.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default CustomerDetail;
