"use client";
import { searchQuestionVoByPageUsingPost } from "@/api/questionController";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import { TablePaginationConfig } from "antd";
import Link from "next/link";
import "./index.css";

interface Props {
  defaultQuestionList?: API.QuestionVO[];
  defaultTotal?: number;
  // default search
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * Question Table Component
 *
 * @constructor
 */
const QuestionTable: React.FC = (props: Props) => {
  const { defaultQuestionList, defaultTotal, defaultSearchParams = {} } = props;
  const actionRef = useRef<ActionType>();
  // question list
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
      defaultQuestionList || [],
  );
  // total of questions
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  // judge if it is first time to load the data
  const [init, setInit] = useState<boolean>(true);
  /**
   * Table Columns Config
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "Search",
      dataIndex: "searchText",
      valueType: "text",
      fieldProps: {
        placeholder: "Search by keywords",
      },
      hideInTable: true, // hide in table
    },
    {
      title: "Title",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true, // hide in search
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "Tags",
      dataIndex: "tagList",
      valueType: "select",
      fieldProps: {
        mode: "tags",
        placeholder: "Select tags",
      },
      render: (_, record) => <TagList tagList={record.tagList} />,
    },
  ];

  return (
    <div className="question-table">
      <ProTable<API.QuestionVO>
        actionRef={actionRef}
        size="large"
        search={{
          labelWidth: "auto",
          resetText: "Reset",
          searchText: "Search",
        }}
        form={{
          initialValues: defaultSearchParams,
        }}
        dataSource={questionList}
        pagination={
          {
            pageSize: 12,
            showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} total questions`,
            showSizeChanger: false,
            total,
          } as TablePaginationConfig
        }
        request={async (params, sort, filter) => {
          // first time load judgement
          if (init) {
            setInit(false);
            if (defaultQuestionList && defaultTotal) { return; }
          }
          const sortField = Object.keys(sort)?.[0] || "createTime";
          const sortOrder = sort?.[sortField] || "descend";
          // request
          const { data, code } = await searchQuestionVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);
          // update return data
          const newData = data?.records || [];
          const newTotal = data?.total || 0;
          setQuestionList(newData);
          setTotal(newTotal);
          return {
            success: code === 0,
            data: newData,
            total: newTotal,
          };
        }}
        columns={columns}
      />
    </div>
  );
};
export default QuestionTable;