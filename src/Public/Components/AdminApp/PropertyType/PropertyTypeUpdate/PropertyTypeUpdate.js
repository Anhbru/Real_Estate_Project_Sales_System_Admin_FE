import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import propertyTypeService from '../../../Service/PropertyTypeService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import BackButton from "../../../../Utils/BackButton";

function PropertyTypeUpdate() {
    const [propertyType, setPropertyType] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

    const detailPropertyType = async () => {
        try {
            const res = await propertyTypeService.adminDetailProperty(id);
            setPropertyType(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load property type details");
        }
    };

    const updatePropertyType = async () => {
        $('#btnUpdate').prop('disabled', true).text('Saving...');

        try {
            const formData = new FormData($('#formUpdate')[0]);
            await propertyTypeService.adminUpdateProperty(id, formData);
            message.success("Property type updated successfully");
            navigate("/propertytype/list");
        } catch (err) {
            console.error(err);
            message.error("Failed to update property type");
            $('#btnUpdate').prop('disabled', false).text('Save Changes');
        }
    };

    useEffect(() => {
        detailPropertyType();
    }, [id]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Property Type</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updatePropertyType}>
                            <div className="form_area_">
                                <div className="title_form_">Property Type Information</div>

                                <div className="form-group">
                                    <label htmlFor="propertyTypeName">Property Type Name</label>
                                    <input type="text" className="form-control" name="propertyTypeName"
                                        id="propertyTypeName" defaultValue={propertyType?.propertyTypeName}
                                        placeholder="Enter Property Type Name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="propertyCategoryID">Category ID</label>
                                    <input type="text" className="form-control" name="propertyCategoryID"
                                        id="propertyCategoryID" defaultValue={propertyType?.propertyCategoryID}
                                        placeholder="Enter Property Category ID" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="propertyCategoryName">Category Name</label>
                                    <input type="text" className="form-control" name="propertyCategoryName"
                                        id="propertyCategoryName" defaultValue={propertyType?.propertyCategoryName}
                                        placeholder="Enter Property Category Name" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select className="form-control" name="status" id="status" defaultValue={propertyType?.status}>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <BackButton />
                                <button className="btn_create" id="btnUpdate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default PropertyTypeUpdate;
