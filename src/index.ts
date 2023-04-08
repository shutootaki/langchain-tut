import { runLlm } from "./llm";
import { runTemplate } from "./template";
import { runChain } from "./chain";
import { runAgent } from "./agent";
import { runMemory } from "./memory";
require("dotenv").config();

// runLlm();
// runTemplate();
// runChain();
// runAgent();
runMemory();
