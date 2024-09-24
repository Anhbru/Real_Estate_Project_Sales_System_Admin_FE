import React from 'react';
import {Route, Routes} from 'react-router-dom';
/* Auth Page */
import Login from './Components/Auth/Login/Login';

/* Main Page */
function Public() {
    return (
        <div>
            <Routes>
                {/* Auth Page */}
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </div>
    )
}

export default Public
