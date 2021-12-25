import React, { useState } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import Spin from "../../visuals/Spin/Spin";
import { useRouter } from "next/router";
import { links, localStorageVars } from "../../../utilities/constants";
import AuthRepository from "../../../repositories/AuthRepository";
import openNotification from "../../visuals/Notification";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (data:{email:string}) => {
    setLoading(true);
    const res = await AuthRepository.resetPassword(data);

    if (res.message === "success") {
      openNotification({
        type: "success",
        message: "Your password has been sent to your mail!",
      });
      router.push(links.LOGIN);
      setLoading(false);
      localStorage.removeItem(localStorageVars.USEREMAIL);
    } else {
      setLoading(false);
      localStorage.removeItem(localStorageVars.USEREMAIL);
    }
  }
    return (
      <>
        <br />
        <h3>Please enter your email address.</h3>
        <i>
          Check your spam folder in case the mail {`doesn't`} show up in the
          main inbox
        </i>
        {loading ? (
          <Spin />
        ) : (
          <Form
            form={form}
            name="resetPassword"
            onFinish={handleSubmit}
            fields={[
              {
                name: ["email"],
                value: localStorage.getItem(localStorageVars.USEREMAIL) || "",
              },
            ]}
          >
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

            {/* Submit Btn */}
            <Form.Item>
              <Button htmlType="submit" block>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        )}
      </>
    );

};
export default ResetPassword;
