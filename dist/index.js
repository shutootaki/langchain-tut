"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llms_1 = require("langchain/llms");
require("dotenv").config();
const runLlm = async () => {
    const llm = new llms_1.OpenAI({ temperature: 0.9 });
    const res = await llm.call("自己紹介してください");
    console.log(res);
};
runLlm();
//# sourceMappingURL=index.js.map