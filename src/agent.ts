import { initializeAgentExecutor } from "langchain/agents";
import { OpenAI, PromptTemplate } from "langchain";
import { Calculator, SerpAPI } from "langchain/tools";

require("dotenv").config();

export const runAgent = async () => {
  const llm = new OpenAI({ temperature: 0 });

  const tools = [new SerpAPI(), new Calculator()];

  const executor = await initializeAgentExecutor(
    tools,
    llm,
    "zero-shot-react-description",
    true
  );

  // first
  const firstPrompt = "尾田栄一郎 ONE PIECE 最新刊の巻数";
  const firrsRes = await executor.call({ input: firstPrompt });
  console.log("User1", firstPrompt);
  console.log("Agent1", firrsRes.output);

  // second
  const secondPrompt = new PromptTemplate({
    inputVariables: ["text"],
    template:
      "「{text}」Think step-by-step only of the number of the volume from the text here, and output it precisely.",
  });
  const secondRes = await llm.call(
    await secondPrompt.format({ text: firrsRes.output })
  );
  console.log("User2", secondPrompt.template);
  console.log("Agent2", secondRes);

  // third
  const thirdPrompt = new PromptTemplate({
    inputVariables: ["volumes"],
    template: "{volumes}に5を掛けると？",
  });
  const thirdRes = await executor.call({
    input: await thirdPrompt.format({ volumes: secondRes }),
  });
  console.log("User3", thirdPrompt.template);
  console.log("Agent3", thirdRes.output);
};

// runAgent();
