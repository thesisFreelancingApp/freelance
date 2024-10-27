"use client";
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: "Your gig was approved",
      read: false,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      message: "New order received",
      read: false,
      timestamp: "1 day ago",
    },
    {
      id: "3",
      message: "Your payout is ready",
      read: true,
      timestamp: "3 days ago",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {unreadCount} unread
            </span>
          )}
        </div>
        <ScrollArea className="h-[calc(80vh-8rem)] py-2">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-muted-foreground text-sm">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="px-4 py-3 focus:bg-accent cursor-default"
              >
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-start gap-2">
                    <p
                      className={`text-sm ${
                        !notification.read
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          markAsRead(notification.id);
                        }}
                        className="h-6 px-2 text-xs hover:bg-secondary"
                      >
                        Mark read
                      </Button>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1">
                    {notification.timestamp}
                  </span>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
        <div className="p-4 border-t">
          <Link
            href="/notifications"
            className="block text-sm text-center text-primary hover:text-primary/80"
          >
            View all notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
