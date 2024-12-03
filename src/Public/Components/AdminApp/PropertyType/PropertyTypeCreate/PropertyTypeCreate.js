import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import propertyTypeService from '../../../Service/PropertyTypeService';
import propertyCategoryService from '../../../Service/PropertyCategoryService'; // Import service
import Header from "../../../Shared/Admin/Header/Header";
import Footer from "../../../Shared/Admin/Footer/Footer";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import $ from 'jquery';

function PropertyTypeCreate() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]); // State to store categories

    // Fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await propertyCategoryService.getList();
                setCategories(res.data); // Assuming API returns an array in res.data
            } catch (err) {
                console.error('Failed to fetch property categories:', err);
            }
        };
        fetchCategories();
    }, []);

    const onFinish = async () => {
        $('#btnCreate').prop('disabled', true).text('Creating...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select'); // Include select elements
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(`${text} cannot be empty!`);
                $('#btnCreate').prop('disabled', false).text('Create');
                return;
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await propertyTypeService.adminCreateProperty(formData)
            .then((res) => {
                message.success("Property type created successfully!");
                navigate("/propertytype/list");
            })
            .catch((err) => {
                console.error(err);
                $('#btnCreate').prop('disabled', false).text('Create');
            });
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="back_to_page_">
                    <Link to="/property-types/list" className="back__url_">
                        <img src="/assets/icon/back_to_page_icon.png" alt="" /> Back to property types list
                    </Link>
                </div>
                <div className="pagetitle">
                    <h1>Add New Property Type</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form id="formCreate" className="form_create_custom_" onFinish={onFinish}>
                            <div className="form_area_">
                                <div className="title_form_">Property Type Information</div>

                                <div className="form-group mt-3">
                                    <label htmlFor="propertyTypeName">Property Type Name</label>
                                    <input type="text" className="form-control" name="propertyTypeName" id="propertyTypeName" placeholder="Enter Property Type Name" />
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="propertyCategoryID">Category</label>
                                    <select className="form-control" name="propertyCategoryID" id="propertyCategoryID">
                                        <option value="">-- Select Category --</option>
                                        {categories.map((category) => (
                                            <option key={category.propertyCategoryID} value={category.propertyCategoryID}>
                                                {category.propertyCategoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="footer_form_ mt-4">
                                <button className="btn_back" type="button" onClick={() => navigate(-1)}>Back</button>
                                <button className="btn_create" id="btnCreate" type="submit">Save</button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default PropertyTypeCreate;
