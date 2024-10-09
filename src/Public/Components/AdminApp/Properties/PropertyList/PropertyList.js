import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function PropertyList() {

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Property List</h1>

                    <div className="form-group d-flex gap-3 w-25 mt-3 align-items-center">
                        <label htmlFor="project_">Project: </label>
                        <select className="form-select" name="project_" id="project_">
                            <option value="1">---Select Project---</option>
                            <option value="2">Hancorp Plaza</option>
                            <option value="3">Hancorp Plaza 2</option>
                        </select>
                    </div>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search property name"/>

                        <a href="/properties/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <colgroup>
                                <col width="50px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                                <col width="100px"/>
                            </colgroup>

                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Dự án</th>
                                <th scope="col">Mã căn hộ</th>
                                <th scope="col">Loại căn hộ</th>
                                <th scope="col">Image</th>
                                <th scope="col">Khu/Block</th>
                                <th scope="col">Tầng</th>
                                <th scope="col">Phòng ngủ</th>
                                <th scope="col">Phòng tắm</th>
                                <th scope="col">Thuế VAT</th>
                                <th scope="col">Phí bảo trì</th>
                                <th scope="col">Tổng giá trị</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hợp đồng có hiệu lực</th>
                                <th scope="col">Chính sách</th>
                                <th scope="col">Khách hàng</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>1</th>
                                <td>Hancorp Plaza</td>
                                <td>A000</td>
                                <td>Căn hộ chung cư</td>
                                <td>File</td>
                                <td>A</td>
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>99.000.000VND</td>
                                <td>19.000.000VND</td>
                                <td>1.990.000.000VND</td>
                                <td>Mở bán</td>
                                <td>
                                    <span className="success_btn_">Active</span>
                                </td>
                                <td>CBS-2022-01</td>
                                <td>Nguyen Hai An</td>
                                <td>
                                    <p className="nav-item dropdown">
                                        <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                           role="button" aria-expanded="false"><img src="/assets/icon/more_icon.png"
                                                                                    alt=""/></a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="/properties/detail/1">Detail
                                                property</a></li>
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            <li><a className="dropdown-item" href="/properties/update/1">Update
                                                property</a></li>
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            <li><a className="dropdown-item" href="/properties/create/1">Create
                                                property</a></li>
                                        </ul>
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PropertyList
