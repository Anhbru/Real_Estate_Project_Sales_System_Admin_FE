import React, { useEffect, useState } from 'react';
import openSaleService from '../../../Service/OpenSaleService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function OpenSaleList() {
    
    const [data, setData] = useState([]);
    
    const [loading, setLoading] = useState(false);
    
    const [error, setError] = useState(null);

    
    const getListOpenSales = async () => {
        setLoading(true);

        setError(null); 
        try {
            const res = await openSaleService.adminListOpenSales(); 
            console.log("Open Sales Response:", res.data); 
            if (res.status === 200) {
                setData(Array.isArray(res.data) ? res.data : []); 
            } else {
                setError("Failed to fetch open sales."); 
            }
        } catch (err) {
            setError("Error fetching open sales: " + err.message); 
            console.error("Error fetching open sales:", err); 
        } finally {
            setLoading(false); 
        }
    };

 
    const checkAll = () => {
        
        if ($('#checkAll').is(":checked")) {
            $('.checkbox_item_').prop('checked', true); 
        } else {
            $('.checkbox_item_').prop('checked', false); 
        }
    }

   
    useEffect(() => {
        getListOpenSales(); 
    }, []); 

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Open Sale List</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search open sales" />
                        <a href="/opensales/create" className="btn_go_">
                            ADD NEW <img src="/assets/icon/plus_icon.png" alt="" />
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
                                    <p>No open sales found.</p> 
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>
                                            <col width="5%" />
                                            <col width="5%" />
                                            <col width="10%" />
                                            <col width="10%" />
                                            <col width="10%" />
                                            <col width="10%" />
                                            <col width="10%" />
                                            <col width="10%" />
                                            <col width="10%" />
                                            <col width="10%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    <input type="checkbox" id="checkAll" onClick={checkAll} />
                                                </th>
                                                <th scope="col">STT</th>
                                                <th scope="col">Decision Name</th>
                                                <th scope="col">Start Date</th>
                                                <th scope="col">End Date</th>
                                                <th scope="col">Check-in Date</th>
                                                <th scope="col">Reservation Price</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Sale Type</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.projectID}>
                                                    <td>
                                                        <input type="checkbox" className="checkbox_item_" value={item.openingForSaleID} />
                                                    </td>
                                                    <th>{index + 1}</th>
                                                    <td>{item.decisionName}</td>
                                                    <td>{item.startDate}</td>
                                                    <td>{item.endDate}</td>
                                                    <td>{item.checkinDate}</td>
                                                    <td>{item.reservationPrice}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.saleType}</td>
                                                    <td>
                                                        <p className="nav-item dropdown">
                                                            <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                               role="button" aria-expanded="false">
                                                                <img src="/assets/icon/more_icon.png" alt="" />
                                                            </a>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href={'/opensales/detail/' + item.projectID}>Detail</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li><a className="dropdown-item" href={'/opensales/update/' + item.projectID}>Update</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li><a className="dropdown-item" href="/opensales/create">Create</a></li>
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

export default OpenSaleList;
