import React, {useEffect, useState} from 'react';
import unitTypeService from '../../../Service/UnitTypeService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Pagination from "../../../Shared/Admin/Utils/Pagination";
import AlertMessageError from "../../../../Utils/AlertMessageError";

function UnittypeList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getList = async (page) => {
        await unitTypeService.adminListUnit(page)
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

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleDelete = async (event, id) => {
        if (!window.confirm('Are you want to delete?')){
            return;
        }

        event.preventDefault();

        await unitTypeService.adminDeleteUnit(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                     let message = res.data.message ?? 'Delete successfully!';
                    alert(message);
                    getList();
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
    };

    useEffect(() => {
        getList(currentPage);
    }, [currentPage]);
    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Unit Type List</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search unittypes name"/>

                        <a href="/unittypes/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Property Type Name</th>
                                <th scope="col">Number Floor</th>
                                <th scope="col">Net Floor Area</th>
                                <th scope="col">Living Room</th>
                                <th scope="col">Kitchen Room</th>
                                <th scope="col">Gross Floor Area</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.propertyTypeName}</td>
                                            <td>{item.numberFloor}</td>
                                            <td>{item.netFloorArea}</td>
                                            <td>{item.livingRoom}</td>
                                            <td>{item.kitchenRoom}</td>
                                            <td>{item.grossFloorArea}</td>
                                            <td>{item.status ? 'Active' : 'Inactive'}</td>
                                            <td>
                                                <p className="nav-item dropdown">
                                                    <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                       role="button" aria-expanded="false"><img
                                                        src="/assets/icon/more_icon.png"
                                                        alt=""/></a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item"
                                                               href={'/unittypes/detail/' + item.unitTypeID}>Detail
                                                            unittypes</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><a className="dropdown-item"
                                                               href={'/unittypes/update/' + item.unitTypeID}>Update
                                                            unittypes</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item"
                                                               onClick={event => handleDelete(event, item.unitTypeID)}
                                                               href="#">
                                                                Delete Unit Types
                                                            </a>
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

export default UnittypeList
