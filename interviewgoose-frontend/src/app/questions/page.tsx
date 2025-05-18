import Title from "antd/es/typography/Title";
import { searchQuestionVoByPageUsingPost} from "@/api/questionController";
import "./index.css";
import QuestionTable from "@/components/QuestionTable/page";

/**
 * Question Page
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  const {q: searchText} = searchParams;
  let questionList = [];
  let total = 0;

  try {
    const res = await searchQuestionVoByPageUsingPost({
      searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    });
    questionList = res.data.records ?? [];
    total = res.data.total ?? 0;
  } catch (e) {
    // @ts-ignore
    console.error("Couldn't find questions，" + e.message);
  }

  return (
      <div id="questionsPage" className="max-width-content">
        <Title level={3}>All Questions</Title>
        <QuestionTable defaultQuestionList={questionList} defultTotal={total} defaultSearchParams={{
          title: searchText,
        }} />
      </div>
  );
}
