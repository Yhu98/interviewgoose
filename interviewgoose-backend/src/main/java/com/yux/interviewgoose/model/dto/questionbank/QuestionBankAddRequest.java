package com.yux.interviewgoose.model.dto.questionbank;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * create Question Bank request
 *
 * @author Hu
 *
 */
@Data
public class QuestionBankAddRequest implements Serializable {

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

    private static final long serialVersionUID = 1L;
}