import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <div className="flex flex-col h-screen w-full justify-between  max-w-6xl font-mono text-sm lg:flex">
        <Chat />
      </div>
    </main>
  );
}
