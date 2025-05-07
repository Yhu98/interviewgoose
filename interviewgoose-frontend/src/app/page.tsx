"use server";
import "./index.css";
import Title from "antd/es/typography/Title";
import { Flex, message } from "antd";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionBankList from "@/components/QuestionBankList";
import QuestionList from "@/components/QuestionList";

/**
 * Home Page
 * @constructor
 */
export default async function HomePage() {
  let questionBankList = [];
  let questionList = [];
  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = questionBankRes.data.records ?? [];
  } catch (e) {
    // @ts-ignore
    message.error("Couldn't fetch topics. " + e.message);
  }
  try {
    const questioListRes = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = questioListRes.data.records ?? [];
  } catch (e) {
    // @ts-ignore
    message.error("Couldn't fetch questions. " + e.message);
  }
  return (
    <div id="homePage" className="max-width-content">
      <Flex justify="space-between" align="center">
        <Title level={3}>New Topics</Title>
        <Link href={"/banks"}>more+</Link>
      </Flex>
      <div>
          <QuestionBankList questionBankList={questionBankList} />
      </div>
      <Flex justify="space-between" align="center">
        <Title level={3}>New Questions</Title>
        <Link href={"/questions"}>more+</Link>
      </Flex>
      <div>
          <QuestionList questionList={questionList} />
      </div>
    </div>
  );
}
