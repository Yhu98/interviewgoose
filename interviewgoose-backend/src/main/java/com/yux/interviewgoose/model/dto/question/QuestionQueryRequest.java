package com.yux.interviewgoose.model.dto.question;

import com.yux.interviewgoose.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

/**
 * get Question request
 *
 * @author Hu
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class QuestionQueryRequest extends PageRequest implements Serializable {

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
     * content
     */
    private String content;

    /**
     * tags
     */
    private List<String> tags;

    /**
     * user id
     */
    private Long userId;

    /**
     * recommended answer
     */
    private String answer;

    /**
     * question bank id
     */
    private Long questionBankId;

    private static final long serialVersionUID = 1L;
}