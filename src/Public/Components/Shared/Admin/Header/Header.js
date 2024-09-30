import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import accountService from "../../../Service/AccountService";
import Css from '../Lib/StyleSheet';
import Script from '../Lib/Script';
import $ from 'jquery';

function IsAdmin() {
    return (
        <>
            <li>
                <Link className="dropdown-item d-flex align-items-center" to="/admin/dashboard">
                    <i className="bi bi-0-circle"/>
                    <span>Trang quản trị</span>
                </Link>
            </li>
            <li>
                <hr className="dropdown-divider"/>
            </li>
        </>
    )
}

function Header() {
    const AuthName = sessionStorage.getItem("username");
    const tokenUser = sessionStorage.getItem("accessToken");
    const idUser = sessionStorage.getItem("id");
    const navigate = useNavigate();

    const login = async () => {
        if (AuthName == null || tokenUser == null || idUser == null) {
            navigate("/not-found")
        }
    };

    let isAdmin = true;

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        alert('Logout success!')
        window.location.href = `/login`;
    }

    const [data, setData] = useState([]);

    const isUser = async () => {
        await accountService.findUserByUsername(AuthName)
            .then((res) => {
                setData(res.data);
                console.log("data:", JSON.parse(JSON.stringify(res.data)));
                let user = JSON.parse(JSON.stringify(res.data));
                setData(user);
                if (user.userRole === "ADMIN") {
                    localStorage.setItem('isAdmin', 1);
                } else {
                    navigate('/not-found')
                }
            })
            .catch((err) => {
                console.log(err);
                navigate('/not-found');
            });
    };


    let admin = localStorage.getItem('isAdmin')

    if (admin == null) {
        isAdmin = false;
    }


    function hiddenOrShow() {
        $('body').toggleClass('toggle-sidebar');
    }

    useEffect(() => {
        isUser();
        login();
    }, []);

    return (
        <>
            <Css/>
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <a href="/" className="logo d-flex align-items-center">
                        <img src="/assets/admin/img/logo.png" alt=""/>
                        <span className="d-none d-lg-block">RealEstate Website</span>
                    </a>
                    <i className="bi bi-list toggle-sidebar-btn" onClick={hiddenOrShow}></i>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item dropdown pe-3">
                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#"
                               data-bs-toggle="dropdown">
                                <img src={data.avatar} alt="Profile" className="rounded-circle"/>
                                <span className="d-none d-md-block dropdown-toggle ps-2">{data.fullName}</span>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{data.fullName}</h6>
                                    <span>{data.userName}</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li>
                                    <a className="dropdown-item d-flex align-items-center" href="/profile">
                                        <i className="bi bi-person"></i>
                                        <span>Trang cá nhân</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                {isAdmin ? <IsAdmin/> : null}

                                <li>
                                    <a className="dropdown-item d-flex align-items-center"
                                       onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Đăng xuất</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
            <Script/>
        </>
    )
}

export default Header
