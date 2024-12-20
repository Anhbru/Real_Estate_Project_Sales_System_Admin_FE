import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import contractHistoryService from '../../../Service/ContractHistoryService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
function ContractHistoryDetail() {
    const [contractHistory, setContractHistory] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const detailContractHistory = async () => {
        try {
            console.log("Fetching contract history details for ID:", id);
            const res = await contractHistoryService.adminDetailContractHistory(id);
            console.log("Detail contract history response:", res.data);
            if (res.data) {
                setContractHistory(res.data);
            } else {
                message.warning('Contract history not found');
            }
        } catch (err) {
            console.error("Error fetching contract history details:", err);
            message.error('Failed to load contract history details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detailContractHistory();
    }, [id]);

    if (loading) return <Spin tip="Loading..." />;

    if (!contractHistory || Object.keys(contractHistory).length === 0) {
        return <div>No contract history data available.</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                
                <div className="pagetitle">
                    <h1>Contract History</h1>
                </div>
                <div className="back_to_page_">
                    <button onClick={() => navigate(-1)} className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to previous page
                    </button>
                </div>
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="content_">
                                <div className="row">

                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Contract Code: </p>
                                        <p className="val_ text-truncate">{contractHistory.contractCode}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Created Time: </p>
                                        <p className="val_ text-truncate">{contractHistory.createdTime}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Full Name: </p>
                                        <p className="val_ text-truncate">{contractHistory.fullName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Note: </p>
                                        <p className="val_ text-truncate">{contractHistory.note}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Notarized Contract Code: </p>
                                        <p className="val_ text-truncate">{contractHistory.notarizedContractCode}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Attach File: </p>
                                        {contractHistory.attachFile ? (
                                            <button
                                                className="btn btn-link"
                                                onClick={() => window.open(contractHistory.attachFile, "_blank")}
                                            >
                                                Xem File
                                            </button>
                                        ) : (
                                            <p className="val_ text-truncate">No file attached</p>
                                        )}
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

export default ContractHistoryDetail;
