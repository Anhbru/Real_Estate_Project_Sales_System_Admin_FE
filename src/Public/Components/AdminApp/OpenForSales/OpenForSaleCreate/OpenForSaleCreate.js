import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import openForSaleService from '../../../Service/OpenSaleService';
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function OpenForSaleCreate() {
    const navigate = useNavigate();

    const preUploadImage = () => {
        $('input#image').click();
    };

    const getImage = () => {
        let src = $('input#image').val();
        if (src) {
            let file_name = src.split('\\').pop();
            $('#content_image_').text(file_name);
        }
    };

    const onFinish = async () => {
        $('#btnCreate').prop('disabled', true).text('Creating...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' cannot be empty!');
                $('#btnCreate').prop('disabled', false).text('Create');
                return;
            }
        }

        const formData = new FormData($('#formCreate')[0]);


        const startDate = $('#startDate').val();
        const endDate = $('#endDate').val();


        if (startDate) {
            const formattedStartDate = startDate.replace("T", " ");
            formData.set('startDate', formattedStartDate);
        }

        if (endDate) {
            const formattedEndDate = endDate.replace("T", " ");
            formData.set('endDate', formattedEndDate);
        }

        await openForSaleService.adminCreateOpenSale(formData)
            .then((res) => {
                message.success("Open Sale created successfully!");
                navigate("/opensales/list");
            })
            .catch((err) => {
                console.log(err);
                $('#btnCreate').prop('disabled', false).text('Create');
            });
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/opensales/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to open sale list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Open Sale</h1>
                </div>

                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={onFinish}>
                            <div className="form_area_">
                                <div className="title_form_">Open Sale Information</div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="decisionName">Decision Name</label>
                                            <input type="text" className="form-control" name="decisionName" id="decisionName"
                                                placeholder="Enter Decision Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="projectID">Project ID</label>
                                            <input type="text" className="form-control" name="projectID" id="projectID"
                                                placeholder="Enter Project ID" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="startDate">Start Date</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                name="startDate"
                                                id="startDate"
                                                placeholder="Select Start Date"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="endDate">End Date</label>
                                            <input
                                                type="datetime-local" // Sử dụng 'datetime-local' để chọn cả ngày và giờ
                                                className="form-control"
                                                name="endDate"
                                                id="endDate"
                                                placeholder="Select End Date"
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="d-flex justify-content-between align-items-center form_el mt-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="checkinDate">Check-in Date</label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                name="endDate"
                                                id="endDate"
                                                placeholder="Select End Date"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea className="form-control" name="description" id="description"
                                                placeholder="Enter Description" />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label htmlFor="reservationPrice">Reservation Price</label>
                                            <input type="text" className="form-control" name="reservationPrice" id="reservationPrice"
                                                placeholder="Enter Reservation Price " />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="saleType">Sale Type</label>
                                            <input type="text" className="form-control" name="saleType" id="saleType"
                                                placeholder="Enter Sale Type " />
                                        </div>
                                    </div>

                                </div>


                            </div>

                            <div className="footer_form_">
                                <button className="btn_back" type="button">Back</button>
                                <button className="btn_create" type="button" onClick={onFinish} id="btnCreate">Create</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default OpenForSaleCreate;
