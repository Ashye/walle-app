import { ChatStreaming } from '@/lib/providerbroker';
import { type CoreMessage } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await ChatStreaming(messages);

  return result;
}