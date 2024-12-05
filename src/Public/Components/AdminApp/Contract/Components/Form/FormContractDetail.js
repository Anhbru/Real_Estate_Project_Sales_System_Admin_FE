import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import contractService from '../../../Service/ContractService'; // Giả sử bạn có service này
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

function ContractDetail() {
    const [contract, setContract] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [form] = Form.useForm();

    const detailContract = async () => {
        await contractService.adminDetailContract(id)
            .then((res) => {
                console.log("detail contract", res.data);
                setContract(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        detailContract();
    }, [form, id, loading]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/contracts/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to contract list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>{contract.contractCode}</h1>
                </div>
                {/* End Page Title */}
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">
                                    General information
                                </p>
                                <a href={"/contracts/update/" + contract.contractID} className="edit_tab_">Edit</a>
                            </div>

                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Contract Code: </p>
                                        <p className="val_ text-truncate">{contract.contractCode}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Contract Type: </p>
                                        <p className="val_ text-truncate">{contract.contractType}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Created Time: </p>
                                        <p className="val_ text-truncate">{contract.createdTime}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Expired Time: </p>
                                        <p className="val_ text-truncate">{contract.expiredTime}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Total Price: </p>
                                        <p className="val_ text-truncate">{contract.totalPrice}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Status: </p>
                                        <p className="val_ text-truncate">{contract.status}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Customer Name: </p>
                                        <p className="val_ text-truncate">{contract.fullName}</p>
                                    </div>
                                </div>
                                {contract.description && (
                                    <div className="row">
                                        <div className="d-flex align-items-center justify-content-start col-md-12">
                                            <p className="key_">Description: </p>
                                            <p className="val_ text-truncate">{contract.description}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="row">
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal"
                                                data-bs-target="#exampleModal">
                                            View contract files
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Modal for contract files */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Contract Files</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {contract.contractDepositFile && (
                                    <div className="col-md-12">
                                        <a href={contract.contractDepositFile} target="_blank" rel="noopener noreferrer">
                                            <button className="btn btn-secondary mt-2">View Deposit File</button>
                                        </a>
                                    </div>
                                )}
                                {contract.contractSaleFile && (
                                    <div className="col-md-12">
                                        <a href={contract.contractSaleFile} target="_blank" rel="noopener noreferrer">
                                            <button className="btn btn-secondary mt-2">View Sale File</button>
                                        </a>
                                    </div>
                                )}
                                {contract.priceSheetFile && (
                                    <div className="col-md-12">
                                        <a href={contract.priceSheetFile} target="_blank" rel="noopener noreferrer">
                                            <button className="btn btn-secondary mt-2">View Price Sheet</button>
                                        </a>
                                    </div>
                                )}
                                {contract.contractTransferFile && (
                                    <div className="col-md-12">
                                        <a href={contract.contractTransferFile} target="_blank" rel="noopener noreferrer">
                                            <button className="btn btn-secondary mt-2">View Transfer File</button>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContractDetail;
