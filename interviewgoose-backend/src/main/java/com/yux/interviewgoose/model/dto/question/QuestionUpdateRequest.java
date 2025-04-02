package com.yux.interviewgoose.model.dto.question;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * update Question request
 *
 * @author Hu
 *
 */
@Data
public class QuestionUpdateRequest implements Serializable {

    /**
     * id
     */
    private Long id;

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
     * recommended answer
     */
    private String answer;

    private static final long serialVersionUID = 1L;
}