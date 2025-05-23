import { Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  addQuestionBankQuestionUsingPost,
  listQuestionBankQuestionVoByPageUsingPost,
  removeQuestionBankQuestionUsingPost,
} from "@/api/questionBankQuestionController";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";

interface Props {
  questionId?: number;
  visible: boolean;
  onCancel: () => void;
}

/**
 * Update Popup (Related Topics for Question)
 * @param props
 * @constructor
 */
const UpdateBankModal: React.FC<Props> = (props) => {
  const { questionId, visible, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
      API.QuestionBankVO[]
  >([]);

  // Get current question bank id list
  const getCurrentQuestionBankIdList = async () => {
    try {
      const res = await listQuestionBankQuestionVoByPageUsingPost({
        questionId,
        pageSize: 20,
      });
      const list = (res.data?.records ?? []).map((item) => item.questionBankId);
      console.log(list);
      form.setFieldValue("questionBankIdList" as any, list);
    } catch (e) {
      message.error("Couldn't get related topics list" + e.message);
    }
  };

  useEffect(() => {
    if (questionId) {
      getCurrentQuestionBankIdList();
    }
  }, [questionId]);

  // Get Question Bank List
  const getQuestionBankList = async () => {
    // Get ALL if the number of topics is small
    const pageSize = 200;

    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      setQuestionBankList(res.data?.records ?? []);
    } catch (e) {
      message.error("Couldn't get topics list，" + e.message);
    }
  };

  useEffect(() => {
    getQuestionBankList();
  }, []);

  return (
      <Modal
          destroyOnClose
          title={"Update Related Topic"}
          open={visible}
          footer={null}
          onCancel={() => {
            onCancel?.();
          }}
      >
        <Form form={form} style={{ marginTop: 24 }}>
          <Form.Item label="Related Topiics" name="questionBankIdList">
            <Select
                mode="multiple"
                style={{ width: "100%" }}
                options={questionBankList.map((questionBank) => {
                  return {
                    label: questionBank.title,
                    value: questionBank.id,
                  };
                })}
                onSelect={async (value) => {
                  const hide = message.loading("Updating >>>");
                  try {
                    await addQuestionBankQuestionUsingPost({
                      questionId,
                      questionBankId: value,
                    });
                    hide();
                    message.success("Successfully added to the topic");
                  } catch (error: any) {
                    hide();
                    message.error("cc. " + error.message);
                  }
                }}
                onDeselect={async (value) => {
                  const hide = message.loading("Updating >>>");
                  try {
                    await removeQuestionBankQuestionUsingPost({
                      questionId,
                      questionBankId: value,
                    });
                    hide();
                    message.success("Successfully removed frm the topic");
                  } catch (error: any) {
                    hide();
                    message.error("Successfully add it to the topic，" + error.message);
                  }
                }}
            />
          </Form.Item>
        </Form>
      </Modal>
  );
};
export default UpdateBankModal;