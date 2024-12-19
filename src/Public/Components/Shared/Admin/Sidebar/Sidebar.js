import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const handlePermission = (allowedRoles, userRole) => {
    const isAccess = allowedRoles.includes(userRole);
    if (isAccess) {
      return isAccess;
    }
  };

  const routerPermission = [
    {
      path: "/dashboard",
      icon: "/assets/icon/overview_icon.png",
      name: "Overview",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/projects/list",
      icon: "/assets/icon/project_icon.png",
      name: "Project",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/payments/list",
      icon: "/assets/icon/contact_icon.png",
      name: "Payments",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/project-category-detail",
      icon: "/assets/icon/contact_icon.png",
      name: "Project Category Detail",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/zones/list",
      icon: "/assets/icon/contact_icon.png",
      name: "Zones",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/blocks/list",
      icon: "/assets/icon/contact_icon.png",
      name: "Block",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/floors/list",
      icon: "/assets/icon/contact_icon.png",
      name: "Floors",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/unittypes/list",
      icon: "/assets/icon/contact_icon.png",
      name: "UnitType",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/properties/list",
      icon: "/assets/icon/house_icon.png",
      name: "Property",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/propertytype/list",
      icon: "/assets/icon/house_icon.png",
      name: "Property type",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/openforsales/list",
      icon: "/assets/icon/open_sale_icon.png",
      name: "Opening For Sale",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/openforsaledetails/list",
      icon: "/assets/icon/open_sale_icon.png",
      name: "Opening For Sale Detail",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/salepolicy/list",
      icon: "/assets/icon/open_sale_icon.png",
      name: "Sales policy",
      isAccess: ["Admin"],
    },
    {
      path: "/promotions/list",
      icon: "/assets/icon/open_sale_icon.png",
      name: "Promotion",
      isAccess: ["Admin"],
    },
    {
      path: "/promotiondetails/list",
      icon: "/assets/icon/contact_icon.png",
      name: "Promotion Detail",
      isAccess: ["Admin"],
    },
    {
      path: "/paymentprocesses/list",
      icon: "/assets/icon/contact_icon.png",
      name: "Payment Process",
      isAccess: ["Admin"],
    },
    {
      path: "/paymentprocessesdetail/list",
      icon: "/assets/icon/contact_icon.png",
      name: "Payment Processes Detail",
      isAccess: ["Admin"],
    },
    {
      path: "/paymentpolicy/list",
      icon: "/assets/icon/contact_icon.png",
      name: "Payment Policy",
      isAccess: ["Admin"],
    },
    {
      path: "/document/list",
      icon: "/assets/icon/comment_icon.png",
      name: "Document",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/notification/list",
      icon: "/assets/icon/comment_icon.png",
      name: "Notification",
      isAccess: ["Admin"],
    },
    {
      path: "/bookings",
      icon: "/assets/icon/booking_icon.png",
      name: "Booking",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/contract",
      icon: "/assets/icon/contact_icon.png",
      name: "Contract",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/accounts/list",
      icon: "/assets/icon/report_icon.png",
      name: "Account",
      isAccess: ["Admin"],
    },
    {
      path: "/customers/list",
      icon: "/assets/icon/customer_icon.png",
      name: "Customer",
      isAccess: ["Admin", "Staff"],
    },
    {
      path: "/staff/list",
      icon: "/assets/icon/employee_icon.png",
      name: "Staff",
      isAccess: ["Admin"],
    },
    {
      path: "/property-categories/list",
      icon: "/assets/icon/house_icon.png",
      name: "Property Categories",
      isAccess: ["Admin", "Staff"],
    },
  ];

  const userRole = sessionStorage.getItem("userRole");

  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          {routerPermission
            .filter((item) => handlePermission(item.isAccess, userRole)) // Lọc các mục có quyền
            .map((item) => (
              <li className="nav-item" key={item.key}>
                <Link to={item.path} className="nav-link collapsed">
                  <img
                    className="icon_sidebar_"
                    src={item.icon}
                    alt={item.name}
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}

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
    </>
  );
}

export default Sidebar;
