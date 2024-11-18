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

    let array_project = [
      "/projects/list",
      "/projects/create",
      "/projects/update/",
      "/projects/detail/",
    ];

    let array_property = [
      "/properties/list",
      "/properties/create",
      "/properties/update/",
      "/properties/detail/",
    ];

    let array_promotion = [
      "/promotions/list",
      "/promotions/create",
      "/promotions/update/",
      "/promotions/detail/",
    ];

    let array_salepolicy = [
      "/salepolicy/list",
      "/salepolicy/create",
      "/salepolicy/update/",
      "/salepolicy/detail/",
    ];

    let array_openforsale = [
      "/openforsales/list",
      "/openforsales/create",
      "/openforsales/update/",
      "/openforsales/detail/",
    ];

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

    if (array_openforsale.some((route) => path_name.startsWith(route))) {
      key = "openforsales";
    }
    if (array_promotion.some((route) => path_name.startsWith(route))) {
      key = "promotions";
    }
    if (array_salepolicy.some((route) => path_name.startsWith(route))) {
      key = "salepolicys";
    }

    $("#sidebar-nav .nav-link").removeClass("active");

    switch (key) {
      case "project":
        $('a[data-key="project"]').addClass("active");
        break;
      case "property":
        $('a[data-key="property"]').addClass("active");
        break;
      case "opensales":
        $('a[data-key="openforsales"]').addClass("active");
        break;
      case "promotions":
        $('a[data-key="promotions"]').addClass("active");
        break;
      case "salepolicys":
        $('a[data-key="salepolicys"]').addClass("active");
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

  return (
    <aside id="sidebar" className="sidebar">
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
            data-key="salepolicy"
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
          <a className="nav-link collapsed" href="#">
            <img
              className="icon_sidebar_"
              src="/assets/icon/report_icon.png"
              alt=""
            />
            <span>Report</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <img
              className="icon_sidebar_"
              src="/assets/icon/customer_icon.png"
              alt=""
            />
            <span>Customer</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <img
              className="icon_sidebar_"
              src="/assets/icon/employee_icon.png"
              alt=""
            />
            <span>Employee</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <img
              className="icon_sidebar_"
              src="/assets/icon/payment_report_icon.png"
              alt=""
            />
            <span>Payment Process</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="#">
            <img
              className="icon_sidebar_"
              src="/assets/icon/comment_icon.png"
              alt=""
            />
            <span>Comment</span>
          </a>
        </li>
        <li className="nav-item">
          <Link to="/bookings" className="nav-link collapsed">
            <img
              className="icon_sidebar_"
              src="/assets/icon/booking_icon.png"
              alt=""
            />
            <span>Booking</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/contract" className="nav-link collapsed">
            <img
              className="icon_sidebar_"
              src="/assets/icon/contact_icon.png"
              alt=""
            />
            <span>Contract</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/project-category-detail" className="nav-link collapsed">
            <img
              className="icon_sidebar_"
              src="/assets/icon/contact_icon.png"
              alt=""
            />
            <span>Project Category Detail</span>
          </Link>
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
    </aside>
  );
}

export default Sidebar;
