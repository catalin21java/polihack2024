import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.openai.com/v1/engines/gpt-4o-mini/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "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",
  },
});

export const generateResponse = async (message) => {
  try {
    const response = await instance.post("", {
      prompt: message,
      max_tokens: 60,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return "";
  }
};
