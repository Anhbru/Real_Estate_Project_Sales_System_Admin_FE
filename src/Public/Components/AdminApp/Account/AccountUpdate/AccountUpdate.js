import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, message } from 'antd';
import accountService from '../../../Service/AccountService';
import roleService from '../../../Service/RoleService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function AccountUpdate() {
    const [account, setAccount] = useState([]);
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);

    const detailAccount = async () => {
        try {
            console.log("Fetching account details for ID:", id);
            const res = await accountService.detail(id);
            console.log("Account details response:", res.data);
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

    const fetchRoles = async () => {
        try {
            console.log("Fetching roles...");
            const res = await roleService.getList();
            console.log("Roles:", res.data);
            setRoles(res.data);
        } catch (err) {
            console.error("Error fetching roles:", err);
            message.error("Failed to load roles");
        } finally {
            setLoading(false);
        }
    };

    const updateAccount = async () => {
        $('#btnUpdate').prop('disabled', true).text('Saving...');

        try {
            const formData = {
                email: account.email,
                password: account.password,
                status: account.status,
                roleID: account.roleID
            };
            await accountService.update(id, formData);
            message.success("Account updated successfully");
            navigate("/accounts/list");
        } catch (err) {
            console.error(err);
            message.error("Failed to update account");
            $('#btnUpdate').prop('disabled', false).text('Save Changes');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await detailAccount();
            await fetchRoles();
            setLoading(false);
        };

        fetchData();
    }, [id]);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Account</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updateAccount}>
                            <div className="form_area_">
                                <div className="title_form_">Account Information</div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        value={account?.email || ""}
                                        placeholder="Enter Email"
                                        onChange={(e) => setAccount({ ...account, email: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        value={account?.password || ""}
                                        placeholder="Enter New Password"
                                        onChange={(e) => setAccount({ ...account, password: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        className="form-control"
                                        name="status"
                                        id="status"
                                        value={account?.status || ""}
                                        onChange={(e) => setAccount({ ...account, status: e.target.value })}
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="roleID">Role</label>
                                    <select
                                        className="form-control"
                                        name="roleID"
                                        id="roleID"
                                        value={account?.roleID || ""}
                                        onChange={(e) => setAccount({ ...account, roleID: e.target.value })}
                                    >
                                        <option value="">Select Role</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button" onClick={() => navigate("/accounts/list")}>
                                    Back
                                </button>
                                <button className="btn_create" id="btnUpdate" type="submit">
                                    Save
                                </button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );

}

export default AccountUpdate;
