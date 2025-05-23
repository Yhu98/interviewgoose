"use client";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import UpdateBankModal from "./components/UpdateBankModal";
import {
  deleteQuestionUsingPost,
  listQuestionByPageUsingPost,
} from "@/api/questionController";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  TagOutlined,
} from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Table, Typography } from "antd";
import React, { useRef, useState } from "react";
import TagList from "@/components/TagList";
import MdEditor from "@/components/MdEditor";
import BatchAddQuestionsToBankModal from "@/app/admin/question/components/BatchAddQuestionsToBankModal";
import BatchRemoveQuestionsFromBankModal from "@/app/admin/question/components/BatchRemoveQuestionsFromBankModal";
import { batchDeleteQuestionsUsingPost } from "@/api/questionBankQuestionController";

/**
 * Question Management Page
 *
 * @constructor
 */
const QuestionAdminPage: React.FC = () => {
  // whether create new popup
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // whether display update popup
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  // whether display update popup (question bank)
  const [updateBankModalVisible, setUpdateBankModalVisible] =
    useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // whether display data the current user clicks on
  const [currentRow, setCurrentRow] = useState<API.Question>();
  // whether display popup for batch add questions to bank
  const [
    batchAddQuestionsToBankModalVisible,
    setBatchAddQuestionsToBankModalVisible,
  ] = useState<boolean>(false);
  // whether display popup for batch remove questions from bank
  const [
    batchRemoveQuestionsFromBankModalVisible,
    setBatchRemoveQuestionsFromBankModalVisible,
  ] = useState<boolean>(false);
  // list of id of current selected questions
  const [selectedQuestionIdList, setSelectedQuestionIdList] = useState<
    number[]
  >([]);

  /**
   * Delete a question (row)
   *
   * @param row
   */
  const handleDelete = async (row: API.Question) => {
    const hide = message.loading("Deleting");
    if (!row) return true;
    try {
      await deleteQuestionUsingPost({
        id: row.id as any,
      });
      hide();
      message.success("Deleted");
      actionRef?.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error("Deletion failed. " + error.message);
      return false;
    }
  };

  /**
   * Batch Delete Questions
   * @param questionIdList
   */
  const handleBatchDelete = async (questionIdList: number[]) => {
    const hide = message.loading("Deleting");
    try {
      await batchDeleteQuestionsUsingPost({
        questionIdList,
      });
      hide();
      message.success("Deleted");
      actionRef?.current?.reload();
    } catch (error: any) {
      hide();
      message.error("Deletion failed. " + error.message);
    }
  };

  /**
   * Table Column Config
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
      fieldProps: { placeholder: "Search by id" },
    },
    {
      title: "Title",
      dataIndex: "title",
      valueType: "text",
      fieldProps: { placeholder: "Search by title" },
    },
    {
      title: "Content",
      dataIndex: "content",
      valueType: "text",
      hideInSearch: true,
      width: 240,
      renderFormItem: (
        _,
        { type, defaultRender, formItemProps, fieldProps, ...rest },
        form,
      ) => {
        return (
          // value and onchange will be injected automatically
          <MdEditor
            // Components Configuration
            {...fieldProps}
          />
        );
      },
    },
    {
      title: "Answer",
      dataIndex: "answer",
      valueType: "text",
      hideInSearch: true,
      width: 640,
      renderFormItem: (
        _,
        { type, defaultRender, formItemProps, fieldProps, ...rest },
        form,
      ) => {
        return (
          // value and onchange will be injected automatically
          <MdEditor
            // Components Configuration
            {...fieldProps}
          />
        );
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
        placeholder: "Select tags",
      },
      render: (_, record) => {
        const tagList = JSON.parse(record.tags || "[]");
        return <TagList tagList={tagList} />;
      },
    },
    {
      title: "Topics",
      dataIndex: "questionBankId",
      hideInTable: true,
      hideInForm: true,
    },
    {
      title: "Who Created",
      dataIndex: "userId",
      valueType: "text",
      hideInForm: true,
    },

    {
      title: "When Created",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
      fieldProps: { placeholder: "Search by poster" },
    },
    {
      title: "When Edited",
      sorter: true,
      dataIndex: "editTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "When Updated",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "Action",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            <EditOutlined />
          </Typography.Link>
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateBankModalVisible(true);
            }}
          >
            <TagOutlined />
          </Typography.Link>
          <Typography.Link type="danger" onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.Question>
        headerTitle={"Question List"}
        actionRef={actionRef}
        scroll={{
          x: true,
        }}
        search={{
          labelWidth: 120,
          resetText: "Reset",
          searchText: "Search",
        }}
        rowKey="id"
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          defaultSelectedRowKeys: [1],
        }}
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => {
          console.log(selectedRowKeys, selectedRows);
          return (
            <Space size={24}>
              <span>
                {selectedRowKeys.length} selected
                <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                  Unselect
                </a>
              </span>
            </Space>
          );
        }}
        tableAlertOptionRender={({ selectedRowKeys }) => {
          return (
            <Space size={16}>
              <Button
                onClick={() => {
                  // pop up
                  setSelectedQuestionIdList(selectedRowKeys as number[]);
                  setBatchAddQuestionsToBankModalVisible(true);
                }}
              >
                Add Selected Questions to
              </Button>

              <Button
                onClick={() => {
                  // pop up
                  setSelectedQuestionIdList(selectedRowKeys as number[]);
                  setBatchRemoveQuestionsFromBankModalVisible(true);
                }}
              >
                Remove Selected Questions from
              </Button>
              <Popconfirm
                title="Confirm Deleting Action"
                description="Are you sure to delete these selected questions?"
                onConfirm={() => {
                  // delete all selected questions from the database
                  handleBatchDelete(selectedRowKeys as number[]);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete Selected Questions</Button>
              </Popconfirm>
            </Space>
          );
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> New
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data, code } = await listQuestionByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as API.QuestionQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: Number(data?.total) || 0,
          };
        }}
        columns={columns}
      />
      <CreateModal
        visible={createModalVisible}
        columns={columns}
        onSubmit={() => {
          setCreateModalVisible(false);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        oldData={currentRow}
        onSubmit={() => {
          setUpdateModalVisible(false);
          setCurrentRow(undefined);
          actionRef.current?.reload();
        }}
        onCancel={() => {
          setUpdateModalVisible(false);
        }}
      />
      <UpdateBankModal
        visible={updateBankModalVisible}
        questionId={currentRow?.id}
        onCancel={() => {
          setUpdateBankModalVisible(false);
        }}
      />
      <BatchAddQuestionsToBankModal
        visible={batchAddQuestionsToBankModalVisible}
        questionIdList={selectedQuestionIdList}
        onSubmit={() => {
          setBatchAddQuestionsToBankModalVisible(false);
        }}
        onCancel={() => {
          setBatchAddQuestionsToBankModalVisible(false);
        }}
      />
      <BatchRemoveQuestionsFromBankModal
        visible={batchRemoveQuestionsFromBankModalVisible}
        questionIdList={selectedQuestionIdList}
        onSubmit={() => {
          setBatchRemoveQuestionsFromBankModalVisible(false);
        }}
        onCancel={() => {
          setBatchRemoveQuestionsFromBankModalVisible(false);
        }}
      />
    </PageContainer>
  );
};
export default QuestionAdminPage;
