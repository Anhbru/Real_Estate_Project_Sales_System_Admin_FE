import {Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import propertyCategoryService from '../../../Service/PropertyCategoryService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function PropertyCategoryDetail() {
    const [propertyCate, setPropertyCate] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [form] = Form.useForm();

    const detail = async () => {
        await propertyCategoryService.detail(id)
            .then((res) => {
                console.log("detail", res.data);
                setPropertyCate(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        detail();
    }, [form, id, loading])


    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/property-categories/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to property categories list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>A01.01</h1>
                </div>
                {/* End Page Title */}
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">
                                    General information
                                </p>
                                <a href={"/property-categories/update/" + propertyCate.propertyCategoryID} className="edit_tab_">Edit</a>
                            </div>

                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Property Category Name: </p>
                                        <p className="val_ text-truncate">{propertyCate.propertyCategoryName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PropertyCategoryDetail
