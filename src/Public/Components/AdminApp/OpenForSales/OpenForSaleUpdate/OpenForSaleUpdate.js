import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Input, message, Select, Button } from 'antd';
import openForSaleService from '../../../Service/OpenForSaleService';
import projectCategoryService from '../../../Service/ProjectCategoryDetailService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";

const { Option } = Select;

function OpenForSaleUpdate() {
    const [projectCategories, setProjectCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

    // Fetch details of the opening for sale
    const detailOpenForSale = async () => {
        try {
            const res = await openForSaleService.adminDetailOpenSale(id);
            form.setFieldsValue(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load Open For Sale details");
        }
    };

    const fetchProjectCategories = async () => {
        try {
            const response = await projectCategoryService.getList();
            setProjectCategories(response.data);
            setFilteredCategories(response.data);  // Set initial categories
        } catch (error) {
            message.error("Failed to load project categories");
        }
    };

    // Filter categories based on existOpen flag
    const handleSelectOpenForSale = (value) => {
        // Filter categories with existOpen = false when select is clicked
        const filtered = projectCategories.filter(category => category.existOpen === false);
        setFilteredCategories(filtered);
    };

    // Update the opening for sale
    const updateOpenForSale = async (values) => {
        setLoading(true);
        try {
            await openForSaleService.adminUpdateOpenSale(id, values);
            message.success("Open For Sale updated successfully");
            navigate("/openforsales/list");
        } catch (err) {
            console.error(err);
            message.error("Failed to update Open For Sale");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        detailOpenForSale();
        fetchProjectCategories();
    }, [id]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Open For Sale</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={updateOpenForSale}
                            className="form_create_custom_"
                        >
                            <div className="form_area_">
                                <div className="title_form_">Open For Sale Information</div>

                                <Form.Item
                                    label="Decision Name"
                                    name="decisionName"
                                    rules={[{ required: true, message: 'Please enter the Decision Name' }]}
                                >
                                    <Input placeholder="Enter Decision Name" />
                                </Form.Item>

                                <Form.Item
                                    label="Sale Type"
                                    name="saleType"
                                    rules={[{ required: true, message: 'Please select Sale Type' }]}
                                >
                                    <Select placeholder="Select Sale Type">
                                        <Option value="Online">Online</Option>
                                        <Option value="Offline">Offline</Option>
                                    </Select>
                                </Form.Item>


                                <Form.Item
                                    label="Start Date"
                                    name="startDate"
                                    rules={[
                                        { required: true, message: 'Please enter Start Date' },
                                    ]}
                                >
                                    <Input placeholder="Enter Start Date (Input Format YYYY-MM-DD HH:mm:ss)" />
                                </Form.Item>

                                <Form.Item
                                    label="End Date"
                                    name="endDate"
                                    dependencies={['startDate']}
                                    rules={[
                                        { required: true, message: 'Please enter End Date' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                const startDate = getFieldValue('startDate');
                                                if (!value || (startDate && value >= startDate)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('End Date must be after Start Date'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input placeholder="Enter End Date (Input Format YYYY-MM-DD HH:mm:ss)" />
                                </Form.Item>

                                <Form.Item
                                    label="Check-in Date"
                                    name="checkinDate"
                                    dependencies={['startDate']}
                                    rules={[
                                        { required: true, message: 'Please enter Check-in Date' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                const startDate = getFieldValue('startDate');
                                                if (!value || (startDate && value >= startDate)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Check-in Date must be before Start Date'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input placeholder="Enter Check-in Date (Input Format YYYY-MM-DD HH:mm:ss)" />
                                </Form.Item>



                                <Form.Item
                                    label="Reservation Price"
                                    name="reservationPrice"
                                    rules={[{ required: true, message: 'Please enter Reservation Price' }]}
                                >
                                    <Input type="number" placeholder="Enter Reservation Price" />
                                </Form.Item>

                                <Form.Item
                                    label="Status"
                                    name="status"
                                    rules={[{ required: true, message: 'Please select a Status' }]}
                                >
                                    <Select placeholder="Select Status">
                                        <Option value={true}>Active</Option>
                                        <Option value={false}>Inactive</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Description"
                                    name="description"
                                >
                                    <Input.TextArea placeholder="Enter Description" />
                                </Form.Item>


                                <Form.Item
                                    label="Project Category"
                                    name="projectCategoryDetailID"
                                    rules={[{ required: true, message: 'Please select a Project Category' }]}
                                >
                                    <Select
                                        placeholder="Select Project Category"
                                        onClick={handleSelectOpenForSale}
                                    >
                                        {filteredCategories.map((category) => (
                                            <Option
                                                key={category.projectCategoryDetailID}
                                                value={category.projectCategoryDetailID}
                                            >
                                                {`${category.projectName} - ${category.propertyCategoryName}`}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>


                            <div className="footer_form_">
                                <Link to="/openforsales/list" className="btn_back">Back</Link>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="btn_create"
                                    loading={loading}
                                >
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default OpenForSaleUpdate;
