"use client";
import React, { useCallback, useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import "./globals.css";
import store, { AppDispatch } from "@/stores";
import { Provider, useDispatch } from "react-redux";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";

/**
 * Global Init Logic
 * @param children
 * @constructor
 */

const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * Global initial function
   * logic only used for once
   */
  const doInitLoginUser = useCallback(async () => {
    const res = await getLoginUserUsingGet();
    if (res.data) {
      // update global user state
    } else {
      setTimeout(() => {
        const testUser = { userName: "test login", id: 1 };
        dispatch(setLoginUser(testUser));
      }, 3000);
    }
  }, []);
  // execute only for once
  useEffect(() => {
    doInitLoginUser();
  }, []);
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>{children}</BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
