import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import propertyCategoryService from "../../../Service/PropertyCategoryService";
import BackButton from '../../../../Utils/BackButton';
import AlertMessageError from '../../../../Utils/AlertMessageError';

function PropertyCategoryCreate() {
    const navigate = useNavigate();

    const createFloor = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let propertyCategoryName = $('#propertyCategoryName').val();

        if (!propertyCategoryName) {
            alert('Property Category Name không được bỏ trống!');
            return;
        }

        let data = {
            propertyCategoryName: propertyCategoryName
        }

        await propertyCategoryService.create(data)
            .then((res) => {
                console.log("create floor", res.data)
                message.success("Tạo Property Category thành công!")
                navigate("/property-categories/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                AlertMessageError(err);
            })
    }

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/Floors/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to property categories list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Property Categories</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createFloor}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="propertyCategoryName">PropertyCategoryName</label>
                                            <input type="text" className="form-control" name="propertyCategoryName"
                                                   id="propertyCategoryName" placeholder="Enter Property Category Name"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <BackButton/>
                                <button id="btnCreate" className="btn_create" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PropertyCategoryCreate
