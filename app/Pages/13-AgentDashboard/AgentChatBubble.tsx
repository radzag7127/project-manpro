"use client";

import { useState } from "react";
import { MessageCircle, X, Send, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface AgentChat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  category: "promotions" | "buyers" | "developers" | "propertyOwners";
  messages: Message[];
}

const agentChats: AgentChat[] = [
  {
    id: "1",
    name: "Rumaku Premium Ads",
    lastMessage: "Boost your listings with our premium advertising package!",
    timestamp: "2 hours ago",
    unread: 1,
    category: "promotions",
    messages: [
      {
        id: "1a",
        sender: "Rumaku Ads",
        content:
          "Get 50% off on premium listing promotions this month! Increase your visibility and reach more potential buyers.",
        timestamp: "2 hours ago",
      },
    ],
  },
  {
    id: "2",
    name: "John Doe",
    lastMessage:
      "Hi, I'm interested in the Luxury Villa in Menteng. Is it still available?",
    timestamp: "3/15/2024, 5:30:00 PM",
    unread: 1,
    category: "buyers",
    messages: [
      {
        id: "2a",
        sender: "John Doe",
        content:
          "Hi, I'm interested in the Luxury Villa in Menteng. Is it still available?",
        timestamp: "3/15/2024, 5:30:00 PM",
      },
    ],
  },
  {
    id: "3",
    name: "Jane Smith",
    lastMessage:
      "Hello, can you tell me more about the Modern Apartment in SCBD?",
    timestamp: "3/14/2024, 10:45:00 PM",
    unread: 1,
    category: "buyers",
    messages: [
      {
        id: "3a",
        sender: "Jane Smith",
        content:
          "Hello, can you tell me more about the Modern Apartment in SCBD?",
        timestamp: "3/14/2024, 10:45:00 PM",
      },
    ],
  },
  {
    id: "4",
    name: "Green Valley Development",
    lastMessage: "New project collaboration opportunity",
    timestamp: "3 hours ago",
    unread: 1,
    category: "developers",
    messages: [
      {
        id: "4a",
        sender: "Green Valley Development",
        content:
          "We have a new luxury apartment project launching next month. Would you be interested in being one of our partner agents?",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    id: "5",
    name: "Michael Wong (Property Owner)",
    lastMessage: "Can you help sell my property?",
    timestamp: "5 hours ago",
    unread: 1,
    category: "propertyOwners",
    messages: [
      {
        id: "5a",
        sender: "Michael Wong",
        content:
          "Hi, I have a luxury condo in Sudirman area. Would you be interested in being my agent?",
        timestamp: "6 hours ago",
      },
      {
        id: "5b",
        sender: "You",
        content:
          "Hello Mr. Wong! I'd be happy to help. Could you share more details about the property?",
        timestamp: "5 hours ago",
      },
    ],
  },
];

export function AgentChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<AgentChat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] =
    useState<AgentChat["category"]>("promotions");

  const unreadCounts = {
    promotions: agentChats
      .filter((c) => c.category === "promotions")
      .reduce((acc, chat) => acc + chat.unread, 0),
    buyers: agentChats
      .filter((c) => c.category === "buyers")
      .reduce((acc, chat) => acc + chat.unread, 0),
    developers: agentChats
      .filter((c) => c.category === "developers")
      .reduce((acc, chat) => acc + chat.unread, 0),
    propertyOwners: agentChats
      .filter((c) => c.category === "propertyOwners")
      .reduce((acc, chat) => acc + chat.unread, 0),
  };

  const filteredChats = agentChats.filter(
    (chat) => chat.category === activeTab
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // Add message handling logic here
    setNewMessage("");
  };

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-4 right-4 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 w-80 bg-background border rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="p-4 bg-primary text-primary-foreground flex items-center">
              {selectedChat ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedChat(null)}
                    className="mr-2"
                  >
                    <ChevronLeft />
                  </Button>
                  <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
                </>
              ) : (
                <h2 className="text-lg font-semibold">Chats</h2>
              )}
            </div>

            {!selectedChat && (
              <Tabs
                value={activeTab}
                onValueChange={(value) =>
                  setActiveTab(value as AgentChat["category"])
                }
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="promotions" className="relative">
                    Promos
                    {unreadCounts.promotions > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="buyers" className="relative">
                    Buyers
                    {unreadCounts.buyers > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="developers" className="relative">
                    Devs
                    {unreadCounts.developers > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="propertyOwners" className="relative">
                    Owners
                    {unreadCounts.propertyOwners > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            <ScrollArea className="h-64 p-4">
              {selectedChat
                ? selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 last:mb-0 ${
                        message.sender === "You" ? "text-right" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp}
                        </span>
                      </div>
                      <div
                        className={`inline-block p-2 rounded-lg ${
                          message.sender === "You"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))
                : filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="mb-4 last:mb-0 cursor-pointer hover:bg-accent rounded-lg p-2"
                      onClick={() => setSelectedChat(chat)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <Avatar className="w-8 h-8 mr-2">
                            <AvatarImage
                              src={`https://api.dicebear.com/6.x/initials/svg?seed=${chat.name}`}
                            />
                            <AvatarFallback>{chat.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium">{chat.name}</span>
                            {chat.unread > 0 && (
                              <Badge variant="destructive" className="ml-2">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-sm truncate">{chat.lastMessage}</p>
                    </div>
                  ))}
            </ScrollArea>
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button type="submit" size="icon" disabled={!selectedChat}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
