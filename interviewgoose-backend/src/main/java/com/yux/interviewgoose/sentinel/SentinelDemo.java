package com.yux.interviewgoose.sentinel;

import com.alibaba.csp.sentinel.Entry;
import com.alibaba.csp.sentinel.SphU;
import com.alibaba.csp.sentinel.slots.block.BlockException;
import com.alibaba.csp.sentinel.slots.block.RuleConstant;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRule;
import com.alibaba.csp.sentinel.slots.block.flow.FlowRuleManager;

import java.util.*;

/**
 * @author Yuxuan
 * @version 1.0
 * @date 2025/5/28
 */

public class SentinelDemo {
    public static void main(String[] args) {
        // Config rules.
        initFlowRules();

        while (true) {
            // 1.5.0 版本开始可以直接利用 try-with-resources 特性
            try (Entry entry = SphU.entry("HelloWorld")) {
                // Protected Logic
                System.out.println("hello world");
            } catch (BlockException ex) {
                // Handle logic being limited
                System.out.println("blocked!");
            }
        }
    }

    private static void initFlowRules() {
        List<FlowRule> rules = new ArrayList<FlowRule>();
        FlowRule rule = new FlowRule();
        rule.setResource("HelloWorld");
        // set limit qps to 20
        rule.setCount(20);
        rule.setGrade(RuleConstant.FLOW_GRADE_QPS);
        rules.add(rule);
        FlowRuleManager.loadRules(rules);
    }
}
