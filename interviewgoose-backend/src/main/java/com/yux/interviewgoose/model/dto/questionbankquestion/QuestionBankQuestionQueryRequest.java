package com.yux.interviewgoose.model.dto.questionbankquestion;

import com.yux.interviewgoose.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * get Question Bank Question request
 *
 * @author Hu
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class QuestionBankQuestionQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * id
     */
    private Long notId;

    /**
     * question bank id
     */
    private Long questionBankId;

    /**
     * question id
     */
    private Long questionId;

    /**
     * user id
     */
    private Long userId;

    private static final long serialVersionUID = 1L;
}