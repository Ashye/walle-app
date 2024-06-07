'use server';

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { LanguageModel } from "ai";

const MODEL_SUPPROTED_LIST = {
    google: ['models/gemini-1.5-pro-latest'],
    openai: [''],
    openrouter: [''],
    cozecn: [''],
}


export let currentmodelel: LanguageModel | null = selectmodel('openai', process.env.modelEL as string)


function selectmodel(provider: string, model: string) {
    currentmodelel = createmodel(provider, model);
    return currentmodelel;
}

function createmodel(provider: string, model: string) {
    switch (provider) {
        case 'openai':
            {
                const openai = createOpenAI({
                    baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
                    apiKey: process.env.OPENAI_API_KEY,
                });
                return openai(model);
            }
        case 'google':
            {
                const google = createGoogleGenerativeAI({
                    baseURL: process.env.GOOGLE_GENAI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta',
                    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
                });
                return google(model);
            }
    }
    return null;
}

