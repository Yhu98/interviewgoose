package com.yux.interviewgoose.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yux.interviewgoose.model.dto.post.PostQueryRequest;
import com.yux.interviewgoose.model.entity.Post;
import com.yux.interviewgoose.model.vo.PostVO;
import javax.servlet.http.HttpServletRequest;

/**
 * Post Services
 *
 * @author Hu
 */
public interface PostService extends IService<Post> {

    /**
     * Post Validation
     *
     * @param post
     * @param add
     */
    void validPost(Post post, boolean add);

    /**
     * 获取查询条件
     *
     * @param postQueryRequest
     * @return
     */
    QueryWrapper<Post> getQueryWrapper(PostQueryRequest postQueryRequest);

    /**
     * Search Using Elastics Search
     *
     * @param postQueryRequest
     * @return
     */
    Page<Post> searchFromEs(PostQueryRequest postQueryRequest);

    /**
     * Get Post Value Object
     *
     * @param post
     * @param request
     * @return
     */
    PostVO getPostVO(Post post, HttpServletRequest request);

    /**
     * Get Post Value Object Page
     *
     * @param postPage
     * @param request
     * @return
     */
    Page<PostVO> getPostVOPage(Page<Post> postPage, HttpServletRequest request);
}
