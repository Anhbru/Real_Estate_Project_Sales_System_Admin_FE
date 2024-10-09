import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function ProjectUpdate() {

    const preUploadImage = () => {
        $('input#image').click();
    }

    const getImage = () => {
        let src = $('input#image').val();
        if (src) {
            let file_name = src.split('\\').pop();
            $('#content_image_').text(file_name);
        }
    }

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
                    <h1>Update Project</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_">
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="project_name">Project Name</label>
                                            <input type="text" className="form-control" name="project_name"
                                                   id="project_name"
                                                   placeholder="Enter your Project Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="commerical_name">Commerical Name</label>
                                            <input type="text" className="form-control" name="commerical_name"
                                                   id="commerical_name"
                                                   placeholder="Enter your Commerical Name"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="short_name">Short Name</label>
                                            <input type="text" className="form-control" name="short_name"
                                                   id="short_name"
                                                   placeholder="Enter your Short Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="type_of_project">Type Of Project</label>
                                            <input type="text" className="form-control" name="type_of_project"
                                                   id="type_of_project"
                                                   placeholder="Enter your Type Of Project"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input type="text" className="form-control" name="address" id="address"
                                                   placeholder="Enter your Address"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="commune">Commune</label>
                                            <input type="text" className="form-control" name="commune" id="commune"
                                                   placeholder="Enter your Commune"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="district">District</label>
                                            <input type="text" className="form-control" name="district" id="district"
                                                   placeholder="Enter your District"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="deposit_price">Deposit Price</label>
                                            <input type="text" className="form-control" name="deposit_price"
                                                   id="deposit_price"
                                                   placeholder="Enter your Deposit Price"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="license_no">License No</label>
                                            <input type="text" className="form-control" name="license_no"
                                                   id="license_no"
                                                   placeholder="Enter your License No"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="date_of_issue">Date Of Issue</label>
                                            <input type="text" className="form-control" name="date_of_issue"
                                                   id="date_of_issue"
                                                   placeholder="Enter your Date Of Issue"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="campus_area">Campus Area</label>
                                            <input type="text" className="form-control" name="campus_area"
                                                   id="campus_area"
                                                   placeholder="Enter your Campus Area"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="place_of_issue">Place of Issue</label>
                                            <input type="text" className="form-control" name="place_of_issue"
                                                   id="place_of_issue"
                                                   placeholder="Enter your Date Of Issue"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="code">Code</label>
                                            <input type="text" className="form-control" name="code" id="code"
                                                   placeholder="Enter your Code"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="summary">Summary</label>
                                            <input type="text" className="form-control" name="summary" id="summary"
                                                   placeholder="Enter your Summary"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="image">Image: <button className="btn_upload_"
                                                                                  onClick={preUploadImage}
                                                                                  type="button">Choose Image</button>
                                                <span id="content_image_">No Image Chosen</span>
                                            </label>
                                            <input type="file" onChange={getImage} className="d-none" name="image"
                                                   id="image"
                                                   placeholder=""/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <input type="text" className="form-control" name="status" id="status"
                                                   placeholder="Enter your Stauts"/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button className="btn_create" type="button">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProjectUpdate
