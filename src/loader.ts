import { GithubRepoLoader } from "langchain/document_loaders";
import { OpenAI } from "langchain/llms";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { VectorDBQAChain } from "langchain/chains";

require("dotenv").config();

export const runLoader = async () => {
  const model = new OpenAI({ temperature: 0, maxTokens: 500 });

  const loader = new GithubRepoLoader(
    "https://github.com/hwchase17/langchainjs",
    { branch: "main", recursive: false, unknown: "warn" }
  );
  const docs = await loader.load();

  // console.log(docs);

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 200,
  });

  const documents = await textSplitter.splitDocuments(docs);

  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY as string,
    environment: process.env.PINECONE_ENVIRONMENT as string,
  });

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string);

  const vectorStore = await PineconeStore.fromDocuments(
    documents,
    new OpenAIEmbeddings(),
    {
      pineconeIndex,
    }
  );

  // const vectorStore = await PineconeStore.fromExistingIndex(
  //   new OpenAIEmbeddings(),
  //   { pineconeIndex }
  // );

  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 1,
    returnSourceDocuments: true,
  });
  const response = await chain.call({
    query: "gptのためのプロンプトを教えて",
  });
  console.log(response);
};
