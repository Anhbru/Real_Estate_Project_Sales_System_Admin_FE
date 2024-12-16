import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import openSaleDetailsService from '../../../Service/OpenForSaleDetailsService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function OpenForSaleDetailDetails() { 
    const [openSaleDetail, setOpenSaleDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { propertyID, openingForSaleID } = useParams(); 

    const detailOpenSaleDetail = async () => {
        try {
            const resOpenSaleDetail = await openSaleDetailsService.adminDetailsOpenSaleDetail(propertyID, openingForSaleID);
            setOpenSaleDetail(resOpenSaleDetail.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load Open For Sale Detail");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detailOpenSaleDetail();
    }, [propertyID, openingForSaleID]); 

    if (loading) return <Spin tip="Loading..." />;

    if (!openSaleDetail || Object.keys(openSaleDetail).length === 0) {
        return <div>No Open For Sale Detail data available.</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/openforsaledetails/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to Open For Sale list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>{openSaleDetail.openingForSaleName}</h1>
                </div>
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">General information</p>
                                <Link to={`/open-for-sale/update/${openSaleDetail.openingForSaleID}`} className="edit_tab_">Edit</Link>
                            </div>
                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Opening For Sale Name: </p>
                                        <p className="val_ text-truncate">{openSaleDetail.openingForSaleName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Property Name: </p>
                                        <p className="val_ text-truncate">{openSaleDetail.propertyName}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Note: </p>
                                        <p className="val_ text-truncate">{openSaleDetail.note}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Price: </p>
                                        <p className="val_ text-truncate">{openSaleDetail.price}</p>
                                    </div>
                                   
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Status: </p>
                                        <p className="val_ text-truncate">{openSaleDetail.status ? 'Active' : 'Inactive'}</p>
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

export default OpenForSaleDetailDetails;
