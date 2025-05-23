import { Button, Form, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { batchAddQuestionsToBankUsingPost } from "@/api/questionController";

interface Props {
  questionIdList?: number[];
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

/**
 * Batch Add Questions To a Bank Popup
 * @param props
 * @constructor
 */
const BatchAddQuestionsToBankModal: React.FC<Props> = (props) => {
  const { questionIdList = [], visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();
  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);

  // Get current question bank id list
  const getQuestionBankList = async () => {
    // get all question bank if the number of topics is small
    const pageSize = 200;

    try {
      const res = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });
      setQuestionBankList(res.data?.records ?? []);
    } catch (e) {
      message.error("Couldn't get related topics list" + e.message);
    }
  };

  useEffect(() => {
    getQuestionBankList();
  }, []);

  /**
   * Submit
   * @param fields
   */
  const doSubmit = async (fields: API.QuestionBankQuestionBatchAddRequest) => {
    const hide = message.loading("Updating >>>");
    const questionBankId = fields.questionBankId;
    try {
      await batchAddQuestionsToBankUsingPost({
        questionIdList,
        questionBankId,
      });
      hide();
      message.success("Successfully added to the topic");
      onSubmit?.();
    } catch (error: any) {
      hide();
      message.error("Action failed." + error.message);
    }
  };

  return (
    <Modal
      destroyOnClose
      title={"Add all selected questions to a topic"}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <Form form={form} style={{ marginTop: 24 }} onFinish={doSubmit}>
        <Form.Item label="Select Topic" name="questionBankId">
          <Select
            style={{ width: "100%" }}
            options={questionBankList.map((questionBank) => {
              return {
                label: questionBank.title,
                value: questionBank.id,
              };
            })}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default BatchAddQuestionsToBankModal;
