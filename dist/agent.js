"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAgent = void 0;
const agents_1 = require("langchain/agents");
const langchain_1 = require("langchain");
const tools_1 = require("langchain/tools");
require("dotenv").config();
const runAgent = async () => {
    const llm = new langchain_1.OpenAI({ temperature: 0 });
    const tools = [new tools_1.SerpAPI(), new tools_1.Calculator()];
    const executor = await (0, agents_1.initializeAgentExecutor)(tools, llm, "zero-shot-react-description", true);
    // first web検索
    const firstPrompt = "尾田栄一郎 ONE PIECE 最新刊の巻数";
    const firstRes = await executor.call({ input: firstPrompt });
    console.log("User1", firstPrompt);
    console.log("Agent1", firstRes.output);
    // second 数値取り出し
    const secondPrompt = new langchain_1.PromptTemplate({
        inputVariables: ["text"],
        template: "「{text}」Think step-by-step only of the number of the volume from the text here, and output it precisely.",
    });
    const secondRes = await llm.call(
    // firstのレスポンスをsecondのプロンプトに設定
    await secondPrompt.format({ text: firstRes.output }));
    console.log("User2", secondPrompt.template);
    console.log("Agent2", secondRes);
    // third 計算
    const thirdPrompt = new langchain_1.PromptTemplate({
        inputVariables: ["volumes"],
        template: "{volumes}に5を掛けると？",
    });
    const thirdRes = await executor.call({
        // secondのレスポンスをthirdのプロンプトに設定
        input: await thirdPrompt.format({ volumes: secondRes }),
    });
    console.log("User3", thirdPrompt.template);
    console.log("Agent3", thirdRes.output);
};
exports.runAgent = runAgent;
//# sourceMappingURL=agent.js.map