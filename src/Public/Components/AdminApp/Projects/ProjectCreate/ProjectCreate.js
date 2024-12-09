import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import { useState,useEffect } from 'react';
import paymentPolicyService from '../../../Service/PaymentPolicyService';
import BackButton from '../../../../Utils/BackButton';

function ProjectCreate() {
    const navigate = useNavigate();
    const [paymentPolicies, setPaymentPolicies] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListPaymentPolicy = async () => {
        await paymentPolicyService
            .adminListPaymentPolicy()
            .then((res) => {
                if (res.status === 200) {
                    setPaymentPolicies(res.data);
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


    const preUploadImage = () => {
        $('input#Images').click();
    }

    const getImage = () => {
        let src = $('input#Images').val();
        if (src) {
            let file_name = src.split('\\').pop();
            $('#content_image_').text(file_name);
        }
    }

    const onFinish = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        // let filedata = document.getElementById("ImagesProperty");
        // let i = 0, len = filedata.files.length, img, reader, file;
        //
        // if (len > 0) {
        //     for (i; i < len; i++) {
        //         file = filedata.files[i];
        //         formData.append('Images[]', file);
        //     }
        // }

        await projectService.adminCreateProject(formData)
            .then((res) => {
                console.log("create project", res.data)
                message.success("Tạo thành công!")
                navigate("/projects/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
            })
    };
        useEffect(() => {
            getListPaymentPolicy();
        }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/projects/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to project list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Project</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={onFinish}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ProjectName">Project Name</label>
                                            <input type="text" className="form-control" name="ProjectName"
                                                   id="ProjectName"
                                                   placeholder="Enter your Project Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Location">Location</label>
                                            <input type="text" className="form-control" name="Location"
                                                   id="Location"
                                                   placeholder="Enter your Location"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Investor">Investor</label>
                                            <input type="text" className="form-control" name="Investor"
                                                   id="Investor"
                                                   placeholder="Enter your Investor"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="GeneralContractor">General Contractor</label>
                                            <input type="text" className="form-control" name="GeneralContractor"
                                                   id="GeneralContractor"
                                                   placeholder="Enter your General Contractor"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="DesignUnit">Design Unit</label>
                                            <input type="text" className="form-control" name="DesignUnit" id="DesignUnit"
                                                   placeholder="Enter your DesignUnit"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="TotalArea">Total Area</label>
                                            <input type="text" className="form-control" name="TotalArea" id="TotalArea"
                                                   placeholder="Enter your TotalArea"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Scale">Scale</label>
                                            <input type="text" className="form-control" name="Scale" id="Scale"
                                                   placeholder="Enter your Scale"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BuildingDensity">Building Density</label>
                                            <input type="text" className="form-control" name="BuildingDensity"
                                                   id="BuildingDensity"
                                                   placeholder="Enter your Building Density"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="TotalNumberOfApartment">Total Number Of Apartment</label>
                                            <input type="text" className="form-control" name="TotalNumberOfApartment"
                                                   id="TotalNumberOfApartment"
                                                   placeholder="Enter your TotalNumberOfApartment"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="LegalStatus">Legal Status</label>
                                            <input type="text" className="form-control" name="LegalStatus"
                                                   id="LegalStatus"
                                                   placeholder="Enter your LegalStatus"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="HandOver">Hand Over</label>
                                            <input type="text" className="form-control" name="HandOver"
                                                   id="HandOver"
                                                   placeholder="Enter your HandOver"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Convenience">Convenience</label>
                                            <input type="text" className="form-control" name="Convenience"
                                                   id="Convenience"
                                                   placeholder="Enter your Convenience"/>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="d-flex justify-content-between align-items-center form_el mt-3">*/}
                                {/*    <div className="col-md-5">*/}
                                {/*        <div className="form-group">*/}
                                {/*            <label htmlFor="code">Code</label>*/}
                                {/*            <input type="text" className="form-control" name="code" id="code"*/}
                                {/*                   placeholder="Enter your Code"/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="col-md-5">*/}
                                {/*        <div className="form-group">*/}
                                {/*            <label htmlFor="summary">Summary</label>*/}
                                {/*            <input type="text" className="form-control" name="summary" id="summary"*/}
                                {/*                   placeholder="Enter your Summary"/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Images">Image: <button className="btn_upload_"
                                                                                  onClick={preUploadImage}
                                                                                  type="button">Choose Image</button>
                                                <span id="content_image_">No Image Chosen</span>
                                            </label>
                                            <input type="file" onChange={getImage} className="d-none" name="Images"
                                                   id="Images" multiple
                                                   placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="PaymentPolicyID">Payment Policy</label>
                                            <select
                                                name="PaymentPolicyID"
                                                id="PaymentPolicyID"
                                                className="form-control"
                                            >
                                                {paymentPolicies.map((paymentPolicy) => {
                                                    return (
                                                        <option
                                                            key={paymentPolicy.paymentPolicyID}
                                                            value={paymentPolicy.paymentPolicyID}
                                                        >
                                                            { paymentPolicy.paymentPolicyName  } 
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="footer_form_">
                                   <BackButton />
                                <button className="btn_create" id="btnCreate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProjectCreate
