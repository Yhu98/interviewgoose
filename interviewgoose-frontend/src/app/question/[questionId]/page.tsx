"use server";
import "./index.css";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionDetailCard from "@/components/QuestionDetailCard";

/**
 * Question Page visited from home page or questions page
 * @constructor
 */
export default async function QuestionPage({ params }) {
  const { questionId } = params;

  // get question details
  let question = undefined;
  try {
    const res = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = res.data;
  } catch (e) {
    // @ts-ignore
    console.error("Couldn't find question. " + e.message);
  }
  if (!question) {
    return <div>Topic not found. Please try again.</div>;
  }

  return (
    <div id="questionPage">
      <QuestionDetailCard question={question} />
    </div>
  );
}
