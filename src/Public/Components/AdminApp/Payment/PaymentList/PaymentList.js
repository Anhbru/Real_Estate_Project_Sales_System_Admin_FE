import React, {useEffect, useState} from 'react';
import paymentService from '../../../Service/PaymentService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Pagination from "../../../Shared/Admin/Utils/Pagination";

function PaymentList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getList = async () => {
        await paymentService.adminList('')
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
    
    const handleDelete = async (event, id) => {
        if (!window.confirm('Are you want to delete?')){
            return;
        }

        event.preventDefault();

        await paymentService.adminDelete(id)
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
            })
    };

    useEffect(() => {
        getList();
    }, [loading]);
    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Payment List</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search payments name"/>

                        <a href="/payments/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        <table className="table datatable">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Amount</th>
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
                                            <td>{item.amount}</td>
                                            <td>{item.status ? 'Active' : 'Inactive'}</td>
                                            <td>
                                                <p className="nav-item dropdown">
                                                    <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                       role="button" aria-expanded="false"><img
                                                        src="/assets/icon/more_icon.png"
                                                        alt=""/></a>
                                                    <ul className="dropdown-menu">
                                                        <li><a className="dropdown-item"
                                                               href={'/payments/detail/' + item.paymentID}>Detail
                                                            payments</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li><a className="dropdown-item"
                                                               href={'/payments/update/' + item.paymentID}>Update
                                                            payments</a></li>
                                                        <li>
                                                            <hr className="dropdown-divider"/>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item"
                                                               onClick={event => handleDelete(event, item.paymentID)}
                                                               href="#">Delete payments</a></li>
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

export default PaymentList
