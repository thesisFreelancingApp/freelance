"use client";
import { Bell, Check, Mail, MessageCircle, Package, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/hooks/useNotifications";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import type { NotificationType } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils-cn";

interface Notification {
  id: string;
  type: NotificationType;
  content: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  metadata?: Record<string, any> | null;
}

const notificationIcons: Record<NotificationType, JSX.Element> = {
  NEW_ORDER: <Package className="h-4 w-4" />,
  ORDER_STATUS_CHANGE: <Check className="h-4 w-4" />,
  NEW_MESSAGE: <MessageCircle className="h-4 w-4" />,
  NEW_RATING: <Star className="h-4 w-4" />,
  PAYMENT_RECEIVED: <Mail className="h-4 w-4" />,
  SERVICE_APPROVED: <Check className="h-4 w-4" />,
  DISPUTE_CREATED: <Mail className="h-4 w-4" />,
  DISPUTE_RESOLVED: <Check className="h-4 w-4" />,
};

const NotificationItem = ({
  notification,
  onMarkRead,
  onClick,
}: {
  notification: Notification;
  onMarkRead: (id: string) => Promise<void>;
  onClick: (notification: Notification) => void;
}) => {
  const icon = notificationIcons[notification.type] || (
    <Bell className="h-4 w-4" />
  );

  return (
    <DropdownMenuItem
      className={cn(
        "px-4 py-3 focus:bg-accent cursor-pointer",
        !notification.isRead && "bg-accent/5",
      )}
      onClick={() => onClick(notification)}
    >
      <div className="flex items-start gap-3 w-full">
        <div
          className={cn(
            "mt-1 p-2 rounded-full",
            !notification.isRead
              ? "bg-primary text-primary-foreground"
              : "bg-muted",
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2">
            <p
              className={cn(
                "text-sm",
                !notification.isRead
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {notification.content}
            </p>
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkRead(notification.id);
                }}
                className="h-6 px-2 text-xs hover:bg-secondary shrink-0"
              >
                Mark read
              </Button>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </DropdownMenuItem>
  );
};

export default function Notifications() {
  const router = useRouter();
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }
    if (notification.link) {
      router.push(notification.link);
    }
  };

  const groupedNotifications = {
    unread: notifications.filter((n) => !n.isRead),
    read: notifications.filter((n) => n.isRead),
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative transition-colors",
            unreadCount > 0 && "text-primary",
          )}
        >
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
          <div>
            <h2 className="text-sm font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">
                You have {unreadCount} unread notification
                {unreadCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markAllAsRead()}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[calc(80vh-8rem)] py-2">
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-muted-foreground text-sm">
              No notifications yet
            </div>
          ) : (
            <>
              {groupedNotifications.unread.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    New
                  </div>
                  {groupedNotifications.unread.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkRead={markAsRead}
                      onClick={handleNotificationClick}
                    />
                  ))}
                </>
              )}
              {groupedNotifications.unread.length > 0 &&
                groupedNotifications.read.length > 0 && (
                  <DropdownMenuSeparator />
                )}
              {groupedNotifications.read.length > 0 && (
                <>
                  <div className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Earlier
                  </div>
                  {groupedNotifications.read.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkRead={markAsRead}
                      onClick={handleNotificationClick}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
