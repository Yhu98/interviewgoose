"use client";
import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import React, { useState } from "react";
import "./index.css";
import CalendarChart from "@/app/user/center/components/CalendarChart";
import ACCESS_ENUM from "@/access/accessEnum";
import verifyAccess from "@/access/verifyAccess";
import Forbidden from "@/app/forbidden";

/**
 * User Center Page
 * @constructor
 */
export default function UserCenterPage() {
  // Get user login info
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // new variable for reuse
  const user = loginUser;
  // controlling tab highlighted in menu list
  const [activeTabKey, setActiveTabKey] = useState<string>("info");
  // verify if the user has the valid access
  const needAccess = ACCESS_ENUM.USER;
  const haveAccess = verifyAccess(loginUser, needAccess);
  if (!haveAccess) {
    return <Forbidden />;
  }
  return (
    <div id="userCenterPage" className="max-width-content">
      <Row gutter={[16, 16]} className="user-row">
        <Col xs={24} md={4}>
          <Card style={{ textAlign: "center" }}>
            <Avatar src={user.userAvatar} size={72} />
            <div style={{ marginBottom: 16 }} />
            <Meta
              title={
                <Title level={4} style={{ marginBottom: 0 }}>
                  {user.userName}
                </Title>
              }
              description={
                <>
                  <Paragraph type="secondary">{user.userProfile}</Paragraph>
                </>
              }
            />
          </Card>
        </Col>
        <Col xs={24} md={20}>
          <Card
            tabList={[
              {
                key: "record",
                label: "Browsing Records",
              },
              {
                key: "others",
                label: "Others",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(key: string) => {
              setActiveTabKey(key);
            }}
          >
            {activeTabKey === "record" && (
              <>
                <CalendarChart />
              </>
            )}
            {activeTabKey === "others" && <>bbbbb</>}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
