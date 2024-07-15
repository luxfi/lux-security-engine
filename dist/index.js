import { Level } from "./rules";
import strategyDecision from "./strategyDecision";
class Engine {
    constructor(rules, apiService) {
        this.rules = [];
        this.rules = rules;
        this.apiService = apiService;
    }
    async run(ctx) {
        const results = [];
        await Promise.all(this.rules.map(async (rule) => {
            const deps = rule.requires;
            if (deps.some((key) => key in ctx)) {
                const enable = rule.enable;
                try {
                    const value = await rule.getValue(ctx, this.apiService);
                    const riskLevel = strategyDecision(value, rule);
                    if (riskLevel) {
                        results.push({
                            id: rule.id,
                            level: riskLevel,
                            value,
                            valueDescription: rule.valueDescription,
                            valueDefine: rule.valueDefine,
                            enable,
                            threshold: {
                                ...rule.defaultThreshold,
                                ...(rule.customThreshold || {}),
                            },
                        });
                    }
                }
                catch (e) {
                    results.push({
                        id: rule.id,
                        level: Level.ERROR,
                        value: null,
                        valueDescription: rule.valueDescription,
                        valueDefine: rule.valueDefine,
                        enable,
                        threshold: {
                            ...rule.defaultThreshold,
                            ...(rule.customThreshold || {}),
                        },
                    });
                }
            }
        }));
        return results;
    }
    reloadRules(rules) {
        this.rules = rules;
    }
}
export default Engine;
