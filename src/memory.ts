import { ConversationChain } from "langchain/chains";
import { OpenAI } from "langchain";

require("dotenv").config();

export const runMemory = async () => {
  const llm = new OpenAI({ temperature: 0 });

  const memoryChain = new ConversationChain({ llm });

  const input1 = "あなたの座右の銘は何ですか？";
  const res1 = await memoryChain.call({ input: input1 });
  console.log("User: ", input1);
  console.log("Agent:", res1.response);

  const input2 = "それはどんな意味ですか？";
  const res2 = await memoryChain.call({ input: input2 });
  console.log("User: ", input2);
  console.log("Agent:", res2.response);

  const input3 = "なぜその言葉が好きなのですか？";
  const res3 = await memoryChain.call({ input: input3 });
  console.log("User: ", input3);
  console.log("Agent:", res3.response);
};
