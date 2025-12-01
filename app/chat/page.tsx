"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ChatMessage } from "./_components/chat-message";
import { ChatInput } from "./_components/chat-input";

const INITIAL_MESSAGES = [
  {
    id: "system-welcome",
    role: "system" as const,
    parts: [
      {
        type: "text" as const,
        text: "Seu assistente de agendamentos está online.",
      },
    ],
  },
  {
    id: "assistant-welcome",
    role: "assistant" as const,
    parts: [
      {
        type: "text" as const,
        text: "Olá! Sou o Hydra, seu assistente pessoal.\n\nEstou aqui para te auxiliar a agendar seu corte ou barba, encontrar as barbearias disponíveis perto de você e responder às suas dúvidas.",
      },
    ],
  },
];

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage({
        text: message,
      });
      setMessage("");
    }
  };

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden rounded-[20px] bg-[var(--background)]">
      <div className="border-b border-gray-200/10 bg-[var(--background)]">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4">
          <Link href="/" className="transition-opacity hover:opacity-70">
            <ChevronLeft className="size-6 shrink-0 text-[var(--foreground)]" />
          </Link>
          <p className="font-merriweather text-[20px] leading-[1.4] tracking-[-1px] text-nowrap whitespace-pre text-[var(--foreground)] italic">
            Hydra
          </p>
          <div className="flex items-center justify-end gap-[15px]" />
        </div>
      </div>

      <div className="w-full flex-1 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex w-full max-w-3xl flex-col px-4 pt-6 pb-32 [&::-webkit-scrollbar]:hidden">
          {messages.length === 0
            ? INITIAL_MESSAGES.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))
            : messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="w-full bg-[var(--background)] p-4">
        <div className="mx-auto w-full max-w-3xl">
          <ChatInput
            input={message}
            onChange={(e) => setMessage(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
