import { addQuestionBankUsingPost } from '@/api/questionBankController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.QuestionBank>[];
  onSubmit: (values: API.QuestionBankAddRequest) => void;
  onCancel: () => void;
}

/**
 * Create new node
 * @param fields
 */
const handleAdd = async (fields: API.QuestionBankAddRequest) => {
  const hide = message.loading("Inserting");
  try {
    await addQuestionBankUsingPost(fields);
    hide();
    message.success("New question bank added");
    return true;
  } catch (error: any) {
    hide();
    message.error("Couldn't add new question bank，" + error.message);
    return false;
  }
};

/**
 * Create popup
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title={'New QuestionBank'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.QuestionBankAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
