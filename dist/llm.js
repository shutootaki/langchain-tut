"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runLlm = void 0;
const llms_1 = require("langchain/llms");
// llm
const runLlm = async () => {
    const llm = new llms_1.OpenAI();
    const res = await llm.call("自己紹介してください");
    console.log(res);
};
exports.runLlm = runLlm;
//# sourceMappingURL=llm.js.map