import React, { useState } from "react";
import Link from "next/link";
import classes from "./Auth.module.css";
import { Form, Input, Button, Card, InputNumber } from "antd";
import { useRouter } from "next/router";
import Spinner from "../../visuals/Spin/Spin";
import AuthRepository from "../../../repositories/AuthRepository";
import openNotification from "../../visuals/Notification";
import { localStorageVars } from "../../../utilities/constants";
import { links } from "../../../utilities/constants";

interface IState {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
  };
}

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [form] = Form.useForm();
  const router = useRouter();

  const isValidPhone = (phone) => {
    const regex = /^\d{10}$/;

    if (regex.test(phone)) {
      const number = `+234${phone}`;
      setPhoneNumber(number);

      return true;
    }
    return false;
  };

  const handleSubmit = async (data: IState["userInfo"]) => {
    setLoading(true);
    data.phone = phoneNumber;
    delete data.confirmPassword;

    const res = await AuthRepository.createAccount(data);

    if (res.statusCode === 201) {
      console.log(res.data.verificationCode)

      router.push(links.VERIFYEMAIL);
      openNotification({
        type: "success",
        message: "Account created successfully!",
      });
      localStorage.setItem(localStorageVars.USEREMAIL, data.email);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className={`${classes.auth} container`}>
      <h1 className={classes.auth_header}>
        Hello Stranger! <br />
        Join Now.
      </h1>
      <span>
        <span className={classes.grey_text}>Already have an account?</span> /
        <Link href="/auth/login">Login</Link>
      </span>
      {loading ? (
        <Spinner />
      ) : (
        <Card className={classes.content}>
          <Form form={form} name="signup" onFinish={handleSubmit}>
            {/* First Name */}
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Last Name */}
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>

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

            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
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
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* Phone Number */}
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (isValidPhone(value)) return Promise.resolve();
                    return Promise.reject("Phone number is not valid!");
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: "100%" }} addonBefore="+234" />
            </Form.Item>

            {/* Submit Btn */}
            <Form.Item>
              <Button className="btn" block htmlType="submit">
                Create Account
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default Signup;
