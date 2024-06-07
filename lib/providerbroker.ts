'use server';

import { createOpenAI } from "@ai-sdk/openai";
import { CoreMessage, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

const openai = createOpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

export async function ChatStreaming(messages: CoreMessage[]) {
    const result = await streamText({
        model: openai(process.env.MODEL? process.env.MODEL : 'google/gemma-7b-it:free'),
        system: 'You are a helpful assistant.',
        messages,
    });

    // return result.toAIStreamResponse();
    const stream = createStreamableValue(result.textStream);
    return stream.value;
}

