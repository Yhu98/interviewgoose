package com.yux.interviewgoose.model.dto.questionbankquestion;

import lombok.Data;

import java.io.Serializable;

/**
 * @author Yuxuan
 * @version 1.0
 * @date 4/3/2025
 */
@Data
public class QuestionBankQuestionRemoveRequest implements Serializable {
    /**
     * question bank id
     */
    private Long questionBankId;

    /**
     * question id
     */
    private Long questionId;

    private static final long serialVersionID = 1L;
}
