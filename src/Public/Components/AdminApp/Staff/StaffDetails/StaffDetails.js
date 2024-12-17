import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { message, Spin } from "antd";
import staffService from "../../../Service/StaffService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { getRoleUserAdmin } from "../../../Shared/Admin/Utils/getRoleUser";
import Page403 from "../../../Shared/Admin/Utils/403";

function StaffDetail() {
  const [staff, setStaff] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const detailStaff = async () => {
    try {
      console.log("Fetching staff details for ID:", id);
      const res = await staffService.detail(id);
      console.log("Detail staff response:", res.data);
      if (res.data) {
        setStaff(res.data);
      } else {
        message.warning("Staff not found");
      }
    } catch (err) {
      console.error("Error fetching staff details:", err);
      message.error("Failed to load staff details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    detailStaff();
  }, [id]);

  if (loading) return <Spin tip="Loading..." />;

  if (!staff || Object.keys(staff).length === 0) {
    return <div>No staff data available.</div>;
  }

  const roleUser = getRoleUserAdmin();
  return (
    <>
      {!roleUser ? (
        <Page403 />
      ) : (
        <>
          <Header />
          <Sidebar />
          <main id="main" className="main">
            <div className="back_to_page_">
              <Link to="/staff/list" className="back__url_">
                <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to
                staff list
              </Link>
            </div>
            <div className="pagetitle">
              <h1>{staff.name}</h1>
            </div>
            <section className="section detail_page_">
              <div className="content_page_">
                <div className="info_area_">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="title_">General information</p>
                    <Link
                      to={`/staff/update/${staff.staffID}`}
                      className="edit_tab_"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="content_">
                    <div className="row">
                      <div className="d-flex align-items-center justify-content-start col-md-6">
                        <p className="key_">Full Name: </p>
                        <p className="val_ text-truncate">{staff.name}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-start col-md-6">
                        <p className="key_">Date Of Birth: </p>
                        <p className="val_ text-truncate">
                          {staff.dateOfBirth}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="d-flex align-items-center justify-content-start col-md-6">
                        <p className="key_">ID Card: </p>
                        <p className="val_ text-truncate">
                          {staff.identityCardNumber}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-start col-md-6">
                        <p className="key_">Nationality: </p>
                        <p className="val_ text-truncate">
                          {staff.nationality}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="d-flex align-items-center justify-content-start col-md-6">
                        <p className="key_">Address: </p>
                        <p className="val_ text-truncate">
                          {staff.placeOfResidence}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-start col-md-6">
                        <p className="key_">Place Of Origin: </p>
                        <p className="val_ text-truncate">
                          {staff.placeOfOrigin}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="d-flex align-items-center justify-content-start col-md-6">
                        <p className="key_">Email: </p>
                        <p className="val_ text-truncate">{staff.email}</p>
                      </div>

                      <div className="d-flex align-items-center justify-content-start col-md-6">
                        <p className="key_">Status: </p>
                        <p
                          className="val_ text-truncate"
                          style={{ color: staff.status ? "green" : "red" }}
                        >
                          {staff.status ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
}

export default StaffDetail;
