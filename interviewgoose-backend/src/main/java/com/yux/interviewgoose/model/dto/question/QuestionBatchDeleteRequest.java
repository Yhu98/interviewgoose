package com.yux.interviewgoose.model.dto.question;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Batch delete questions request
 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/20

 */
@Data
public class QuestionBatchDeleteRequest implements Serializable {

    /**
     * question id list
     */
    private List<Long> questionIdList;

    private static final long serialVersionUID = 1L;
}