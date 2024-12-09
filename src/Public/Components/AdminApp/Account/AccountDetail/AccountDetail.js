import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import accountService from '../../../Service/AccountService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function AccountDetail() {
    const [account, setAccount] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const detailAccount = async () => {
        try {
            console.log("Fetching account details for ID:", id);
            const res = await accountService.detail(id);
            console.log("Detail account response:", res.data);
            if (res.data) {
                setAccount(res.data);
            } else {
                message.warning('Account not found');
            }
        } catch (err) {
            console.error("Error fetching account details:", err);
            message.error('Failed to load account details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detailAccount();
    }, [id]);

    if (loading) return <Spin tip="Loading..." />;

    if (!account || Object.keys(account).length === 0) {
        return <div>No account data available.</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/accounts/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to account list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>{account.email}</h1>
                </div>
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">General Information</p>
                                <Link to={`/accounts/update/${account.accountID}`} className="edit_tab_">Edit</Link>
                            </div>
                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Account ID: </p>
                                        <p className="val_ text-truncate">{account.accountID}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Email: </p>
                                        <p className="val_ text-truncate">{account.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Password: </p>
                                        <p className="val_ text-truncate">{account.password}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Status: </p>
                                        <p
                                            className="val_ text-truncate"
                                            style={{ color: account.status ? 'green' : 'red' }}
                                        >
                                            {account.status ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Role: </p>
                                        <p className="val_ text-truncate">{account.roleName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default AccountDetail;
