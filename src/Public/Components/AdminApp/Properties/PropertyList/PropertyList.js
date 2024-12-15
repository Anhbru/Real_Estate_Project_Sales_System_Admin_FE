import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import propertyService from '../../../Service/PropertyService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import projectService from "../../../Service/ProjectService";
import Pagination from "../../../Shared/Admin/Utils/Pagination";
import AlertMessageError from "../../../../Utils/AlertMessageError";

function PropertyList() {
    const [data, setData] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getListProject = async (page) => {
        await projectService.adminListProject(page)
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

    async function deleteProperty(id) {
        if (window.confirm('Are you sure you want to delete this property?')) {
            await handleDeleteProperty(id)
        }
    }

    const handleDeleteProperty = async (id) => {
        await propertyService.adminDeleteProperty(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    alert('Delete property successfully!')
                    getListProperty(currentPage);
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
            .catch((err) => {
                AlertMessageError(err);
                setLoading(false)
                console.log(err)
            })

    }

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getListProperty = async (page) => {
        setLoading(true)
        await propertyService.adminListProperty(page)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setData(res.data.propertys)
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

    useEffect(() => {
        getListProperty(currentPage);
        getListProject(1);
    }, [currentPage]);
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
                            <option value="">---Select Project---</option>
                            {
                                projects.map((project) => {
                                    return (
                                        <option selected={project.projectID === project}
                                                value={project.projectID}>{project.projectName}</option>
                                    )
                                })
                            }
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
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã căn hộ</th>
                                 <th scope="col">Zone</th>
                                <th scope="col">Khu/Block</th>
                                <th scope="col">Tầng</th>
                                <th scope="col">Phòng ngủ</th>
                                <th scope="col">Phòng tắm</th>
                                <th scope="col">Phí bảo trì</th>
                                <th scope="col">Tổng giá trị</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.propertyCode}</td>
                                             <td>{item.zoneName}</td>
                                            <td>{item.blockName}</td>
                                            <td>{item.numberFloor}</td>
                                            <td>{item.bedRoom}</td>
                                            <td>{item.bathRoom}</td>
                                            <td>{item.priceSold}</td>
                                            <td>{item.netFloorArea}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <p className="nav-item dropdown">
                                                    <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                       role="button" aria-expanded="false"><img
                                                        src="/assets/icon/more_icon.png"
                                                        alt=""/></a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item"
                                                               href={'/properties/detail/' + item.propertyID}>Detail
                                                            property</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><a className="dropdown-item"
                                                               href={'/properties/update/' + item.propertyID}>Update
                                                            property</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li>
                                                            <p className="dropdown-item " style={{ cursor: 'pointer' }}
                                                               onClick={() => deleteProperty(item.propertyID)}>
                                                                Delete property
                                                            </p>
                                                        </li>
                                                    </ul>
                                                </p>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
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
    )
}

export default PropertyList
