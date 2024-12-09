import React, { useEffect, useState } from 'react';
import openSaleDetailsService from '../../../Service/OpenForSaleDetailsService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import { useParams, useNavigate } from 'react-router-dom';

function OpenForSaleDetailAllList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { openingForSaleID } = useParams();
    const navigate = useNavigate(); // Added to enable navigation for page refresh

    const getListOpenSaleDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await openSaleDetailsService.adminListOpenSaleDetails();
            console.log("Open Sale Details Response:", res.data);
            if (res.status === 200) {
                setData(Array.isArray(res.data) ? res.data : []);
            } else {
                setError("Failed to fetch open sale details.");
            }
        } catch (err) {
            setError("Error fetching open sale details: " + err.message);
            console.error("Error fetching open sale details:", err);
        } finally {
            setLoading(false);
        }
    };

    const getListOpenForSaleDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            if (!openingForSaleID) {
                setError("No open-for-sale ID provided.");
                setLoading(false);
                return;
            }

            let res = await openSaleDetailsService.getOpenForSaleDetailsByOpenForSaleID(openingForSaleID);

            if (res.status === 200) {
                const filteredData = res.data.filter(item =>
                    item.openingForSaleName.toLowerCase().includes(searchTerm.toLowerCase())
                );

                const sortedData = filteredData.sort((a, b) =>
                    a.openingForSaleName.localeCompare(b.openingForSaleID)
                );

                setData(Array.isArray(sortedData) ? sortedData : []);
            } else {
                setError("Failed to fetch open-for-sale details.");
            }
        } catch (err) {
            setError("Error fetching open-for-sale details: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOpenSaleDetail = async (propertyID, openingForSaleID) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }
        try {
            const res = await openSaleDetailsService.adminDeleteOpenSaleDetail(propertyID, openingForSaleID);
            if (res.status === 200 || res.status === 204) {
                setSuccessMessage("Successfully deleted the open-for-sale detail!");
                // Force page reload to refresh the list
                window.location.reload(); // This will refresh the page after deletion
            } else {
                setErrorMessage("Failed to delete the open-for-sale detail.");
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setErrorMessage("The detail does not exist or has already been deleted.");
            } else {
                setErrorMessage("Error deleting the open-for-sale detail: " + err.message);
            }
        }
    };

    useEffect(() => {
        getListOpenSaleDetails();
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Open For Sale Detail All List</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search open sales details" />
                        <a href="/openforsaledetails/create" className="btn_go_">
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
                                    <p>No open sale details found.</p>
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>
                                            <col width="15%" />
                                            <col width="20%" />
                                            <col width="20%" />
                                            <col width="15%" />
                                            <col width="20%" />
                                            <col width="10%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">Opening For Sale ID</th>
                                                <th scope="col">Opening For Sale Name</th>
                                                <th scope="col">Property Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Note</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.openingForSaleID}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.openingForSaleName}</td>
                                                    <td>{item.propertyName}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.note}</td>
                                                    <td>
                                                        <p className="nav-item dropdown">
                                                            <a className="nav-link" data-bs-toggle="dropdown" href="#"
                                                                role="button" aria-expanded="false">
                                                                <img src="/assets/icon/more_icon.png" alt="" />
                                                            </a>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href={`/openforsaledetails/update/${item.propertyID}/${item.openingForSaleID}`}>Update</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li><a className="dropdown-item" href="/openforsaledetails/create">Create</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li><a
                                                                    className="dropdown-item"
                                                                    onClick={() => handleDeleteOpenSaleDetail(item.propertyID, item.openingForSaleID)}
                                                                >
                                                                    Delete
                                                                    </a></li>
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

export default OpenForSaleDetailAllList;
