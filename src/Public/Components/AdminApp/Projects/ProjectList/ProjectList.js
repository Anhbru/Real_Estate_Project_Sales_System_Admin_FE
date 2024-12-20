import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Form, message} from "antd";
import projectService from "../../../Service/ProjectService";
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from "jquery";
import Pagination from "../../../Shared/Admin/Utils/Pagination";
import blockService from "../../../Service/BlockService";
import AlertMessageError from "../../../../Utils/AlertMessageError";

function ProjectList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); 

    const getListProject = async (page, query) => {
        setLoading(true);
        await projectService
            .adminListProject(page, query) // Truyền search query vào đây
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data.projects);
                    setTotalPages(res.data.totalPages);
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
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);  // Cập nhật giá trị tìm kiếm
        getListProject(currentPage, e.target.value);  // Gọi lại API với query mới
    };
    
    

    const checkAll = () => {
        if ($("#checkAll").is(":checked")) {
            $(".checkbox_item_").prop("checked", true);
        } else {
            $(".checkbox_item_").prop("checked", false);
        }
    };

    const handleDelete = async (event, id) => {
        event.preventDefault();

        await projectService.adminDeleteProject(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                     let message = res.data.message ?? 'Delete successfully!';
                    alert(message);
                    getListProject(currentPage);
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
                AlertMessageError(err);
            })
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        getListProject(currentPage, searchQuery);  // Truyền searchQuery vào mỗi lần render
    }, [currentPage, searchQuery]);  // Mỗi khi currentPage hoặc searchQuery thay đổi
    

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
                        <input
                            type="text"
                            className="input_search"
                            placeholder="Search project name"
                            onChange={handleSearch}
                        />

                        <a href="/projects/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <colgroup>
                                
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
                                
                                <th scope="col">STT</th>
                                <th scope="col">Project Name</th>
                                <th scope="col">Investor</th>
                                <th scope="col">Design Unit</th>
                                <th scope="col">Total Area</th>
                                <th scope="col">Address</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr>
                                        
                                        <th>{index + 1}</th>
                                        <td>{item.projectName}</td>
                                        <td>{item.investor}</td>
                                        <td>{item.designUnit}</td>
                                        <td>{item.totalArea}</td>
                                        <td>{item.location}</td>
                                        <td>
                                            <span className="success_btn_ text-nowrap">
                                              {item.status}
                                            </span>
                                        </td>
                                        <td>
                                            <p className="nav-item dropdown">
                                                <a
                                                    className="nav-link"
                                                    data-bs-toggle="dropdown"
                                                    href="#"
                                                    role="button"
                                                    aria-expanded="false"
                                                >
                                                    <img src="/assets/icon/more_icon.png" alt=""/>
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href={"/projects/detail/" + item.projectID}
                                                        >
                                                            Detail project
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href={"/projects/update/" + item.projectID}
                                                        >
                                                            Update project
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <a onClick={event => handleDelete(event, item.projectID)}
                                                           className="dropdown-item"
                                                           href="#">
                                                            Delete project
                                                        </a>
                                                    </li>
                                                </ul>
                                            </p>
                                        </td>
                                    </tr>
                                );
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
        </>
    );
}

export default ProjectList;
