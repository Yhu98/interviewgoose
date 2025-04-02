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
public class QuestionBankQuestionAddRequest implements Serializable {

    /**
     * question bank id
     */
    private Long questionBankId;

    /**
     * question id
     */
    private Long questionId;

    private static final long serialVersionUID = 1L;
}