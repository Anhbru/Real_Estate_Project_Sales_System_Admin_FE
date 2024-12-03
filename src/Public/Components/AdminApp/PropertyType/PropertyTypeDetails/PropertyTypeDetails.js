import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import propertyTypeService from '../../../Service/PropertyTypeService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function PropertyTypeDetail() {
    const [propertyType, setPropertyType] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const detailPropertyType = async () => {
        try {
            console.log("Fetching property type details for ID:", id);
            const res = await propertyTypeService.adminDetailProperty(id);
            console.log("Detail property type response:", res.data);
            if (res.data) {
                setPropertyType(res.data);
            } else {
                message.warning('Property type not found');
            }
        } catch (err) {
            console.error("Error fetching property type details:", err);
            message.error('Failed to load property type details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detailPropertyType();
    }, [id]);

    if (loading) return <Spin tip="Loading..." />;

    if (!propertyType || Object.keys(propertyType).length === 0) {
        return <div>No property type data available.</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/property-types/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to property type list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>{propertyType.propertyTypeName}</h1>
                </div>
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">General information</p>
                                <Link to={`/property-types/update/${propertyType.propertyTypeID}`} className="edit_tab_">Edit</Link>
                            </div>
                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Property Type ID: </p>
                                        <p className="val_ text-truncate">{propertyType.propertyTypeID}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Property Type Name: </p>
                                        <p className="val_ text-truncate">{propertyType.propertyTypeName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Category ID: </p>
                                        <p className="val_ text-truncate">{propertyType.propertyCategoryID}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Category Name: </p>
                                        <p className="val_ text-truncate">{propertyType.propertyCategoryName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Status: </p>
                                        <p
                                            className="val_ text-truncate"
                                            style={{ color: propertyType.status ? 'green' : 'red' }}
                                        >
                                            {propertyType.status ? 'Active' : 'Inactive'}
                                        </p>
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

export default PropertyTypeDetail;
