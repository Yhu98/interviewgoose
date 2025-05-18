package com.yux.interviewgoose.mapper;

import com.yux.interviewgoose.model.entity.Question;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.Date;
import java.util.List;

/**
* @author Yuxuan
* @description Mapper for database operations on the table [question (Question)]
* @createDate 2025-04-02 18:34:14
* @Entity com.yux.interviewgoose.model.entity.Question
*/
public interface QuestionMapper extends BaseMapper<Question> {

    /**
     * Search Question List (including deleted data)
     */
    @Select("select * from question where updateTime >= #{minUpdateTime}")
    List<Question> listQuestionWithDelete(Date minUpdateTime);

}




