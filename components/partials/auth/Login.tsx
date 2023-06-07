import React from "react";
import Link from "next/link";
import classes from "./Auth.module.css";
import { Form, Input, Button, Alert, Card } from "antd";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { login } from "../../../store/actions/auth";
import { links } from "../../../utilities/constants";

const Login = () => {
  const dispatch = useDispatch();
  let error = useSelector((state: RootStateOrAny) => state.auth.error);

  const [form] = Form.useForm();

  const handleSubmit = (data:{
    email:string,
    password:string,
  }) => {
    dispatch(login(data));
  };

  return (
    <div className={`${classes.auth} container`}>
      <h1 className={classes.auth_header}>
        Hello There! <br />
        Login Now.
      </h1>
      <span>
        <span className={classes.grey_text}>If you are new</span> /
        <Link href={links.SIGNUP}> Create an account</Link>
      </span>

      {error ? <Alert message={error} type="error" /> : ""}

      <Card className={classes.content}>
        <Form form={form} name="login" onFinish={handleSubmit}>
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
            rules={[{ required: true, message: "Please input a password!" }]}
          >
            <Input.Password />
          </Form.Item>

          {/* Forgot Password */}
          <Link href={links.RESETPASSWORD}>Forgot Password?</Link>

          {/* Submit Btn */}
          <Form.Item>
            <Button className="btn" block htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
