import React from 'react';
import { Route, Routes } from 'react-router-dom';
/* Auth Page */
import Login from './Components/Auth/Login/Login';
/* Dashboard Page */
import Dashboard from './Components/AdminApp/Dashboard/Dashboard';
/* Projects Page */
import ProjectList from './Components/AdminApp/Projects/ProjectList/ProjectList';
import ProjectDetail from './Components/AdminApp/Projects/ProjectDetail/ProjectDetail';
import ProjectCreate from './Components/AdminApp/Projects/ProjectCreate/ProjectCreate';
import ProjectUpdate from './Components/AdminApp/Projects/ProjectUpdate/ProjectUpdate';
/* Properties Page */
import PropertyList from './Components/AdminApp/Properties/PropertyList/PropertyList';
import PropertyDetail from './Components/AdminApp/Properties/PropertyDetail/PropertyDetail';
import PropertyCreate from './Components/AdminApp/Properties/PropertyCreate/PropertyCreate';
import PropertyUpdate from './Components/AdminApp/Properties/PropertyUpdate/PropertyUpdate';
/* OpenForSale Page */
import OpenForSaleList from './Components/AdminApp/OpenForSales/OpenForSaleList/OpenForSaleList';
import OpenForSaleCreate from './Components/AdminApp/OpenForSales/OpenForSaleCreate/OpenForSaleCreate';
import OpenForSaleUpdate from './Components/AdminApp/OpenForSales/OpenForSaleUpdate/OpenForSaleUpdate';
import OpenForSaleDetail from './Components/AdminApp/OpenForSales/OpenForSaleDetails/OpenForSaleDetails';

/*Promotion*/
import PromotionList from './Components/AdminApp/Promotions/PromotionsList/PromotionList';
import PromotionCreate from './Components/AdminApp/Promotions/PromotionsCreate/PromotionCreate';
import PromotionDetail from './Components/AdminApp/Promotions/PromotionsDetails/PromotionDetails';
import PromotionUpdate from './Components/AdminApp/Promotions/PromotionsUpdate/PromotionsUpdate';

import SalePoliciesList from './Components/AdminApp/SalePolicies/SalePoliciesList/SalePolicList';


/* Main Page */
function Public() {
    return (
        <div>
            <Routes>
                {/* Auth Page */}
                <Route path='/login' element={<Login />} />
                {/* Dashboard Page */}
                <Route path='/dashboard' element={<Dashboard />} />
                {/* Projects Page */}
                <Route path='/projects/list' element={<ProjectList />} />
                <Route path='/projects/detail/:id' element={<ProjectDetail />} />
                <Route path='/projects/create' element={<ProjectCreate />} />
                <Route path='/projects/update/:id' element={<ProjectUpdate />} />
                {/* Properties Page */}
                <Route path='/properties/list' element={<PropertyList />} />
                <Route path='/properties/detail/:id' element={<PropertyDetail />} />
                <Route path='/properties/create' element={<PropertyCreate />} />
                <Route path='/properties/update/:id' element={<PropertyUpdate />} />
                {/* OpenForSales Page */}
                <Route path='/openforsales/list' element={<OpenForSaleList />} />
                <Route path='/openforsales/create' element={<OpenForSaleCreate />} />
                <Route path='/openforsales/update/:id' element={<OpenForSaleUpdate />} />
                <Route path='/openforsales/detail/:id' element={<OpenForSaleDetail />} />
                {/* Promotions Page */}
                <Route path="/promotions/list" element={<PromotionList />} />
                <Route path="/promotions/create" element={<PromotionCreate />}/>
                <Route path='/promotions/detail/:id' element={<PromotionDetail />} />
                <Route path='/promotions/update/:id' element={<PromotionUpdate />} />

                <Route path="/salepolicy/list" element={<SalePoliciesList/>} />
            </Routes>
        </div>
    )
}

export default Public
