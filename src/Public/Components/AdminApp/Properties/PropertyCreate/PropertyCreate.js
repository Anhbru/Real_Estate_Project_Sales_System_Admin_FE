import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, message} from 'antd';
import projectService from '../../../Service/ProjectService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function PropertyCreate() {
    const preUploadImage = () => {
        $('input#image').click();
    }

    const getImage = () => {
        let src = $('input#image').val();
        if (src) {
            let file_name = src.split('\\').pop();
            $('#content_image_').text(file_name);
        }
    }

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
                    <h1>Add New Property</h1>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_">
                            <div className="form_area_">
                                <div className="title_form_">General Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="property_name">Property Name</label>
                                            <input type="text" className="form-control" name="property_name"
                                                   id="property_name"
                                                   placeholder="Enter your Property Name"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="block">Block</label>
                                            <input type="text" className="form-control" name="block"
                                                   id="block" placeholder="Enter your Block"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="floor">Floor</label>
                                            <input type="text" className="form-control" name="floor"
                                                   id="floor" placeholder="Enter your Floor"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="size_area">Size Area</label>
                                            <input type="text" className="form-control" name="size_area"
                                                   id="size_area" placeholder="Enter your Size Area"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="bed_room">Bed Room</label>
                                            <input type="text" className="form-control" name="bed_room" id="bed_room"
                                                   placeholder="Enter your Bed Room"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="bad_room">Bad Room</label>
                                            <input type="text" className="form-control" name="bad_room" id="bad_room"
                                                   placeholder="Enter your Bad Room"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="living_room">Living Room</label>
                                            <input type="text" className="form-control" name="living_room"
                                                   id="living_room"
                                                   placeholder="Enter your Living Room"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="view">View</label>
                                            <input type="text" className="form-control" name="view"
                                                   id="view" placeholder="Enter your View"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="initial_price">Initial Price</label>
                                            <input type="text" className="form-control" name="initial_price"
                                                   id="initial_price" placeholder="Enter your Initial Price"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="discount">Discount</label>
                                            <input type="text" className="form-control" name="discount"
                                                   id="discount" placeholder="Enter your Discount"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="money_tax">Money Tax</label>
                                            <input type="text" className="form-control" name="money_tax"
                                                   id="money_tax" placeholder="Enter your Money Tax"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="maintenance_cost">Maintenance Cost</label>
                                            <input type="text" className="form-control" name="maintenance_cost"
                                                   id="maintenance_cost" placeholder="Enter your Maintenance Cost"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="total_price">Total Price</label>
                                            <input type="text" className="form-control" name="total_price"
                                                   id="total_price" placeholder="Enter your Total Price"/>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <input type="text" className="form-control" name="status" id="status"
                                                   placeholder="Enter your Stauts"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="image">Image: <button className="btn_upload_"
                                                                                  onClick={preUploadImage}
                                                                                  type="button">Choose Image</button>
                                                <span id="content_image_">No Image Chosen</span>
                                            </label>
                                            <input type="file" onChange={getImage} className="d-none" name="image"
                                                   id="image"
                                                   placeholder=""/>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button className="btn_create" type="button">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    )
}

export default PropertyCreate
