"use client";

import { ChatBubble } from "@/app/Pages/0-PageProperties/ChatBubble";
import { Chat } from "@/types/chat";

const buyerChats: Chat[] = [
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
    name: "Siti Nurhaliza (Agent)",
    lastMessage: "Would you like to schedule a viewing?",
    timestamp: "3/10/2024",
    unread: 1,
    category: "agents",
    messages: [
      {
        id: "2a",
        sender: "You",
        content: "Hi, I'm interested in the Modern Apartment in CBD.",
        timestamp: "3/10/2024",
      },
      {
        id: "2b",
        sender: "Siti Nurhaliza",
        content:
          "Thank you for your interest. The property is still available. Would you like to schedule a viewing?",
        timestamp: "3/10/2024",
      },
    ],
  },
  {
    id: "3",
    name: "Budi Santoso (Agent)",
    lastMessage: "Hello, I'm interested in this property.",
    timestamp: "3/12/2024",
    unread: 0,
    category: "agents",
    messages: [
      {
        id: "3a",
        sender: "You",
        content:
          "Hello, I'm interested in this property. Can you provide more information about the neighborhood and nearby schools?",
        timestamp: "3/12/2024",
      },
    ],
  },
];

export function BuyerChatBubble() {
  return <ChatBubble userType="buyer" chats={buyerChats} />;
}
