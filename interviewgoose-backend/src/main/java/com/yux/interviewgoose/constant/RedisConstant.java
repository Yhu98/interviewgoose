package com.yux.interviewgoose.constant;

/**
 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/1
 */

public interface RedisConstant {

    /**
     * Redis Key Prefix for users' clock-on records
     */
    String USER_CLOCK_ON_REDIS_KEY_PREFIX = "user:clockons";

    /**
     * get Redis Key for users' clock-on records
     * @param year which year
     * @param userId user id
     * @return Redis Key
     */
    static String getUserClockOnRedisKey(int year, long userId) {
        return String.format("%s:%s:%s", USER_CLOCK_ON_REDIS_KEY_PREFIX, year, userId);
    }

}
