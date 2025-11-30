import { UIMessage } from "ai";
import { Bot } from "lucide-react";
import { Streamdown } from "streamdown";

interface ChatMessageProps {
  message: UIMessage;
}

export const ChatMessage = ({ 
  message, 
}: ChatMessageProps) => {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  const content = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

  if (isSystem) {
    return (
      <div className="flex w-full flex-col gap-3 px-5 pb-0 pt-6">
        <div className="flex w-full flex-col gap-2.5 rounded-xl border border-border p-3">
          <div className="flex w-full items-center justify-center gap-2.5">
            <p className="grow basis-0 text-center text-sm font-normal leading-[1.4] text-muted-foreground">
              {content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex w-full flex-col items-end gap-3 pb-0 pl-10 pr-5 pt-6">
        <div className="flex max-w-[calc(100%-40px)] items-center gap-2.5 rounded-full bg-secondary px-4 py-3">
          <p className="text-foreground truncate text-sm leading-[1.4] font-normal break-words whitespace-normal">
            {content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3 pb-0 pl-3 pr-14 pt-6">
      <div className="flex w-full gap-2">
        <div className="border-border flex size-8 shrink-0 items-center justify-center rounded-full border bg-[rgba(48,92,58,0.12)]">
          <Bot className="size-3.5 text-primary" />
        </div>
       <div className="text-foreground max-w-full text-sm leading-[1.4] font-normal break-words whitespace-normal">
          <Streamdown>{content}</Streamdown>
        </div>
      </div>
    </div>
  );
};