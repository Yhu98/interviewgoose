package com.yux.interviewgoose.model.dto.question;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Edit Question Request
 *
 * @author Hu
 *
 */
@Data
public class QuestionEditRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    /**
     * Title
     */
    private String title;

    /**
     * Content
     */
    private String content;

    /**
     * Tags
     */
    private List<String> tags;

    /**
     * recommended answer
     */
    private String answer;

    private static final long serialVersionUID = 1L;
}