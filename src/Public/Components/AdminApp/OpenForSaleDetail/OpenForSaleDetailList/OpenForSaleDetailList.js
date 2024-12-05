import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import openSaleDetailsService from '../../../Service/OpenForSaleDetailsService';
import openSaleService from '../../../Service/OpenForSaleService';
import propertyService from '../../../Service/PropertyService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";


function OpenForSaleDetailList() {
    const { openingForSaleID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [newSaleDetail, setNewSaleDetail] = useState({
        openingForSaleID: openingForSaleID,
        propertyID: '',
        price: '',
        note: ''
    });
    const [projectCategoryDetailID, setProjectCategoryID] = useState('');
    const [properties, setProperties] = useState([]);

    const fetchOpenForSaleDetails = async (id) => {
        try {
            const res = await openSaleService.adminDetailOpenSale(id);
            if (res.status === 200) {
                setNewSaleDetail(prev => ({
                    ...prev,
                    openingForSaleName: res.data.openingForSaleName,
                }));
                setProjectCategoryID(res.data.projectCategoryDetailID);
            } else {
                setError("Failed to fetch open-for-sale info.");
            }
        } catch (err) {
            setError("Error fetching open-for-sale info: " + err.message);
        }
    };

    useEffect(() => {
        if (projectCategoryDetailID) {
            getPropertiesByCategory(projectCategoryDetailID);
        }
    }, [projectCategoryDetailID]);

    const getPropertiesByCategory = async (categoryDetailID) => {
        try {
            const res = await propertyService.getPropertyNotForSaleByCategory(categoryDetailID);
            if (res.status === 200) {
                setProperties(res.data);
            } else {
                setError('Failed to fetch properties: No properties found for this category.');
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('No properties found for this category.');
            } else {
                setError('Error fetching properties: ' + err.message);
            }
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

    const handleCreateNewSaleDetail = async () => {
        try {
            const res = await openSaleDetailsService.adminCreateOpenSaleDetail(newSaleDetail);
            if (res.status === 200 || res.status === 201) {
                setSuccessMessage("Successfully created a new open-for-sale detail!");
                setShowPopup(false);
                getListOpenForSaleDetails();
            } else {
                setErrorMessage("Failed to create a new open-for-sale detail.");
            }
        } catch (err) {
            setErrorMessage("Error creating new open-for-sale detail: " + err.message);
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
                getListOpenForSaleDetails(); // Refresh the list
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


    const navigate = useNavigate();

    useEffect(() => {
        if (openingForSaleID) {
            fetchOpenForSaleDetails(openingForSaleID);
        }
        getListOpenForSaleDetails();
    }, [searchTerm, openingForSaleID]);



    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Open For Sale Details</h1>
                </div>
                <div className="back_to_page_">
                    <Link to="/openforsales/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to Open For Sale list
                    </Link>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input
                            type="text"
                            className="input_search"
                            placeholder="Search by opening for sale name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={() => setShowPopup(true)}>
                            Create New
                        </button>

                    </div>

                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <div className="content_ table_list_">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : data.length === 0 ? (
                            <div>No Open For Sale Details available</div>
                        ) : (
                            <table className="table datatable">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
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
                                            <th>{index + 1}</th>
                                            <td>{item.openingForSaleName}</td>
                                            <td>{item.propertyName}</td>
                                            <td>{item.price}</td>
                                            <td>{item.note || "N/A"}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <button
                                                        className="btn btn-info"
                                                        onClick={() => navigate(`/open-for-sale-details/detail/${item.openingForSaleID}`)}
                                                    >
                                                        Detail
                                                    </button>
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => navigate(`/open-for-sale-details/update/${item.openingForSaleID}`)}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeleteOpenSaleDetail(item.propertyID, item.openingForSaleID)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                </section>

                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <h3>Create New Open For Sale Detail</h3>
                            <form onSubmit={(e) => { e.preventDefault(); handleCreateNewSaleDetail(); }}>
                                <div className="form-group">
                                    <label>Opening For Sale Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newSaleDetail.openingForSaleID}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Property</label>
                                    <select
                                        className="form-control"
                                        value={newSaleDetail.propertyID}
                                        onChange={(e) => setNewSaleDetail({ ...newSaleDetail, propertyID: e.target.value })}
                                    >
                                        <option value="">Select a property</option>
                                        {properties.length > 0 ? (
                                            properties.map((property) => (
                                                <option key={property.propertyID} value={property.propertyID}>
                                                    {property.propertyCode}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No properties available</option>
                                        )}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={newSaleDetail.price}
                                        onChange={(e) => setNewSaleDetail({ ...newSaleDetail, price: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Note</label>
                                    <textarea
                                        className="form-control"
                                        value={newSaleDetail.note}
                                        onChange={(e) => setNewSaleDetail({ ...newSaleDetail, note: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default OpenForSaleDetailList;
