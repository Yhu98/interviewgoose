package com.yux.interviewgoose.nacosfilter;

import com.yux.interviewgoose.utils.NetUtils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Global Blacklist IP Filter Request Interceptor
 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/28
 */
@WebFilter(urlPatterns = "/*", filterName = "blackIpFilter")
public class BlackIpFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        String ipAddress = NetUtils.getIpAddress((HttpServletRequest) servletRequest);
        if (BlackIpUtils.isBlackIp(ipAddress)) {
            servletResponse.setContentType("text/json;charset=UTF-8");
            servletResponse.getWriter().write("{\"errorCode\":\"-1\",\"errorMsg\":\"Visit from blocklist ip is denied.\"}");
            return;
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
