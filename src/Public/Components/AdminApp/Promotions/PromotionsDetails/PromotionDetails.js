import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import promotionService from '../../../Service/PromotionService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function PromotionDetail() {
    const [promotion, setPromotion] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const detailPromotion = async () => {
        try {
            console.log("Fetching promotion details for ID:", id);
            const res = await promotionService.adminDetailPromotion(id);
            console.log("Detail promotion response:", res.data);
            if (res.data) {
                setPromotion(res.data);
            } else {
                message.warning('Promotion not found');
            }
        } catch (err) {
            console.error("Error fetching promotion details:", err);
            message.error('Failed to load promotion details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detailPromotion();
    }, [id]);

    if (loading) return <Spin tip="Loading..." />;

    if (!promotion || Object.keys(promotion).length === 0) {
        return <div>No promotion data available.</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/promotions/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to promotions list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>{promotion.promotionName}</h1>
                </div>
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">General information</p>
                                <Link to={`/promotions/update/${promotion.promotionID}`} className="edit_tab_">Edit</Link>
                            </div>
                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Promotion Name: </p>
                                        <p className="val_ text-truncate">{promotion.promotionName}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Description: </p>
                                        <p className="val_ text-truncate">{promotion.description}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Start Date: </p>
                                        <p className="val_ text-truncate">{new Date(promotion.startDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">End Date: </p>
                                        <p className="val_ text-truncate">{new Date(promotion.endDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Status: </p>
                                        <p
                                            className="val_ text-truncate"
                                            style={{ color: promotion.status ? 'green' : 'red' }} 
                                        >
                                            {promotion.status ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Sales Policy ID: </p>
                                        <p className="val_ text-truncate">{promotion.salesPolicyID}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Sales Policy Type: </p>
                                        <p className="val_ text-truncate">{promotion.salesPolicyType}</p>
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

export default PromotionDetail;
