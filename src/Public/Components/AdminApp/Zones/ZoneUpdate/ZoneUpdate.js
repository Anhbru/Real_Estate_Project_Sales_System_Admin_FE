import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import projectService from "../../../Service/ProjectService";
import zoneService from "../../../Service/ZoneService";
import BackButton from '../../../../Utils/BackButton';
import AlertMessageError from "../../../../Utils/AlertMessageError";

function ZoneUpdate() {
    const [zone, setZone] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form] = Form.useForm();
    const [projects, setProjects] = useState([]);
    const [fileName, setFileName] = useState("default_image_name.jpg");

    const getListProject = async () => {
        await projectService.adminListProject(1)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setProjects(res.data.projects)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })

    }

    const preUploadImage = (evt, imgInp) => {
        const imagePreview = document.getElementById('imagePreview')
        const [file] = imgInp.files
        if (file) {
            imagePreview.src = URL.createObjectURL(file)
            setFileName(file.name);
        }
    }

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

        await zoneService.adminUpdateZone(id, formData)
            .then((res) => {
                console.log("create zone", res.data)
                message.success("chỉnh sửa zones thành công!")
                navigate("/zones/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
                AlertMessageError(err);
            })
    }

    const detailZone = async () => {
        await zoneService.adminDetailZone(id)
            .then((res) => {
                console.log("detail Zone", res.data);
                setZone(res.data)
                setLoading(false)
                const lastPath = res.data.imageZone.split('/').pop();
                setFileName(lastPath)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        getListProject();
        detailZone();
    }, [form, id, loading])

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/zones/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to list
                    </Link>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createZone}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ZoneName">Zone Name</label>
                                            <input type="text" className="form-control" name="ZoneName"
                                                   id="ZoneName" defaultValue={zone.zoneName}
                                                   placeholder="Enter your Zone Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ImageZone">Image Zone</label>
                                            <label className="form-control" htmlFor="ImageZone">{fileName}</label>
                                            <input type="file" className="form-control" name="ImageZone"
                                                   onChange={event => preUploadImage(event, event.target)}
                                                   style={{display: 'none'}}
                                                   id="ImageZone" placeholder="Enter yourImageZone"/>
                                            <div className="col-md-3">
                                                <button type="button" className="btn btn-primary mt-3"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal">
                                                    Xem hình ảnh
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ProjectID">Project Name</label>
                                            <select name="ProjectID" id="ProjectID" className="form-control">
                                                {
                                                    projects.map((project) => {
                                                        return (
                                                            <option key={project.projectID}
                                                                    value={project.projectID}>
                                                                {project.projectName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
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
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Hình ảnh</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                            <div className="row">
                                    <img src={zone.imageZone} alt="" id="imagePreview"
                                         style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ZoneUpdate
