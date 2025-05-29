package com.yux.interviewgoose.nacosfilter;

import cn.hutool.bloomfilter.BitMapBloomFilter;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import org.yaml.snakeyaml.Yaml;

import java.util.List;
import java.util.Map;

/**
 * Blacklist Ip Filter Util Class
 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/28
 */
public class BlackIpUtils {
    private static BitMapBloomFilter bloomFilter;

    // judge if the ip is in the blacklist
    public static boolean isBlackIp(String ip) {
        return bloomFilter.contains(ip);
    }

    // rebuild ip blacklist
    public static void rebuildBlackIpList(String configInfo) {
        if (StrUtil.isBlank(configInfo)) {
            configInfo = "{}";
        }
        // analyze yaml file
        Yaml yaml = new Yaml();
        Map map = yaml.loadAs(configInfo, Map.class);
        // get IP blacklist
        List<String> blackIpList = (List<String>) map.get("blackIpList");
        // thread-safe to prevent concurrent modification
        synchronized (BlackIpUtils.class) {
            if (CollUtil.isNotEmpty(blackIpList)) {
                BitMapBloomFilter bitMapBloomFilter = new BitMapBloomFilter(958506);
                for (String blackIp : blackIpList) {
                    bitMapBloomFilter.add(blackIp);
                }
                bloomFilter = bitMapBloomFilter;
            } else {
                bloomFilter = new BitMapBloomFilter(100);
            }
        }
    }
}
