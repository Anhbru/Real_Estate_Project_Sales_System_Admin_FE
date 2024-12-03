import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import propertyTypeService from "../../../Service/PropertyTypeService";
import unitTypeService from "../../../Service/UnitTypeService";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";

function UnittypeUpdate() {
    const [unittype, setUnittype] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [form] = Form.useForm();
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [images, setImages] = useState([]);

    const getList = async () => {
        await propertyTypeService.adminListProperty()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setPropertyTypes(res.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })

    }

    const createUnittype = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang chỉnh sửa...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('name') !== 'Basement' && $(inputs[i]).attr('type') !== 'file') {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
                return
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await unitTypeService.adminUpdateUnit(id, formData)
            .then((res) => {
                console.log("create unittype", res.data)
                message.success("Tạo unittypes thành công!")
                navigate("/unittypes/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Chỉnh sửa');
            })
    }

    const detailUnit = async () => {
        await unitTypeService.adminDetailUnit(id)
            .then((res) => {
                console.log("detail Unittype", res.data);
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
        getList();
        detailUnit();
    }, [form, id, loading])

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/unittypes/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to list
                    </Link>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={createUnittype}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BathRoom">BathRoom</label>
                                            <input type="text" className="form-control" name="BathRoom"
                                                   id="BathRoom" defaultValue={unittype.bathRoom}
                                                   placeholder="Enter your BathRoom"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BedRoom">BedRoom</label>
                                            <input type="text" className="form-control" name="BedRoom"
                                                   id="BedRoom" defaultValue={unittype.bedRoom}
                                                   placeholder="Enter your BedRoom"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="NetFloorArea">NetFloorArea</label>
                                            <input type="text" className="form-control" name="NetFloorArea"
                                                   id="NetFloorArea" defaultValue={unittype.netFloorArea}
                                                   placeholder="Enter your NetFloorArea"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="GrossFloorArea">GrossFloorArea</label>
                                            <input type="text" className="form-control" name="GrossFloorArea"
                                                   id="GrossFloorArea" defaultValue={unittype.grossFloorArea}
                                                   placeholder="Enter your GrossFloorArea"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="KitchenRoom">KitchenRoom</label>
                                            <input type="text" className="form-control" name="KitchenRoom"
                                                   id="KitchenRoom" defaultValue={unittype.kitchenRoom}
                                                   placeholder="Enter your KitchenRoom"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="LivingRoom">LivingRoom</label>
                                            <input type="text" className="form-control" name="LivingRoom"
                                                   id="LivingRoom" defaultValue={unittype.livingRoom}
                                                   placeholder="Enter your LivingRoom"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="NumberFloor">NumberFloor</label>
                                            <input type="text" className="form-control" name="NumberFloor"
                                                   id="NumberFloor" defaultValue={unittype.numberFloor}
                                                   placeholder="Enter your NumberFloor"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Basement">Basement</label>
                                            <input type="text" className="form-control" name="Basement"
                                                   id="Basement" defaultValue={unittype.basement}
                                                   placeholder="Enter your Basement"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Image">Image</label>
                                            <input type="file" multiple className="form-control" name="Image"
                                                   id="Image" placeholder="Enter your Image"/>
                                            <div className="col-md-3">
                                                <button type="button" className="btn btn-primary mt-3"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#exampleModal">
                                                    Xem hình ảnh
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="PropertyTypeID">PropertyTypeID</label>
                                            <select name="PropertyTypeID" id="PropertyTypeID" className="form-control">
                                                {
                                                    propertyTypes.map((property) => {
                                                        return (
                                                            <option key={property.propertyTypeID}
                                                                    value={property.propertyTypeID}>
                                                                {property.propertyTypeName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button id="btnCreate" className="btn_create" type="submit">Save</button>
                            </div>
                        </Form>
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

export default UnittypeUpdate
