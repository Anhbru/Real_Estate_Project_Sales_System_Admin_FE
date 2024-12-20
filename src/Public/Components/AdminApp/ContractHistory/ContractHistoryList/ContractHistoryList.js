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
    const [searchQuery, setSearchQuery] = useState(""); // State cho tìm kiếm

    const formatDateTime = (date) => {
        const d = new Date(date);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const hh = String(d.getHours()).padStart(2, "0");
        const min = String(d.getMinutes()).padStart(2, "0");

        return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    };

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

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.contractCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <input
                            type="text"
                            className="input_search"
                            placeholder="Search by Contract Code"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
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
                                {filteredData.length === 0 ? (
                                    <p>No contract histories found.</p>
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>
                                            <col width="4%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="25%" />
                                            <col width="20%" />
                                            <col width="10%" />
                                            <col width="11%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Contract Code</th>
                                                <th scope="col">Notarized Code</th>
                                                <th scope="col">Note</th>
                                                <th scope="col">Created Time</th>
                                                <th scope="col">Attach File</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData.map((item, index) => (
                                                <tr key={item.contractHistoryID}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.contractCode}</td>
                                                    <td>{item.notarizedContractCode}</td>
                                                    <td>{item.note}</td>
                                                    <td>{formatDateTime(item.createdTime)}</td>
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
                                                            <a className="nav-link" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                                                                <img src="/assets/icon/more_icon.png" alt="" />
                                                            </a>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href={`/contracthistory/detail/${item.contractHistoryID}`}>Detail</a></li>
                                                                <li><a className="dropdown-item" href={`/contractHistory/update/${item.contractHistoryID}`}>Update</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
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

export default ContractHistoryList;
