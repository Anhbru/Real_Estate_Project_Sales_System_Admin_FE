import {Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {useLocation} from 'react-router-dom';
import $ from 'jquery';


function Sidebar() {
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const loadingPage = () => {
        let current_url = window.location.href;
        let path_name = location.pathname;

        let array_main = [
            '/dashboard',
        ]

        let array_project = [
            '/projects/list',
            '/projects/create',
            '/projects/update/',
            '/projects/detail/',
        ]

        let array_property = [
            '/properties/list',
            '/properties/create',
            '/properties/update/',
            '/properties/detail/',
        ]

        let key = '';

        if (array_project.some(route => path_name.startsWith(route))) {
            key = 'project';
        }

        if (array_property.some(route => path_name.startsWith(route))) {
            key = 'property';
        }

        if (array_main.some(route => path_name.startsWith(route))) {
            key = 'main';
        }

        $('#sidebar-nav .nav-link').removeClass('active');

        switch (key) {
            case "project":
                $('a[data-key="project"]').addClass('active');
                break;
            case "property":
                $('a[data-key="property"]').addClass('active');
                break;
            default:
                $('a[data-key="main"]').addClass('active');
                break;
        }

        setLoading(false);
    }

    useEffect(() => {
        loadingPage();
    }, [form, id, loading])

    return (
        <>
            <aside id="sidebar" className="sidebar">

                <ul className="sidebar-nav" id="sidebar-nav">

                    <li className="nav-item">
                        <a data-key="main" className="nav-link collapsed" href="/dashboard">
                            <img className="icon_sidebar_" src="/assets/icon/overview_icon.png" alt=""/>
                            <span>Overview</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a data-key="project" id='project_tab' className="nav-link collapsed" href="/projects/list">
                            <img className="icon_sidebar_" src="/assets/icon/project_icon.png" alt=""/>
                            <span>Project</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a data-key="property" className="nav-link collapsed" href="/properties/list">
                            <img className="icon_sidebar_" src="/assets/icon/house_icon.png" alt=""/>
                            <span>Property</span>
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
