import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal, Form, Input, Select } from "antd";
import paymentPolicyService from "../../../Service/PaymentPolicyService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";

function PaymentPolicyList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPolicy, setEditingPolicy] = useState(null);

  const getListPaymentPolicies = async () => {
    try {
      const res = await paymentPolicyService.adminListPaymentPolicy();
      if (res.status === 200) {
        setData(res.data);
      } else {
        message.error("Failed to fetch payment policies");
      }
    } catch (err) {
      message.error("Error fetching payment policies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListPaymentPolicies();
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

      if (editingPolicy) {
        await paymentPolicyService.adminUpdatePaymentPolicy(
          editingPolicy.paymentPolicyID,
          values
        );
        message.success("Payment policy updated successfully");
      } else {
        const { status, ...createValues } = values;
        await paymentPolicyService.adminCreatePaymentPolicy(createValues);
        message.success("Payment policy created successfully");
      }

      setIsModalVisible(false);
      getListPaymentPolicies();
    } catch (error) {
      message.error("Error: " + error.message);
    }
  };

  const handleDelete = async (paymentPolicyID) => {
    if (!window.confirm('Are you want to delete?')){
      return;
    }

    await paymentPolicyService.adminDeletePaymentPolicy(paymentPolicyID);
    message.success("Payment policy deleted successfully");
    getListPaymentPolicies();
  };

  const columns = [
    {
      title: "Payment Policy Name",
      dataIndex: "paymentPolicyName",
    },
    {
      title: "Late Date",
      dataIndex: "lateDate",
    },
    {
      title: "Percent Late",
      dataIndex: "percentLate",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span style={{ color: record.status ? "green" : "red" }}>
          {record.status ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.paymentPolicyID)} danger>
            Delete
          </Button>
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
          <h1>Payment Policy List</h1>
        </div>
        <Button type="primary" onClick={() => showModal()}>
          Add New Payment Policy
        </Button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey="paymentPolicyID"
        />

        <Modal
          title={editingPolicy ? "Edit Payment Policy" : "Add Payment Policy"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="paymentPolicyName"
              id="paymentPolicyName"
              label="Payment Policy Name"
              rules={[
                { required: true, message: "Please enter payment policy name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lateDate"
              id="lateDate"
              label="Late Date"
              rules={[{ required: true, message: "Please enter late date" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="percentLate"
              id="percentLate"
              label="Percent Late"
              rules={[
                { required: true, message: "Please enter percent late" },
              ]}
            >
              <Input />
            </Form.Item>

            {editingPolicy && (
              <Form.Item
                name="status"
                id="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select
                  placeholder="Select status"
                  options={[
                    { label: "Active", value: true },
                    { label: "Inactive", value: false },
                  ]}
                />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </main>
    </>
  );
}

export default PaymentPolicyList;
