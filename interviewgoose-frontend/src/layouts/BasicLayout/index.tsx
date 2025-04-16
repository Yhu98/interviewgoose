"use client";

import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, theme } from "antd";
import React, { ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import menus from "../../../config/menu";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

/**
 * Global Basic Layout
 * @param children
 * @constructor
 */
const SearchInput = () => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={
          <SearchOutlined
            style={{
              color: token.colorTextLightSolid,
            }}
          />
        }
        placeholder="search question"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);

  return (
    <div
      id="basic-layout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="Interview Goose"
        layout="top"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="Interview Goose - Yuxuan"
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/notLoginUser.png",
          size: "small",
          title: loginUser.userName || "FreshGoose",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "Sign out",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <SearchInput key="search" />,
            <a
              key="github"
              href="https://github.com/Yhu98/interviewgoose"
              target="_blank"
            >
              <GithubFilled key="github" />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        // Render Footer
        footerRender={(props) => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuDataRender={() => {
          return menus;
        }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
