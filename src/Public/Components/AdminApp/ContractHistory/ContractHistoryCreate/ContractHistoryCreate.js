import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import contractHistoryService from '../../../Service/ContractHistoryService';
import contractService from '../../../Service/ContractService';
import customerService from '../../../Service/CustomerService';
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";

const { Option } = Select;

const ContractHistoryCreate = () => {
    const [loading, setLoading] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedContractCode, setSelectedContractCode] = useState('');
    const [selectedCustomerName, setSelectedCustomerName] = useState('');
    const navigate = useNavigate();

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    useEffect(() => {
        const fetchContractsAndCustomers = async () => {
            try {
                const contractResponse = await contractService.getList();
                const customerResponse = await customerService.adminListCustomer();

                setContracts(contractResponse.data);
                setCustomers(customerResponse.data);
            } catch (error) {
                message.error('Failed to load contracts or customers');
            }
        };

        fetchContractsAndCustomers();
    }, []);

    const onFinish = async (values) => {
        setLoading(true);

        // Prepare data for form submission
        const data = {
            ...values,
            contractCode: selectedContractCode,
            customerName: selectedCustomerName,
        };

        // Check if a file is uploaded and append to FormData
        if (values.attachFile && values.attachFile.length > 0) {
            const formData = new FormData();

            // Append non-file fields
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    formData.append(key, data[key]);
                }
            }

            // Append the file field
            formData.append('attachFile', values.attachFile[0].originFileObj);

            try {
                // Call the API to create the contract history
                await contractHistoryService.adminCreateContractHistory(formData);
                message.success('Contract history created successfully!');
                navigate(-1);
            } catch (error) {
                message.error('Failed to create contract history');
            } finally {
                setLoading(false);
            }
        } else {
            // If no file is uploaded, display an error
            message.error('Please upload a file!');
            setLoading(false);
        }
    };



    // Handle contract selection
    const handleContractChange = (contractID) => {
        const selectedContract = contracts.find(contract => contract.contractID === contractID);
        setSelectedContractCode(selectedContract ? selectedContract.contractCode : '');
    };

    // Handle customer selection
    const handleCustomerChange = (customerID) => {
        const selectedCustomer = customers.find(customer => customer.customerID === customerID);
        setSelectedCustomerName(selectedCustomer ? selectedCustomer.fullName : '');
    };

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Create Contract History</h1>
                </div>
                <section className="section">
                    <div className="content_page_">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item label="Contract ID" name="contractID" rules={[{ required: true, message: 'Please select a contract' }]}>
                                <Select onChange={handleContractChange} placeholder="Select a contract">
                                    {contracts
                                        .filter(contract => contract.status === 'Đã xác nhận hợp đồng mua bán' || contract.status === 'Đã bàn giao quyền sở hữu đất')  
                                        .map((contract) => (
                                            <Option key={contract.contractID} value={contract.contractID}>
                                                {contract.contractCode}-{contract.fullName}
                                            </Option>
                                        ))
                                    }   
                                </Select>
                            </Form.Item>


                            <Form.Item label="Customer ID" name="customerID" rules={[{ required: true, message: 'Please select a customer' }]}>
                                <Select onChange={handleCustomerChange} placeholder="Select a customer">
                                    {customers.map((customer) => (
                                        <Option key={customer.customerID} value={customer.customerID}>
                                            {customer.fullName}-{customer.identityCardNumber}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item label="Note" name="note">
                                <Input.TextArea />
                            </Form.Item>

                            <Form.Item label="Notarized ContractCode" name="notarizedContractCode">
                                <Input.TextArea />
                            </Form.Item>

                            <Form.Item
                                label="Attach File"
                                name="attachFile"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[{ required: true, message: 'Please upload a file!' }]}
                            >
                                <Upload
                                    name="file"
                                    action="/upload"
                                    beforeUpload={() => false}
                                    showUploadList={true}
                                >
                                    <Button icon={<UploadOutlined />}>Select File</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Create Contract History
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default ContractHistoryCreate;
