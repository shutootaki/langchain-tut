import { OpenAI } from "langchain/llms";

// llm
export const runLlm = async () => {
  const llm = new OpenAI();

  const res = await llm.call("自己紹介してください");
  console.log(res);
};
