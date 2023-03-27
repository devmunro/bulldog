import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const configuration = new Configuration({ apiKey: OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export const getCompletion = async (prompt) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 7,
    });

    return response.data;
  } catch (error) {
    console.error("Error during completion request:", error.message);
    throw error;
  }
};

getCompletion("this is a test").then((result) => {
  console.log(result);
});
