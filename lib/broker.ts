'use server';

import { CoreMessage, LanguageModel, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { currentModel } from "./llmproviders";

export async function ChatStreaming(messages: CoreMessage[]) {
    const result = await streamText({
        model: currentModel as LanguageModel,
        system: 'You are a helpful assistant.',
        messages,
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
}