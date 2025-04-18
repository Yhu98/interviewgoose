"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { userRegisterUsingPost } from "@/api/userController";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { ProForm } from "@ant-design/pro-form/lib";
import { useRouter } from "next/navigation";
import "./index.css";

/**
 * User Login Page
 * @constructor
 */
const UserLoginPage: React.FC = () => {
  const [form] = ProForm.useForm();
  // const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  /**
   * Submit
   */
  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("You've joined us! Let's go~");
        // @ts-ignore
        // dispatch(setLoginUser(res.data));
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e) {
      // @ts-ignore
      message.error("Signup failed. " + e.message);
    }
  };

  return (
    <div id="userRegisterPage">
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
        title="Goose Join in"
        subTitle="Interview Questions Practice Bank for IT Graduates"
        onFinish={doSubmit}
        submitter={{
          searchConfig: {
            submitText: "Join",
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
            placeholder={"Choose your password here"}
            rules={[
              {
                required: true,
                message: "Choose your password here",
              },
            ]}
          />
          <ProFormText.Password
            name="checkPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"Confirm your password here"}
            rules={[
              {
                required: true,
                message: "Confirm your password here",
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
          Already had an account?
          <Link href={"/user/login"}> Sign in now</Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;
