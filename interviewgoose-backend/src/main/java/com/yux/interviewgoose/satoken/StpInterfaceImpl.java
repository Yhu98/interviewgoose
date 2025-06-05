package com.yux.interviewgoose.satoken;

import cn.dev33.satoken.stp.StpInterface;
import cn.dev33.satoken.stp.StpUtil;
import com.yux.interviewgoose.model.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static com.yux.interviewgoose.constant.UserConstant.USER_LOGIN_STATE;

/**
 * Custom authentication loading interface implementation class
 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/31
 */
@Component    // Ensure this class is scanned by SpringBoot to complete Sa-Token's custom authentication extension
public class StpInterfaceImpl implements StpInterface {

    /**
     * Returns the authentication code collection owned by an account (NOT USED)
     */
    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        return new ArrayList<>();
    }

    /**
     * Returns the role identifier collection owned by an account (authentication and roles can be validated separately)
     */
    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        // get the role from currently logged-in user's information
        User user = (User) StpUtil.getSessionByLoginId(loginId).get(USER_LOGIN_STATE);
        return Collections.singletonList(user.getUserRole());
    }

}
