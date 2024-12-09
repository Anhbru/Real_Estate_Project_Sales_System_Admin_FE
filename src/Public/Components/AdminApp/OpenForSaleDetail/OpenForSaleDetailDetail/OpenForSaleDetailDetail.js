import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import openSaleDetailsService from '../../../Service/OpenForSaleDetailsService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function OpenForSaleDetailUpdate() {
    const [openSaleDetail, setOpenSaleDetail] = useState([]);
    const navigate = useNavigate();
    const { propertyID, openingForSaleID } = useParams(); // Destructure both parameters
    const [form] = Form.useForm();

    // Fetch the details based on propertyID and openingForSaleID
    const detailOpenSaleDetail = async () => {
        try {
            const resOpenSaleDetail = await openSaleDetailsService.adminDetailsOpenSaleDetail(propertyID, openingForSaleID);
            setOpenSaleDetail(resOpenSaleDetail.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load Open For Sale Detail");
        }
    };

    // Handle the update logic
    const updateOpenSaleDetail = async () => {
        $('#btnUpdate').prop('disabled', true).text('Saving...');

        try {
            const formData = new FormData($('#formUpdate')[0]); 
            
            await openSaleDetailsService.adminUpdateOpenSaleDetail(propertyID, openingForSaleID, formData);
            message.success("Open For Sale Detail updated successfully");
            navigate("/openforsaledetails/list"); 
        } catch (err) {
            console.error(err);
            message.error("Failed to update Open For Sale Detail");
            $('#btnUpdate').prop('disabled', false).text('Save Changes');
        }
    };

    useEffect(() => {
        detailOpenSaleDetail();
    }, [propertyID, openingForSaleID]); 

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Open For Sale Detail</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updateOpenSaleDetail}>
                            <div className="form_area_">
                                <div className="title_form_">Open For Sale Detail Information</div>

                                <div className="form-group">
                                    <label htmlFor="openingForSaleName">Opening For Sale Name</label>
                                    <input type="text" className="form-control" name="openingForSaleName"
                                        id="openingForSaleName" defaultValue={openSaleDetail?.openingForSaleName}
                                        placeholder="Enter Opening For Sale Name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="propertyID">Property ID</label>
                                    <input type="text" className="form-control" name="propertyID"
                                        id="propertyID" defaultValue={openSaleDetail?.propertyID}
                                        placeholder="Enter Property ID" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="propertyName">Property Name</label>
                                    <input type="text" className="form-control" name="propertyName"
                                        id="propertyName" defaultValue={openSaleDetail?.propertyName}
                                        placeholder="Enter Property Name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <input type="number" className="form-control" name="price"
                                        id="price" defaultValue={openSaleDetail?.price}
                                        placeholder="Enter Price" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="note">Note</label>
                                    <textarea className="form-control" name="note" id="note"
                                        defaultValue={openSaleDetail?.note}
                                        placeholder="Enter Note" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-control" name="status" id="status" defaultValue={openSaleDetail?.status}>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <Link to="/openforsaledetails/list" className="btn_back">Back</Link>
                                <button className="btn_create" id="btnUpdate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default OpenForSaleDetailUpdate;
