import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import openForSaleService from '../../../Service/OpenForSaleService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function OpenForSaleUpdate() {
    const [openingForSale, setOpeningForSale] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

    const detailOpenForSale = async () => {
        try {
            const res = await openForSaleService.adminDetailOpenSale(id);
            setOpeningForSale(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load Open For Sale details");
        }
    };

    const updateOpenForSale = async () => {
        $('#btnUpdate').prop('disabled', true).text('Saving...');

        try {
            const formData = new FormData($('#formUpdate')[0]);
            await openForSaleService.adminUpdateOpenSale(id, formData);
            message.success("Open For Sale updated successfully");
            navigate("/openforsales/list");
        } catch (err) {
            console.error(err);
            message.error("Failed to update Open For Sale");
            $('#btnUpdate').prop('disabled', false).text('Save Changes');
        }
    };

    useEffect(() => {
        detailOpenForSale();
    }, [id]);

    const formatDateTime = (date) => {
        if (!date) return '';
        const d = new Date(date);

        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}T${hours}:${minutes}`;
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Open For Sale</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updateOpenForSale}>
                            <div className="form_area_">
                                <div className="title_form_">Open For Sale Information</div>

                                <div className="form-group">
                                    <label htmlFor="decisionName">Decision Name</label>
                                    <input type="text" className="form-control" name="decisionName"
                                        id="decisionName" defaultValue={openingForSale?.decisionName}
                                        placeholder="Enter Decision Name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="saleType">Sale Type</label>
                                    <input type="text" className="form-control" name="saleType"
                                        id="saleType" defaultValue={openingForSale?.saleType}
                                        placeholder="Enter Sale Type" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="startDate">Start Date</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="startDate"
                                        id="startDate"
                                        defaultValue={formatDateTime(openingForSale?.startDate)}
                                        placeholder="Enter Start Date"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="endDate">End Date</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="endDate"
                                        id="endDate"
                                        defaultValue={formatDateTime(openingForSale?.endDate)}
                                        placeholder="Enter End Date"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="checkinDate">Check-in Date</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="checkinDate"
                                        id="checkinDate"
                                        defaultValue={formatDateTime(openingForSale?.checkinDate)}
                                        placeholder="Enter Check-in Date"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="reservationPrice">Reservation Price</label>
                                    <input type="number" className="form-control" name="reservationPrice"
                                        id="reservationPrice" defaultValue={openingForSale?.reservationPrice}
                                        placeholder="Enter Reservation Price" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="projectName">Project Name</label>
                                    <input type="text" className="form-control" name="projectName"
                                        id="projectName" defaultValue={openingForSale?.projectName}
                                        placeholder="Enter Project Name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="propertyCategoryName">Property Category Name</label>
                                    <input type="text" className="form-control" name="propertyCategoryName"
                                        id="propertyCategoryName" defaultValue={openingForSale?.propertyCategoryName}
                                        placeholder="Enter Property Category Name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <input type="text" className="form-control" name="status"
                                        id="status" defaultValue={openingForSale?.status}
                                        placeholder="Enter Status" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea className="form-control" name="description" id="description"
                                        defaultValue={openingForSale?.description}
                                        placeholder="Enter Description" />
                                </div>
                            </div>

                            <div className="footer_form_">
                                <Link to="/opensales/list" className="btn_back">Back</Link>
                                <button className="btn_create" id="btnUpdate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default OpenForSaleUpdate;
