import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import BackButton from '../../../../Utils/BackButton';
import AlertMessageError from "../../../../Utils/AlertMessageError";
import propertyCategoryService from "../../../Service/PropertyCategoryService";

function PropertyCategoryUpdate() {
    const [propertyCate, setPropertyCate] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams();
    const [form] = Form.useForm();

    const createFloor = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang chỉnh sửa...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('type') !== 'file') {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
                return
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await propertyCategoryService.update(id, formData)
            .then((res) => {
                console.log("create block", res.data)
                message.success("chỉnh sửa property categories thành công!")
                navigate("/property-categories/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
                AlertMessageError(err);
            })
    }

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
                    <Link to="/floors/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to list
                    </Link>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createFloor}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="propertyCategoryName">Property Category Name</label>
                                            <input type="text" className="form-control" name="propertyCategoryName"
                                                   defaultValue={propertyCate.propertyCategoryName}
                                                   id="propertyCategoryName"
                                                   placeholder="Enter Property Category Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Status">Status</label>
                                            <select name="Status" id="Status" className="form-control">
                                                <option value="true">ACTIVE</option>
                                                <option value="false">INACTIVE</option>
                                            </select>
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

export default PropertyCategoryUpdate
