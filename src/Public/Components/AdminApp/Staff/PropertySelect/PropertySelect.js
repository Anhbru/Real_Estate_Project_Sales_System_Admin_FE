import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import propertyService from "../../../Service/PropertyService";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Header from "../../../Shared/Admin/Header/Header";

function StaffProperty() {
    const { categoryDetailID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPropertyID, setSelectedPropertyID] = useState(null);
    const [customerID, setCustomerID] = useState("");
    const location = useLocation();
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // useNavigate hook

    useEffect(() => {
        if (location.state && location.state.customerID) {
            setCustomerID(location.state.customerID);
        }
    }, [location.state]);

    const getListProperties = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await propertyService.getProjectCategoryDetailsID(categoryDetailID);
            if (res.status === 200) {
                if (res.data && res.data.length > 0) {
                    setData(res.data);
                } else {
                    setError("No properties found for this category.");
                }
            } else {
                setError("Failed to fetch properties.");
            }
        } catch (err) {
            setError("Error fetching properties: " + err.message);
        } finally {
            setLoading(false);
        }
    }, [categoryDetailID]);

    useEffect(() => {
        getListProperties();
    }, [getListProperties]);

    const handleOpenModal = (propertyID, status) => {
        if (status === "Giữ chỗ") {
            setMessage("This property is already reserved.");
            return;
        }
        setSelectedPropertyID(propertyID);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCustomerID("");
        setMessage("");
    };

    const handleUpdateCustomer = async () => {
        if (!customerID) {
            setMessage("Please enter a valid Customer ID.");
            return;
        }
        setMessage("");
        try {
            const res = await propertyService.adminSelectPropertyCustomer(selectedPropertyID, customerID);
            if (res.status === 200) {
                setMessage(`Successfully updated CustomerID for PropertyID: ${selectedPropertyID}`);
                setCustomerID("");
                handleCloseModal();
                getListProperties();
                // Quay lại trang trước khi thao tác
                navigate(-1); // Quay lại trang trước
            } else {
                setMessage(`Failed to update CustomerID for PropertyID: ${selectedPropertyID}`);
            }
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Property List for Category</h1>
                </div>
                <section className="section">
                    <div className="content_ grid_list_">
                        {message && <div className="alert alert-info">{message}</div>}
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            <>
                                {data.length === 0 ? (
                                    <p>No properties found for this category.</p>
                                ) : (
                                    <div className="property-grid">
                                        {data.map((item) => (
                                            <div
                                                key={item.propertyID}
                                                className={`property-card ${item.status === "Mở bán" ? "status-open" : item.status === "Giữ chỗ" ? "status-hold" : ""}`}
                                            >
                                                <div className="property-header">
                                                    <span className="property-code">{item.propertyCode}</span>
                                                    <span className={`status-indicator ${item.status.toLowerCase().replace(" ", "-")}`}></span>
                                                </div>
                                                <div className="property-body">
                                                    <p className="property-rooms">{item.bedRoom || 2} Phòng</p>
                                                    <p className="property-view">View: {item.view || "Thoáng đẹp"}</p>
                                                    <p className="property-area">{item.priceSold} VND</p>
                                                </div>
                                                {item.status === "Giữ chỗ" ? (
                                                    <button
                                                        className="btn btn-secondary"
                                                        disabled
                                                        title="This property is reserved"
                                                    >
                                                        Đã giữ chỗ
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleOpenModal(item.propertyID, item.status)}
                                                        className="btn btn-primary btn-select"
                                                    >
                                                        Lựa chọn
                                                    </button>
                                                )}
                                            </div>

                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {showModal && (
                    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Update Customer ID</h5>
                                    <button type="button" className="close" onClick={handleCloseModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>PropertyID: {selectedPropertyID}</p>
                                    <input
                                        type="text"
                                        placeholder="Enter Customer ID"
                                        value={customerID}
                                        onChange={(e) => setCustomerID(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-success" onClick={handleUpdateCustomer}>
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default StaffProperty;
