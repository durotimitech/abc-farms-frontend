import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Card } from "antd";
import { useRouter } from "next/router";
import openNotification from "../../../visuals/Notification";
import AuthRepository from "../../../../repositories/AuthRepository";
import { links, localStorageVars } from "../../../../utilities/constants";
import Spin from "../../../visuals/Spin/Spin";
import Link from "next/link";
import classes from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (data:{email:string, verificationCode:string,isEmailVerified:number}) => {
    setLoading(true);

    data.isEmailVerified = 1;

    const res = await AuthRepository.verifyEmail(data);

    if (res.message === "success") {
      openNotification({ type: "success", message: "Account verified!" });
      router.push(links.LOGIN);
      setLoading(false);
      localStorage.removeItem(localStorageVars.USEREMAIL);
    } else {
      setLoading(false);
      localStorage.removeItem(localStorageVars.USEREMAIL);
    }
  };

  return (
    <>
      <br />
      <div className={classes.body}>
        <Card className={classes.content}>
          <h3>Please enter the code sent to your email address.</h3>
          <i>
            Check your spam folder in case the mail {`doesn't`} show up in the
            main inbox
          </i>
          {loading ? (
            <Spin />
          ) : (
            <Form
              form={form}
              name="verifyEmail"
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

              {/* Verification Code */}
              <Form.Item
                name="verificationCode"
                label="Verification Code"
                rules={[
                  {
                    required: true,
                    message: "Please input the verification code!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              {/* Submit Btn */}
              <Form.Item>
                <Button className="btn_light" block htmlType="submit">
                  Verify Account
                </Button>
              </Form.Item>

              {/* Submit Btn */}
              <Form.Item>
                <Link href={links.RESENDVERIFICATIONCODE} passHref>
                  <Button className="btn" block>
                    Resend verification code
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    </>
  );
};

export default VerifyEmail;
