import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import openForSaleService from '../../../Service/OpenForSaleService';
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Header from "../../../Shared/Admin/Header/Header";

function OpenForSaleDetails() {
    const [openForSale, setOpenForSale] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [form] = Form.useForm();

    function formatDateTime(date) {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    const detailOpenForSale = async () => {
        setLoading(true);
        try {
            const res = await openForSaleService.adminDetailOpenSale(id);
            if (res && res.data) {
                console.log("Detail Open For Sale", res.data);
                setOpenForSale(res.data);
            } else {
                throw new Error("Không có dữ liệu trả về từ server");
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                console.error("Dữ liệu mở bán không tồn tại với id:", id);
                message.error("Không tìm thấy dữ liệu mở bán với ID này.");
            } else {
                console.error("Lỗi khi tải dữ liệu mở bán:", err.message || err);
                message.error("Lỗi khi tải dữ liệu mở bán: " + (err.message || "Vui lòng thử lại sau."));
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        detailOpenForSale();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/openforsales/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to Open For Sale list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>{openForSale?.decisionName || "Mở bán không tồn tại"}</h1>
                </div>
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">Thông tin mở bán</p>
                                <a href={'/openforsales/update/' + openForSale?.openingForSaleID} className="edit_tab_">Edit</a>
                            </div>

                            <div className="content_">
                                {openForSale && (
                                    <div className="row">

                                        <div className="d-flex align-items-center justify-content-start col-md-6">
                                            <p className="key_">Decision Name: </p>
                                            <p className="val_ text-truncate">{openForSale?.decisionName}</p>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="startDate">Start Date</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                name="startDate"
                                                id="startDate"
                                                defaultValue={formatDateTime(openForSale?.startDate)}
                                                placeholder="YYYY-MM-DD HH:mm:ss"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="endDate">End Date</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                name="endDate"
                                                id="endDate"
                                                defaultValue={formatDateTime(openForSale?.endDate)}
                                                placeholder="YYYY-MM-DD HH:mm:ss"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="checkinDate">Check-in Date</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                name="checkinDate"
                                                id="checkinDate"
                                                defaultValue={formatDateTime(openForSale?.checkinDate)}
                                                placeholder="YYYY-MM-DD HH:mm:ss"
                                            />
                                        </div>


                                        <div className="d-flex align-items-center justify-content-start col-md-6">
                                            <p className="key_">Loại bán: </p>
                                            <p className="val_ text-truncate">{openForSale?.saleType}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start col-md-6">
                                            <p className="key_">Giá đặt cọc: </p>
                                            <p className="val_ text-truncate">{openForSale?.reservationPrice}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start col-md-6">
                                            <p className="key_">Mô tả: </p>
                                            <p className="val_ text-truncate">{openForSale?.description}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start col-md-6">
                                            <p className="key_">Trạng thái: </p>
                                            <p className="val_ text-truncate">{openForSale?.status}</p>
                                        </div>
                                        
                                        <div className="d-flex align-items-center justify-content-start col-md-6">
                                            <p className="key_">Danh mục dự án: </p>
                                            <p className="val_ text-truncate">{openForSale?.projectCategoryDetailID}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start col-md-6">
                                            <p className="key_">Tên dự án: </p>
                                            <p className="val_ text-truncate">{openForSale?.projectName}</p>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-start col-md-6">
                                            <p className="key_">Tên loại bất động sản: </p>
                                            <p className="val_ text-truncate">{openForSale?.propertyCategoryName}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default OpenForSaleDetails;
