"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { userLoginUsingPost } from "@/api/userController";
import { message } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/stores";
import { setLoginUser } from "@/stores/loginUser";
import { ProForm } from "@ant-design/pro-form/lib";
import { useRouter } from "next/navigation";
import "./index.css";

/**
 * User Login Page
 * @constructor
 */
const UserLoginPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  /**
   * Submit
   */
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("Successful Login");
        // @ts-ignore
        dispatch(setLoginUser(res.data));
        router.replace("/");
        form.resetFields();
      }
    } catch (e) {
      // @ts-ignore
      message.error("Login Failed. " + e.message);
    }
  };

  return (
    <div id="userLoginPage">
      <LoginForm
        form={form}
        logo={
          <Image
            src="/assets/logo.png"
            alt="InterviewGoose"
            height={44}
            width={44}
          />
        }
        title="Goose Login"
        subTitle="Interview Questions Practice Bank for IT Graduates"
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "Login",
          },
        }}
      >
        <>
          <ProFormText
            name="userAccount"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined />,
            }}
            placeholder={"Please type in your account"}
            rules={[
              {
                required: true,
                message: "Please type in your account",
              },
            ]}
          />
          <ProFormText.Password
            name="userPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"Please type in your password"}
            rules={[
              {
                required: true,
                message: "Please type in your password",
              },
            ]}
          />
        </>
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          Do not have an account?
          <Link href={"/user/register"}>Register now!</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
