import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <BasicLayout>{children}</BasicLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
