import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms";
import { PromptTemplate } from "langchain";

require("dotenv").config();

export const runChain = async () => {
  const llm = new OpenAI({ temperature: 1 });

  const prompt = new PromptTemplate({
    inputVariables: ["menu"],
    template: "{menu}の具材を教えて下さい。",
  });

  const chain = new LLMChain({ llm, prompt });

  const res = await chain.call({ menu: "寿司" });
  console.log(res.text);
};
