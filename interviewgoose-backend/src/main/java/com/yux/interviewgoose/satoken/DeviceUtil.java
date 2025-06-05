package com.yux.interviewgoose.satoken;

import cn.hutool.core.util.StrUtil;
import cn.hutool.http.Header;
import cn.hutool.http.useragent.UserAgent;
import cn.hutool.http.useragent.UserAgentUtil;
import com.yux.interviewgoose.common.ErrorCode;
import com.yux.interviewgoose.exception.ThrowUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * Device judgment utility class
 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/31
 */

public class DeviceUtil {
    /**
     * return device information of the current request
     * @param request
     * @return
     */
    public static String getRequestDevice(HttpServletRequest request) {
        String userAgentStr = request.getHeader(Header.USER_AGENT.toString());
        // use hutool to parse the user agent string
        UserAgent userAgent = UserAgentUtil.parse(userAgentStr);
        ThrowUtils.throwIf(userAgent == null, ErrorCode.OPERATION_ERROR, "Illegal Request");
        // PC by default
        String device = "pc";
        // mini program
        if (userAgent.isMobile()) {
            // mobile phone
            device = "mobile";
        } else if (isPad(userAgentStr)) {
            // tablet
            device = "pad";
        } else if (isMiniProgram(userAgentStr)) {
            device = "miniProgram";
        }
        return device;
    }

    /**
     * determine whether it is a tablet
     * support determining it is an iOS or an Android tablet
     **/
    private static boolean isPad(String userAgentStr) {
        // whether User-Agent contains "iPad"
        boolean isIpad = StrUtil.containsIgnoreCase(userAgentStr, "iPad");

        // whether User-Agent string contains "Android" but does not contain "Mobile"
        boolean isAndroidTablet = StrUtil.containsIgnoreCase(userAgentStr, "Android")
                && !StrUtil.containsIgnoreCase(userAgentStr, "Mobile");

        // return true if either is true
        return isIpad || isAndroidTablet;
    }

    /**
     * Determine whether it is a mini program
     * determined by whether the User-Agent string contains "MicroMessenger"
     **/
    private static boolean isMiniProgram(String userAgentStr) {
        // check whether User-Agent contains "MicroMessenger" and "MiniProgram"
        return StrUtil.containsIgnoreCase(userAgentStr, "MicroMessenger")
                && StrUtil.containsIgnoreCase(userAgentStr, "MiniProgram");
    }
}