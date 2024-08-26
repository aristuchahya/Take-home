import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface EventProps {
  messages: { username: string; message: string }[];
  currentUsername: string;
}

const Events: React.FC<EventProps> = ({ messages, currentUsername }) => {
  return (
    <Card>
      <CardContent>
        <div className="space-y-4 p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.username === currentUsername
                  ? "flex items-end space-x-2"
                  : "flex items-start space-x-2"
              }
            >
              <div className="rounded-full overflow-hidden w-8 h-8">
                <img
                  alt="User avatar"
                  className="rounded-full"
                  height={32}
                  src="/placeholder.svg"
                  style={{ aspectRatio: "32/32", objectFit: "cover" }}
                  width={32}
                />
              </div>
              <div
                className={
                  msg.username === currentUsername
                    ? "rounded-lg bg-blue-100 border border-blue-200 p-4 w-auto max-w-[75%] shadow-sm"
                    : "rounded-lg bg-gray-100 border border-gray-200 p-4 w-auto max-w-[75%] shadow-sm"
                }
              >
                <div className="text-sm font-medium">{msg.username}</div>
                <div className="text-sm grid gap-0.5">
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Events;
