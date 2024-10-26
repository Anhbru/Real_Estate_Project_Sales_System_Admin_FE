import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function ProjectUpdate() {
    const [project, setProject] = useState([]);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form] = Form.useForm();

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

    const detailProject = async () => {
        await projectService.adminDetailProject(id)
            .then((res) => {
                console.log("detail project", res.data);
                setProject(res.data)
                setImages(res.data.images)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    const updateProject = async () => {
        $('#btnUpdate').prop('disabled', true).text('Đang lưu...');

        let inputs = $('#formUpdate input, #formUpdate textarea, #formUpdate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('type') !== 'file') {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnUpdate').prop('disabled', false).text('Lưu thay đổi');
                return
            }
        }

        const formData = new FormData($('#formUpdate')[0]);

        await projectService.adminUpdateProject(id, formData)
            .then((res) => {
                message.success("Thay đổi thành công")
                navigate("/projects/list")
            })
            .catch((err) => {
                console.log(err)
                message.error(err.response.data.message)
                $('#btnUpdate').prop('disabled', false).text('Lưu thay đổi');
            })
    };

    useEffect(() => {
        detailProject();
    }, [loading, form, id]);

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
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updateProject}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ProjectName">Project Name</label>
                                            <input type="text" className="form-control" name="ProjectName"
                                                   id="ProjectName" defaultValue={project?.projectName}
                                                   placeholder="Enter your Project Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Location">Location</label>
                                            <input type="text" className="form-control" name="Location"
                                                   id="Location" defaultValue={project?.location}
                                                   placeholder="Enter your Location"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Investor">Investor</label>
                                            <input type="text" className="form-control" name="Investor"
                                                   id="Investor" defaultValue={project?.investor}
                                                   placeholder="Enter your Investor"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="GeneralContractor">GeneralContractor</label>
                                            <input type="text" className="form-control" name="GeneralContractor"
                                                   id="GeneralContractor" defaultValue={project?.generalContractor}
                                                   placeholder="Enter your General Contractor"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="DesignUnit">DesignUnit</label>
                                            <input type="text" className="form-control" name="DesignUnit"
                                                   id="DesignUnit" defaultValue={project?.designUnit}
                                                   placeholder="Enter your DesignUnit"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="TotalArea">TotalArea</label>
                                            <input type="text" className="form-control" name="TotalArea" id="TotalArea"
                                                   defaultValue={project?.totalArea}
                                                   placeholder="Enter your TotalArea"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Scale">Scale</label>
                                            <input type="text" className="form-control" name="Scale" id="Scale"
                                                   defaultValue={project?.scale}
                                                   placeholder="Enter your Scale"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BuildingDensity">BuildingDensity</label>
                                            <input type="text" className="form-control" name="BuildingDensity"
                                                   id="BuildingDensity" defaultValue={project?.buildingDensity}
                                                   placeholder="Enter your Building Density"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="TotalNumberOfApartment">TotalNumberOfApartment</label>
                                            <input type="text" className="form-control" name="TotalNumberOfApartment"
                                                   id="TotalNumberOfApartment"
                                                   defaultValue={project?.totalNumberOfApartment}
                                                   placeholder="Enter your TotalNumberOfApartment"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="LegalStatus">LegalStatus</label>
                                            <input type="text" className="form-control" name="LegalStatus"
                                                   id="LegalStatus" defaultValue={project?.legalStatus}
                                                   placeholder="Enter your LegalStatus"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="HandOver">HandOver</label>
                                            <input type="text" className="form-control" name="HandOver"
                                                   id="HandOver" defaultValue={project?.handOver}
                                                   placeholder="Enter your HandOver"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Convenience">Convenience</label>
                                            <input type="text" className="form-control" name="Convenience"
                                                   id="Convenience" defaultValue={project?.convenience}
                                                   placeholder="Enter your Convenience"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-start form_el mt-3">
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

                                            <div className="d-flex gap-2 mt-2 flex-wrap">
                                                {
                                                    images?.map((image, index) => {
                                                        return (
                                                            <div className="image_item" key={index}>
                                                                <img style={{ width: '200px', height: '150px'}} src={image} alt=""/>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <input type="text" className="form-control" name="status" id="status"
                                                   defaultValue={project?.status}
                                                   placeholder="Enter your Stauts"/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button className="btn_create" id="btnUpdate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProjectUpdate
