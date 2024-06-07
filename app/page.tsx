import Chat from "@/components/chat";
import ChatHeader from "@/components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col min-h-screen z-10 w-full justify-between  max-w-6xl font-mono text-sm lg:flex">
        <ChatHeader />
        <Chat />
      </div>
    </main>
  );
}
