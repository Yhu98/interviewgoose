package com.yux.interviewgoose.model.dto.questionbankquestion;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * create Question Bank Question request
 *
 * @author Hu
 *
 */
@Data
public class QuestionBankQuestionBatchAddRequest implements Serializable {

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