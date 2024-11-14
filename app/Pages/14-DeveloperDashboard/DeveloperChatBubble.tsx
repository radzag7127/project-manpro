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

interface DeveloperChat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  category: "promotions" | "agents" | "buyers";
  messages: Message[];
}

const developerChats: DeveloperChat[] = [
  {
    id: "1",
    name: "Rumaku Premium Ads",
    lastMessage:
      "Boost your project visibility with our premium advertising package!",
    timestamp: "2 hours ago",
    unread: 1,
    category: "promotions",
    messages: [
      {
        id: "1a",
        sender: "Rumaku Ads",
        content:
          "Get 50% off on premium project listings this month! Increase your project visibility and reach more potential buyers.",
        timestamp: "2 hours ago",
      },
      {
        id: "1b",
        sender: "Rumaku Ads",
        content:
          "Premium features include: Featured listing, Social media promotion, Analytics dashboard",
        timestamp: "2 hours ago",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Chen (Buyer)",
    lastMessage: "I'm interested in the Mountain View Apartments project",
    timestamp: "1 day ago",
    unread: 2,
    category: "buyers",
    messages: [
      {
        id: "2a",
        sender: "Sarah Chen",
        content:
          "Hi, I saw your Mountain View Apartments project. Are there any 2-bedroom units available?",
        timestamp: "2 days ago",
      },
      {
        id: "2b",
        sender: "You",
        content:
          "Hello Sarah! Yes, we have several 2-bedroom units available in Tower A.",
        timestamp: "1 day ago",
      },
      {
        id: "2c",
        sender: "Sarah Chen",
        content: "Great! What's the price range for these units?",
        timestamp: "1 day ago",
      },
    ],
  },
  {
    id: "3",
    name: "John Smith (Agent)",
    lastMessage: "I have 5 potential buyers for Mountain View Apartments",
    timestamp: "3 hours ago",
    unread: 1,
    category: "agents",
    messages: [
      {
        id: "3a",
        sender: "John Smith",
        content:
          "Hi, I have several clients interested in Mountain View Apartments. Can we discuss bulk purchase options?",
        timestamp: "4 hours ago",
      },
      {
        id: "3b",
        sender: "You",
        content:
          "Of course! We offer special rates for bulk purchases. What units are they interested in?",
        timestamp: "3 hours ago",
      },
    ],
  },
  // Add more developer-specific chats as needed
];

export function DeveloperChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<DeveloperChat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] =
    useState<DeveloperChat["category"]>("promotions");

  // Calculate unread counts
  const unreadCounts = {
    promotions: developerChats
      .filter((c) => c.category === "promotions")
      .reduce((acc, chat) => acc + chat.unread, 0),
    agents: developerChats
      .filter((c) => c.category === "agents")
      .reduce((acc, chat) => acc + chat.unread, 0),
    buyers: developerChats
      .filter((c) => c.category === "buyers")
      .reduce((acc, chat) => acc + chat.unread, 0),
  };

  const filteredChats = developerChats.filter(
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
                  setActiveTab(value as DeveloperChat["category"])
                }
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="promotions" className="relative">
                    Promos
                    {unreadCounts.promotions > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="agents" className="relative">
                    Agents
                    {unreadCounts.agents > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="buyers" className="relative">
                    Buyers
                    {unreadCounts.buyers > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            <ScrollArea className="h-64 p-4">
              {selectedChat
                ? // Display messages when a chat is selected
                  selectedChat.messages.map((message) => (
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
                : // Display chat list when no chat is selected
                  filteredChats.map((chat) => (
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
