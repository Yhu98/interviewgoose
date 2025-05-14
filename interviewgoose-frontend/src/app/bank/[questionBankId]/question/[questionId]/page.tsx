"use server";
import "./index.css";
import Title from "antd/es/typography/Title";
import { Avatar, Button, Card, Flex, Menu } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import QuestionDetailCard from "@/components/QuestionDetailCard";
import Link from "next/link";

/**
 * Question Bank Question Page
 * @constructor
 */
export default async function BankQuestionPage({ params }) {
  const { questionBankId, questionId } = params;

  // get question bank details
  let bank = undefined;
  try {
    const bankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = bankRes.data;
  } catch (e) {
    // @ts-ignore
    console.error("Couldn't find topic. " + e.message);
  }
  if (!bank) {
    return <div>Topic not found. Please try again.</div>;
  }

  // get question details
  let question = undefined;
  try {
    const questionRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionRes.data;
  } catch (e) {
    // @ts-ignore
    console.error("Couldn't find question. " + e.message);
  }
  if (!question) {
    return <div>Topic not found. Please try again.</div>;
  }

  // question menu item list
  const questionMenuItemList = (bank.questionPage?.records || []).map((q) => {
    return {
      label: <Link href={`/bank/${questionBankId}/question/${q.id}`}>{q.title}</Link>,
      key: q.id,
    };
  });

  return (
    <div id="bankQuestionPage">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={4} style={{ padding: "0 20px" }}>
            {bank.title}
          </Title>
          <Menu items={questionMenuItemList} selectedKeys={[question.id]} />
        </Sider>
        <Content>
          <QuestionDetailCard question={question} />
        </Content>
      </Flex>
    </div>
  );
}
