import { Button, Col, Form, Input, Modal, Row, Select, Table } from "antd";
import React, { useState } from "react";
import AdminRepository from "../../../../repositories/AdminRepository";
import openNotification from "../../../visuals/Notification";
const { Option } = Select;

interface IProps{
  admins:[],
}

const AccessControl:React.FC<IProps> = ({ admins }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState(1);
  const [aboutRole, setAboutRole] = useState("");
  const [form] = Form.useForm();

  const handleSelectChange = (value:number) => {
    setRole(value);

    switch (value) {
      case 1:
        setAboutRole(
          "This is a normal user with no administrative priviledges."
        );
        break;
      case 2:
        setAboutRole(
          "An admin can make any modifications to the system and is the highest authority. Be careful who you give admin priviledge to!"
        );
        break;
      default:
        break;
    }
  };

  const addNewMember = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          email: values.email,
          accessLevel: role,
        };

        const res = AdminRepository.adminUpdateUser(data);

        if (res.message === "success") {
          openNotification({ type: "success", message: "Member added!" });
        }
      })
      .catch((e) => console.log(e));
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "accessLevel",
      key: "accessLevel",
      render: (accessLevel, record) => {
        return (
          <Select
            defaultValue={accessLevel}
            style={{ width: 80 }}
            onChange={(value) => {
              const data = {
                email: record.email,
                accessLevel: value,
              };
              const res = AdminRepository.adminUpdateUser(data);

              if (res.message === "success") {
                openNotification({ type: "success", message: "Member added!" });
              }
            }}
          >
            <Option key={"user"} value={1}>
              User
            </Option>
            <Option key={"admin"} value={2}>
              Admin
            </Option>
          </Select>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        title="Invite New Members"
        visible={isModalVisible}
        onOk={addNewMember}
        onCancel={() => setIsModalVisible(false)}
        okText="Add Member"
      >
        <Form form={form} name="addNewMember">
          <Row align="middle" justify="space-around">
            <Col span={15}>
              {/* Email */}
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "Please input a valid email!",
                  },
                  { required: true, message: "Please input a valid email!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Select
                defaultValue={role}
                style={{ width: 80 }}
                onChange={handleSelectChange}
              >
                <Option key={1} value={1}>
                  User
                </Option>
                <Option key={2} value={2}>
                  Admin
                </Option>
              </Select>
            </Col>
          </Row>
          <p className="role_description">{aboutRole}</p>
        </Form>
      </Modal>

      <h1>Access Control</h1>
      <Button className="btn" onClick={() => setIsModalVisible(true)}>
        Add Member
      </Button>
      <Table
        dataSource={admins}
        columns={columns}
        rowKey={(record) => record.userId}
      />
    </div>
  );
};

export default AccessControl;
