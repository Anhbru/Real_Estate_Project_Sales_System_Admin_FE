import { Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import propertyService from "../../../Service/PropertyService";
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function PropertyDetail() {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [propertyImages, setpropertyImages] = useState([]);
  const { id } = useParams();
  const [form] = Form.useForm();

  const detailProperty = async () => {
    await propertyService
      .adminDetailProperty(id)
      .then((res) => {
        console.log("detail property", res.data);
        setProperty(res.data);

        // Kiểm tra trường hợp có ảnh đơn lẻ
        let propImages = res.data.imageUnitType ? [res.data.imageUnitType] : [];

        // Nếu có nhiều ảnh từ trường images, thì set vào propertyImages
        if (Array.isArray(res.data.images) && res.data.images.length > 0) {
          propImages = res.data.images;
        }

        setpropertyImages(propImages);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    detailProperty();
  }, [id, loading]);

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" className="main">
        <div className="back_to_page_">
          <Link to="/properties/list" className="back__url_">
            <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to
            property list
          </Link>
        </div>
        <div className="pagetitle">
          <h1>{property?.propertyCategoryName}</h1>
        </div>
        <section className="section detail_page_">
          <div className="content_page_">
            <div className="info_area_">
              <div className="d-flex justify-content-between align-items-center">
                <p className="title_">General information</p>
                <a href="/projects/update/" className="edit_tab_">
                  Edit
                </a>
              </div>

              <div className="content_">
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">Property Name: </p>
                    <p className="val_ text-truncate">
                      {property.propertyCode}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">Block: </p>
                    <p className="val_ text-truncate">{property.blockName}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">Floor: </p>
                    <p className="val_ text-truncate">{property.numberFloor}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">Zone: </p>
                    <p className="val_ text-truncate">{property.zoneName}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">Bed Room: </p>
                    <p className="val_ text-truncate">
                      {property.bedRoom} phòng
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">Bath Room: </p>
                    <p className="val_ text-truncate">
                      {property.bathRoom} phòng
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">Living Room: </p>
                    <p className="val_ text-truncate">
                      {property.livingRoom} phòng
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">View: </p>
                    <p className="val_ text-truncate">{property.view}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">NetFloorArea: </p>
                    <p className="val_ text-truncate">
                      {property.netFloorArea}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">GrossFloorArea: </p>
                    <p className="val_ text-truncate">
                      {property.grossFloorArea}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">PriceSold: </p>
                    <p className="val_ text-truncate">{property.priceSold}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-start col-md-6">
                    <p className="key_">Status: </p>
                    <p className="val_ text-truncate">{property.status}</p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Xem hình ảnh
                  </button>
                </div>
              </div>
            </div>
            <div className="table_data_area_">
              <div className="header_table_">
                <nav className="nav align-items-center justify-content-between">
                  <a className="nav-link active" aria-current="page" href="#">
                    History of implement
                  </a>
                  <a className="nav-link" href="#">
                    Expected payment schedule
                  </a>
                  <a className="nav-link" href="#">
                    Sales policy
                  </a>
                  <a className="nav-link" href="#">
                    Promotion
                  </a>
                  <a className="nav-link" href="#">
                    Document
                  </a>
                  <a className="nav-link" href="#">
                    Staff
                  </a>

                  <button
                    className="btn_add_new_"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCustomer"
                  >
                    ADD NEW <img src="/assets/icon/plus_icon.png" alt="" />
                  </button>
                </nav>
              </div>
              <div className="table_content_">
                <table className="table datatable">
                  <thead>
                    <tr>
                      <th scope="col">Đợt</th>
                      <th scope="col">Ngày thực hiện</th>
                      <th scope="col">Tỉ lệ</th>
                      <th scope="col">Kiểu TT</th>
                      <th scope="col">Tương ứng</th>
                      <th scope="col">Thế VAT</th>
                      <th scope="col">Đã thu</th>
                      <th scope="col">Còn lại</th>
                      <th scope="col">Số ngày chậm</th>
                      <th scope="col">Lãi suất</th>
                      <th scope="col">Lãi nộp chậm</th>
                      <th scope="col">Còn phải nộp</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>29/01/2023</td>
                      <td>10%</td>
                      <td>Tiền mặt</td>
                      <td>500.000.000 VND</td>
                      <td>1%</td>
                      <td>0</td>
                      <td>500.000.000 VND</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
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
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Delete
                              </a>
                            </li>
                          </ul>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal xem hình ảnh */}
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
                  {propertyImages &&
                  Array.isArray(propertyImages) &&
                  propertyImages.length > 0 ? (
                    <Swiper
                      slidesPerView={1}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                      {propertyImages.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={img}
                            alt={`Property Image ${index}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <p>No images available</p>
                  )}
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

      {/* Modal Add History */}
      <div
        className="modal fade"
        id="modalCustomer"
        tabIndex="-1"
        aria-labelledby="modalCustomerLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalCustomerLabel">
                Add New History of implement
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                id="group_customer"
                placeholder="Nhóm khách hàng"
                name="group_customer"
              />
              <input
                type="text"
                className="form-control mt-3"
                id="reason"
                placeholder="Diễn giải/Lý do"
                name="reason"
              />
            </div>
            <div className="modal-footer d-flex justify-content-around align-items-center">
              <button
                type="button"
                className="btn_back"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button type="button" className="btn_create">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDetail;
