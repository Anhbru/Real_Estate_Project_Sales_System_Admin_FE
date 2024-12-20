import { Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import contractService from "../../../../Service/ContractService";
import Header from "../../../../Shared/Admin/Header/Header";
import Footer from "../../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../../Shared/Admin/Sidebar/Sidebar";
import $ from "jquery";
import ConvertNumber from "../../../../../Utils/ConvertNumber";

function ContractDetail() {
  const [contract, setContract] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [form] = Form.useForm();

  const detailContract = async () => {
    await contractService
      .getDetail(id)
      .then((res) => {
        console.log("detail contract", res.data);
        setContract(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    detailContract();
  }, [form, id, loading]);

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="back_to_page_">
          <Link to="/contract" className="back__url_">
            <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to
            contract list
          </Link>
        </div>
        <div className="pagetitle">
          <h1>A01.01</h1>
        </div>
        {/* End Page Title */}
        <section className="section detail_page_">
          <div className="content_page_">
            <div className="info_area_">
              <div className="d-flex justify-content-between align-items-center">
                <p className="title_">General information</p>
                <a
                  href={"/contract/edit/" + contract.contractID}
                  className="edit_tab_"
                >
                  Edit
                </a>
              </div>

              <div className="content_">
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start col-md-4">
                    <p className="key_">ContractCode: </p>
                    <p className="val_ text-truncate">
                      {contract.contractCode}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-4">
                    <p className="key_">ContractType: </p>
                    <p className="val_ text-truncate">
                      {contract.contractType}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-4">
                    <p className="key_">CreatedTime: </p>
                    <p className="val_ text-truncate">{contract.createdTime}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start col-md-4">
                    <p className="key_">FullName: </p>
                    <p className="val_ text-truncate">{contract.fullName}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-4">
                    <p className="key_">TotalPrice: </p>
                    <p className="val_ text-truncate">
                      {ConvertNumber(contract.totalPrice)}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-4">
                    <p className="key_">ExpiredTime: </p>
                    <p className="val_ text-truncate">{contract.expiredTime}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start">
                    <p className="key_">DocumentName: </p>
                    <p className="val_ text-truncate">
                      {contract.documentName}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start">
                    <p className="key_">Status: </p>
                    <p className="val_ text-truncate">{contract.status}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start">
                    <p className="key_">Description: </p>
                    <p className="val_ text-truncate">{contract.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Hình ảnh
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="row">
                  <img
                    src={contract.imageContract}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContractDetail;
