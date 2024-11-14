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

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  category: "promotions" | "agents" | "developers" | "propertyOwners";
  messages: Message[];
}

interface ChatBubbleProps {
  userType: string;
  chats?: Chat[];
  tabLabels?: {
    [key: string]: string;
  };
}

const defaultChats: Chat[] = [
  {
    id: "1",
    name: "Green Valley Promo",
    lastMessage: "New luxury apartments available!",
    timestamp: "2 hours ago",
    unread: 1,
    category: "promotions",
    messages: [
      {
        id: "1a",
        sender: "Green Valley Promo",
        content:
          "New luxury apartments available in Green Valley! Limited time offer.",
        timestamp: "2 hours ago",
      },
    ],
  },
  {
    id: "2",
    name: "John Doe (Agent)",
    lastMessage: "I can schedule a viewing for you this weekend.",
    timestamp: "1 day ago",
    unread: 0,
    category: "agents",
    messages: [
      {
        id: "2a",
        sender: "You",
        content: "Hi John, I'm interested in the Mountain View property.",
        timestamp: "2 days ago",
      },
      {
        id: "2b",
        sender: "John Doe",
        content:
          "Great! I can schedule a viewing for you this weekend. Does Saturday at 2 PM work?",
        timestamp: "1 day ago",
      },
    ],
  },
  {
    id: "3",
    name: "Sunset Developers",
    lastMessage: "Thank you for your interest in our new project.",
    timestamp: "3 days ago",
    unread: 2,
    category: "developers",
    messages: [
      {
        id: "3a",
        sender: "You",
        content:
          "Hello, I saw your new Sunset Plaza project. Can you provide more details?",
        timestamp: "4 days ago",
      },
      {
        id: "3b",
        sender: "Sunset Developers",
        content:
          "Sunset Plaza is our newest mixed-use development featuring luxury apartments and retail spaces.",
        timestamp: "3 days ago",
      },
      {
        id: "3c",
        sender: "Sunset Developers",
        content:
          "Would you like to schedule a meeting to discuss investment opportunities?",
        timestamp: "3 days ago",
      },
    ],
  },
  {
    id: "4",
    name: "Jane Smith (Property Owner)",
    lastMessage: "Yes, the apartment is still available for rent.",
    timestamp: "5 days ago",
    unread: 1,
    category: "propertyOwners",
    messages: [
      {
        id: "4a",
        sender: "You",
        content:
          "Hi Jane, is your downtown apartment still available for rent?",
        timestamp: "6 days ago",
      },
      {
        id: "4b",
        sender: "Jane Smith",
        content:
          "Yes, the apartment is still available for rent. Would you like to arrange a viewing?",
        timestamp: "5 days ago",
      },
    ],
  },
];

export function ChatBubble({
  userType,
  chats = defaultChats,
}: ChatBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<Chat["category"]>("promotions");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      const updatedChat = {
        ...selectedChat,
        messages: [
          ...selectedChat.messages,
          {
            id: `new-${Date.now()}`,
            sender: "You",
            content: newMessage,
            timestamp: "Just now",
          },
        ],
        lastMessage: newMessage,
        timestamp: "Just now",
        unread: 0,
      };
      setSelectedChat(updatedChat);
      setNewMessage("");
    }
  };

  const filteredChats = chats.filter((chat) => chat.category === activeTab);
  const unreadCounts = {
    promotions: chats.filter(
      (chat) => chat.category === "promotions" && chat.unread > 0
    ).length,
    agents: chats.filter(
      (chat) => chat.category === "agents" && chat.unread > 0
    ).length,
    developers: chats.filter(
      (chat) => chat.category === "developers" && chat.unread > 0
    ).length,
    propertyOwners: chats.filter(
      (chat) => chat.category === "propertyOwners" && chat.unread > 0
    ).length,
  };

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          className="w-12 h-12 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <MessageCircle />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 w-80 bg-background border rounded-lg shadow-lg overflow-hidden z-40"
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
                  setActiveTab(value as Chat["category"])
                }
              >
                <TabsList className="grid w-full grid-cols-4">
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
