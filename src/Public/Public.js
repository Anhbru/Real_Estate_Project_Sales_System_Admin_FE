import React, {useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
/* Auth Page */
import Login from "./Components/Auth/Login/Login";
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
import FormContractCreate from "./Components/AdminApp/Contract/Components/Form/FormContractCreate";

// Bookings
import Bookings from "./Components/AdminApp/Bookings/Bookings";
import FormContractUpdate from "./Components/AdminApp/Contract/Components/Form/FormContractUpdate";
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
import PaymentProcessDetailDetail
    from "./Components/AdminApp/PaymentProcessDetail/PaymentProcessDetail/PaymentProcessDetail";
import PaymentProcessDetailCreate
    from "./Components/AdminApp/PaymentProcessDetail/PaymentProcessCreate/PaymentProcessCreate";
import PaymentProcessDetailUpdate
    from "./Components/AdminApp/PaymentProcessDetail/PaymentProcessUpdate/PaymentProcessUpdate";

import StaffList from './Components/AdminApp/Staff/BookingList/BookingList';
import StaffDetailCheckin from './Components/AdminApp/Staff/BookingDetails/BookingDetailsCheck';
import StaffProperty from './Components/AdminApp/Staff/PropertySelect/PropertySelect';

import CustomerList from './Components/AdminApp/Customer/CustomerList/CustomerList';
import CustomerDetail from './Components/AdminApp/Customer/CustomerDetail/CustomerDetail';
import CustomerUpdate from './Components/AdminApp/Customer/CustomerUpdate/CustomerUpdate';
import CustomerCreate from './Components/AdminApp/Customer/CustomerCreate/CustomerCreate';

import OpenForSaleDetailList from './Components/AdminApp/OpenForSaleDetail/OpenForSaleDetailList/OpenForSaleDetailList';

import ContractPaymentDetailList
    from './Components/AdminApp/ContractPaymentDetail/ContractPaymentDetailList/ContractPaymentDetailList';
import ContractPaymentDetailUpdate
    from './Components/AdminApp/ContractPaymentDetail/ContractPaymentUpdate/ContractPaymentUpdate';
/* Main Page */

/*  PromotionDetail Page */
import PromotionDetailList from './Components/AdminApp/PromotionDetail/PromotionDetailList/PromotionDetailList';
import PromotionDetailDetail from './Components/AdminApp/PromotionDetail/PromotionDetailDetail/PromotionDetailDetail';
import PromotionDetailUpdate from './Components/AdminApp/PromotionDetail/PromotionDetailUpdate/PromotionDetailUpdate';
import PromotionDetailCreate from './Components/AdminApp/PromotionDetail/PromotionDetailCreate/PromotionDetailCreate';


import DocumentList from './Components/AdminApp/Document/DocumentList';
import DocumentShow from './Components/AdminApp/Document/DocumentShow';





import PropertyTypeList from './Components/AdminApp/PropertyType/PropertyTypeList/PropertyTypeList';
import PropertyTypeDetail from './Components/AdminApp/PropertyType/PropertyTypeDetails/PropertyTypeDetails';
import PropertyTypeUpdate from './Components/AdminApp/PropertyType/PropertyTypeUpdate/PropertyTypeUpdate';
import PropertyTypeCreate from './Components/AdminApp/PropertyType/PropertyTypeCreate/PropertyTypeCreate';






import PaymentPolicy from './Components/AdminApp/PaymentPolicy/PaymentPolicy/PaymentPolicy';
function Public() {
    const authen = sessionStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (!authen) {
            navigate("/login");
        }
    }, []);
    return (
        <Routes>
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
            <Route path="/project-category-detail" element={<ProjectCategoryDetail/>}
            />
            {/* Contract */}
            <Route path="/contract" element={<Contract/>}/>
            <Route path="/contract/create" element={<FormContractCreate/>}/>
            <Route path="/contract/edit/:id" element={<FormContractUpdate/>}/>

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
            <Route path='/staff/detailcheckin/:openingForSaleID' element={<StaffDetailCheckin/>}/>
            <Route path='/staff/propertylist/:categoryDetailID' element={<StaffProperty/>}/>

            <Route path="/customers/list" element={<CustomerList/>}/>
            <Route path='/customers/detail/:id' element={<CustomerDetail/>}/>
            <Route path='/customers/update/:id' element={<CustomerUpdate/>}/>
            <Route path='/customers/create' element={<CustomerCreate/>}/>

            <Route path='/openforsaledetails/list/:openingForSaleID' element={<OpenForSaleDetailList/>}/>

            <Route path="/contractpaymentdetail/list/:contractID" element={<ContractPaymentDetailList />} />
            <Route path="/contractpaymentdetail/update/:contractID/:id" element={<ContractPaymentDetailUpdate />} />
            

            {/* Payment Processes */}
            <Route path="/paymentprocesses/list" element={<PaymentProcessList/>}/>
            <Route path="/paymentprocesses/create" element={<PaymentProcessCreate/>}/>
            <Route path="/paymentprocesses/detail/:id" element={<PaymentProcessDetail/>}/>
            <Route path="/paymentprocesses/update/:id" element={<PaymentProcessUpdate/>}/>

            {/* Payment Processes Detail*/}
            <Route path="/paymentprocessesdetail/list" element={<PaymentProcessDetailList/>}/>
            <Route path="/paymentprocessesdetail/create" element={<PaymentProcessDetailCreate/>}/>
            <Route path="/paymentprocessesdetail/detail/:id" element={<PaymentProcessDetailDetail/>}/>
            <Route path="/paymentprocessesdetail/update/:id" element={<PaymentProcessDetailUpdate/>}/>

            {/* Promotion Detail */}
            <Route path="/promotiondetails/list" element={<PromotionDetailList/>}/>
            <Route path="/promotiondetails/create" element={<PromotionDetailCreate/>}/>
            <Route path="/promotiondetails/detail/:id" element={<PromotionDetailDetail/>}/>
            <Route path="/promotiondetails/update/:id" element={<PromotionDetailUpdate/>}/>

            <Route path='/document/list/' element={<DocumentList />}/>
            <Route path='/document/detail/:id' element={<DocumentShow />}/>

            <Route path='/propertytype/list' element={<PropertyTypeList />}/>
            <Route path='/propertytype/detail/:id' element={<PropertyTypeDetail />}/>
            <Route path='/propertytype/update/:id' element={<PropertyTypeUpdate />}/>
            <Route path='/propertytype/create' element={<PropertyTypeCreate />}/>


            <Route path='/paymentpolicy/list' element={<PaymentPolicy />}/>
        </Routes>
    );
}

export default Public;
