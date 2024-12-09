import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import propertyTypeService from "../../../Service/PropertyTypeService";
import unitTypeService from "../../../Service/UnitTypeService";
import BackButton from "../../../../Utils/BackButton";

function UnittypeCreate() {
    const [propertyTypes, setPropertyTypes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('name') !== 'Basement' && $(inputs[i]).attr('name') !== 'NumberFloor') {

                let text = $(inputs[i]).prev().text();  
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await unitTypeService.adminCreateUnit(formData)
            .then((res) => {
                console.log("create unit", res.data)
                message.success("Tạo unit type thành công!")
                navigate("/unittypes/list")
            })
            .catch((err) => {
                console.log(err)
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
            })
    }

    useEffect(() => {
        getList();
    }, [loading]);

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
                <div className="pagetitle">
                    <h1>Add New Unittype</h1>
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
                                                   id="BathRoom" placeholder="Enter your BathRoom"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BedRoom">BedRoom</label>
                                            <input type="text" className="form-control" name="BedRoom"
                                                   id="BedRoom"
                                                   placeholder="Enter your BedRoom"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="NetFloorArea">NetFloorArea</label>
                                            <input type="text" className="form-control" name="NetFloorArea"
                                                   id="NetFloorArea"
                                                   placeholder="Enter your NetFloorArea"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="GrossFloorArea">GrossFloorArea</label>
                                            <input type="text" className="form-control" name="GrossFloorArea"
                                                   id="GrossFloorArea"
                                                   placeholder="Enter your GrossFloorArea"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="KitchenRoom">KitchenRoom</label>
                                            <input type="text" className="form-control" name="KitchenRoom"
                                                   id="KitchenRoom"
                                                   placeholder="Enter your KitchenRoom"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="LivingRoom">LivingRoom</label>
                                            <input type="text" className="form-control" name="LivingRoom"
                                                   id="LivingRoom"
                                                   placeholder="Enter your LivingRoom"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="NumberFloor">NumberFloor</label>
                                            <input type="text" className="form-control" name="NumberFloor"
                                                   id="NumberFloor"
                                                   placeholder="Enter your NumberFloor"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Basement">Basement</label>
                                            <input type="text" className="form-control" name="Basement"
                                                   id="Basement"
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
                                <BackButton />
                                <button id="btnCreate" className="btn_create" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default UnittypeCreate
