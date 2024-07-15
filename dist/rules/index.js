import connectRules from "./connect";
import swapRules from "./swap";
import sendRules from "./send";
import tokenApproveRules from "./tokenApprove";
import sendNFTRules from "./sendNFT";
import nftApproveRules from "./nftApprove";
import collectionApproveRules from "./collectionApprove";
import wrapRules from "./wrap";
import permit from "./permit";
import permit2 from "./permit2";
import sellNFT from "./sellNFT";
import buyNFT from "./buyNFT";
import swapTokenOrder from "./swapTokenOrder";
import crossToken from "./crossToken";
import crossSwapToken from "./crossSwapToken";
import verifyAddress from "./verifyAddress";
import createKey from "./createKey";
import batchPermit2 from "./batchPermit2";
import batchSellNFT from "./batchSellNFT";
import revokeToken from "./revokeToken";
import common from "./common";
import assetOrder from './assetOrder';
import { caseInsensitiveCompare } from "../utils";
export var Level;
(function (Level) {
    Level["SAFE"] = "safe";
    Level["WARNING"] = "warning";
    Level["DANGER"] = "danger";
    Level["FORBIDDEN"] = "forbidden";
    Level["ERROR"] = "error";
})(Level || (Level = {}));
export const defaultRules = [
    ...connectRules,
    ...swapRules,
    ...sendRules,
    ...tokenApproveRules,
    ...sendNFTRules,
    ...nftApproveRules,
    ...collectionApproveRules,
    ...wrapRules,
    ...permit,
    ...permit2,
    ...crossSwapToken,
    ...crossToken,
    ...swapTokenOrder,
    ...buyNFT,
    ...sellNFT,
    ...verifyAddress,
    ...createKey,
    ...batchPermit2,
    ...batchSellNFT,
    ...revokeToken,
    ...common,
    ...assetOrder,
    {
        id: "1133",
        enable: true,
        valueDescription: "Spender address is marked as trusted",
        valueDefine: {
            type: "boolean",
        },
        defaultThreshold: {
            safe: true,
        },
        customThreshold: {},
        requires: [
            "tokenApprove",
            "permit",
            "permit2",
            "nftApprove",
            "collectionApprove",
            "batchPermit2",
        ],
        async getValue(ctx) {
            const { spender, chainId } = (ctx.tokenApprove ||
                ctx.permit ||
                ctx.permit2 ||
                ctx.batchPermit2 ||
                ctx.collectionApprove ||
                ctx.nftApprove);
            const blacklist = ctx.userData.contractWhitelist;
            return blacklist.some((item) => item.chainId === chainId &&
                caseInsensitiveCompare(spender, item.address));
        },
        descriptions: {
            safe: `The spender address is marked as "Trusted"`,
        },
    },
    {
        id: "1134",
        enable: true,
        valueDescription: "Spender address is marked as blocked",
        valueDefine: {
            type: "boolean",
        },
        defaultThreshold: {
            forbidden: true,
        },
        customThreshold: {},
        requires: [
            "tokenApprove",
            "permit",
            "permit2",
            "nftApprove",
            "collectionApprove",
            "batchPermit2",
        ],
        async getValue(ctx) {
            const { spender, chainId } = (ctx.tokenApprove ||
                ctx.permit ||
                ctx.permit2 ||
                ctx.batchPermit2 ||
                ctx.collectionApprove ||
                ctx.nftApprove);
            const blacklist = ctx.userData.contractBlacklist;
            return blacklist.some((item) => item.chainId === chainId &&
                caseInsensitiveCompare(spender, item.address));
        },
        descriptions: {
            forbidden: `The spender address is marked as "Blocked"`,
        },
    },
    {
        id: "1135",
        enable: true,
        valueDescription: "Contract address is marked as blocked",
        valueDefine: {
            type: "boolean",
        },
        defaultThreshold: {
            forbidden: true,
        },
        customThreshold: {},
        requires: [
            "swap",
            "wrapToken",
            "unwrapToken",
            "sellNFT",
            "batchSellNFT",
            "swapTokenOrder",
            "buyNFT",
            "crossToken",
            "crossSwapToken",
            "contractCall",
            "assetOrder",
        ],
        async getValue(ctx) {
            const { id, chainId } = (ctx.swap ||
                ctx.wrapToken ||
                ctx.unwrapToken ||
                ctx.swapTokenOrder ||
                ctx.sellNFT ||
                ctx.batchSellNFT ||
                ctx.buyNFT ||
                ctx.crossToken ||
                ctx.crossSwapToken ||
                ctx.assetOrder ||
                ctx.contractCall);
            const blacklist = ctx.userData.contractBlacklist;
            return blacklist.some((item) => item.chainId === chainId && caseInsensitiveCompare(id, item.address));
        },
        descriptions: {
            forbidden: `The spender address is marked as blocked on another chain`,
        },
    },
];
