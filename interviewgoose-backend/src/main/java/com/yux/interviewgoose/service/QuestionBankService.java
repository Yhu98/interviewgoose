package com.yux.interviewgoose.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yux.interviewgoose.model.dto.questionbank.QuestionBankQueryRequest;
import com.yux.interviewgoose.model.entity.QuestionBank;
import com.yux.interviewgoose.model.vo.QuestionBankVO;

import javax.servlet.http.HttpServletRequest;

/**
 * Question Bank service
 *
 * @author Hu
 *
 */
public interface QuestionBankService extends IService<QuestionBank> {

    /**
     * Validate data
     *
     * @param questionBank
     * @param add (validate the data created)
     */
    void validQuestionBank(QuestionBank questionBank, boolean add);

    /**
     * 获取查询条件
     *
     * @param questionBankQueryRequest
     * @return
     */
    QueryWrapper<QuestionBank> getQueryWrapper(QuestionBankQueryRequest questionBankQueryRequest);
    
    /**
     * obtain Question Bank Wrapper
     *
     * @param questionBank
     * @param request
     * @return
     */
    QuestionBankVO getQuestionBankVO(QuestionBank questionBank, HttpServletRequest request);

    /**
     * obtain Question Bank pages Wrapper
     *
     * @param questionBankPage
     * @param request
     * @return
     */
    Page<QuestionBankVO> getQuestionBankVOPage(Page<QuestionBank> questionBankPage, HttpServletRequest request);
}
