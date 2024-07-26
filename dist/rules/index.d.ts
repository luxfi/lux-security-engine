import { OpenApiService } from "@luxwallet/lux-api";
export interface ContractAddress {
    chainId: string;
    address: string;
}
export interface UserData {
    originWhitelist: string[];
    originBlacklist: string[];
    contractWhitelist: ContractAddress[];
    contractBlacklist: ContractAddress[];
    addressWhitelist: string[];
    addressBlacklist: string[];
}
export interface ContextActionData {
    createKey?: {
        allowOrigins: string[];
        origin: string;
    };
    verifyAddress?: {
        allowOrigins: string[];
        origin: string;
    };
    origin?: {
        communityCount: number;
        popularLevel: string;
        url: string;
    };
    swap?: {
        id: string;
        receiveTokenIsScam: boolean;
        receiveTokenIsFake: boolean;
        receiver: string;
        from: string;
        slippageTolerance: number | null;
        usdValuePercentage: number | null;
        chainId: string;
        contractAddress: string;
        receiverInWallet: boolean;
    };
    send?: {
        to: string;
        hasTransfer: boolean;
        contract: {
            chains: string[];
        } | null;
        chainId: string;
        cex: {
            id: string;
            isDeposit: boolean;
            supportToken?: boolean;
        } | null;
        isTokenContract: boolean;
        usedChainList: string[];
        onTransferWhitelist: boolean;
        receiverIsSpoofing: boolean;
        hasReceiverMnemonicInWallet: boolean;
        hasReceiverPrivateKeyInWallet: boolean;
    };
    permit?: {
        spender: string;
        isEOA: boolean;
        riskExposure: number;
        deployDays: number;
        hasInteracted: boolean;
        isDanger: boolean;
        chainId?: string;
    };
    permit2?: {
        spender: string;
        isEOA: boolean;
        riskExposure: number;
        deployDays: number;
        hasInteracted: boolean;
        isDanger: boolean;
        chainId?: string;
    };
    batchPermit2?: {
        spender: string;
        isEOA: boolean;
        riskExposure: number;
        deployDays: number;
        hasInteracted: boolean;
        isDanger: boolean;
        chainId?: string;
    };
    tokenApprove?: {
        chainId: string;
        spender: string;
        isEOA: boolean;
        riskExposure: number;
        deployDays: number;
        hasInteracted: boolean;
        isDanger: boolean;
    };
    sendNFT?: {
        to: string;
        hasTransfer: boolean;
        contract: {
            chains: string[];
        } | null;
        chainId: string;
        cex: {
            id: string;
            isDeposit: boolean;
            supportToken?: boolean;
        } | null;
        usedChainList: string[];
        onTransferWhitelist: boolean;
        receiverIsSpoofing: boolean;
        hasReceiverMnemonicInWallet: boolean;
        hasReceiverPrivateKeyInWallet: boolean;
    };
    nftApprove?: {
        chainId: string;
        spender: string;
        isEOA: boolean;
        riskExposure: number;
        deployDays: number;
        hasInteracted: boolean;
        isDanger: boolean;
    };
    collectionApprove?: {
        chainId: string;
        spender: string;
        isEOA: boolean;
        riskExposure: number;
        deployDays: number;
        hasInteracted: boolean;
        isDanger: boolean;
    };
    wrapToken?: {
        from: string;
        receiver: string;
        slippageTolerance: number;
        id: string;
        chainId: string;
        receiverInWallet: boolean;
    };
    unwrapToken?: {
        from: string;
        receiver: string;
        slippageTolerance: number;
        id: string;
        chainId: string;
        receiverInWallet: boolean;
    };
    sellNFT?: {
        specificBuyer: string | null;
        receiver: string;
        receiveTokenIsScam: boolean;
        receiveTokenIsFake: boolean;
        from: string;
        chainId?: string;
        id?: string;
    };
    batchSellNFT?: {
        specificBuyer: string | null;
        receiver: string;
        receiveTokenHasScam: boolean;
        receiveTokenHasFake: boolean;
        from: string;
        id?: string;
        chainId?: string;
    };
    buyNFT?: {
        from: string;
        receiver: string;
        receiveNFTIsScam: boolean;
        receiveNFTIsFake: boolean;
        id?: string;
        chainId?: string;
    };
    swapTokenOrder?: {
        receiveTokenIsScam: boolean;
        receiveTokenIsFake: boolean;
        receiver: string;
        from: string;
        usdValuePercentage: number;
        id?: string;
        chainId?: string;
        receiverInWallet: boolean;
    };
    crossToken?: {
        from: string;
        receiveTokenIsScam: boolean;
        receiveTokenIsFake: boolean;
        receiver: string;
        usdValuePercentage: number;
        usdValueChange: number;
        id?: string;
        chainId?: string;
        receiverInWallet: boolean;
    };
    crossSwapToken?: {
        from: string;
        receiveTokenIsScam: boolean;
        receiveTokenIsFake: boolean;
        receiver: string;
        usdValuePercentage: number;
        usdValueChange: number;
        id?: string;
        chainId?: string;
        receiverInWallet: boolean;
    };
    revokeApprove?: {
        gasUsed: number;
    };
    contractCall?: {
        id: string;
        chainId: string;
    };
    assetOrder?: {
        specificBuyer: string | null;
        receiver: string;
        from: string;
        id?: string;
        chainId?: string;
        hasReceiveAssets: boolean;
    };
    common?: {
        title: string;
        desc: string;
        is_asset_changed: boolean;
        is_involving_privacy: boolean;
        from: string;
        receiver?: string;
        receiverInWallet: boolean;
    };
}
export interface Context extends ContextActionData {
    userData: UserData;
}
export interface NumberValue {
    min: number | null;
    minIncluded: boolean;
    max: number | null;
    maxIncluded: boolean;
}
export interface NumberDefine extends NumberValue {
    type: "int" | "float" | "percent";
}
export interface BooleanDefine {
    type: "boolean";
}
export interface EnumDefine {
    type: "enum";
    list: string[];
    display: Record<string, string>;
}
export declare enum Level {
    SAFE = "safe",
    WARNING = "warning",
    DANGER = "danger",
    FORBIDDEN = "forbidden",
    ERROR = "error"
}
export type Threshold = {
    [key in Level]?: NumberValue | boolean | string[];
};
type Require = keyof ContextActionData;
export interface RuleConfig {
    id: string;
    enable: boolean;
    valueDescription: string;
    descriptions?: Partial<Record<Level, string>>;
    valueDefine: NumberDefine | BooleanDefine | EnumDefine;
    defaultThreshold: Threshold;
    customThreshold: Threshold;
    requires: Require[];
    valueTooltip?: string;
    getValue(ctx: Context, apiService: OpenApiService): Promise<any>;
}
export declare const defaultRules: RuleConfig[];
export {};
