package com.yux.interviewgoose.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yux.interviewgoose.model.dto.user.UserQueryRequest;
import com.yux.interviewgoose.model.entity.User;
import com.yux.interviewgoose.model.vo.LoginUserVO;
import com.yux.interviewgoose.model.vo.UserVO;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import me.chanjar.weixin.common.bean.WxOAuth2UserInfo;

/**
 * User Services
 *
 * @author Hu
 */
public interface UserService extends IService<User> {

    /**
     * User Registration
     *
     * @param userAccount   user account name
     * @param userPassword  user password
     * @param checkPassword password confirmation
     * @return new userID
     */
    long userRegister(String userAccount, String userPassword, String checkPassword);

    /**
     * User Login
     *
     * @param userAccount  user account name
     * @param userPassword user password
     * @param request
     * @return User VO
     */
    LoginUserVO userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /**
     * 用户登录（微信开放平台）
     *
     * @param wxOAuth2UserInfo 从微信获取的用户信息
     * @param request
     * @return User VO
     */
    LoginUserVO userLoginByMpOpen(WxOAuth2UserInfo wxOAuth2UserInfo, HttpServletRequest request);

    /**
     * Get Current Logged User
     *
     * @param request
     * @return
     */
    User getLoginUser(HttpServletRequest request);

    /**
     * 获取当前登录用户（允许未登录）
     *
     * @param request
     * @return
     */
    User getLoginUserPermitNull(HttpServletRequest request);

    /**
     * is Administrator or Not
     *
     * @param request
     * @return
     */
    boolean isAdmin(HttpServletRequest request);

    /**
     * is Administrator or Not
     *
     * @param user
     * @return
     */
    boolean isAdmin(User user);

    /**
     * User Log out
     *
     * @param request
     * @return
     */
    boolean userLogout(HttpServletRequest request);

    /**
     * get current logged UserVO
     *
     * @return
     */
    LoginUserVO getLoginUserVO(User user);

    /**
     * get UserVO
     *
     * @param user
     * @return
     */
    UserVO getUserVO(User user);

    /**
     * get UserVO list
     *
     * @param userList
     * @return
     */
    List<UserVO> getUserVO(List<User> userList);

    /**
     * 获取查询条件
     *
     * @param userQueryRequest
     * @return
     */
    QueryWrapper<User> getQueryWrapper(UserQueryRequest userQueryRequest);

    /**
     * add user clock-on record
     *
     * @param userId user id
     * @return is clocked-on or Not
     */
    boolean addUserClockOn(long userId);


}
