import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Input, message, Select, Button } from 'antd';
import contractHistoryService from '../../../Service/ContractHistoryService';
import contractService from '../../../Service/ContractService'; // Service để lấy contract list
import customerService from '../../../Service/CustomerService'; // Service để lấy customer list
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";

const { Option } = Select;

function ContractHistoryUpdate() {
    const [loading, setLoading] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [selectedContractCode, setSelectedContractCode] = useState('');
    const [selectedCustomerName, setSelectedCustomerName] = useState('');
    
    // Fetch danh sách contracts
    const fetchContracts = async () => {
        try {
            const res = await contractService.getList();
            setContracts(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load Contracts");
        }
    };

    // Fetch danh sách customers
    const fetchCustomers = async () => {
        try {
            const res = await customerService.adminListCustomer();
            setCustomers(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load Customers");
        }
    };

    // Fetch chi tiết Contract History
    const detailContractHistory = async () => {
        try {
            const res = await contractHistoryService.adminDetailContractHistory(id);
            form.setFieldsValue(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load Contract History details");
        }
    };

    // Update Contract History
    const updateContractHistory = async (values) => {
        setLoading(true);
        try {
            await contractHistoryService.adminUpdateContractHistory(id, values);
            message.success("Contract History updated successfully");
            navigate("/contract-history/list");
        } catch (err) {
            console.error(err);
            message.error("Failed to update Contract History");
        } finally {
            setLoading(false);
        }
    };
    const handleContractChange = (contractID) => {
        const selectedContract = contracts.find(contract => contract.contractID === contractID);
        setSelectedContractCode(selectedContract ? selectedContract.contractCode : '');
    };
    
    const handleCustomerChange = (customerID) => {
        const selectedCustomer = customers.find(customer => customer.customerID === customerID);
        setSelectedCustomerName(selectedCustomer ? selectedCustomer.fullName : '');
    };
    
    useEffect(() => {
        fetchContracts();
        fetchCustomers();
        detailContractHistory();
    }, [id]);

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Update Contract History</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={updateContractHistory}
                            className="form_create_custom_"
                        >
                            <div className="form_area_">
                                <div className="title_form_">Contract History Information</div>

                                <Form.Item label="Contract" name="contractID" rules={[{ required: true, message: 'Please select a contract' }]}>
                                    <Select onChange={handleContractChange} placeholder="Select a contract">
                                        {contracts
                                            .filter(contract =>
                                                contract.status === 'Đã xác nhận hợp đồng mua bán' ||
                                                contract.status === 'Đã bàn giao quyền sở hữu đất'
                                            )
                                            .map(contract => (
                                                <Option key={contract.contractID} value={contract.contractID}>
                                                    {contract.contractCode} - {contract.fullName}
                                                </Option>
                                            ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Customer" name="customerID" rules={[{ required: true, message: 'Please select a customer' }]}>
                                    <Select onChange={handleCustomerChange} placeholder="Select a customer">
                                        {customers.map(customer => (
                                            <Option key={customer.customerID} value={customer.customerID}>
                                                {customer.fullName} - {customer.identityCardNumber}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>


                                <Form.Item
                                    label="Notarized Contract Code"
                                    name="notarizedContractCode"
                                    rules={[{ required: true, message: 'Please enter the Notarized Contract Code' }]}
                                >
                                    <Input placeholder="Enter Notarized Contract Code" />
                                </Form.Item>

                                <Form.Item
                                    label="Note"
                                    name="note"
                                >
                                    <Input.TextArea placeholder="Enter Note" />
                                </Form.Item>

                                <Form.Item
                                    label="Attach File"
                                    name="attachFile"
                                >
                                    <Input placeholder="Enter Attach File URL" />
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
                            </div>

                            <div className="footer_form_">
                                <Link to="/contract-history/list" className="btn_back">Back</Link>
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

export default ContractHistoryUpdate;
