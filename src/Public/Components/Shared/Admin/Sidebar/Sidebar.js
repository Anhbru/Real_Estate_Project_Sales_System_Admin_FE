import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Sidebar() {

    return (
        <>
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <a className="nav-link collapsed active" href="/dashboard">
                            <img className="icon_sidebar_" src="/assets/icon/overview_icon.png" alt=""/>
                            <span>Overview</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/project_icon.png" alt=""/>
                            <span>Project</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/open_sale_icon.png" alt=""/>
                            <span>Opening For Sale</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/sale_icon.png" alt=""/>
                            <span>Sales policy</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/promotion_icon.png" alt=""/>
                            <span>Promotion</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/report_icon.png" alt=""/>
                            <span>Report</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/customer_icon.png" alt=""/>
                            <span>Customer</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/employee_icon.png" alt=""/>
                            <span>Employee</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/payment_report_icon.png" alt=""/>
                            <span>Payment Process</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/comment_icon.png" alt=""/>
                            <span>Comment</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/booking_icon.png" alt=""/>
                            <span>Booking</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" data-bs-target="#users-nav" data-bs-toggle="collapse"
                           href="#">
                            <img className="icon_sidebar_" src="/assets/icon/contact_icon.png" alt=""/>
                            <span>Contract</span><i
                            className="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="users-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <a href="">
                                    <i className="bi bi-circle"></i><span>Danh sách tài khoản</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <i className="bi bi-circle"></i><span>Thêm mới tài khoản</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <p className="nav-divider"></p>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/setting_icon.png" alt=""/>
                            <span>Settings</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#">
                            <img className="icon_sidebar_" src="/assets/icon/logout_icon.png" alt=""/>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </aside>
        </>

    )
}

export default Sidebar
