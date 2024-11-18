"use client";

import { useState, FormEvent } from "react";
import ReactMarkdown from "react-markdown"; // Import Markdown renderer
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LegalChatBot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content: `be as concise as possible.
        
        **Welcome to your Legal Assistant!**
        
- **Key Point:** Property tax for sales in Indonesia is **2.5% of the transaction value**.
- **Details:** This must be paid before ownership transfer.
- **Next Steps:** [Click here](#) for detailed guidance or consult a lawyer.`,
      },
    ]
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResponse = async (input: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: input }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(
          `API responded with status ${response.status}: ${errorData}`
        );
      }

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || "No response";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botResponse },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    fetchResponse(userInput);
    setUserInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 p-0 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <div className="w-[450px] h-[700px] bg-background border rounded-lg shadow-lg flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground">
            <h3 className="font-semibold">Legal Assistant</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 hover:bg-primary-foreground/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.slice(1).map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <ReactMarkdown className="text-sm">
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-muted-foreground">
                Assistant is typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Ask about property laws..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button type="submit" disabled={loading}>
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
