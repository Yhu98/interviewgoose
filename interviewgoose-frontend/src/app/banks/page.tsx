"use server";
import "./index.css";
import { message } from "antd";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";
import Title from "antd/es/typography/Title";

/**
 * Topics Page
 * @constructor
 */
export default async function TopicsPage() {
  let questionBankList = [];
  const pageSize = 200;
  try {
    const res = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionBankList = res.data.records ?? [];
  } catch (e) {
    // @ts-ignore
    message.error("Couldn't fetch topics. " + e.message);
  }

  return (
      <div id="banksPage" className="max-width-content">
        <Title level={3}>All Topics</Title>
        <QuestionBankList questionBankList={questionBankList} />
      </div>
  );
}
