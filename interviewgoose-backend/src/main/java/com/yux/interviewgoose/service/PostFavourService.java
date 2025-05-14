package com.yux.interviewgoose.service;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yux.interviewgoose.model.entity.Post;
import com.yux.interviewgoose.model.entity.PostFavour;
import com.yux.interviewgoose.model.entity.User;

/**
 * Post Favourite Services
 *
 * @author Hu
 */
public interface PostFavourService extends IService<PostFavour> {

    /**
     * Post Favourites
     *
     * @param postId
     * @param loginUser
     * @return
     */
    int doPostFavour(long postId, User loginUser);

    /**
     * Post Favourites List by Page
     *
     * @param page
     * @param queryWrapper
     * @param favourUserId
     * @return
     */
    Page<Post> listFavourPostByPage(IPage<Post> page, Wrapper<Post> queryWrapper,
            long favourUserId);

    /**
     * 帖子收藏（内部服务）
     *
     * @param userId
     * @param postId
     * @return
     */
    int doPostFavourInner(long userId, long postId);
}
