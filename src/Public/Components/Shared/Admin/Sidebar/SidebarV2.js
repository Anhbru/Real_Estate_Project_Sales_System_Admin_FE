import { Form, message } from "antd";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import $ from "jquery";

function Sidebar() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const loadingPage = () => {
        let current_url = window.location.href;
        let path_name = location.pathname;

        let array_main = ["/dashboard"];

        let array_project = ["/projects/list", "/projects/create", "/projects/update/", "/projects/detail/",];

        let array_property_categories = ["/property-categories/list", "/property-categories/create", "/property-categories/update/", "/property-categories/detail/",];

        let array_payment = ["/payments/list", "/payments/create", "/payments/update/", "/payments/detail/",];

        let array_property = ["/properties/list", "/properties/create", "/properties/update/", "/properties/detail/",];

        let array_promotion = ["/promotions/list", "/promotions/create", "/promotions/update/", "/promotions/detail/",];

        let array_salepolicy = ["/salepolicy/list", "/salepolicy/create", "/salepolicy/update/", "/salepolicy/detail/",];

        let array_openforsale = ["/openforsales/list", "/openforsales/create", "/openforsales/update/", "/openforsales/detail/",];

        let array_blocks = ["/blocks/list", "/blocks/create", "/blocks/update/", "/blocks/detail/",];

        let array_zones = ["/zones/list", "/zones/create", "/zones/update/", "/zones/detail/",];

        let array_floors = ["/floors/list", "/floors/create", "/floors/update/", "/floors/detail/",];

        let array_unittypes = ["/unittypes/list", "/unittypes/create", "/unittypes/update/", "/unittypes/detail/",];

        let array_project_category = ["/project-category-detail"];

        let array_contract = ["/contract/create", "/contract/edit", "/contract"];

        let array_bookings = ["/bookings", "/bookings/edit"];

        let array_contractHistory = ["/contractHistory/list", "/contractHistory/create", "/contractHistory/update/", "/contractHistory/detail/", "/contractHistory/list/",];

        // let array_payment_process = [
        //     "/paymentprocesses/list",
        //     "/paymentprocesses/create",
        //     "/paymentprocesses/update/",
        //     "/paymentprocesses/detail/",
        // ];

        // let array_payment_process_detail = [
        //     "/paymentprocessdetail/list",
        //     "/paymentprocessdetail/create",
        //     "/paymentprocessdetail/update/",
        //     "/paymentprocessdetail/detail/",
        // ];

        let array_payment_process = ["/paymentprocesses/list", "/paymentprocesses/create", "/paymentprocesses/update/", "/paymentprocesses/detail/",];

        let array_payment_process_detail = ["/paymentprocessesdetail/list", "/paymentprocessesdetail/create", "/paymentprocessesdetail/update/", "/paymentprocessesdetail/detail/",];

        let array_customer = ["/customers/list", "/customers/create", "/customers/update/", "/customers/detail/",];

        let array_staff = ["/staff/list", "/staff/create", "/staff/detail/", "/staff/propertylist/", "/staff/update/",];

        let array_openforsaledetail = ["/openforsaledetails/list/", "/openforsaledetails/create", "/openforsaledetails/update/", "/openforsaledetails/list", "/openforsaledetails/detail/",];
        let array_contractpaymentdetail = ["/contractpaymentdetail/list/", "/contractpaymentdetail/create", "/contractpaymentdetail/detail/", "/contractpaymentdetail/propertylist/",];

        let array_promotiondetails = ["/promotiondetails/list", "/promotiondetails/create", "/promotiondetails/detail/", "/promotiondetails/update/", "/promotiondetails/list/",];

        let array_document = ["/document/list", "/document/create", "/document/detail/", "/document/propertylist/",];

        let array_propertytype = ["/propertytype/list", "/propertytype/create", "/propertytype/detail/", "/propertytype/update/",];

        let array_paymentpolicy = ["/paymentpolicy/list", "/paymentpolicy/create", "/paymentpolicy/detail/", "/paymentpolicy/update/",];

        let array_Account = ["/accounts/list", "/accounts/create", "/accounts/detail/", "/accounts/update/",];
        let array_Notification = ["/notification/list", "/notification/list/", "/notification/create", "/notification/detail/", "/notification/update/",];

        let key = "";

        if (array_project.some((route) => path_name.startsWith(route))) {
            key = "project";
        }

        if (array_property.some((route) => path_name.startsWith(route))) {
            key = "property";
        }

        if (array_main.some((route) => path_name.startsWith(route))) {
            key = "main";
        }

        if (array_payment.some((route) => path_name.startsWith(route))) {
            key = "payments";
        }

        if (array_openforsale.some((route) => path_name.startsWith(route))) {
            key = "openforsales";
        }

        if (array_promotion.some((route) => path_name.startsWith(route))) {
            key = "promotions";
        }

        if (array_property_categories.some((route) => path_name.startsWith(route))) {
            key = "property_categories";
        }

        if (array_salepolicy.some((route) => path_name.startsWith(route))) {
            key = "salepolicys";
        }

        if (array_blocks.some((route) => path_name.startsWith(route))) {
            key = "blocks";
        }

        if (array_zones.some((route) => path_name.startsWith(route))) {
            key = "zones";
        }

        if (array_floors.some((route) => path_name.startsWith(route))) {
            key = "floors";
        }

        if (array_unittypes.some((route) => path_name.startsWith(route))) {
            key = "unittypes";
        }

        if (array_project_category.some((route) => path_name.startsWith(route))) {
            key = "project_category";
        }

        if (array_contract.some((route) => path_name.startsWith(route))) {
            key = "contract";
        }

        if (array_bookings.some((route) => path_name.startsWith(route))) {
            key = "bookings";
        }

        if (array_payment_process.some((route) => path_name.startsWith(route))) {
            key = "paymentprocesses";
        }

        if (array_payment_process_detail.some((route) => path_name.startsWith(route))) {
            key = "paymentprocessesdetail";
        }

        if (array_staff.some((route) => path_name.startsWith(route))) {
            key = "staff";
        }

        if (array_customer.some((route) => path_name.startsWith(route))) {
            key = "customers";
        }

        if (array_openforsaledetail.some((route) => path_name.startsWith(route))) {
            key = "openforsaledetails";
        }

        if (array_contractpaymentdetail.some((route) => path_name.startsWith(route))) {
            key = "contractpaymentdetail";
        }

        if (array_promotiondetails.some((route) => path_name.startsWith(route))) {
            key = "promotiondetails";
        }
        if (array_document.some((route) => path_name.startsWith(route))) {
            key = "document";
        }
        if (array_propertytype.some((route) => path_name.startsWith(route))) {
            key = "propertytype";
        }
        if (array_paymentpolicy.some((route) => path_name.startsWith(route))) {
            key = "paymentpolicy";
        }
        if (array_Account.some((route) => path_name.startsWith(route))) {
            key = "account";
        }
        if (array_Notification.some((route) => path_name.startsWith(route))) {
            key = "notification";
        }
        if (array_contractHistory.some((route) => path_name.startsWith(route))) {
            key = "contractHistory";
        }
        

        $("#sidebar-nav .nav-link").removeClass("active");

        switch (key) {
            case "project":
                $('a[data-key="project"]').addClass("active");
                break;
            case "property":
                $('a[data-key="property"]').addClass("active");
                break;
            case "openforsales":
                $('a[data-key="openforsales"]').addClass("active");
                break;
            case "promotions":
                $('a[data-key="promotions"]').addClass("active");
                break;
            case "salepolicys":
                $('a[data-key="salepolicys"]').addClass("active");
                break;
            case "payments":
                $('a[data-key="payments"]').addClass("active");
                break;
            case "floors":
                $('a[data-key="floors"]').addClass("active");
                break;
            case "blocks":
                $('a[data-key="blocks"]').addClass("active");
                break;
            case "zones":
                $('a[data-key="zones"]').addClass("active");
                break;
            case "unittypes":
                $('a[data-key="unittypes"]').addClass("active");
                break;
            case "property_categories":
                $('a[data-key="property_categories"]').addClass("active");
                break;
            case "project_category":
                $('a[data-key="project_category"]').addClass("active");
                break;
            case "contract":
                $('a[data-key="contract"]').addClass("active");
                break;
            case "bookings":
                $('a[data-key="bookings"]').addClass("active");
                break;
            case "paymentprocesses":
                $('a[data-key="paymentprocesses"]').addClass("active");
                break;
            case "paymentprocessesdetail":
                $('a[data-key="paymentprocessesdetail"]').addClass("active");
                break;
            case "staff":
                $('a[data-key="staff"]').addClass("active");
                break;
            case "customers":
                $('a[data-key="customers"]').addClass("active");
                break;
            case "openforsaledetails":
                $('a[data-key="openforsaledetails"]').addClass("active");
                break;
            case "contractpaymentdetail":
                $('a[data-key="contractpaymentdetail"]').addClass("active");
                break;
            case "promotiondetails":
                $('a[data-key="promotiondetails"]').addClass("active");
                break;
            case "document":
                $('a[data-key="document"]').addClass("active");
                break;
            case "propertytype":
                $('a[data-key="propertytype"]').addClass("active");
                break;
            case "paymentpolicy":
                $('a[data-key="paymentpolicy"]').addClass("active");
                break;
            case "account":
                $('a[data-key="account"]').addClass("active");
                break;
            case "notification":
                $('a[data-key="notification"]').addClass("active");
                break;
            case "notification":
                $('a[data-key="contractHistory"]').addClass("active");
                break;
            default:
                $('a[data-key="main"]').addClass("active");
                break;
        }

        setLoading(false);
    };

    useEffect(() => {
        loadingPage();
    }, [form, id, loading]);

    return (<aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
                <a data-key="main" className="nav-link collapsed" href="/dashboard">
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/overview_icon.png"
                        alt=""
                    />
                    <span>Overview</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="project"
                    id="project_tab"
                    className="nav-link collapsed"
                    href="/projects/list"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/project_icon.png"
                        alt=""
                    />
                    <span>Project</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="payments"
                    href="/payments/list"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>Payments</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="project_category"
                    href="/project-category-detail"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>Project Category Detail</span>
                </a>
            </li>

            <li className="nav-item">
                <a data-key="zones" href="/zones/list" className="nav-link collapsed">
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>Zones</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="blocks"
                    href="/blocks/list"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>Block</span>
                </a>
            </li>
            <li className="nav-item">
                <a
                    data-key="floors"
                    href="/floors/list"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>Floors</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="unittypes"
                    href="/unittypes/list"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>UnitType</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="property"
                    className="nav-link collapsed"
                    href="/properties/list"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/house_icon.png"
                        alt=""
                    />
                    <span>Property</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="propertytype"
                    className="nav-link collapsed"
                    href="/propertytype/list"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/house_icon.png"
                        alt=""
                    />
                    <span>Property type</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="openforsales"
                    className="nav-link collapsed"
                    href="/openforsales/list"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/open_sale_icon.png"
                        alt=""
                    />
                    <span>Opening For Sale</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="openforsaledetails"
                    className="nav-link collapsed"
                    href="/openforsaledetails/list"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/open_sale_icon.png"
                        alt=""
                    />
                    <span>Opening For Sale Detail</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="salepolicys"
                    className="nav-link collapsed"
                    href="/salepolicy/list"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/sale_icon.png"
                        alt=""
                    />
                    <span>Sales policy</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="promotions"
                    className="nav-link collapsed"
                    href="/promotions/list"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/promotion_icon.png"
                        alt=""
                    />
                    <span>Promotion</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="promotiondetails"
                    href="/promotiondetails/list"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>Promotion Detail</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="paymentprocesses"
                    href="/paymentprocesses/list"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/payment_report_icon.png"
                        alt=""
                    />
                    <span>Payment Process</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="paymentprocessesdetail"
                    href="/paymentprocessesdetail/list"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>Payment Processes Detail</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="paymentpolicy"
                    href="/paymentpolicy/list"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>Payment Policy</span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="/document/list">
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/comment_icon.png"
                        alt=""
                    />
                    <span>Document</span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="/notification/list">
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/comment_icon.png"
                        alt=""
                    />
                    <span>Notification</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="bookings"
                    href="/bookings"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/booking_icon.png"
                        alt=""
                    />
                    <span>Booking</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="contract"
                    href="/contract"
                    className="nav-link collapsed"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/contact_icon.png"
                        alt=""
                    />
                    <span>Contract</span>
                </a>
            </li>

            <li className="nav-item">
                <a
                    data-key="account"
                    className="nav-link collapsed"
                    href="/accounts/list"
                >
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/report_icon.png"
                        alt=""
                    />
                    <span>Account</span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="/customers/list">
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/customer_icon.png"
                        alt=""
                    />
                    <span>Customer</span>
                </a>
            </li>

            <li className="nav-item">
                <a data-key="staff" className="nav-link collapsed" href="/staff/list">
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/employee_icon.png"
                        alt=""
                    />
                    <span>Staff</span>
                </a>
            </li>
            <li className="nav-item">
                <a data-key="property_categories" className="nav-link collapsed" href="/property-categories/list">
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/employee_icon.png"
                        alt=""
                    />
                    <span>Property Categories</span>
                </a>
            </li>

            <li>
                <p className="nav-divider"></p>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#">
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/setting_icon.png"
                        alt=""
                    />
                    <span>Settings</span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#">
                    <img
                        className="icon_sidebar_"
                        src="/assets/icon/logout_icon.png"
                        alt=""
                    />
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    </aside>);
}

export default Sidebar;
