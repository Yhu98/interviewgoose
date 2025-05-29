package com.yux.interviewgoose.sentinel;

import cn.hutool.core.io.FileUtil;
import com.alibaba.csp.sentinel.datasource.*;
import com.alibaba.csp.sentinel.slots.block.degrade.DegradeRule;
import com.alibaba.csp.sentinel.slots.block.degrade.DegradeRuleManager;
import com.alibaba.csp.sentinel.slots.block.degrade.circuitbreaker.CircuitBreakerStrategy;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRule;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRuleManager;
import com.alibaba.csp.sentinel.slots.block.flow.param.ParamFlowRule;
import com.alibaba.csp.sentinel.slots.block.flow.param.ParamFlowRuleManager;
import com.alibaba.csp.sentinel.transport.util.WritableDataSourceRegistry;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/28
 */

@Component
public class SentinelRulesManager {

    @PostConstruct
    public void initRules() throws Exception{
        initFlowRules();
        initDegradeRules();
        listenRules();
    }

    // Rate limit operations
    public void initFlowRules() {
        // Rate limit rule: single IP view question list
        ParamFlowRule rule = new ParamFlowRule("listQuestionVOByPage")
                .setParamIdx(0) // Rate limit on the 0th parameter, i.e., IP address
                .setCount(60) // Maximum 60 times per minute
                .setDurationInSec(60); // Rule statistics period is 60 seconds
        ParamFlowRuleManager.loadRules(Collections.singletonList(rule));
    }

    // Degrade rules
    public void initDegradeRules() {
        // Circuit breaker: single IP view question list
        DegradeRule slowCallRule = new DegradeRule("listQuestionVOByPage")
                .setGrade(CircuitBreakerStrategy.SLOW_REQUEST_RATIO.getType())
                .setCount(0.2) // Slow call ratio greater than 20%
                .setTimeWindow(60) // Circuit breaker duration 60 seconds
                .setStatIntervalMs(30 * 1000) // Statistics duration 30 seconds
                .setMinRequestAmount(10) // Minimum request count
                .setSlowRatioThreshold(3); // Response time exceeds 3 seconds

        DegradeRule errorRateRule = new DegradeRule("listQuestionVOByPage")
                .setGrade(CircuitBreakerStrategy.ERROR_RATIO.getType())
                .setCount(0.1) // Error rate greater than 10%
                .setTimeWindow(20) // Circuit breaker duration 60 seconds
                .setStatIntervalMs(30 * 1000) // Statistics duration 30 seconds
                .setMinRequestAmount(10); // Minimum request count

        // Load rules
        DegradeRuleManager.loadRules(Arrays.asList(slowCallRule, errorRateRule));
    }

    /**
     * Persist configuration to local files
     */
    public void listenRules() throws Exception {
        // Get the project root directory
        String rootPath = System.getProperty("user.dir");
        // Sentinel directory path
        File sentinelDir = new File(rootPath, "sentinel");
        // Create a directory if it doesn't exist
        if (!FileUtil.exist(sentinelDir)) {
            FileUtil.mkdir(sentinelDir);
        }
        // Rule file paths
        String flowRulePath = new File(sentinelDir, "FlowRule.json").getAbsolutePath();
        String degradeRulePath = new File(sentinelDir, "DegradeRule.json").getAbsolutePath();

        // Data source for FlowRule
        ReadableDataSource<String, List<FlowRule>> flowRuleDataSource = new FileRefreshableDataSource<>(flowRulePath, flowRuleListParser);
        // Register to flow rule manager.
        FlowRuleManager.register2Property(flowRuleDataSource.getProperty());
        WritableDataSource<List<FlowRule>> flowWds = new FileWritableDataSource<>(flowRulePath, this::encodeJson);
        // Register to writable data source registry so that rules can be updated to file
        WritableDataSourceRegistry.registerFlowDataSource(flowWds);

        // Data source for DegradeRule
        FileRefreshableDataSource<List<DegradeRule>> degradeRuleDataSource
                = new FileRefreshableDataSource<>(
                degradeRulePath, degradeRuleListParser);
        DegradeRuleManager.register2Property(degradeRuleDataSource.getProperty());
        WritableDataSource<List<DegradeRule>> degradeWds = new FileWritableDataSource<>(degradeRulePath, this::encodeJson);
        // Register to writable data source registry so that rules can be updated to file
        WritableDataSourceRegistry.registerDegradeDataSource(degradeWds);
    }

    private Converter<String, List<FlowRule>> flowRuleListParser = source -> JSON.parseObject(source,
            new TypeReference<List<FlowRule>>() {
            });
    private Converter<String, List<DegradeRule>> degradeRuleListParser = source -> JSON.parseObject(source,
            new TypeReference<List<DegradeRule>>() {
            });

    private <T> String encodeJson(T t) {
        return JSON.toJSONString(t);
    }


}