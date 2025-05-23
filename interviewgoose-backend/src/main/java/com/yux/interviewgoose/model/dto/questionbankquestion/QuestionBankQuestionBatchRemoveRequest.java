package com.yux.interviewgoose.model.dto.questionbankquestion;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**

 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/20

 */

@Data
public class QuestionBankQuestionBatchRemoveRequest implements Serializable {

    /**
     * question bank id
     */
    private Long questionBankId;

    /**
     * question id list
     */
    private List<Long> questionIdList;

    private static final long serialVersionUID = 1L;
}

