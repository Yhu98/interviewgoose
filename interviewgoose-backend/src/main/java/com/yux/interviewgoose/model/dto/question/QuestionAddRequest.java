package com.yux.interviewgoose.model.dto.question;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * create Question request
 *
 * @author Hu
 *
 */
@Data
public class QuestionAddRequest implements Serializable {

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