import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import Spin from "../../visuals/Spin/Spin";
import { useRouter } from "next/router";
import { links, localStorageVars } from "../../../utilities/constants";
import AuthRepository from "../../../repositories/AuthRepository";
import openNotification from "../../visuals/Notification";

const ResendVerificationCode = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (data:{email:string}) => {
    setLoading(true);

    const res = await AuthRepository.resendVerificationCode(data);

    if (res.statusCode === 200) {
      console.log(res.data.verificationCode)
      openNotification({
        type: "success",
        message: "Your verification code has been sent!",
      });
      router.push(links.VERIFYEMAIL);
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
        <h3>Please enter your email.</h3>
        <i>
          Check your spam folder in case the mail {`doesn't`} show up in the
          main inbox
        </i>
        {loading ? (
          <Spin />
        ) : (
          <Form
            form={form}
            name="resendVerificationCode"
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
                Resend verification code
              </Button>
            </Form.Item>
          </Form>
        )}
      </>
    );
  
};

export default ResendVerificationCode;
