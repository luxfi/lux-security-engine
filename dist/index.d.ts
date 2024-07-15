import { RuleConfig, Level, Threshold } from "./rules";
import { OpenApiService } from "@luxfi/lux-api";
export interface Result {
    id: string;
    level: Level;
    value: any;
    valueDescription: string;
    valueDefine: RuleConfig["valueDefine"];
    enable: boolean;
    threshold: Threshold;
}
declare class Engine {
    rules: RuleConfig[];
    apiService: OpenApiService;
    constructor(rules: RuleConfig[], apiService: OpenApiService);
    run(ctx: any): Promise<Result[]>;
    reloadRules(rules: RuleConfig[]): void;
}
export default Engine;
