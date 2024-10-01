import React from 'react';
import {Route, Routes} from 'react-router-dom';
/* Auth Page */
import Login from './Components/Auth/Login/Login';
import Dashboard from './Components/AdminApp/Dashboard/Dashboard';

/* Main Page */
function Public() {
    return (
        <div>
            <Routes>
                {/* Auth Page */}
                <Route path='/login' element={<Login/>}/>
                {/* Dashboard Page */}
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
        </div>
    )
}

export default Public
