import { OpenAI, Cohere } from "langchain/llms";

// llm
export const runLlm = async () => {
  const gpt = new OpenAI();
  const cohere = new Cohere();

  const res = await gpt.call("What your name?");
  console.log("gpt: ", res);
  const res2 = await cohere.call("What your name?");
  console.log("cohere:", res2);
};
