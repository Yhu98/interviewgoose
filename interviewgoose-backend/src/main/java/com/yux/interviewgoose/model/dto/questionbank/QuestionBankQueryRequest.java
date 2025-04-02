package com.yux.interviewgoose.model.dto.questionbank;

import com.yux.interviewgoose.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * get Question Bank request
 *
 * @author Hu
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class QuestionBankQueryRequest extends PageRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * id
     */
    private Long notId;

    /**
     * search keywords
     */
    private String searchText;

    /**
     * title
     */
    private String title;

    /**
     * description
     */
    private String description;

    /**
     * picture
     */
    private String picture;

    /**
     * user id
     */
    private Long userId;

    /**
     * whether query question list is required for the scenario
     */
    private boolean needQueryQuestionList;

    private static final long serialVersionUID = 1L;
}