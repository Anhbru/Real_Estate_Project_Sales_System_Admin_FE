import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Css from "../Lib/StyleSheet";
import Script from "../Lib/Script";
import $ from "jquery";
import { toast } from "react-toastify";
import accountService from "../../../Service/AccountService";

function Header() {
  const navigate = useNavigate();
  const tokenUser = sessionStorage.getItem("accessToken");
  const userRole = sessionStorage.getItem("userRole");
  const [idAccount, setIdAccount] = useState("");

  const getIdAccount = async () => {
    await accountService
      .getIdAccount(tokenUser)
      .then((res) => {
        console.log(res.data);
        setIdAccount(res.data?.accountID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getIdAccount();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    toast.success("Logout success!");
    navigate("/login");
  };

  function hiddenOrShow() {
    $("body").toggleClass("toggle-sidebar");
  }

  useEffect(() => {
    if (!tokenUser) {
      navigate("/login");
    }
  }, [tokenUser]);

  const [dataUser, setDataUser] = useState({
    staffID: "",
    name: "",
    personalEmail: "",
    dateOfBirth: "",
    image: "",
    identityCardNumber: "",
    nationality: "",
    placeOfOrigin: "",
    placeOfResidence: "",
    status: true,
    accountID: "",
    email: "",
  });

  const getProfileAccount = async () => {
    await accountService
      .getProfile(idAccount)
      .then((res) => {
        setDataUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (idAccount) {
      getProfileAccount();
    }
  }, [idAccount]);

  return (
    <>
      <Css />
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between h-100">
          <a
            href="/dashboard"
            className="logo d-flex align-items-center justify-content-center"
          >
            <img src="/assets/img/logo.png" alt="" />
          </a>
          <i
            className="bi bi-list toggle-sidebar-btn"
            onClick={hiddenOrShow}
          ></i>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={dataUser.image || "/assets/img/profile-img.jpg"}
                  alt="Profile"
                  className="rounded-circle"
                />
                <div className="d-none d-md-block ps-4  dropdown_action_">
                 
                </div>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{dataUser.name || "Admin"}</h6>
                  <span>{userRole}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Đăng xuất</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
      <Script />
    </>
  );
}

export default Header;
