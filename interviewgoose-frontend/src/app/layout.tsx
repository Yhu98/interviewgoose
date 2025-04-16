"use client";
import React, { useCallback, useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import "./globals.css";
import store from "@/stores";
import { Provider } from "react-redux";

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
  /**
   * Global initial function
   * logic only used for once
   */
  const doInit = useCallback(() => {
    console.log("init");
  }, []);
  // execute only for once
  useEffect(() => {
    doInit();
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
