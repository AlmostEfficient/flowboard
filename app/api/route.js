import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = 'edge';

export async function POST(req) {
  const { typoText } = req.body;

  // typoText is the text that the user typed
  // Generate the text that the user should have typed
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    prompt: typoText,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
