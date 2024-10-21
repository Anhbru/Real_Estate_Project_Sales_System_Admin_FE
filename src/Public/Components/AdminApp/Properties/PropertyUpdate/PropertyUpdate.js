import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import propertyTypeService from '../../../Service/PropertyTypeService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';
import propertyService from "../../../Service/PropertyService";

function PropertyUpdate() {
    const [projects, setProjects] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [property, setProperty] = useState([]);
    const {id} = useParams();
    const [form] = Form.useForm();

    const detailProperty = async () => {
        await propertyService.adminDetailProperty(id)
            .then((res) => {
                console.log("detail property", res.data);
                setProperty(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    const getListProject = async () => {
        await projectService.adminListProject()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setProjects(res.data)
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

    const getListPropertyType = async () => {
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

    const updateProperty = async () => {
        $('#btnUpdate').prop('disabled', true).text('Đang lưu...');

        let inputs = $('#formUpdate input, #formUpdate textarea, #formUpdate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('type') !== 'file') {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnUpdate').prop('disabled', false).text('Lưu thay đổi');
                return
            }
        }

        const formData = new FormData($('#formUpdate')[0]);

        await propertyService.adminUpdateProperty(id, formData)
            .then((res) => {
                message.success("Thay đổi thành công")
                navigate("/properties/list")
            })
            .catch((err) => {
                console.log(err)
                message.error(err.response.data.message)
                $('#btnUpdate').prop('disabled', false).text('Lưu thay đổi');
            })
    };


    const preUploadImage = () => {
        $('input#Image').click();
    }

    const getImage = () => {
        let src = $('input#Image').val();
        if (src) {
            let file_name = src.split('\\').pop();
            $('#content_image_').text(file_name);
        }
    }

    useEffect(() => {
        detailProperty();
        getListProject();
        getListPropertyType();
    }, [loading, form, id]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/properties/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt=""/> Back to property list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Update Property</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formUpdate" className="form_create_custom_" onFinish={updateProperty}>
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="PropertyName">Property Name</label>
                                            <input type="text" className="form-control" name="PropertyName"
                                                   id="PropertyName" defaultValue={property?.propertyName}
                                                   placeholder="Enter your Property Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Block">Block</label>
                                            <input type="text" className="form-control" name="Block"
                                                   defaultValue={property?.block}
                                                   id="Block" placeholder="Enter your Block"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Floor">Floor</label>
                                            <input type="number" className="form-control" name="Floor"
                                                   defaultValue={property?.floor}
                                                   id="Floor" placeholder="Enter your Floor"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="SizeArea">Size Area</label>
                                            <input type="number" className="form-control" name="SizeArea"
                                                   defaultValue={property?.sizeArea}
                                                   id="SizeArea" placeholder="Enter your Size Area"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BedRoom">Bed Room</label>
                                            <input type="number" className="form-control" name="BedRoom" id="BedRoom"
                                                   defaultValue={property?.bedRoom}
                                                   placeholder="Enter your Bed Room"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="BathRoom">Bad Room</label>
                                            <input type="number" className="form-control" name="BathRoom" id="BathRoom"
                                                   defaultValue={property?.badRoom}
                                                   placeholder="Enter your Bad Room"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="LivingRoom">Living Room</label>
                                            <input type="number" className="form-control" name="LivingRoom"
                                                   id="LivingRoom" defaultValue={property?.livingRoom}
                                                   placeholder="Enter your Living Room"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="View">View</label>
                                            <input type="number" className="form-control" name="View"
                                                   defaultValue={property?.view}
                                                   id="View" placeholder="Enter your View"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="InitialPrice">Initial Price</label>
                                            <input type="number" className="form-control" name="InitialPrice"
                                                   defaultValue={property?.initialPrice}
                                                   id="InitialPrice" placeholder="Enter your Initial Price"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Discount">Discount</label>
                                            <input type="number" className="form-control" name="Discount"
                                                   defaultValue={property?.discount}
                                                   id="Discount" placeholder="Enter your Discount"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="MoneyTax">Money Tax</label>
                                            <input type="number" className="form-control" name="MoneyTax"
                                                   defaultValue={property?.moneyTax}
                                                   id="MoneyTax" placeholder="Enter your Money Tax"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="MaintenanceCost">Maintenance Cost</label>
                                            <input type="number" className="form-control" name="MaintenanceCost"
                                                   defaultValue={property?.maintenanceCost}
                                                   id="MaintenanceCost" placeholder="Enter your Maintenance Cost"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="TotalPrice">Total Price</label>
                                            <input type="number" className="form-control" name="TotalPrice"
                                                   defaultValue={property?.totalPrice}
                                                   id="TotalPrice" placeholder="Enter your Total Price"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Status">Status</label>
                                            <input type="text" className="form-control" name="Status" id="Status"
                                                   defaultValue={property?.status}
                                                   placeholder="Enter your Stauts"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="PropertyTypeID">PropertyType</label>
                                            <select name="PropertyTypeID" id="PropertyTypeID" className="form-control">
                                                {
                                                    propertyTypes.map((propertyType) => {
                                                        return (
                                                            <option
                                                                selected={propertyType.propertyTypeID === property?.propertyTypeID}
                                                                key={propertyType.propertyTypeID}
                                                                value={propertyType.propertyTypeID}>
                                                                {propertyType.propertyTypeName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="ProjectID">Project</label>
                                            <select name="ProjectID" id="ProjectID" className="form-control">
                                                {
                                                    projects.map((project) => {
                                                        return (
                                                            <option selected={property?.projectID === project.projectID}
                                                                    key={project.projectID} value={project.projectID}>
                                                                {project.projectName}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="Image">Image: <button className="btn_upload_"
                                                                                  onClick={preUploadImage}
                                                                                  type="button">Choose Image</button>
                                                <span id="content_image_">No Image Chosen</span>
                                            </label>
                                            <input type="file" onChange={getImage} className="d-none" name="Image"
                                                   id="Image" defaultValue={property?.image}
                                                   placeholder=""/>

                                            <img src={property?.image} className="img_upload_" alt=""/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button id="btnUpdate" className="btn_create" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PropertyUpdate
