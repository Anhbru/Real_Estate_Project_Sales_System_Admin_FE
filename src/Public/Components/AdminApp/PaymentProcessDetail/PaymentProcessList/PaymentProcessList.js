import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import paymentProcessDetailService from "../../../Service/PaymentProcessDetailService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Pagination from "../../../Shared/Admin/Utils/Pagination";
import AlertMessageError from "../../../../Utils/AlertMessageError";

function PaymentProcessList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {paymentProcessID} = useParams();

    const getList = async () => {
        setLoading(true);
        await paymentProcessDetailService
            .getList()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data);
                    // Sắp xếp theo paymentStage từ thấp đến cao
                    const sortedData = res.data.sort((a, b) => a.paymentStage - b.paymentStage);
                    setData(sortedData);
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
    
    const getIdItem = async () => {
        setLoading(true);
        await paymentProcessDetailService
            .adminGetByPaymentProcessId(paymentProcessID)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data1", res.data);
                    // Sắp xếp theo paymentStage từ thấp đến cao
                    const sortedData = res.data.sort((a, b) => a.paymentStage - b.paymentStage);
                    setData(sortedData);
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
    

    const handleDelete = async (event, id) => {
        if (!window.confirm('Are you want to delete?')){
            return;
        }

        event.preventDefault();

        await paymentProcessDetailService.adminDelete(id)
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

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        if (!paymentProcessID) {
            getList();
        }
    }, [currentPage]);

    useEffect(() => {
        if (paymentProcessID) {
            getIdItem();
        }
    }, [paymentProcessID]);
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
                        <input
                            type="text"
                            className="input_search"
                            placeholder="Search payment processes name"
                        />

                        <a
                            href={
                                paymentProcessID
                                    ? `/paymentprocessesdetail/create?paymentProcessID=${paymentProcessID}`
                                    : "/paymentprocessesdetail/create"
                            }
                            className="btn_go_"
                        >
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>

                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Payment Process Name</th>
                                <th scope="col">Payment Stage</th>
                                <th scope="col">Percentage</th>
                                <th scope="col">Duration Date</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => {
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
                                                            href={
                                                                "/paymentprocessesdetail/detail/" +
                                                                item.paymentProcessDetailID
                                                            }
                                                        >
                                                            Detail payment processes
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href={
                                                                paymentProcessID
                                                                    ? `/paymentprocessesdetail/update/` + item.paymentProcessDetailID + `?paymentProcessID=${paymentProcessID}`
                                                                    : "/paymentprocessesdetail/update/" + item.paymentProcessDetailID
                                                            }
                                                        >
                                                            Update payment processes
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <a onClick={event => handleDelete(event, item.paymentProcessDetailID)}
                                                           className="dropdown-item"
                                                           href="#">
                                                            Delete payment processes
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

export default PaymentProcessList;
