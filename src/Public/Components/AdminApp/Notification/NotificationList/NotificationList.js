import React, { useEffect, useState } from 'react';
import notificationService from '../../../Service/NotificationService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function NotificationList() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getListNotifications = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await notificationService.adminListNotification();
            console.log("Notifications Response:", res.data);
            if (res.status === 200) {
                setData(Array.isArray(res.data) ? res.data : []);
            } else {
                setError("Failed to fetch notifications.");
            }
        } catch (err) {
            setError("Error fetching notifications: " + err.message);
            console.error("Error fetching notifications:", err);
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
        getListNotifications();
    }, []);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Notification List</h1>
                </div>
                <section className="section">
                    <div className="d-flex justify-content-between align-items-center">
                        <input type="text" className="input_search" placeholder="Search notifications" />
                        <a href="/notification/create" className="btn_go_">
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
                                    <p>No notifications found.</p>
                                ) : (
                                    <table className="table datatable">
                                        <colgroup>
                                            <col width="5%" />
                                            <col width="20%" />
                                            <col width="25%" />
                                            <col width="15%" />
                                            <col width="15%" />
                                            <col width="10%" />
                                            <col width="10%" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">STT</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Subtitle</th>
                                                <th scope="col">Customer Name</th>
                                                <th scope="col">Booking ID</th>
                                                <th scope="col">Created Time</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr key={item.notificationID}>
                                                    <th>{index + 1}</th>
                                                    <td>{item.title}</td>
                                                    <td>{item.subtiltle}</td>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.bookingID}</td>
                                                    <td>{new Date(item.createdTime).toLocaleString()}</td>
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
                                                                <li><a className="dropdown-item" href={'/notification/detail/' + item.notificationID}>Detail</a></li>
                                                                <li><hr className="dropdown-divider" /></li>
                                                                <li><a className="dropdown-item" href={'/notification/update/' + item.notificationID}>Update</a></li>
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

export default NotificationList;
