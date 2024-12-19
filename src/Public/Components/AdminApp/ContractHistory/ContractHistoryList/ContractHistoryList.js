import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import contractHistoryService from "../../../Service/ContractHistoryService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";

function ContractHistoryList() {
    const { contractID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (contractID) {
            getContractHistoriesByContractID(contractID);
        }
    }, [contractID]);

    const getContractHistoriesByContractID = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await contractHistoryService.getContractHistorysByContractID(id);
            if (res.status === 200) {
                const histories = Array.isArray(res.data) ? res.data : [];
                const sortedHistories = histories.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                setData(sortedHistories);
            } else {
                setError("Failed to fetch contract histories.");
            }
        } catch (err) {
            setError("Error fetching contract histories: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Contract History</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search contract history" />
                        <a href="/contractHistory/create" className="btn_go_">
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
                                    <div className="no-data-found">
                                        <p>No contract histories found.</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <colgroup>
                                                <col width="5%" />
                                                <col width="15%" />
                                                <col width="10%" />
                                                <col width="15%" />
                                                <col width="20%" />
                                                <col width="10%" />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Contract Code</th>
                                                    <th>Notarized ContractCode</th>
                                                    <th>Note</th>
                                                    <th>Created Time</th>
                                                    <th>Attach File</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item, index) => (
                                                    <tr key={item.contractHistoryID}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.contractCode}</td>
                                                        <td>{item.notarizedContractCode}</td>
                                                        <td>{item.note}</td>
                                                        <td>{item.createdTime}</td>
                                                        <td>
                                                            {item.attachFile ? (
                                                                <a href={item.attachFile} target="_blank" rel="noopener noreferrer">
                                                                    View File
                                                                </a>
                                                            ) : (
                                                                <span>No file attached</span>
                                                            )}
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
                                                                    <li><a className="dropdown-item" href={`/contract-history/detail/${item.contractHistoryID}`}>Detail</a></li>
                                                                    <li><a className="dropdown-item" href={`/contract-history/update/${item.contractHistoryID}`}>Update</a></li>
                                                                    <li><hr className="dropdown-divider" /></li>
                                                                </ul>
                                                            </p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default ContractHistoryList;
