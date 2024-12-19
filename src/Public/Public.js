import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
/* Auth Page */
/* Dashboard Page */
import Dashboard from "./Components/AdminApp/Dashboard/Dashboard";
/* Projects Page */
import ProjectList from "./Components/AdminApp/Projects/ProjectList/ProjectList";
import ProjectDetail from "./Components/AdminApp/Projects/ProjectDetail/ProjectDetail";
import ProjectCreate from "./Components/AdminApp/Projects/ProjectCreate/ProjectCreate";
import ProjectUpdate from "./Components/AdminApp/Projects/ProjectUpdate/ProjectUpdate";
/* Properties Page */
import PropertyList from "./Components/AdminApp/Properties/PropertyList/PropertyList";
import PropertyDetail from "./Components/AdminApp/Properties/PropertyDetail/PropertyDetail";
import PropertyCreate from "./Components/AdminApp/Properties/PropertyCreate/PropertyCreate";
import PropertyUpdate from "./Components/AdminApp/Properties/PropertyUpdate/PropertyUpdate";
/* OpenForSale Page */
import OpenForSaleList from "./Components/AdminApp/OpenForSales/OpenForSaleList/OpenForSaleList";
import OpenForSaleCreate from "./Components/AdminApp/OpenForSales/OpenForSaleCreate/OpenForSaleCreate";
import OpenForSaleUpdate from "./Components/AdminApp/OpenForSales/OpenForSaleUpdate/OpenForSaleUpdate";
import OpenForSaleDetail from "./Components/AdminApp/OpenForSales/OpenForSaleDetails/OpenForSaleDetails";

/*Promotion*/
import PromotionList from "./Components/AdminApp/Promotions/PromotionsList/PromotionList";
import PromotionCreate from "./Components/AdminApp/Promotions/PromotionsCreate/PromotionCreate";
import PromotionDetail from "./Components/AdminApp/Promotions/PromotionsDetails/PromotionDetails";
import PromotionUpdate from "./Components/AdminApp/Promotions/PromotionsUpdate/PromotionsUpdate";

import SalePoliciesList from "./Components/AdminApp/SalePolicies/SalePoliciesList/SalesPolicyList";

// Project category detail
import ProjectCategoryDetail from "./Components/AdminApp/ProjectCategoryDetail/ProjectCategoryDetail";
import Contract from "./Components/AdminApp/Contract/Contract";
import FormContractUpdate from "./Components/AdminApp/Contract/Components/Form/FormContractUpdate";
import FormContractCreate from "./Components/AdminApp/Contract/Components/Form/FormContractCreate";
import ContractDetail from "./Components/AdminApp/Contract/Components/Detail/ContractDetail";

// Bookings
import Bookings from "./Components/AdminApp/Bookings/Bookings";
import FormUpdateBookings from "./Components/AdminApp/Bookings/Form/FormUpdateBookings";
import LoginV2 from "./Components/Auth/LoginV2/LoginV2";

/* Block Page */
import BlockList from "./Components/AdminApp/Blocks/BlockList/BlockList";
import BlockDetail from "./Components/AdminApp/Blocks/BlockDetail/BlockDetail";
import BlockCreate from "./Components/AdminApp/Blocks/BlockCreate/BlockCreate";
import BlockUpdate from "./Components/AdminApp/Blocks/BlockUpdate/BlockUpdate";

/* Floor Page */
import FloorList from "./Components/AdminApp/Floors/FloorList/FloorList";
import FloorDetail from "./Components/AdminApp/Floors/FloorDetail/FloorDetail";
import FloorCreate from "./Components/AdminApp/Floors/FloorCreate/FloorCreate";
import FloorUpdate from "./Components/AdminApp/Floors/FloorUpdate/FloorUpdate";

/* Zone Page */
import ZoneList from "./Components/AdminApp/Zones/ZoneList/ZoneList";
import ZoneDetail from "./Components/AdminApp/Zones/ZoneDetail/ZoneDetail";
import ZoneCreate from "./Components/AdminApp/Zones/ZoneCreate/ZoneCreate";
import ZoneUpdate from "./Components/AdminApp/Zones/ZoneUpdate/ZoneUpdate";

/* Unittypes Page */
import UnittypeList from "./Components/AdminApp/Unittypes/UnittypeList/UnittypeList";
import UnittypeDetail from "./Components/AdminApp/Unittypes/UnittypeDetail/UnittypeDetail";
import UnittypeCreate from "./Components/AdminApp/Unittypes/UnittypeCreate/UnittypeCreate";
import UnittypeUpdate from "./Components/AdminApp/Unittypes/UnittypeUpdate/UnittypeUpdate";

/*  PaymentProcess Page */
import PaymentProcessList from "./Components/AdminApp/PaymentProcess/PaymentProcessList/PaymentProcessList";
import PaymentProcessDetail from "./Components/AdminApp/PaymentProcess/PaymentProcessDetail/PaymentProcessDetail";
import PaymentProcessCreate from "./Components/AdminApp/PaymentProcess/PaymentProcessCreate/PaymentProcessCreate";
import PaymentProcessUpdate from "./Components/AdminApp/PaymentProcess/PaymentProcessUpdate/PaymentProcessUpdate";

/*  PaymentProcessDetail Page */
import PaymentProcessDetailList from "./Components/AdminApp/PaymentProcessDetail/PaymentProcessList/PaymentProcessList";
import PaymentProcessDetailDetail from "./Components/AdminApp/PaymentProcessDetail/PaymentProcessDetail/PaymentProcessDetail";
import PaymentProcessDetailCreate from "./Components/AdminApp/PaymentProcessDetail/PaymentProcessCreate/PaymentProcessCreate";
import PaymentProcessDetailUpdate from "./Components/AdminApp/PaymentProcessDetail/PaymentProcessUpdate/PaymentProcessUpdate";

import StaffList from "./Components/AdminApp/Staff/StaffList/StaffList";
import StaffDetailCheckin from "./Components/AdminApp/Staff/BookingDetails/BookingDetailsCheck";
import StaffProperty from "./Components/AdminApp/Staff/PropertySelect/PropertySelect";
import StaffDetails from "./Components/AdminApp/Staff/StaffDetails/StaffDetails";
import StaffUpdate from "./Components/AdminApp/Staff/StaffUpdate/StaffUpdate";
import StaffCreate from "./Components/AdminApp/Staff/StaffCreate/StaffCreate";

import CustomerList from "./Components/AdminApp/Customer/CustomerList/CustomerList";
import CustomerDetail from "./Components/AdminApp/Customer/CustomerDetail/CustomerDetail";
import CustomerUpdate from "./Components/AdminApp/Customer/CustomerUpdate/CustomerUpdate";
import CustomerCreate from "./Components/AdminApp/Customer/CustomerCreate/CustomerCreate";

import OpenForSaleDetailList from "./Components/AdminApp/OpenForSaleDetail/OpenForSaleDetailList/OpenForSaleDetailList";
import OpenForSaleDetailAllList from "./Components/AdminApp/OpenForSaleDetail/OpenForSaleDetail/OpenForSaleDetailAllList";
import ContractPaymentDetailList from "./Components/AdminApp/ContractPaymentDetail/ContractPaymentDetailList/ContractPaymentDetailList";
import ContractPaymentDetailUpdate from "./Components/AdminApp/ContractPaymentDetail/ContractPaymentUpdate/ContractPaymentUpdate";
/*  PromotionDetail Page */
import PromotionDetailList from "./Components/AdminApp/PromotionDetail/PromotionDetailList/PromotionDetailList";
import PromotionDetailDetail from "./Components/AdminApp/PromotionDetail/PromotionDetailDetail/PromotionDetailDetail";
import PromotionDetailUpdate from "./Components/AdminApp/PromotionDetail/PromotionDetailUpdate/PromotionDetailUpdate";
import PromotionDetailCreate from "./Components/AdminApp/PromotionDetail/PromotionDetailCreate/PromotionDetailCreate";
import PromotionDetailListByPromotionID from "./Components/AdminApp/PromotionDetail/PromotionListByPromotionID/ProtionListByPromtionID";

import DocumentList from "./Components/AdminApp/Document/DocumentList";
import DocumentShow from "./Components/AdminApp/Document/DocumentShow";

import OpenForSaleDetailUpdate from "./Components/AdminApp/OpenForSaleDetail/OpenForSaleDetailDetail/OpenForSaleDetailDetail";

import PropertyTypeList from "./Components/AdminApp/PropertyType/PropertyTypeList/PropertyTypeList";
import PropertyTypeDetail from "./Components/AdminApp/PropertyType/PropertyTypeDetails/PropertyTypeDetails";
import PropertyTypeUpdate from "./Components/AdminApp/PropertyType/PropertyTypeUpdate/PropertyTypeUpdate";
import PropertyTypeCreate from "./Components/AdminApp/PropertyType/PropertyTypeCreate/PropertyTypeCreate";

import AccountList from "./Components/AdminApp/Account/AccountList/AccountList";
import AccountDetail from "./Components/AdminApp/Account/AccountDetail/AccountDetail";
import AccountUpdate from "./Components/AdminApp/Account/AccountUpdate/AccountUpdate";
import AccountCreate from "./Components/AdminApp/Account/AccountCreate/AccountCreate";

import PaymentPolicy from "./Components/AdminApp/PaymentPolicy/PaymentPolicy/PaymentPolicy";

import NotificationList from "./Components/AdminApp/Notification/NotificationList/NotificationList";
import NotificationDetail from "./Components/AdminApp/Notification/NotificationDetail/NotificationDetail";
import NotificationUpdate from "./Components/AdminApp/Notification/NotificationUpdate/NotificationUpdate";
import NotificationCreate from "./Components/AdminApp/Notification/NotificactionCreate/NotificationCreate";
import NotificationListByCustomerID from "./Components/AdminApp/Notification/NotificationListByCustomerID/NotificationListByCumtomerID";

/*  Payment Page */
import PaymentList from "./Components/AdminApp/Payment/PaymentList/PaymentList";
import PaymentDetail from "./Components/AdminApp/Payment/PaymentDetail/PaymentDetail";
import PaymentCreate from "./Components/AdminApp/Payment/PaymentCreate/PaymentCreate";
import PaymentUpdate from "./Components/AdminApp/Payment/PaymentUpdate/PaymentUpdate";

import OpenForSaleDetailByID from "./Components/AdminApp/OpenForSaleDetail/OpenForSaleDetailByID/OpenForSaleDetailByID";

/*  Properties Categories Page */
import PropertyCategoryList from "./Components/AdminApp/PropertyCategory/PropertyCategoryList/PropertyCategoryList";
import PropertyCategoryDetail from "./Components/AdminApp/PropertyCategory/PropertyCategoryDetail/PropertyCategoryDetail";
import PropertyCategoryCreate from "./Components/AdminApp/PropertyCategory/PropertyCategoryCreate/PropertyCategoryCreate";
import PropertyCategoryUpdate from "./Components/AdminApp/PropertyCategory/PropertyCategoryUpdate/PropertyCategoryUpdate";

function Public() {
    const authen = sessionStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!authen) {
            navigate("/login");
        }
    }, []);

    return (<Routes>
            {/* Auth Page */}
            <Route path="/login" element={<LoginV2/>}/>
            {/* Dashboard Page */}
            <Route path="/dashboard" element={<Dashboard/>}/>
            {/* Projects Page */}
            <Route path="/projects/list" element={<ProjectList/>}/>
            <Route path="/projects/detail/:id" element={<ProjectDetail/>}/>
            <Route path="/projects/create" element={<ProjectCreate/>}/>
            <Route path="/projects/update/:id" element={<ProjectUpdate/>}/>
            {/* Properties Page */}
            <Route path="/properties/list" element={<PropertyList/>}/>
            <Route path="/properties/detail/:id" element={<PropertyDetail/>}/>
            <Route path="/properties/create" element={<PropertyCreate/>}/>
            <Route path="/properties/update/:id" element={<PropertyUpdate/>}/>
            {/* Properties Categories Page */}
            <Route path="/property-categories/list" element={<PropertyCategoryList/>}/>
            <Route path="/property-categories/create" element={<PropertyCategoryCreate/>}/>
            <Route path="/property-categories/update/:id" element={<PropertyCategoryUpdate/>}/>
            <Route path="/property-categories/detail/:id" element={<PropertyCategoryDetail/>}/>
            {/* OpenForSales Page */}
            <Route path="/openforsales/list" element={<OpenForSaleList/>}/>
            <Route path="/openforsales/create" element={<OpenForSaleCreate/>}/>
            <Route path="/openforsales/update/:id" element={<OpenForSaleUpdate/>}/>
            <Route path="/openforsales/detail/:id" element={<OpenForSaleDetail/>}/>
            {/* Promotions Page */}
            <Route path="/promotions/list" element={<PromotionList/>}/>
            <Route path="/promotions/create" element={<PromotionCreate/>}/>
            <Route path="/promotions/detail/:id" element={<PromotionDetail/>}/>
            <Route path="/promotions/update/:id" element={<PromotionUpdate/>}/>

            <Route path="/salepolicy/list" element={<SalePoliciesList/>}/>
            {/* Project Category Detail Page */}
            <Route
                path="/project-category-detail"
                element={<ProjectCategoryDetail/>}
            />
            {/* Contract */}
            <Route path="/contract" element={<Contract/>}/>
            <Route path="/contract/create" element={<FormContractCreate/>}/>
            <Route path="/contract/edit/:id" element={<FormContractUpdate/>}/>
            <Route path="/contract/detail/:id" element={<ContractDetail/>}/>

            {/* Bookings */}
            <Route path="/bookings" element={<Bookings/>}/>
            <Route path="/bookings/edit/:id" element={<FormUpdateBookings/>}/>

            {/* Blocks */}
            <Route path="/blocks/list" element={<BlockList/>}/>
            <Route path="/blocks/create" element={<BlockCreate/>}/>
            <Route path="/blocks/detail/:id" element={<BlockDetail/>}/>
            <Route path="/blocks/update/:id" element={<BlockUpdate/>}/>

            {/* Floors */}
            <Route path="/floors/list" element={<FloorList/>}/>
            <Route path="/floors/create" element={<FloorCreate/>}/>
            <Route path="/floors/detail/:id" element={<FloorDetail/>}/>
            <Route path="/floors/update/:id" element={<FloorUpdate/>}/>

            {/* Zones */}
            <Route path="/zones/list" element={<ZoneList/>}/>
            <Route path="/zones/create" element={<ZoneCreate/>}/>
            <Route path="/zones/detail/:id" element={<ZoneDetail/>}/>
            <Route path="/zones/update/:id" element={<ZoneUpdate/>}/>

            {/* Unittypes */}
            <Route path="/unittypes/list" element={<UnittypeList/>}/>
            <Route path="/unittypes/create" element={<UnittypeCreate/>}/>
            <Route path="/unittypes/detail/:id" element={<UnittypeDetail/>}/>
            <Route path="/unittypes/update/:id" element={<UnittypeUpdate/>}/>

            <Route path="/staff/list" element={<StaffList/>}/>
            <Route
                path="/staff/detailcheckin/:openingForSaleID"
                element={<StaffDetailCheckin/>}
            />
            <Route
                path="/staff/propertylist/:categoryDetailID"
                element={<StaffProperty/>}
            />
            <Route path="/staff/detail/:id" element={<StaffDetails/>}/>
            <Route path="/staff/update/:id" element={<StaffUpdate/>}/>
            <Route path="/staff/create" element={<StaffCreate/>}/>

            <Route path="/customers/list" element={<CustomerList/>}/>
            <Route path="/customers/detail/:id" element={<CustomerDetail/>}/>
            <Route path="/customers/update/:id" element={<CustomerUpdate/>}/>
            <Route path="/customers/create" element={<CustomerCreate/>}/>

            <Route
                path="/openforsaledetails/list/:openingForSaleID"
                element={<OpenForSaleDetailList/>}
            />
            <Route
                path="/openforsaledetails/list"
                element={<OpenForSaleDetailAllList/>}
            />
            <Route
                path="/contractpaymentdetail/list/:contractID"
                element={<ContractPaymentDetailList/>}
            />
            <Route
                path="/contractpaymentdetail/update/:contractID/:id"
                element={<ContractPaymentDetailUpdate/>}
            />
            <Route
                path="/openforsaledetails/update/:propertyID/:openingForSaleID"
                element={<OpenForSaleDetailUpdate/>}
            />

            {/* Payment Processes */}
            <Route path="/paymentprocesses/list" element={<PaymentProcessList/>}/>
            <Route
                path="/paymentprocesses/create"
                element={<PaymentProcessCreate/>}
            />
            <Route
                path="/paymentprocesses/detail/:id"
                element={<PaymentProcessDetail/>}
            />
            <Route
                path="/paymentprocesses/update/:id"
                element={<PaymentProcessUpdate/>}
            />

            {/* Payment Processes Detail*/}
            <Route
                path="/paymentprocessesdetail/list"
                element={<PaymentProcessDetailList/>}
            />
            <Route
                path="/paymentprocessesdetail/create"
                element={<PaymentProcessDetailCreate/>}
            />
            <Route
                path="/paymentprocessesdetail/detail/:id"
                element={<PaymentProcessDetailDetail/>}
            />
            <Route
                path="/paymentprocessesdetail/update/:id"
                element={<PaymentProcessDetailUpdate/>}
            />
            <Route
                path="/paymentprocessesdetail/list/:paymentProcessID"
                element={<PaymentProcessDetailList/>}
            />

            {/* Promotion Detail */}
            <Route path="/promotiondetails/list" element={<PromotionDetailList/>}/>
            <Route
                path="/promotiondetails/create"
                element={<PromotionDetailCreate/>}
            />
            <Route
                path="/promotiondetails/detail/:id"
                element={<PromotionDetailDetail/>}
            />
            <Route
                path="/promotiondetails/update/:id"
                element={<PromotionDetailUpdate/>}
            />
            <Route
                path="/promotiondetails/list/:promotionID"
                element={<PromotionDetailListByPromotionID/>}
            />

            <Route path="/document/list/" element={<DocumentList/>}/>
            <Route path="/document/detail/:id" element={<DocumentShow/>}/>

            <Route path="/propertytype/list" element={<PropertyTypeList/>}/>
            <Route path="/propertytype/detail/:id" element={<PropertyTypeDetail/>}/>
            <Route path="/propertytype/update/:id" element={<PropertyTypeUpdate/>}/>
            <Route path="/propertytype/create" element={<PropertyTypeCreate/>}/>

            <Route path="/paymentpolicy/list" element={<PaymentPolicy/>}/>

            <Route path="/accounts/list" element={<AccountList/>}/>
            <Route path="/accounts/detail/:id" element={<AccountDetail/>}/>
            <Route path="/accounts/update/:id" element={<AccountUpdate/>}/>
            <Route path="/accounts/create" element={<AccountCreate/>}/>

            <Route path="/notification/list" element={<NotificationList/>}/>
            <Route path="/notification/detail/:id" element={<NotificationDetail/>}/>
            <Route path="/notification/update/:id" element={<NotificationUpdate/>}/>
            <Route path="/notification/create" element={<NotificationCreate/>}/>
            <Route
                path="/notification/list/:customerID"
                element={<NotificationListByCustomerID/>}
            />

            {/* Payment Detail */}
            <Route path="/payments/list" element={<PaymentList/>}/>
            <Route path="/payments/create" element={<PaymentCreate/>}/>
            <Route path="/payments/detail/:id" element={<PaymentDetail/>}/>
            <Route path="/payments/update/:id" element={<PaymentUpdate/>}/>

            <Route
                path="/openforsaledetails/detail/:propertyID/:openingForSaleID"
                element={<OpenForSaleDetailByID/>}
            />
        </Routes>);
}

export default Public;
