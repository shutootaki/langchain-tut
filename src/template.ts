import { PromptTemplate } from "langchain";
import { OpenAI } from "langchain/llms";

export const runTemplate = async () => {
  const template = new PromptTemplate({
    inputVariables: ["menu"],
    template: "{menu}を作るために必要な材料は？",
  });

  const llm = new OpenAI();

  const res = await llm.call(await template.format({ menu: "カレー" }));
  console.log(res);
};
