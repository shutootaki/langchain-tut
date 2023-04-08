"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTemplate = void 0;
const langchain_1 = require("langchain");
const llms_1 = require("langchain/llms");
const runTemplate = async () => {
    const template = new langchain_1.PromptTemplate({
        inputVariables: ["menu"],
        template: "{menu}を作るために必要な材料は？",
    });
    const llm = new llms_1.OpenAI();
    const res = await llm.call(await template.format({ menu: "カレー" }));
    console.log(res);
};
exports.runTemplate = runTemplate;
//# sourceMappingURL=template.js.map