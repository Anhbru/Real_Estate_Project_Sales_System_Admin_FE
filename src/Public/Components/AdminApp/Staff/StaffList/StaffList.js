import React, { useEffect, useState } from "react";
import staffService from "../../../Service/StaffService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Page403 from "../../../Shared/Admin/Utils/403";

function StaffList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const getListStaffs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await staffService.getList();
      console.log("Staffs Response:", res.data);
      if (res.status === 200) {
        setData(Array.isArray(res.data) ? res.data : []);
      } else {
        setError("Failed to fetch staff data.");
      }
    } catch (err) {
      setError("Error fetching staff data: " + err.message);
      console.error("Error fetching staff data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (staffID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this staff?"
    );
    if (!confirmDelete) return;

    try {
      const res = await staffService.delete(staffID);
      if (res.status === 200) {
        setSuccessMessage("Staff deleted successfully.");
        setData(data.filter((item) => item.staffID !== staffID));
      } else {
        setError("Failed to delete staff.");
      }
    } catch (err) {
      setError("Error deleting staff: " + err.message);
      console.error("Error deleting staff:", err);
    }
  };

  useEffect(() => {
    getListStaffs();
  }, []);

  const roleAccount = sessionStorage.getItem("userRole");
  console.log("🚀 ~ StaffList ~ roleAccount:", roleAccount);
  if (roleAccount === "Staff") {
    return <Page403 />;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Staff List</h1>
        </div>
        <section className="section">
          <div className="d-flex justify-content-between align-items-center">
            <input
              type="text"
              className="input_search"
              placeholder="Search staff"
            />
            <a href="/staff/create" className="btn_go_">
              ADD NEW <img src="/assets/icon/plus_icon.png" alt="" />
            </a>
          </div>

          <div className="content_ table_list_">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <>
                {successMessage && (
                  <div className="success">{successMessage}</div>
                )}
                {data.length === 0 ? (
                  <p>No staff found.</p>
                ) : (
                  <table className="table datatable">
                    <colgroup>
                      <col width="5%" />
                      <col width="15%" />
                      <col width="15%" />
                      <col width="15%" />
                      <col width="15%" />
                      <col width="20%" />
                      <col width="10%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">ID Card</th>
                        <th scope="col">Nationality</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.staffID}>
                          <th>{index + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.identityCardNumber}</td>
                          <td>{item.nationality}</td>
                          <td>{item.placeOfResidence}</td>
                          <td style={{ color: item.status ? "green" : "red" }}>
                            {item.status ? "Active" : "Inactive"}
                          </td>
                          <td>
                            <p className="nav-item dropdown">
                              <a
                                className="nav-link"
                                data-bs-toggle="dropdown"
                                href="#"
                                role="button"
                                aria-expanded="false"
                              >
                                <img src="/assets/icon/more_icon.png" alt="" />
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href={"/staff/detail/" + item.staffID}
                                  >
                                    Detail
                                  </a>
                                </li>
                                <li>
                                  <hr className="dropdown-divider" />
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    href={"/staff/update/" + item.staffID}
                                  >
                                    Update
                                  </a>
                                </li>
                                <li>
                                  <hr className="dropdown-divider" />
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item text-danger"
                                    onClick={() => handleDelete(item.staffID)}
                                  >
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default StaffList;
