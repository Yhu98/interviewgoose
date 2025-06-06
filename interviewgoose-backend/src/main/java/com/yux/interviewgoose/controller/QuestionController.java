package com.yux.interviewgoose.controller;


import cn.dev33.satoken.annotation.SaCheckRole;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.json.JSONUtil;
import com.alibaba.csp.sentinel.Entry;
import com.alibaba.csp.sentinel.EntryType;
import com.alibaba.csp.sentinel.SphU;
import com.alibaba.csp.sentinel.Tracer;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.csp.sentinel.slots.block.degrade.DegradeException;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.yux.interviewgoose.common.BaseResponse;
import com.yux.interviewgoose.common.DeleteRequest;
import com.yux.interviewgoose.common.ErrorCode;
import com.yux.interviewgoose.common.ResultUtils;
import com.yux.interviewgoose.constant.UserConstant;
import com.yux.interviewgoose.exception.BusinessException;
import com.yux.interviewgoose.exception.ThrowUtils;
import com.yux.interviewgoose.manager.CounterManager;
import com.yux.interviewgoose.model.dto.question.QuestionAddRequest;
import com.yux.interviewgoose.model.dto.question.QuestionEditRequest;
import com.yux.interviewgoose.model.dto.question.QuestionQueryRequest;
import com.yux.interviewgoose.model.dto.question.QuestionUpdateRequest;
import com.yux.interviewgoose.model.dto.questionbankquestion.QuestionBankQuestionBatchAddRequest;
import com.yux.interviewgoose.model.entity.Question;
import com.yux.interviewgoose.model.entity.User;
import com.yux.interviewgoose.model.vo.QuestionVO;
import com.yux.interviewgoose.service.QuestionBankQuestionService;
import com.yux.interviewgoose.service.QuestionService;
import com.yux.interviewgoose.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Question interface
 *
 * @author Hu
 */
@RestController
@RequestMapping("/question")
@Slf4j
public class QuestionController {

    @Resource
    private QuestionService questionService;

    @Resource
    private QuestionBankQuestionService questionBankQuestionService;

    @Resource
    private UserService userService;

    @Resource
    private CounterManager counterManager;

    /**
     * detect crawler
     * @param loginUserId
     */
    private void crawlerDetect(long loginUserId) {
        // count to warn
        final int WARN_COUNT = 10;
        // count to ban
        final int BAN_COUNT = 20;
        // concatenate user id to key
        String key = String.format("user:access:%s", loginUserId);
        // count of visits in 1 min (180s expiry)
        long count = counterManager.incrAndGetCounter(key, 1, TimeUnit.MINUTES, 180);
        // whether to ban
        if (count > BAN_COUNT) {
            // kickout user
            StpUtil.kickout(loginUserId);
            // ban user
            User updateUser = new User();
            updateUser.setId(loginUserId);
            updateUser.setUserRole("ban");
            userService.updateById(updateUser);
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR, "You've been banned due to over frequent visits!");
        }
        // whether to warn
        if (count == WARN_COUNT) {
            // TODO (optional): send email to admin for notification
            throw new BusinessException(110, "Sorry! You are visiting too frequently!");
        }
    }


    // region CRUD

    /**
     * create Question
     *
     * @param questionAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    @SaCheckRole(UserConstant.ADMIN_ROLE)
    public BaseResponse<Long> addQuestion(@RequestBody QuestionAddRequest questionAddRequest, HttpServletRequest request) {
        ThrowUtils.throwIf(questionAddRequest == null, ErrorCode.PARAMS_ERROR);
        Question question = new Question();
        BeanUtils.copyProperties(questionAddRequest, question);
        // logic for tag string to tag List
        List<String> tags = questionAddRequest.getTags();
        if (tags != null) {
            question.setTags(JSONUtil.toJsonStr(tags));
        }
        // data validation
        questionService.validQuestion(question, true);
        User loginUser = userService.getLoginUser(request);
        question.setUserId(loginUser.getId());
        // write to database
        boolean result = questionService.save(question);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        // return data id just written to database
        long newQuestionId = question.getId();
        return ResultUtils.success(newQuestionId);
    }

    /**
     * delete Question
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    @SaCheckRole(UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteQuestion(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // check if exist
        Question oldQuestion = questionService.getById(id);
        ThrowUtils.throwIf(oldQuestion == null, ErrorCode.NOT_FOUND_ERROR);
        // can be deleted by admin or creator only
        if (!oldQuestion.getUserId().equals(user.getId()) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = questionService.removeById(id);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * update Question (admin only)
     *
     * @param questionUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @SaCheckRole(UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateQuestion(@RequestBody QuestionUpdateRequest questionUpdateRequest) {
        if (questionUpdateRequest == null || questionUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Question question = new Question();
        BeanUtils.copyProperties(questionUpdateRequest, question);
        // logic for tag string to tag List
        List<String> tags = questionUpdateRequest.getTags();
        if (tags != null) {
            question.setTags(JSONUtil.toJsonStr(tags));
        }
        // data validation
        questionService.validQuestion(question, false);
        // check if exist
        long id = questionUpdateRequest.getId();
        Question oldQuestion = questionService.getById(id);
        ThrowUtils.throwIf(oldQuestion == null, ErrorCode.NOT_FOUND_ERROR);
        // 操作数据库
        boolean result = questionService.updateById(question);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * get Question (Class) by id
     *
     * @param id
     * @return
     */
    @GetMapping("/get/vo")
    public BaseResponse<QuestionVO> getQuestionVOById(long id, HttpServletRequest request) {
        ThrowUtils.throwIf(id <= 0, ErrorCode.PARAMS_ERROR);
        // detect and handle crawler
        User loginUser = userService.getLoginUser(request);
        crawlerDetect(loginUser.getId());
        // query database
        Question question = questionService.getById(id);
        ThrowUtils.throwIf(question == null, ErrorCode.NOT_FOUND_ERROR);
        // return wrapper
        return ResultUtils.success(questionService.getQuestionVO(question, request));
    }

    /**
     * get Question list in pages (admin only)
     *
     * @param questionQueryRequest
     * @return
     */
    @PostMapping("/list/page")
    @SaCheckRole(UserConstant.ADMIN_ROLE)
    public BaseResponse<Page<Question>> listQuestionByPage(@RequestBody QuestionQueryRequest questionQueryRequest) {
        ThrowUtils.throwIf(questionQueryRequest == null, ErrorCode.PARAMS_ERROR);
        Page<Question> questionPage = questionService.listQuestionByPage(questionQueryRequest);
        return ResultUtils.success(questionPage);
    }

    /**
     * get question list in pages (Class)
     *
     * @param questionQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo")
    public BaseResponse<Page<QuestionVO>> listQuestionVOByPage(@RequestBody QuestionQueryRequest questionQueryRequest,
                                                               HttpServletRequest request) {
        ThrowUtils.throwIf(questionQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = questionQueryRequest.getCurrent();
        long size = questionQueryRequest.getPageSize();
        // prevent abuse by crawlers
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // query database
        Page<Question> questionPage = questionService.page(new Page<>(current, size),
                questionService.getQueryWrapper(questionQueryRequest));
        // return wrapper
        return ResultUtils.success(questionService.getQuestionVOPage(questionPage, request));
    }

    /**
     * get question list in pages (Class) (Rate Limiter)
     *
     * @param questionQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page/vo/sentinel")
    public BaseResponse<Page<QuestionVO>> listQuestionVOByPageSentinel(@RequestBody QuestionQueryRequest questionQueryRequest,
                                                                       HttpServletRequest request) {
        ThrowUtils.throwIf(questionQueryRequest == null, ErrorCode.PARAMS_ERROR);
        long current = questionQueryRequest.getCurrent();
        long size = questionQueryRequest.getPageSize();
        // prevent abuse by crawlers
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // rate limiter based on IPs
        String remoteAddr = request.getRemoteAddr();
        Entry entry = null;
        try  {
            entry = SphU.entry("listQuestionVOByPage", EntryType.IN, 1, remoteAddr);
            // protected business logic
            // query database
            Page<Question> questionPage = questionService.listQuestionByPage(questionQueryRequest);
            // get wrapper class
            return ResultUtils.success(questionService.getQuestionVOPage(questionPage, request));
        } catch (Throwable t) {
            // Business exception
            if (!BlockException.isBlockException(t)) {
                Tracer.trace(t);
                return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "System errors.");
            }
            // resource access blocked, degraded
            if (t instanceof DegradeException) {
                return handleFallback(questionQueryRequest, request, t);
            }
            // rate limiting operation
            return ResultUtils.error(ErrorCode.SYSTEM_ERROR, "Access too frequent, please try again later");
        } finally {
            if (entry != null) {
                entry.exit(1, remoteAddr);
            }
        }
    }

    /**
     * listQuestionBankVOByPage fallback operations
     */
    public BaseResponse<Page<QuestionVO>> handleFallback(@RequestBody QuestionQueryRequest questionQueryRequest,
                                                             HttpServletRequest request, Throwable ex) {
        // return local data or null
        return ResultUtils.success(null);
    }

    /**
     * get the list of Question created by current logged-in user in pages
     *
     * @param questionQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page/vo")
    public BaseResponse<Page<QuestionVO>> listMyQuestionVOByPage(@RequestBody QuestionQueryRequest questionQueryRequest,
                                                                 HttpServletRequest request) {
        ThrowUtils.throwIf(questionQueryRequest == null, ErrorCode.PARAMS_ERROR);
        // only queryt data from current logged-in user
        User loginUser = userService.getLoginUser(request);
        questionQueryRequest.setUserId(loginUser.getId());
        long current = questionQueryRequest.getCurrent();
        long size = questionQueryRequest.getPageSize();
        // prevent abuse by crawlers
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        // query database
        Page<Question> questionPage = questionService.page(new Page<>(current, size),
                questionService.getQueryWrapper(questionQueryRequest));
        // return wrapper
        return ResultUtils.success(questionService.getQuestionVOPage(questionPage, request));
    }

    /**
     * edit Question (for user)
     *
     * @param questionEditRequest
     * @param request
     * @return
     */
    @PostMapping("/edit")
    @SaCheckRole(UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> editQuestion(@RequestBody QuestionEditRequest questionEditRequest, HttpServletRequest request) {
        if (questionEditRequest == null || questionEditRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        // todo 在此处将实体类和 DTO 进行转换
        Question question = new Question();
        BeanUtils.copyProperties(questionEditRequest, question);
        // data validation
        questionService.validQuestion(question, false);
        User loginUser = userService.getLoginUser(request);
        // check if exist
        long id = questionEditRequest.getId();
        Question oldQuestion = questionService.getById(id);
        ThrowUtils.throwIf(oldQuestion == null, ErrorCode.NOT_FOUND_ERROR);
        // editable by admin or creator only
        if (!oldQuestion.getUserId().equals(loginUser.getId()) && !userService.isAdmin(loginUser)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        // 操作数据库
        boolean result = questionService.updateById(question);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        return ResultUtils.success(true);
    }

    /**
     * Search related question VO (elasticsearch)
     * @param questionQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/search/page/vo")
    public BaseResponse<Page<QuestionVO>> searchQuestionVOByPage(@RequestBody QuestionQueryRequest questionQueryRequest,
                                                                 HttpServletRequest request) {
        long size = questionQueryRequest.getPageSize();
        // prevent crawlers
        ThrowUtils.throwIf(size > 200, ErrorCode.PARAMS_ERROR);
        Page<Question> questionPage = questionService.searchFromEs(questionQueryRequest);
        return ResultUtils.success(questionService.getQuestionVOPage(questionPage, request));
    }

    /**
     * batch add questions associations to question bank (admin only)
     * @param questionBankQuestionBatchAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add/batch")
    @SaCheckRole(UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> batchAddQuestionsToBank(
            @RequestBody QuestionBankQuestionBatchAddRequest questionBankQuestionBatchAddRequest,
            HttpServletRequest request
    ) {
        // Prams Verify
        ThrowUtils.throwIf(questionBankQuestionBatchAddRequest == null, ErrorCode.PARAMS_ERROR);
        User loginUser = userService.getLoginUser(request);
        Long questionBankId = questionBankQuestionBatchAddRequest.getQuestionBankId();
        List<Long> questionIdList = questionBankQuestionBatchAddRequest.getQuestionIdList();
        questionBankQuestionService.batchAddQuestionsToBank(questionIdList, questionBankId, loginUser);
        return ResultUtils.success(true);
    }
    // endregion
}
