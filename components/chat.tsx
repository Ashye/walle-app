'use client';

import { ChatStreaming } from "@/lib/providerbroker";
import { CoreMessage } from "ai";
import { readStreamableValue } from "ai/rsc";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import ChatHeader from "./header";



export default function Chat() {
    const [messages, setMessages] = useState<CoreMessage[]>([]);
    const [input, setInput] = useState("");
    const { pending } = useFormStatus();

    const messageListRef = useRef(null);
    useEffect(()=>{
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-screen justify-between">
            <ChatHeader />
            <div ref={messageListRef} className="flex flex-col h-full overflow-y-scroll">
                {messages.map((m, i) => (
                    <div key={i} className={`items-center border-b border-1 px-12 py-3 ${m.role !== 'user' ? 'bg-sky-50' : 'bg-gray-50'}`} >
                        <p className={`${m.role !== 'user' ? 'whitespace-pre-wrap' : ''}`}>
                            <span className="font-bold capitalize">
                                {m.role === 'user' ? "You: " : "Assitant: "}
                            </span>
                            {m.content as string}
                        </p>
                    </div>
                ))}
            </div>

            <form
                className="mx-12 sticky mb-0"
                action={async () => {
                    const newMessages: CoreMessage[] = [
                        ...messages,
                        { content: input, role: 'user' },
                    ];

                    setMessages(newMessages);
                    setInput('');

                    const result = await ChatStreaming(newMessages);

                    for await (const content of readStreamableValue(result)) {
                        setMessages([
                            ...newMessages,
                            {
                                role: 'assistant',
                                content: content as string,
                            },
                        ]);
                    }
                }}
            >
                <div className="flex justify-between items-center input input-bordered bottom-0 w-full mb-2 border rounded-xl z-10 shadow-xl" aria-disabled={pending}>
                    <input
                        className="w-full"
                        value={input}
                        placeholder="Say something..."
                        onChange={e => setInput(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-circle btn-sm mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5"><path fill-rule="evenodd" d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </form>
        </div>
    )
}
