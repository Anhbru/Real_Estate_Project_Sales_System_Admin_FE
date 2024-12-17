import React, { useEffect, useState } from "react";
import promotionService from "../../../Service/PromotionService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from "jquery";
import Page403 from "../../../Shared/Admin/Utils/403";

function PromotionsList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State to store filtered promotions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term

  const getListPromotions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await promotionService.adminListPromotions();
      console.log("Promotions Response:", res.data);
      if (res.status === 200) {
        const promotions = Array.isArray(res.data) ? res.data : [];
        setData(promotions);
        setFilteredData(promotions); // Initialize filtered data with all promotions
      } else {
        setError("Failed to fetch promotions.");
      }
    } catch (err) {
      setError("Error fetching promotions: " + err.message);
      console.error("Error fetching promotions:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle the search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter the promotions based on the search term (search by promotion name)
    const filtered = data.filter((item) =>
      item.promotionName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (promotionID) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        setLoading(true);
        const res = await promotionService.adminUpdatePromotion(promotionID, {
          status: false,
        });
        if (res.status === 200) {
          alert("Promotion marked as Inactive successfully!");
          getListPromotions(); // Refresh the list after deletion
        } else {
          alert("Failed to delete promotion. Please try again.");
        }
      } catch (err) {
        console.error("Error deleting promotion:", err);
        alert("An error occurred while deleting the promotion.");
      } finally {
        setLoading(false);
      }
    }
  };

  const checkAll = () => {
    if ($("#checkAll").is(":checked")) {
      $(".checkbox_item_").prop("checked", true);
    } else {
      $(".checkbox_item_").prop("checked", false);
    }
  };

  useEffect(() => {
    getListPromotions();
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
              <h1>Promotions List</h1>
            </div>
            <section className="section">
              <div className="d-flex justify-content-between align-items-center">
                <input
                  type="text"
                  className="input_search"
                  placeholder="Search promotions"
                  value={searchTerm} // Controlled input
                  onChange={handleSearch} // Trigger search on input change
                />
                <a href="/promotions/create" className="btn_go_">
                  ADD NEW <img src="/assets/icon/plus_icon.png" alt="" />
                </a>
              </div>

              <div className="content_ table_list_">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {filteredData.length === 0 ? (
                      <p>No promotions found.</p>
                    ) : (
                      <table className="table datatable">
                        <colgroup>
                          <col width="5%" />
                          <col width="15%" />
                          <col width="15%" />
                          <col width="10%" />
                          <col width="10%" />
                          <col width="10%" />
                        </colgroup>
                        <thead>
                          <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Promotion Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">Sales Policy Type</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((item, index) => (
                            <tr key={item.promotionID}>
                              <th>{index + 1}</th>
                              <td>{item.promotionName}</td>
                              <td>{item.description}</td>
                              <td
                                style={{ color: item.status ? "green" : "red" }}
                              >
                                {item.status ? "Active" : "Inactive"}
                              </td>
                              <td>{item.salesPolicyType}</td>
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
                                          "/promotions/detail/" +
                                          item.promotionID
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
                                          "/promotions/update/" +
                                          item.promotionID
                                        }
                                      >
                                        Update
                                      </a>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href={
                                          "/promotiondetails/list/" +
                                          item.promotionID
                                        }
                                      >
                                        Promtion Details
                                      </a>
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="/promotions/create"
                                      >
                                        Create
                                      </a>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() =>
                                          handleDelete(item.promotionID)
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

export default PromotionsList;
