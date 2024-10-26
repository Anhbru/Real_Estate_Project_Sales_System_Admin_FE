import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function ProjectList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getListProject = async () => {
        await projectService.adminListProject()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setData(res.data)
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

    const checkAll = () => {
        if ($('#checkAll').is(":checked")) {
            $('.checkbox_item_').prop('checked', true);
        } else {
            $('.checkbox_item_').prop('checked', false);
        }
    }

    useEffect(() => {
        getListProject();
    }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Project List</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search project name"/>

                        <a href="/projects/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <colgroup>
                                <col width="5%"/>
                                <col width="5%"/>
                                <col width="10%"/>
                                <col width="12%"/>
                                <col width="12%"/>
                                <col width="x"/>
                                <col width="12%"/>
                                <col width="10%"/>
                                <col width="8%"/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th scope="col">
                                    <input type="checkbox" id="checkAll" onClick={checkAll}/>
                                </th>
                                <th scope="col">STT</th>
                                <th scope="col">Ngày đăng</th>
                                <th scope="col">Tên dự án</th>
                                <th scope="col">Loại dự án</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Staff</th>
                                <th scope="col">Đã duyệt</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                <input type="checkbox" className="checkbox_item_"
                                                       value={item.projectID}/>
                                            </td>
                                            <th>{index + 1}</th>
                                            <td>{item.created_at ?? Date.now()}</td>
                                            <td>{item.projectName}</td>
                                            <td></td>
                                            <td>{item.location}</td>
                                            <td>{item.generalContractor}</td>
                                            <td>
                                                <span className="success_btn_">{item.status}</span>
                                            </td>
                                            <td>
                                                <p className="nav-item dropdown">
                                                    <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                       role="button" aria-expanded="false"><img
                                                        src="/assets/icon/more_icon.png" alt=""/></a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item"
                                                               href={'/projects/detail/' + item.projectID}>Detail
                                                            project</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><a className="dropdown-item"
                                                               href={'/projects/update/' + item.projectID}>Update
                                                            project</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><a className="dropdown-item" href="/projects/create">Create
                                                            project</a></li>
                                                    </ul>
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProjectList
