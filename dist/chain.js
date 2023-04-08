"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runChain = void 0;
const chains_1 = require("langchain/chains");
const llms_1 = require("langchain/llms");
const langchain_1 = require("langchain");
require("dotenv").config();
const runChain = async () => {
    const llm = new llms_1.OpenAI({ temperature: 1 });
    const prompt = new langchain_1.PromptTemplate({
        inputVariables: ["menu"],
        template: "{menu}の具材を教えて下さい。",
    });
    const chain = new chains_1.LLMChain({ llm, prompt });
    const res = await chain.call({ menu: "寿司" });
    console.log(res.text);
};
exports.runChain = runChain;
//# sourceMappingURL=chain.js.map