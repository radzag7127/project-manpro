"use client";

import { ChatBubble } from "@/app/Pages/0-PageProperties/ChatBubble";
import { Chat } from "@/types/chat";

// Add property owner specific chat data
const propOwnerChats: Chat[] = [
  {
    id: "1",
    name: "John Smith (Buyer)",
    lastMessage: "Is the villa still available for viewing?",
    timestamp: "1 hour ago",
    unread: 2,
    category: "propertyOwners",
    messages: [
      {
        id: "1a",
        sender: "John Smith",
        content: "Hi, I'm interested in your Bali villa listing.",
        timestamp: "2 hours ago",
      },
      {
        id: "1b",
        sender: "You",
        content: "Hello John! Yes, the villa is still available.",
        timestamp: "1.5 hours ago",
      },
      {
        id: "1c",
        sender: "John Smith",
        content: "Is the villa still available for viewing this weekend?",
        timestamp: "1 hour ago",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Lee (Agent)",
    lastMessage: "I have a potential buyer for your property",
    timestamp: "3 hours ago",
    unread: 1,
    category: "agents",
    messages: [
      {
        id: "2a",
        sender: "Sarah Lee",
        content:
          "Hi, I have a potential buyer interested in your Canggu property.",
        timestamp: "3 hours ago",
      },
    ],
  },
  // Add more property owner specific chats as needed
];

export function PropOwnChatBubble() {
  return <ChatBubble userType="propertyOwner" chats={propOwnerChats} />;
}
