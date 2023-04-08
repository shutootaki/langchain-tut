import { initializeAgentExecutor } from "langchain/agents";
import { OpenAI } from "langchain";
import { Calculator, SerpAPI } from "langchain/tools";

require("dotenv").config();

export const runAgent = async () => {
  const llm = new OpenAI({ temperature: 0.9 });

  const tools = [new SerpAPI(), new Calculator()];

  const executor = await initializeAgentExecutor(
    tools,
    llm,
    "zero-shot-react-description",
    true
  );

  const firstPrompt = "尾田栄一郎作の漫画ワンピースの最新刊は何巻ですか？";
  const firrsRes = await executor.call({ input: firstPrompt });
  console.log("User", firstPrompt);
  console.log("Agent", firrsRes.output);

  const secondPrompt = "123456789割る3は?";
  const secondRes = await executor.call({ input: secondPrompt });
  console.log("User", secondPrompt);
  console.log("Agent", secondRes.output);
};
