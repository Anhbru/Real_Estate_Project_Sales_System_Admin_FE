import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message, Spin } from 'antd';
import notificationService from '../../../Service/NotificationService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function NotificationDetail() {
    const [notification, setNotification] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const detailNotification = async () => {
        try {
            console.log("Fetching notification details for ID:", id);
            const res = await notificationService.adminDetailNotification(id);
            console.log("Detail notification response:", res.data);
            if (res.data) {
                setNotification(res.data);
            } else {
                message.warning('Notification not found');
            }
        } catch (err) {
            console.error("Error fetching notification details:", err);
            message.error('Failed to load notification details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detailNotification();
    }, [id]);

    if (loading) return <Spin tip="Loading..." />;

    if (!notification || Object.keys(notification).length === 0) {
        return <div>No notification data available.</div>;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/notification/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to notification list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>{notification.title}</h1>
                </div>
                <section className="section detail_page_">
                    <div className="content_page_">
                        <div className="info_area_">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="title_">Notification Information</p>
                                <Link to={`/notifications/update/${notification.notificationID}`} className="edit_tab_">Edit</Link>
                            </div>
                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Title: </p>
                                        <p className="val_ text-truncate">{notification.title}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Subtitle: </p>
                                        <p className="val_ text-truncate">{notification.subtiltle}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Customer Name: </p>
                                        <p className="val_ text-truncate">{notification.fullName}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Booking ID: </p>
                                        <p className="val_ text-truncate">{notification.bookingID}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Created Time: </p>
                                        <p className="val_ text-truncate">{new Date(notification.createdTime).toLocaleString()}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Status: </p>
                                        <p
                                            className="val_ text-truncate"
                                            style={{ color: notification.status ? 'green' : 'red' }}
                                        >
                                            {notification.status ? 'Active' : 'Inactive'}
                                        </p>
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

export default NotificationDetail;
