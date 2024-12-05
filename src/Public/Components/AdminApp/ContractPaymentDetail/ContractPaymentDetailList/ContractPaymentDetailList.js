import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import contractPaymentDetailService from "../../../Service/ContractPaymentDetailService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import paymentPolicyService from "../../../Service/PaymentPolicyService";
import { useNavigate } from "react-router-dom";
function ContractList() {
    const { contractID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedContract, setSelectedContract] = useState(null);
    const [paymentPolicies, setPaymentPolicies] = useState([]);
    const navigate = useNavigate();
    const [updateForm, setUpdateForm] = useState({
        paymentRate: "",
        description: "",
        paidValue: "",
        paidValueLate: "",
        period: "",
        status: false,
        paymentPolicyID: "",
    });

    useEffect(() => {
        if (contractID) {
            getContractPaymentDetailsByContractID(contractID);
        }
        getPaymentPolicies();
    }, [contractID]);


    const getPaymentPolicies = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await paymentPolicyService.adminListPaymentPolicy();
            if (res.status === 200) {
                setPaymentPolicies(res.data);
            } else {
                setError("Failed to fetch payment policies.");
            }
        } catch (err) {
            setError("Error fetching payment policies: " + err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleConfirm = async (contractPaymentDetailID) => {
        if (!window.confirm("Bạn có chắc chắn muốn xác nhận hợp đồng này không?")) return;

        setLoading(true);
        setError(null);
        try {
            const res = await contractPaymentDetailService.adminConFirmContractPaymentDetail(
                contractPaymentDetailID,
                { status: true }
            );

            if (res.status === 200) {
                setData((prevData) =>
                    prevData.map((item) =>
                        item.contractPaymentDetailID === contractPaymentDetailID
                            ? { ...item, status: true }
                            : item
                    )
                );
                alert("Xác nhận thành công!");
            } else {
                setError("Xác nhận không thành công. Vui lòng thử lại.");
            }
        } catch (err) {
            setError("Đã xảy ra lỗi khi xác nhận: " + err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleUpdateClick = (contract) => {
        setSelectedContract(contract);
        setUpdateForm({
            paymentRate: contract.paymentRate,
            description: contract.description,
            paidValue: contract.paidValue,
            paidValueLate: contract.paidValueLate,
            period: contract.period,
            status: contract.status,
            paymentPolicyID: contract.paymentPolicyID,
        });
    };

    const getContractPaymentDetailsByContractID = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await contractPaymentDetailService.adminGetContractPaymentDetailsByContractId(id);
            if (res.status === 200) {
                const contracts = Array.isArray(res.data) ? res.data : [];
                const sortedContracts = contracts.sort((a, b) => {
                    if (a.contractCode < b.contractCode) return -1;
                    if (a.contractCode > b.contractCode) return 1;
                    return a.paymentRate - b.paymentRate;
                });
                setData(sortedContracts);
            } else {
                setError("Failed to fetch contracts.");
            }
        } catch (err) {
            setError("Error fetching contracts: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa bản ghi này không?")) return;

        setLoading(true);
        setError(null);
        try {
            const res = await contractPaymentDetailService.adminDeleteContractPaymentDetail(id);
            if (res.status === 200) {
                setData((prevData) => prevData.filter((item) => item.contractPaymentDetailID !== id));
                alert("Xóa thành công!");
            } else {
                setError("Xóa không thành công. Vui lòng thử lại.");
            }
        } catch (err) {
            setError("Đã xảy ra lỗi khi xóa: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUpdateForm((prevForm) => ({
            ...prevForm,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!selectedContract) return;

        setLoading(true);
        setError(null);

        try {
            const updatedContract = {
                ...selectedContract,
                ...updateForm,
            };

            const res = await contractPaymentDetailService.adminUpdateContractPaymentDetail(
                selectedContract.contractPaymentDetailID,
                updatedContract
            );

            if (res.status === 200) {
                setData((prevData) =>
                    prevData.map((item) =>
                        item.contractPaymentDetailID === selectedContract.contractPaymentDetailID
                            ? { ...item, ...updateForm }
                            : item
                    )
                );
                alert("Cập nhật thành công!");
                window.location.reload();
                setSelectedContract(null);
            } else {
                setError("Cập nhật không thành công. Vui lòng thử lại.");
            }
        } catch (err) {
            setError("Đã xảy ra lỗi khi cập nhật: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const closeUpdateModal = () => {
        setSelectedContract(null);
    };

    const handleViewImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Contract Payment Details</h1>
                </div>
                <section className="section">
                    <div className="content_ table_list_">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : (
                            <>
                                {data.length === 0 ? (
                                    <div className="no-data-found">
                                        <p></p>
                                    </div>
                                ) : (
                                    <table className="table datatable">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Contract Code</th>
                                                <th>Description</th>
                                                <th>Payment Rate</th>
                                                <th>Paid Value</th>
                                                <th>Late Payment</th>
                                                <th>Period</th>
                                                <th>Status</th>
                                                <th>Policy Name</th>
                                                <th>Remittance Order</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.contractPaymentDetailID}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.contractCode}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.paymentRate}</td>
                                                    <td>{item.paidValue}</td>
                                                    <td>{item.paidValueLate}</td>
                                                    <td>{item.period}</td>
                                                    <td style={{ color: item.status ? "green" : "red" }}>
                                                        {item.status ? "Active" : "Inactive"}
                                                    </td>
                                                    <td>{item.paymentPolicyName}</td>
                                                    <td>
                                                        {item.remittanceOrder && (
                                                            <button
                                                                className="btn btn-link"
                                                                onClick={() => handleViewImage(item.remittanceOrder)}
                                                            >
                                                                View Image
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() => handleConfirm(item.contractPaymentDetailID)}
                                                            disabled={item.status || !item.remittanceOrder}
                                                        >
                                                            {item.status ? "Confirmed" : "Confirm"}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger ms-2"
                                                            onClick={() => handleDelete(item.contractPaymentDetailID)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => handleUpdateClick(item)}
                                                        >
                                                            Update
                                                        </button>
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

            {selectedImage && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Remittance Order Image</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeImageModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={selectedImage}
                                    alt="Remittance Order"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {selectedContract && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cập nhật thông tin</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeUpdateModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={updateForm.description}
                                        onChange={handleUpdateChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Payment Rate</label>
                                    <input
                                        type="number"
                                        name="paymentRate"
                                        value={updateForm.paymentRate}
                                        onChange={handleUpdateChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Paid Value</label>
                                    <input
                                        type="number"
                                        name="paidValue"
                                        value={updateForm.paidValue}
                                        onChange={handleUpdateChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Late Payment</label>
                                    <input
                                        type="number"
                                        name="paidValueLate"
                                        value={updateForm.paidValueLate}
                                        onChange={handleUpdateChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Period</label>
                                    <input
                                        type="text"
                                        name="period"
                                        value={updateForm.period}
                                        onChange={handleUpdateChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        name="status"
                                        value={updateForm.status}
                                        onChange={handleUpdateChange}
                                        className="form-control"
                                    >
                                        <option value={true}>Active</option>
                                        <option value={false}>Inactive</option>

                                    </select>

                                </div>
                                <div className="form-group">
                                    <label>Payment Policy</label>
                                    <select
                                        name="paymentPolicyID"
                                        value={updateForm.paymentPolicyID}
                                        onChange={handleUpdateChange}
                                        className="form-control"
                                    >
                                        <option value="">Select Payment Policy</option>
                                        {paymentPolicies.map((policy) => (
                                            <option
                                                key={policy.paymentPolicyID}
                                                value={policy.paymentPolicyID}
                                            >
                                                {policy.paymentPolicyName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={closeUpdateModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleUpdateSubmit}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ContractList;
