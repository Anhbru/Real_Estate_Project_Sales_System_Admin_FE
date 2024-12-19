import React, { useEffect, useState } from 'react';
import openSaleService from '../../../Service/OpenForSaleService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function OpenForSaleList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm theo Decision Name

    const formatDateTime = (date) => {
        const d = new Date(date);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const hh = String(d.getHours()).padStart(2, '0');
        const min = String(d.getMinutes()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    };

    const getListOpenSales = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await openSaleService.adminListOpenSales();
            console.log("Open Sales Response:", res.data);
            if (res.status === 200) {
                const sortedData = res.data
                    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                setData(Array.isArray(sortedData) ? sortedData : []);
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

    const isCheckinAvailable = (checkinDate, saleType) => {
        if (saleType !== "Offline") return false;

        const now = new Date();
        const checkinStart = new Date(checkinDate);
        const checkinEnd = new Date(checkinDate);
        checkinEnd.setDate(checkinEnd.getDate() + 1);

        return now >= checkinStart && now <= checkinEnd;
    };

    const handleDelete = async (openingForSaleID) => {
        if (!window.confirm('Are you want to delete?')){
            return;
        }

        try {
            const res = await openSaleService.adminUpdateOpenSale(openingForSaleID, { status: false });
            if (res.status === 200) {
                setData(prevData =>
                    prevData.map(item =>
                        item.openingForSaleID === openingForSaleID
                            ? { ...item, status: false }
                            : item
                    )
                );
            } else {
                setError("Failed to update the sale status.");
            }
        } catch (err) {
            setError("Error updating sale status: " + err.message);
            console.error("Error updating sale status:", err);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.decisionName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        getListOpenSales();
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Open For Sale List</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input
                            type="text"
                            className="input_search"
                            placeholder="Search by Decision Name"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <a href="/openforsales/create" className="btn_go_">
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
                                {filteredData.length === 0 ? (
                                    <p>No open sales found.</p>
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>
                                            <col width="4%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="14%" />
                                            <col width="8%" />
                                            <col width="8%" />
                                            <col width="13%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Decision Name</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Start Date</th>
                                                <th scope="col">End Date</th>
                                                <th scope="col">Check-in Date</th>
                                                <th scope="col">Sale Type</th>
                                                <th scope="col">Reservation Price</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData.map((item, index) => (
                                                <tr key={item.openingForSaleID}>
                                                    <th>{index + 1}</th>
                                                    <td>{item.decisionName}</td>
                                                    <td>{item.description}</td>
                                                    <td>{formatDateTime(item.startDate)}</td>
                                                    <td>{formatDateTime(item.endDate)}</td>
                                                    <td>{formatDateTime(item.checkinDate)}</td>
                                                    <td>{item.saleType}</td>
                                                    <td>{item.reservationPrice}</td>
                                                    <td style={{ color: item.status ? 'green' : 'red' }}>
                                                        {item.status ? 'Active' : 'Inactive'}
                                                    </td>
                                                    <td>
                                                        <p className="nav-item dropdown">
                                                            <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                                role="button" aria-expanded="false">
                                                                <img src="/assets/icon/more_icon.png" alt="" />
                                                            </a>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href={'/openforsales/detail/' + item.openingForSaleID}>Detail</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li><a className="dropdown-item" href={'/openforsales/update/' + item.openingForSaleID}>Update</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li><a className="dropdown-item" href={'/openforsaledetails/list/' + item.openingForSaleID}>OpenForSaleDetail</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                {isCheckinAvailable(item.checkinDate, item.saleType) && (
                                                                    <>
                                                                        <li><a className="dropdown-item" href={'/staff/detailcheckin/' + item.openingForSaleID}>Check-in</a></li>
                                                                        <li><hr className="dropdown-divider" /></li>
                                                                    </>
                                                                )}
                                                                
                                                                <li><a className="dropdown-item" onClick={() => handleDelete(item.openingForSaleID)}>Delete</a></li>
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

export default OpenForSaleList;
