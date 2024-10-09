import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function PropertyDetail() {

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/properties/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to property list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>A01.01</h1>
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
                                        <p className="key_">Property Name: </p>
                                        <p className="val_ text-truncate">A01.01</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Block: </p>
                                        <p className="val_ text-truncate">A</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Floor: </p>
                                        <p className="val_ text-truncate">1</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Size Area: </p>
                                        <p className="val_ text-truncate">130.84</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Bed Room: </p>
                                        <p className="val_ text-truncate">3 phòng</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Bath Room: </p>
                                        <p className="val_ text-truncate">2 phòng</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Living Room: </p>
                                        <p className="val_ text-truncate">1 phòng</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">View: </p>
                                        <p className="val_ text-truncate">View ngắm biển và mặt trời</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Initial Price: </p>
                                        <p className="val_ text-truncate">2000000000</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Discount: </p>
                                        <p className="val_ text-truncate">0</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Money Tax: </p>
                                        <p className="val_ text-truncate">10000000</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Maintenance Cost: </p>
                                        <p className="val_ text-truncate">2000000</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Total Price: </p>
                                        <p className="val_ text-truncate">2012000000</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Status: </p>
                                        <p className="val_ text-truncate">Đang mở bán</p>
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
                                    <thead>
                                    <tr>
                                        <th scope="col">Đợt</th>
                                        <th scope="col">Ngày thực hiện</th>
                                        <th scope="col">Tỉ lệ</th>
                                        <th scope="col">Kiểu TT</th>
                                        <th scope="col">Tương ứng</th>
                                        <th scope="col">Thế VAT</th>
                                        <th scope="col">Đã thu</th>
                                        <th scope="col">Còn lại</th>
                                        <th scope="col">Số ngày chậm</th>
                                        <th scope="col">Lãi suất</th>
                                        <th scope="col">Lãi nộp chậm</th>
                                        <th scope="col">Còn phải nộp</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>1</th>
                                        <td>29/01/2023</td>
                                        <td>10%</td>
                                        <td>Tiền mặt</td>
                                        <td>500.000.000 VND</td>
                                        <td>1%</td>
                                        <td>0</td>
                                        <td>500.000.000 VND</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>0</td>
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

export default PropertyDetail
