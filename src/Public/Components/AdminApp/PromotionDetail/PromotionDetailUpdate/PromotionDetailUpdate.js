import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import promotionDetailService from "../../../Service/PromotionDetailService";
import promotionService from "../../../Service/PromotionService";
import propertyTypeService from "../../../Service/PropertyTypeService";

function PromotionDetailUpdate() {
    const [promotions, setPromotions] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form] = Form.useForm();
    const [promotionDetail, setPromotionDetail] = useState([]);

    const getListProject = async () => {
        await promotionService
            .adminListPromotions()
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    setPromotions(res.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const getListPropertyType = async () => {
        await propertyTypeService
            .adminListProperty()
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    setPropertyTypes(res.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const createZone = async () => {
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

        await promotionDetailService.update(id, formData)
            .then((res) => {
                console.log("create promotion detail", res.data)
                message.success("chỉnh sửa promotion details thành công!")
                navigate("/promotiondetails/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
            })
    }

    const detailZone = async () => {
        await promotionDetailService.detail(id)
            .then((res) => {
                console.log("detail Zone", res.data);
                setPromotionDetail(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        getListPropertyType();
        getListProject();
        detailZone();
    }, [form, id, loading])

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/promotiondetails/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to list
                    </Link>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form
                            id="formCreate"
                            className="form_create_custom_"
                            onFinish={createZone}
                        >
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Amount">Amount</label>
                                            <input defaultValue={promotionDetail.amount}
                                                   type="text"
                                                   className="form-control"
                                                   name="Amount"
                                                   id="Amount"
                                                   placeholder="Enter your amount"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form_el mt-3">
                                    <div className="form-group">
                                        <label htmlFor="Description">Description</label>
                                        <textarea className="form-control" name="Description" id="Description"
                                                  defaultValue={promotionDetail.description} rows="6"></textarea>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="PropertyTypeID">Promotion</label>
                                            <select
                                                name="PropertyTypeID"
                                                id="PropertyTypeID"
                                                className="form-control"
                                            >
                                                {promotions.map((project) => {
                                                    return (
                                                        <option
                                                            key={project.promotionID}
                                                            value={project.promotionID}
                                                        >
                                                            {project.promotionName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="PromotionID">Property Type</label>
                                            <select
                                                name="PromotionID"
                                                id="PromotionID"
                                                className="form-control"
                                            >
                                                {propertyTypes.map((project) => {
                                                    return (
                                                        <option
                                                            key={project.propertyTypeID}
                                                            value={project.propertyTypeID}
                                                        >
                                                            {project.propertyTypeName}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">
                                    Back
                                </button>
                                <button id="btnCreate" className="btn_create" type="submit">
                                    Save
                                </button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PromotionDetailUpdate
