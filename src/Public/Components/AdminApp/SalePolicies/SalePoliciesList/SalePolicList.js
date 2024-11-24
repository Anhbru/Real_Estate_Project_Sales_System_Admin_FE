import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import salesPolicyService from '../../../Service/SalePolicyService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";

function SalesPolicyList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingPolicy, setEditingPolicy] = useState(null);

    const getListSalesPolicies = async () => {
        try {
            const res = await salesPolicyService.adminListSalesPolicy();
            if (res.status === 200) {
                setData(res.data);
            } else {
                message.error("Failed to fetch sales policies");
            }
        } catch (err) {
            message.error("Error fetching sales policies");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getListSalesPolicies();
    }, []);

    const showModal = (policy = null) => {
        setEditingPolicy(policy);
        if (policy) {
            form.setFieldsValue(policy);
        } else {
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const formattedValues = {
                ...values,
                expressTime: values.expressTime ? values.expressTime : undefined,
            };
    
            console.log("Submitting values:", formattedValues);
    
            if (editingPolicy) {
                const response = await salesPolicyService.adminUpdateSalesPolicy(editingPolicy.salesPolicyID, formattedValues);
                message.success("Sales policy updated successfully");
            } else {
                const response = await salesPolicyService.adminCreateSalesPolicy(formattedValues);
                console.log("Create response:", response);
                if (response && response.status === 200) {
                    message.success("Sales policy created successfully");
                } else {
                    message.error("Failed to create sales policy");
                }
            }
    
            setIsModalVisible(false);
            getListSalesPolicies();
        } catch (error) {
            console.error("Error:", error);
            message.error("Error: " + error.message);
        }
    };
    
    

    const handleDelete = async (salesPolicyID) => {
        await salesPolicyService.adminDeleteSalesPolicy(salesPolicyID);
        message.success("Sales policy deleted successfully");
        getListSalesPolicies();
    };

    const columns = [
        {
            title: 'Sales Policy Type',
            dataIndex: 'salesPolicyType',
        },
        {
            title: 'Express Time',
            dataIndex: 'expressTime',
        },
        {
            title: 'People Applied',
            dataIndex: 'peopleApplied',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <span style={{ color: record.status ? 'green' : 'red' }}>
                    {record.status ? 'Active' : 'Inactive'}
                </span>
            ),
        },

        {
            title: 'Project Name',
            dataIndex: 'projectName',
        },
        {
            title: 'Action',
            render: (text, record) => (
                <>
                    <Button onClick={() => showModal(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.salesPolicyID)} danger>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Sales Policy List</h1>
                </div>
                <Button type="primary" onClick={() => showModal()}>Add New Sales Policy</Button>
                <Table loading={loading} columns={columns} dataSource={data} rowKey="salesPolicyID" />

                <Modal
                    title={editingPolicy ? "Edit Sales Policy" : "Add Sales Policy"}
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="salesPolicyType"
                            id="salesPolicyType"
                            label="Sales Policy Type"
                            rules={[{ required: true, message: 'Please enter sales policy type' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="expressTime"
                            id="expressTime"
                            label="Express Time"
                            rules={[{ required: true, message: 'Please enter express time' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="peopleApplied"
                            id="peopleApplied"
                            label="People Applied"
                            rules={[{ required: true, message: 'Please enter people applied' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="status"
                            id="status"
                            label="Status"
                            rules={[{ required: true, message: 'Please enter status' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="projectID"
                            id="projectID"
                            label="Project ID"
                            rules={[{ required: true, message: 'Please enter project ID' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </main>
        </>
    );
}

export default SalesPolicyList;
