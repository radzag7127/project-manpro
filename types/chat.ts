export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  category: "promotions" | "agents" | "developers" | "propertyOwners";
  messages: Message[];
}
