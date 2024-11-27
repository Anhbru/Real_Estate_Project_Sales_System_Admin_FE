import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, message} from "antd";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from "jquery";
import promotionDetailService from "../../../Service/PromotionDetailService";
import propertyTypeService from "../../../Service/PropertyTypeService";
import promotionService from "../../../Service/PromotionService";

function PromotionDetailCreate() {
    const [promotions, setPromotions] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
        $("#btnCreate").prop("disabled", true).text("Đang tạo mới...");

        let inputs = $(
            "#formCreate input, #formCreate textarea, #formCreate select"
        );
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + " không được bỏ trống!");
                $("#btnCreate").prop("disabled", false).text("Tạo mới");
                return;
            }
        }

        const formData = new FormData($("#formCreate")[0]);

        await promotionDetailService
            .create(formData)
            .then((res) => {
                console.log("create promotion detail", res.data);
                message.success("Tạo promotion detail thành công!");
                navigate("/promotiondetails/list");
            })
            .catch((err) => {
                console.log(err);
                $("#btnCreate").prop("disabled", false).text("Tạo mới");
            });
    };

    useEffect(() => {
        getListPropertyType();
        getListProject();
    }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/promotiondetails/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to list
                        list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Promotion Detail</h1>
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
                                            <label htmlFor="amount">Amount</label>
                                            <input min="1"
                                                   type="number"
                                                   className="form-control"
                                                   name="amount"
                                                   id="amount"
                                                   placeholder="Enter your amount"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form_el mt-3">
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" name="description" id="description"
                                                  rows="6"></textarea>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="promotionID">Promotion</label>
                                            <select
                                                name="promotionID"
                                                id="promotionID"
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
                                            <label htmlFor="propertyTypeID">Property Type</label>
                                            <select
                                                name="propertyTypeID"
                                                id="propertyTypeID"
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
    );
}

export default PromotionDetailCreate;
