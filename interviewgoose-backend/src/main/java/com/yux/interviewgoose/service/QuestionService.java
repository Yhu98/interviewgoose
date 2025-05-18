package com.yux.interviewgoose.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yux.interviewgoose.annotation.AuthCheck;
import com.yux.interviewgoose.common.BaseResponse;
import com.yux.interviewgoose.constant.UserConstant;
import com.yux.interviewgoose.model.dto.question.QuestionQueryRequest;
import com.yux.interviewgoose.model.entity.Question;
import com.yux.interviewgoose.model.vo.QuestionVO;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Question service
 *
 * @author Hu
 *
 */
public interface QuestionService extends IService<Question> {

    /**
     * Validate data
     *
     * @param question
     * @param add (validate the data created)
     */
    void validQuestion(Question question, boolean add);

    /**
     * 获取查询条件
     *
     * @param questionQueryRequest
     * @return
     */
    QueryWrapper<Question> getQueryWrapper(QuestionQueryRequest questionQueryRequest);
    
    /**
     * obtain Question Wrapper
     *
     * @param question
     * @param request
     * @return
     */
    QuestionVO getQuestionVO(Question question, HttpServletRequest request);

    /**
     * obtain Question pages Wrapper
     *
     * @param questionPage
     * @param request
     * @return
     */
    Page<QuestionVO> getQuestionVOPage(Page<Question> questionPage, HttpServletRequest request);

    /**
     * get Question list in pages (admin only)
     *
     * @param questionQueryRequest
     * @return
     */
    Page<Question> listQuestionByPage(QuestionQueryRequest questionQueryRequest);

    /**
     * Search Question from es
     *
     * @param questionQueryRequest
     * @return
     */
    Page<Question> searchFromEs(QuestionQueryRequest questionQueryRequest);

}
