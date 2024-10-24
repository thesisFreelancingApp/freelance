"use client";
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {unreadCount} unread
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <DropdownMenuItem>No notifications</DropdownMenuItem>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start py-2 px-4"
              >
                <div className="flex justify-between items-center w-full">
                  <span
                    className={`text-sm ${notification.read ? "text-muted-foreground" : "font-semibold"}`}
                  >
                    {notification.message}
                  </span>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="h-6 px-2 text-xs"
                    >
                      Mark read
                    </Button>
                  )}
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {notification.timestamp}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="text-center">
          <Link href="/notifications" className="w-full text-sm font-medium">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
