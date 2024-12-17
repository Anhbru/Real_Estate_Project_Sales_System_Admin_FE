import React, { useEffect, useState } from "react";
import accountService from "../../../Service/AccountService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import Page403 from "../../../Shared/Admin/Utils/403";

function AccountList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const getListAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await accountService.getList();
      console.log("Accounts Response:", res.data);
      if (res.status === 200) {
        setData(Array.isArray(res.data) ? res.data : []);
      } else {
        setError("Failed to fetch accounts.");
      }
    } catch (err) {
      setError("Error fetching accounts: " + err.message);
      console.error("Error fetching accounts:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (accountID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Account?"
    );
    if (!confirmDelete) return;

    try {
      const res = await accountService.delete(accountID);
      if (res.status === 200) {
        setSuccessMessage("Staff deleted successfully.");
        setData(data.filter((item) => item.accountID !== accountID));
      } else {
        setError("Failed to delete staff.");
      }
    } catch (err) {
      setError("Error deleting staff: " + err.message);
      console.error("Error deleting staff:", err);
    }
  };

  useEffect(() => {
    getListAccounts();
  }, []);

  return (
    <>
      {error ? (
        <Page403 />
      ) : (
        <>
          <Header />
          <Sidebar />
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>Account List</h1>
            </div>
            <section className="section">
              <div className="d-flex justify-content-between align-items-center">
                <input
                  type="text"
                  className="input_search"
                  placeholder="Search accounts"
                />
                <a href="/accounts/create" className="btn_go_">
                  ADD NEW <img src="/assets/icon/plus_icon.png" alt="" />
                </a>
              </div>

              <div className="content_ table_list_">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {data.length === 0 ? (
                      <p>No accounts found.</p>
                    ) : (
                      <table className="table datatable">
                        <colgroup>
                          <col width="5%" />
                          <col width="20%" />
                          <col width="20%" />
                          <col width="20%" />
                          <col width="20%" />
                          <col width="15%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Status</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={item.accountID}>
                              <th>{index + 1}</th>
                              <td>{item.email}</td>
                              <td>{item.password}</td>
                              <td
                                style={{ color: item.status ? "green" : "red" }}
                              >
                                {item.status ? "Active" : "Inactive"}
                              </td>
                              <td>{item.roleName}</td>
                              <td>
                                <p className="nav-item dropdown">
                                  <a
                                    className="nav-link"
                                    data-bs-toggle="dropdown"
                                    href="#"
                                    role="button"
                                    aria-expanded="false"
                                  >
                                    <img
                                      src="/assets/icon/more_icon.png"
                                      alt=""
                                    />
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href={
                                          "/accounts/detail/" + item.accountID
                                        }
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
                                        href={
                                          "/accounts/update/" + item.accountID
                                        }
                                      >
                                        Update
                                      </a>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item text-danger"
                                        onClick={() =>
                                          handleDelete(item.accountID)
                                        }
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
      )}
    </>
  );
}

export default AccountList;
