import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import paymentProcessService from '../../../Service/PaymentProcessService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import Pagination from "../../../Shared/Admin/Utils/Pagination";
import openSaleService from "../../../Service/OpenForSaleService";
import AlertMessageError from "../../../../Utils/AlertMessageError";

function PaymentProcessList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getList = async () => {
        await paymentProcessService.getList()
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

        await paymentProcessService.adminDelete(id)
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
                setLoading(false)
                console.log(err)
                AlertMessageError(err);
            })
    };

    useEffect(() => {
        getList();
    }, [currentPage]);
    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>PaymentProcess List</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search payment processes name"/>

                        <a href="/paymentprocesses/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Payment Process Name</th>
                                <th scope="col">Sales Policy Type</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.paymentProcessName}</td>
                                            <td>{item.salesPolicyType}</td>
                                            <td>
                                                <p className="nav-item dropdown">
                                                    <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                       role="button" aria-expanded="false"><img
                                                        src="/assets/icon/more_icon.png"
                                                        alt=""/></a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item"
                                                               href={'/paymentprocesses/detail/' + item.paymentProcessID}>Detail
                                                        </a></li>
                                                        <li><a className="dropdown-item"
                                                               href={'/paymentprocessesdetail/list/' + item.paymentProcessID}> Payment
                                                            Process Detail
                                                        </a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><a className="dropdown-item"
                                                               href={'/paymentprocesses/update/' + item.paymentProcessID}>Update
                                                        </a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item"
                                                               onClick={(event) => handleDelete(event, item.paymentProcessID)}
                                                               href="#">
                                                                Delete
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

export default PaymentProcessList
