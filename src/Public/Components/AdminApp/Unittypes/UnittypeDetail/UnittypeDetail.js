import {Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import unitTypeService from '../../../Service/UnitTypeService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";

function UnittypeDetail() {
    const [unittype, setUnittype] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [form] = Form.useForm();

    const detailUnittype = async () => {
        await unitTypeService.adminDetailUnit(id)
            .then((res) => {
                console.log("detail unittype", res.data);
                setUnittype(res.data)
                setImages(res.data.image)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    useEffect(() => {
        detailUnittype();
    }, [form, id, loading])


    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/unittypes/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to UnitType list
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
                                <p className="title_">
                                    General information
                                </p>
                                <a href={"/unittypes/update/" + unittype.unitTypeID} className="edit_tab_">Edit</a>
                            </div>

                            <div className="content_">
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">PropertyType Name: </p>
                                        <p className="val_ text-truncate">{unittype.propertyTypeName}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">NumberFloor: </p>
                                        <p className="val_ text-truncate">{unittype.numberFloor}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">NetFloorArea: </p>
                                        <p className="val_ text-truncate">{unittype.netFloorArea}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">GrossFloorArea: </p>
                                        <p className="val_ text-truncate">{unittype.grossFloorArea}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">LivingRoom: </p>
                                        <p className="val_ text-truncate">{unittype.livingRoom}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">KitchenRoom: </p>
                                        <p className="val_ text-truncate">{unittype.kitchenRoom}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">BedRoom: </p>
                                        <p className="val_ text-truncate">{unittype.bedRoom}</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">BathRoom: </p>
                                        <p className="val_ text-truncate">{unittype.bathRoom}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <p className="key_">Basement: </p>
                                        <p className="val_ text-truncate">{unittype.basement}</p>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-start col-md-6">
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-primary mt-3"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal">
                                                Xem hình ảnh
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Hình ảnh</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="row">
                                    <Swiper
                                        slidesPerView={1}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Pagination]}
                                        className="mySwiper"
                                    >
                                        {images.map((img, index) => (
                                            <SwiperSlide key={index}>
                                                <img src={img} alt=""
                                                     style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UnittypeDetail
