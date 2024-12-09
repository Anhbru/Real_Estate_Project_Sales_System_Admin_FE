import React, {useEffect, useState} from 'react';
import customerService from '../../../Service/CustomerService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function CustomerList() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getListCustomers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await customerService.adminListCustomer();
            console.log("Customers Response:", res.data);
            if (res.status === 200) {
                setData(Array.isArray(res.data) ? res.data : []);
            } else {
                setError("Failed to fetch customers.");
            }
        } catch (err) {
            setError("Error fetching customers: " + err.message);
            console.error("Error fetching customers:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (event, id) => {
        event.preventDefault();

        await customerService.adminDeleteCustomer(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                     let message = res.data.message ?? 'Delete successfully!';
                    alert(message);
                    getListCustomers();
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

    const checkAll = () => {
        if ($('#checkAll').is(":checked")) {
            $('.checkbox_item_').prop('checked', true);
        } else {
            $('.checkbox_item_').prop('checked', false);
        }
    };

    useEffect(() => {
        getListCustomers();
    }, []);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Customer List</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search customers"/>
                        <a href="/customers/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt=""/>
                        </a>
                    </div>

                    <div className="content_ table_list_">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : (
                            <>
                                {data.length === 0 ? (
                                    <p>No customers found.</p>
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>

                                            <col width="5%"/>
                                            <col width="15%"/>
                                            <col width="15%"/>
                                            <col width="15%"/>
                                            <col width="15%"/>
                                            <col width="20%"/>
                                            <col width="10%"/>
                                        </colgroup>
                                        <thead>
                                        <tr>

                                            <th scope="col">STT</th>
                                            <th scope="col">Full Name</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">ID Card</th>
                                            <th scope="col">Nationality</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.map((item, index) => (
                                            <tr key={item.customerID}>

                                                <th>{index + 1}</th>
                                                <td>{item.fullName}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.identityCardNumber}</td>
                                                <td>{item.nationality}</td>
                                                <td>{item.placeOfResidence}</td>
                                                <td style={{color: item.status ? 'green' : 'red'}}>
                                                    {item.status ? 'Active' : 'Inactive'}
                                                </td>
                                                <td>
                                                    <p className="nav-item dropdown">
                                                        <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                           role="button" aria-expanded="false">
                                                            <img src="/assets/icon/more_icon.png" alt=""/>
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item"
                                                                   href={'/customers/detail/' + item.customerID}>Detail</a>
                                                            </li>
                                                            <li>
                                                                <hr className="dropdown-divider"/>
                                                            </li>
                                                            <li><a className="dropdown-item"
                                                                   href={'/customers/update/' + item.customerID}>Update</a>
                                                            </li>
                                                            <li>
                                                                <hr className="dropdown-divider"/>
                                                            </li>
                                                            <li><a className="dropdown-item"
                                                                   onClick={event => handleDelete(event, item.customerID)}
                                                                   href="#">Delete</a>
                                                            </li>
                                                        </ul>
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default CustomerList;
