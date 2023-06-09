import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import Spin from "../../visuals/Spin/Spin";
import AuthRepository from "../../../repositories/AuthRepository";
import openNotification from "../../visuals/Notification";
import classes from "./ChangePassword.module.css";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = async (data) => {
    setLoading(true);

    delete data.confirmPassword;

    const res = await AuthRepository.changePassword(data);

    if (res.statusCode === 200) {
      openNotification({
        type: "success",
        message: "Your password has been changed!",
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={classes.body}>
      <br />
      <h3>Change your password!</h3>
      {loading ? (
        <Spin />
      ) : (
        <Form
          className={classes.content}
          form={form}
          name="changePassword"
          onFinish={handleSubmit}
        >
          {/* Old Password */}
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[{ required: true, message: "Please input a password!" }]}
          >
            <Input.Password />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please input a password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length > 5) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Passwords must be up to 6 characters!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Passwords do not match!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Submit Btn */}
          <Form.Item>
            <Button className="btn" htmlType="submit" block>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ChangePassword;
