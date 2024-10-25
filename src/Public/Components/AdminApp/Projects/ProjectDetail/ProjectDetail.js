import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';

function ProjectDetail() {
    const [project, setProject] = useState([]);
    const [projectImages, setProjectImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [form] = Form.useForm();

    const detailProject = async () => {
        await projectService.adminDetailProject(id)
            .then((res) => {
                console.log("detail project", res.data);
                setProject(res.data);
                let proImages = res.data.images;
                setProjectImages(proImages);
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        detailProject();
    }, [form, id, loading])

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
                    <h1>{project?.projectName}</h1>
                </div>
                {/* End Page Title */}
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">
                                    General information
                                </p>
                                <a href={'/projects/update/' + project?.projectID} className="edit_tab_">Edit</a>
                            </div>

                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Project Name: </p>
                                        <p className="val_ text-truncate">{project?.projectName}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Location: </p>
                                        <p className="val_ text-truncate">{project?.location}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Investor: </p>
                                        <p className="val_ text-truncate">{project?.investor}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">GeneralContractor: </p>
                                        <p className="val_ text-truncate">{project?.generalContractor}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">DesignUnit: </p>
                                        <p className="val_ text-truncate">{project?.designUnit}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">TotalArea: </p>
                                        <p className="val_ text-truncate">{project?.totalArea}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Scale: </p>
                                        <p className="val_ text-truncate">{project?.scale}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">BuildingDensity: </p>
                                        <p className="val_ text-truncate">{project?.buildingDensity}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">TotalNumberOfApartment: </p>
                                        <p className="val_ text-truncate">{project?.totalNumberOfApartment}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">LegalStatus: </p>
                                        <p className="val_ text-truncate">{project?.legalStatus}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">HandOver: </p>
                                        <p className="val_ text-truncate">{project?.handOver}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Convenience: </p>
                                        <p className="val_ text-truncate">{project?.convenience}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Status: </p>
                                        <p className="val_ text-truncate">{project?.status}</p>
                                    </div>
                                </div>

                                <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                    Xem hình ảnh
                                </button>
                            </div>
                        </div>
                        <div className="table_data_area_">
                            <div className="header_table_">
                                <nav className="nav align-items-center justify-content-between">
                                    <a className="nav-link active" aria-current="page" href="#">History of implement</a>
                                    <a className="nav-link" href="#">Expected payment schedule</a>
                                    <a className="nav-link" href="#">Sales policy</a>
                                    <a className="nav-link" href="#">Promotion</a>
                                    <a className="nav-link" href="#">Document</a>
                                    <a className="nav-link" href="#">Staff</a>

                                    <button className="btn_add_new_" data-bs-toggle="modal"
                                            data-bs-target="#modalCustomer">
                                        ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                                    </button>
                                </nav>
                            </div>
                            <div className="table_content_">
                                <table className="table datatable">
                                    <colgroup>
                                        <col width="5%"/>
                                        <col width="12%"/>
                                        <col width="31%"/>
                                        <col width="10%"/>
                                        <col width="32%"/>
                                        <col width="10%"/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Ngày thao tác</th>
                                        <th scope="col">Nhân viên</th>
                                        <th scope="col">Đã duyệt</th>
                                        <th scope="col">Diễn giải</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>29/01/2023</td>
                                        <td>Nguyễn Tiến An</td>
                                        <td>
                                            <p className="success_btn_">Active</p>
                                        </td>
                                        <td>
                                            Thanh toán theo hình
                                            thức nhận tiền mặt
                                        </td>
                                        <td>
                                            <p className="nav-item dropdown">
                                                <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                   role="button" aria-expanded="false"><img
                                                    src="/assets/icon/more_icon.png"
                                                    alt=""/></a>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Edit</a></li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#">Create</a>
                                                    </li>
                                                </ul>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>2</th>
                                        <td>29/01/2023</td>
                                        <td>Nguyễn Tiến An</td>
                                        <td>
                                            <p className="danger_btn_">Inactive</p>
                                        </td>
                                        <td>
                                            Thanh toán theo hình
                                            thức nhận tiền mặt
                                        </td>
                                        <td>
                                            <p className="nav-item dropdown">
                                                <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                   role="button" aria-expanded="false"><img
                                                    src="/assets/icon/more_icon.png"
                                                    alt=""/></a>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Edit</a></li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#">Create</a>
                                                    </li>
                                                </ul>
                                            </p>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
                                    <Swiper
                                        slidesPerView={1}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Pagination]}
                                        className="mySwiper"
                                    >
                                        {projectImages.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <img src={img} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modalCustomer" tabIndex="-1" aria-labelledby="modalCustomerLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalCustomerLabel">Add New History of implement</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" id="group_customer"
                                   placeholder="Nhóm khách hàng" name="group_customer"/>
                            <input type="text" className="form-control mt-3" id="reason" placeholder="Diễn giải/Lý do"
                                   name="reason"/>
                        </div>
                        <div className="modal-footer d-flex justify-content-around align-items-center">
                            <button type="button" className="btn_back" data-bs-dismiss="modal">Back</button>
                            <button type="button" className="btn_create">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectDetail
