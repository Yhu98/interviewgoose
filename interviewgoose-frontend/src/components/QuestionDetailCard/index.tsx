"use client";
import { Card, } from "antd";
import "./index.css";
import TagList from "@/components/TagList";
import MdViewer from "@/components/MdViewer";
import Title from "antd/es/typography/Title";
import {addUserClockOnUsingPost} from "@/api/userController";

interface Props {
  question: API.QuestionVO;
}

/**
 * Question Bank (Topics) List Component
 * @param props
 * @constructor
 */
const QuestionDetailCard = (props: Props) => {
  const { question } = props;

  addUserClockOnUsingPost();

  return (
    <div className="question-detail-card">
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>{question.title}</Title>
        <TagList tagList={question.tagList} />
        <div style={{ marginBottom: 16 }} />
        <MdViewer value={question.content} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card title="Recommended Answer">
        <MdViewer value={question.answer} />
      </Card>
    </div>
  );
};

export default QuestionDetailCard;
