const rules = [
    {
        id: "1118",
        enable: true,
        valueDescription: "Gas required for this transaction ",
        valueDefine: {
            type: "int",
            min: 0,
            minIncluded: true,
            max: null,
            maxIncluded: false,
        },
        defaultThreshold: {
            warning: {
                min: 1000000,
                minIncluded: false,
                max: null,
                maxIncluded: false,
            },
        },
        customThreshold: {},
        requires: ["revokeApprove"],
        async getValue(ctx) {
            const data = ctx.revokeApprove;
            return data.gasUsed;
        },
        descriptions: {
            warning: `Gas required for this transaction is too big (>1,000,000); it might be a scam`,
        },
    },
];
export default rules;
