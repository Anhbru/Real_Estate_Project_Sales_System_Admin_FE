import React, { useEffect, useState } from 'react';
import documentService from '../../Service/DocumentService';
import Header from "../../Shared/Admin/Header/Header";
import Sidebar from "../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function DocumentList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getListDocuments = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await documentService.adminListDocument();
            console.log("Documents Response:", res.data);
            if (res.status === 200) {
                setData(Array.isArray(res.data) ? res.data : []);
            } else {
                setError("Failed to fetch documents.");
            }
        } catch (err) {
            setError("Error fetching documents: " + err.message);
            console.error("Error fetching documents:", err);
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
    };

    useEffect(() => {
        getListDocuments();
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Document List</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search documents" />
                        <a href="/documents/create" className="btn_go_">
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
                                    <p>No documents found.</p>
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>
                                            <col width="5%" />
                                            <col width="30%" />
                                            <col width="30%" />
                                            <col width="15%" />
                                            <col width="10%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Document Name</th>
                                                <th scope="col">Content</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.documentTemplateID}>
                                                    <th>{index + 1}</th>
                                                    <td>{item.documentName}</td>
                                                    <td>{item.documentFile ? "Available" : "Not Available"}</td>
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
                                                                <li><a className="dropdown-item" href={'/document/detail/' + item.documentTemplateID}>Detail</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li><a className="dropdown-item" href={'/documents/update/' + item.documentTemplateID}>Update</a></li>
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

export default DocumentList;
