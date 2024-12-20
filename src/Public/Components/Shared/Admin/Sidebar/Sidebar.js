import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import $ from "jquery";

function Sidebar() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const loadingPage = () => {
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
            case "contractHistory":
                $('a[data-key="contractHistory"]').addClass("active");
                break;
            default:
                $('a[data-key="main"]').addClass("active");
                break;
        }

        setLoading(false);
    };

    const handlePermission = (allowedRoles, userRole) => {
        const isAccess = allowedRoles.includes(userRole);
        if (isAccess) {
            return isAccess;
        }
    };

    const routerPermission = [
        {
            key: "main",
            path: "/dashboard",
            icon: "/assets/icon/overview_icon.png",
            name: "Overview",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "project",
            path: "/projects/list",
            icon: "/assets/icon/property_7106770 (1).png",
            name: "Project",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "payments",
            path: "/payments/list",
            icon: "/assets/icon/Payment (2).png",
            name: "Payments",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "project_category",
            path: "/project-category-detail",
            icon: "/assets/icon/projectcategory.png",
            name: "Project Category Detail",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "zones",
            path: "/zones/list",
            icon: "/assets/icon/zone.png",
            name: "Zones",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "blocks",
            path: "/blocks/list",
            icon: "/assets/icon/blockkk.png",
            name: "Block",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "floors",
            path: "/floors/list",
            icon: "/assets/icon/floorr.png",
            name: "Floors",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "unittypes",
            path: "/unittypes/list",
            icon: "/assets/icon/unitType.png",
            name: "UnitType",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "property",
            path: "/properties/list",
            icon: "/assets/icon/property.png",
            name: "Property",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "propertytype",
            path: "/propertytype/list",
            icon: "/assets/icon/propertyType.png",
            name: "Property type",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "openforsales",
            path: "/openforsales/list",
            icon: "/assets/icon/openforSale.png",
            name: "Opening For Sale",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "openforsaledetails",
            path: "/openforsaledetails/list",
            icon: "/assets/icon/openforsaleDetail.png",
            name: "Opening For Sale Detail",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "salepolicys",
            path: "/salepolicy/list",
            icon: "/assets/icon/salePolicy.png",
            name: "Sales policy",
            isAccess: ["Admin"],
        },
        {
            key: "promotions",
            path: "/promotions/list",
            icon: "/assets/icon/promotion.png",
            name: "Promotion",
            isAccess: ["Admin"],
        },
        {
            key: "promotiondetails",
            path: "/promotiondetails/list",
            icon: "/assets/icon/promotionDetail.png",
            name: "Promotion Detail",
            isAccess: ["Admin"],
        },
        {
            key: "paymentprocesses",
            path: "/paymentprocesses/list",
            icon: "/assets/icon/paymentprocess.png",
            name: "Payment Process",
            isAccess: ["Admin"],
        },
        {
            key: "paymentprocessesdetail",
            path: "/paymentprocessesdetail/list",
            icon: "/assets/icon/paymentpcDetail.png",
            name: "Payment Processes Detail",
            isAccess: ["Admin"],
        },
        {
            key: "paymentpolicy",
            path: "/paymentpolicy/list",
            icon: "/assets/icon/paymentPolicy.png",
            name: "Payment Policy",
            isAccess: ["Admin"],
        },
        {
            key: "document",
            path: "/document/list",
            icon: "/assets/icon/document.png",
            name: "Document",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "notification",
            path: "/notification/list",
            icon: "/assets/icon/notification.png",
            name: "Notification",
            isAccess: ["Admin"],
        },
        {
            key: "bookings",
            path: "/bookings",
            icon: "/assets/icon/booking.png",
            name: "Booking",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "contract",
            path: "/contract",
            icon: "/assets/icon/contact_icon.png",
            name: "Contract",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "account",
            path: "/accounts/list",
            icon: "/assets/icon/account.png",
            name: "Account",
            isAccess: ["Admin"],
        },
        {
            key: "customers",
            path: "/customers/list",
            icon: "/assets/icon/customer_icon.png",
            name: "Customer",
            isAccess: ["Admin", "Staff"],
        },
        {
            key: "staff",
            path: "/staff/list",
            icon: "/assets/icon/employee_icon.png",
            name: "Staff",
            isAccess: ["Admin"],
        },
        {
            key: "property_categories",
            path: "/property-categories/list",
            icon: "/assets/icon/house_icon.png",
            name: "Property Categories",
            isAccess: ["Admin", "Staff"],
        },
    ];

    const userRole = sessionStorage.getItem("userRole");

    useEffect(() => {
        loadingPage();
    }, [loading]);

    return (
        <>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    {routerPermission
                        .filter((item) => handlePermission(item.isAccess, userRole)) // Lọc các mục có quyền
                        .map((item) => (
                            <li className="nav-item" key={item.key}>
                                <Link to={item.path} data-key={item.key} className="nav-link collapsed">
                                    <img
                                        className="icon_sidebar_"
                                        src={item.icon}
                                        alt={item.name}
                                    />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </aside>
        </>
    );
}

export default Sidebar;
