import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import paymentProcessDetailService from '../../../Service/PaymentProcessDetailService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import Pagination from "../../../Shared/Admin/Utils/Pagination";

function PaymentProcessList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getList = async () => {
        await paymentProcessDetailService.getList()
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

    useEffect(() => {
        getList();
    }, [currentPage]);
    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Payment Process Detail List</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search payment processes name"/>

                        <a href="/paymentprocessesdetail/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">PaymentProcessName</th>
                                <th scope="col">PaymentStage</th>
                                <th scope="col">Percentage</th>
                                <th scope="col">DurationDate</th>
                                <th scope="col">Amount</th>
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
                                            <td>{item.paymentStage}</td>
                                            <td>{item.percentage}</td>
                                            <td>{item.durationDate}</td>
                                            <td>{item.amount}</td>
                                            <td>
                                                <p className="nav-item dropdown">
                                                    <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                       role="button" aria-expanded="false"><img
                                                        src="/assets/icon/more_icon.png"
                                                        alt=""/></a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item"
                                                               href={'/paymentprocessesdetail/detail/' + item.paymentProcessDetailID}>Detail
                                                            payment processes</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><a className="dropdown-item"
                                                               href={'/paymentprocessesdetail/update/' + item.paymentProcessDetailID}>Update
                                                            payment processes</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><a className="dropdown-item"
                                                               href="/paymentprocessesdetail/create">Create
                                                            payment processes</a></li>
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
