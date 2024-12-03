import React, { useEffect, useState } from "react";
import contractPaymentDetailService from "../../../Service/ContractPaymentDetailService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from "jquery";

function ContractList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch contract details and apply sorting
    const getListContracts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await contractPaymentDetailService.adminListContractPaymentDetails();
            console.log("Contracts Response:", res.data);
            if (res.status === 200) {
                const contracts = Array.isArray(res.data) ? res.data : [];

                // Sort contracts by contractCode (alphabetically) and paymentRate (ascending)
                const sortedContracts = contracts.sort((a, b) => {
                    // First, sort by contractCode (alphabetically)
                    if (a.contractCode < b.contractCode) return -1;
                    if (a.contractCode > b.contractCode) return 1;

                    // If contractCode is the same, sort by paymentRate (ascending order)
                    return a.paymentRate - b.paymentRate;
                });

                setData(sortedContracts);
            } else {
                setError("Failed to fetch contracts.");
            }
        } catch (err) {
            setError("Error fetching contracts: " + err.message);
            console.error("Error fetching contracts:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleViewImage = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    useEffect(() => {
        getListContracts();
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Contract Payment Details</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search contracts" />
                        <a href="/contracts/create" className="btn_go_">
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
                                    <p>No contracts found.</p>
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>
                                            <col width="5%" />
                                            <col width="15%" />
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
                                                <th scope="col">STT</th>
                                                <th scope="col">Contract Code</th>
                                                <th scope="col">Payment Rate</th>
                                                <th scope="col">Paid Value</th>
                                                <th scope="col">Late Payment</th>
                                                <th scope="col">Period</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Policy Name</th>
                                                <th scope="col">Remittance Order</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.contractPaymentDetailID}>
                                                    <th>{index + 1}</th>
                                                    <td>{item.contractCode}</td>
                                                    <td>{item.paymentRate}</td>
                                                    <td>{item.paidValue}</td>
                                                    <td>{item.paidValueLate}</td>
                                                    <td>{item.period}</td>
                                                    <td style={{ color: item.status ? "green" : "red" }}>
                                                        {item.status ? "Active" : "Inactive"}
                                                    </td>
                                                    <td>{item.paymentPolicyName}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-link"
                                                            onClick={() => handleViewImage(item.remittanceOrder)}
                                                        >
                                                            View Image
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <p className="nav-item dropdown">
                                                            <a
                                                                className="nav-link"
                                                                data-bs-toggle="dropdown"
                                                                href="#"
                                                                role="button"
                                                                aria-expanded="false"
                                                            >
                                                                <img src="/assets/icon/more_icon.png" alt="" />
                                                            </a>
                                                            <ul className="dropdown-menu">
                                                                <li>
                                                                    <hr className="dropdown-divider" />
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href={"/contractpaymentdetail/update/" + item.contractPaymentDetailID}
                                                                    >
                                                                        Update
                                                                    </a>
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

            {/* Modal hiển thị hình ảnh */}
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
        </>
    );
}

export default ContractList;
