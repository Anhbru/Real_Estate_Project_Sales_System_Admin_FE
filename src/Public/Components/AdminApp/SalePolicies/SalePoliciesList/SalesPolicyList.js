import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal, Form, Input } from "antd";
import salesPolicyService from "../../../Service/SalePolicyService";
import Header from "../../../Shared/Admin/Header/Header";
import Sidebar from "../../../Shared/Admin/Sidebar/Sidebar";
import projectService from "../../../Service/ProjectService";
import { Select } from "antd";
function SalesPolicyList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [projects, setProjects] = useState([]);
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
  const getProjects = async () => {
    try {
      const res = await projectService.getList();
      if (res.status === 200) {
        setProjects(res.data);
      } else {
        message.error("Failed to fetch projects");
      }
    } catch (err) {
      message.error("Error fetching projects");
      console.error(err);
    }
  };
  useEffect(() => {
    getProjects();
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

     
      if (!editingPolicy) {
        formattedValues.status = true;  // Mặc định status là true (Active)
      }

      console.log("Submitting values:", formattedValues);

      if (editingPolicy) {
        const response = await salesPolicyService.adminUpdateSalesPolicy(
          editingPolicy.salesPolicyID,
          formattedValues
        );
        message.success("Sales policy updated successfully");
      } else {
        const response = await salesPolicyService.adminCreateSalesPolicy(
          formattedValues
        );
        message.success("Sales policy created successfully");
      }

      setIsModalVisible(false);
      getListSalesPolicies();
    } catch (error) {
      message.error("Error: " + error.message);
    }
  };

  const handleDelete = async (salesPolicyID) => {
    if (!window.confirm('Are you want to delete?')){
      return;
    }
    await salesPolicyService.adminDeleteSalesPolicy(salesPolicyID);
    message.success("Sales policy deleted successfully");
    getListSalesPolicies();
  };

  const columns = [
    {
      title: "Sales Policy Type",
      dataIndex: "salesPolicyType",
    },
    {
      title: "Express Time",
      dataIndex: "expressTime",
    },
    {
      title: "Project Name",
      dataIndex: "projectID",
      render: (projectID) => {
        const project = projects.find((p) => p.projectID === projectID);
        return project ? project.projectName : "Unknown";
      },
    },
    {
      title: "People Applied",
      dataIndex: "peopleApplied",
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
      title: "Project Name",
      dataIndex: "projectName",
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.salesPolicyID)} danger>
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
          <h1>Sales Policy List</h1>
        </div>
        <Button type="primary" onClick={() => showModal()}>
          Add New Sales Policy
        </Button>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey="salesPolicyID"
        />

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
              rules={[
                { required: true, message: "Please enter sales policy type" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="expressTime"
              id="expressTime"
              label="Express Time"
              rules={[{ required: true, message: "Please enter express time" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="peopleApplied"
              id="peopleApplied"
              label="People Applied"
              rules={[
                { required: true, message: "Please enter people applied" },
              ]}
            >
              <Input />
            </Form.Item>

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

            <Form.Item
              name="projectID"
              id="projectID"
              label="Project Name"
              rules={[{ required: true, message: "Please select a project" }]}
            >
              <Select
                placeholder="Select a project"
                options={projects.map((project) => ({
                  label: project.projectName,
                  value: project.projectID,
                }))}
              />
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </>
  );
}

export default SalesPolicyList;
