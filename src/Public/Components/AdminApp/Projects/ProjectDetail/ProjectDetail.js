import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function ProjectDetail() {

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
                    <h1>Hancorp Plaza</h1>
                </div>
                {/* End Page Title */}
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">
                                    General information
                                </p>
                                <a href="/projects/update/1" className="edit_tab_">Edit</a>
                            </div>

                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Project Name: </p>
                                        <p className="val_ text-truncate">Hancorp Plaza</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Commerical Name: </p>
                                        <p className="val_ text-truncate">Khu phức hợp Hancorp Plaza</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Short Name: </p>
                                        <p className="val_ text-truncate">Plaza</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Type Of Project: </p>
                                        <p className="val_ text-truncate">Văn phòng và chung cư nhà ở</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Address: </p>
                                        <p className="val_ text-truncate">Đường Trần Đăng Ninh.</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Commune: </p>
                                        <p className="val_ text-truncate">Phường Dịch Vọng</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">District: </p>
                                        <p className="val_ text-truncate">Quận Cầu Giấy</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Deposit Price: </p>
                                        <p className="val_ text-truncate">1000000 VNĐ</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">License No: </p>
                                        <p className="val_ text-truncate">Hancorp Plaza</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Date Of Issue: </p>
                                        <p className="val_ text-truncate">2023-07-01</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Campus Area: </p>
                                        <p className="val_ text-truncate">Khuôn viên 5000 m2</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Place of Issue: </p>
                                        <p className="val_ text-truncate">2023-07-01</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Code: </p>
                                        <p className="val_ text-truncate">DA-0001</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Summary: </p>
                                        <p className="val_ text-truncate">là tổ hợp nhà ở</p>
                                    </div>
                                </div>
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
