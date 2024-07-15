import { RuleConfig, Level } from "./rules";
declare const strategyDecision: (value: boolean | number | string, config: RuleConfig) => Level | null;
export default strategyDecision;
