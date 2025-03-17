import ApiError from "./apiError";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export async function searchWithGemini(searchWord: string, arr: any[]) {
  const prompt = `You are given an array of objects where each object has: title, content, description, type, createdAt, and score.
Filter the array and return ONLY the objects that match the query: "${searchWord}".
Match if the title, description, or type *contains* the query.
Return ONLY a valid JSON array.

Input Data: ${JSON.stringify(arr)}`;
  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const jsonString = responseText.replace(/```json|```/g, "").trim();
  if (!jsonString) {
    throw new ApiError(
      400,
      "Failed to extract valid JSON from Gemini response."
    );
  }
  const filteredArray = JSON.parse(jsonString);

  return filteredArray;
}

