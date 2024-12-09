import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import promotionDetailService from '../../../Service/PromotionDetailService';
import propertyTypeService from '../../../Service/PropertyTypeService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";

function PromotionDetailsList() {
    const { promotionID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [newPromotionDetail, setNewPromotionDetail] = useState({
        promotionID: promotionID,
        description: '',
        amount: '',
        propertyTypeID: ''
    });
    const [propertyTypes, setPropertyTypes] = useState([]);

    const fetchPromotionDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await promotionDetailService.getListByPromotionID(promotionID);
            if (res.status === 200) {
                const filteredData = res.data.filter(item =>
                    item.promotionName.toLowerCase().includes(searchTerm.toLowerCase())
                );

                setData(filteredData);
            } else {
                setError("Failed to fetch promotion details.");
            }
        } catch (err) {
            setError("Error fetching promotion details: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPropertyTypes = async () => {
        try {
            const res = await propertyTypeService.adminListProperty();
            if (res.status === 200) {
                setPropertyTypes(res.data);
            } else {
                setError('Failed to fetch property types.');
            }
        } catch (err) {
            setError('Error fetching property types: ' + err.message);
        }
    };

    const handleCreateNewPromotionDetail = async () => {
        try {
            const res = await promotionDetailService.create(newPromotionDetail);
            if (res.status === 200 || res.status === 201) {
                setSuccessMessage("Successfully created a new promotion detail!");
                setShowPopup(false);
                fetchPromotionDetails();
            } else {
                setErrorMessage("Failed to create a new promotion detail.");
            }
        } catch (err) {
            setErrorMessage("Error creating promotion detail: " + err.message);
        }
    };

    const handleDeletePromotionDetail = async (promotionDetailID) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }
        try {
            const res = await promotionDetailService.delete(promotionDetailID);
            if (res.status === 200 || res.status === 204) {
                setSuccessMessage("Successfully deleted the promotion detail!");
                fetchPromotionDetails();
            } else {
                setErrorMessage("Failed to delete the promotion detail.");
            }
        } catch (err) {
            setErrorMessage("Error deleting promotion detail: " + err.message);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (promotionID) {
            fetchPromotionDetails();
            fetchPropertyTypes();
        }
    }, [promotionID, searchTerm]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Promotion Details</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input
                            type="text"
                            className="input_search"
                            placeholder="Search by promotion name"
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
                            <div>No Promotion Details available</div>
                        ) : (
                            <table className="table datatable">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Property Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={item.promotionDetailID}>
                                            <td>{index + 1}</td>
                                            <td>{item.description}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.propertyTypeName}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <button
                                                        className="btn btn-warning"
                                                        onClick={() => navigate(`/promotiondetails/update/${item.promotionDetailID}`)}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDeletePromotionDetail(item.promotionDetailID)}
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
                            <h3>Create New Promotion Detail</h3>
                            <form onSubmit={(e) => { e.preventDefault(); handleCreateNewPromotionDetail(); }}>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control"
                                        value={newPromotionDetail.description}
                                        onChange={(e) => setNewPromotionDetail({ ...newPromotionDetail, description: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={newPromotionDetail.amount}
                                        onChange={(e) => setNewPromotionDetail({ ...newPromotionDetail, amount: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Property Type</label>
                                    <select
                                        className="form-control"
                                        value={newPromotionDetail.propertyTypeID}
                                        onChange={(e) => setNewPromotionDetail({ ...newPromotionDetail, propertyTypeID: e.target.value })}
                                    >
                                        <option value="">Select a property type</option>
                                        {propertyTypes.map((type) => (
                                            <option key={type.propertyTypeID} value={type.propertyTypeID}>
                                                {type.propertyTypeName}
                                            </option>
                                        ))}
                                    </select>
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

export default PromotionDetailsList;
