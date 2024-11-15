import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import Pagination from "../../../Shared/Admin/Utils/Pagination"

function ProjectList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getListProject = async (page) => {
        setLoading(true);
        await projectService.adminListProject(page)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setData(res.data.projects)
                    setTotalPages(res.data.totalPages);
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

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        getListProject(currentPage);
    }, [currentPage]);

    return (<>
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
                                <th scope="col">Investor</th>
                                <th scope="col">Tên dự án</th>
                                <th scope="col">designUnit</th>
                                <th scope="col">TotalArea</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => {
                                return (<tr>
                                    <td>
                                        <input type="checkbox" className="checkbox_item_"
                                               value={item.projectID}/>
                                    </td>
                                    <th>{index + 1}</th>
                                    <td>{item.investor}</td>
                                    <td>{item.projectName}</td>
                                    <td>{item.designUnit}</td>
                                    <td>{item.totalArea}</td>
                                    <td>{item.location}</td>
                                    <td>
                                        <span className="success_btn_ text-nowrap">{item.status}</span>
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
                                </tr>)
                            })}
                            </tbody>
                        </table>
                        <div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </section>
            </main>
    </>)
}

export default ProjectList
