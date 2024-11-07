"use client";
import React, { useEffect, useState } from "react";
import { getOrderById } from "@/server.actions/service orders/orders.actions";
import { updateOrderStatus } from "@/server.actions/service orders/post-purchase.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Upload,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [revisionMessage, setRevisionMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [userRole, setUserRole] = useState<"buyer" | "seller" | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    const checkUserRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && order) {
        if (order.buyerId === user.id) setUserRole("buyer");
        if (order.sellerId === user.id) setUserRole("seller");
      }
    };

    if (order) checkUserRole();
  }, [order]);

  const fetchOrder = async () => {
    try {
      const orderData = await getOrderById(params.orderId);
      console.log("orderData", orderData);
      setOrder(orderData);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    newStatus: OrderStatus,
    message: string,
  ) => {
    try {
      await updateOrderStatus(params.orderId, newStatus, message);
      await fetchOrder();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const renderActionButtons = () => {
    if (!order || !userRole) return null;

    if (userRole === "seller") {
      switch (order.status) {
        case "PENDING":
          return (
            <Button
              onClick={() =>
                handleStatusUpdate(
                  "ACCEPTED",
                  "Order accepted! Work will begin shortly.",
                )
              }
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Accept Order
            </Button>
          );
        case "ACCEPTED":
          return (
            <Button
              onClick={() =>
                handleStatusUpdate(
                  "IN_PROGRESS",
                  "Work has started on your order.",
                )
              }
            >
              <Clock className="mr-2 h-4 w-4" />
              Start Work
            </Button>
          );
        case "IN_PROGRESS":
          return (
            <div className="space-y-4">
              <Textarea
                placeholder="Add delivery message..."
                value={deliveryMessage}
                onChange={(e) => setDeliveryMessage(e.target.value)}
              />
              <Button
                onClick={() => handleStatusUpdate("DELIVERED", deliveryMessage)}
                disabled={!deliveryMessage}
              >
                <Upload className="mr-2 h-4 w-4" />
                Deliver Work
              </Button>
            </div>
          );
      }
    }

    if (userRole === "buyer") {
      switch (order.status) {
        case "COMPLETED":
          return (
            <div className="space-x-4">
              <Button
                onClick={() =>
                  handleStatusUpdate(
                    "ACCEPTED",
                    "Order accepted and completed!",
                  )
                }
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Accept Delivery
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (revisionMessage) {
                    handleStatusUpdate("IN_REVISION", revisionMessage);
                  }
                }}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Request Revision
              </Button>
            </div>
          );
        case "IN_REVISION":
          return (
            <div className="text-sm text-muted-foreground">
              Waiting for seller to make revisions...
            </div>
          );
      }
    }

    return null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Order Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Order #{params.orderId.slice(0, 8)}</CardTitle>
              <Badge>{order.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Order Details */}
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span>{order.service?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>
                    {order.totalAmount} {order.currency}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <Badge variant="outline">{order.paymentStatus}</Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6">{renderActionButtons()}</div>

              {/* Communication Button */}
              <div className="mt-4">
                <Link href="/messages">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message {order.isBuyer ? "Seller" : "Buyer"}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">{/* Add timeline events here */}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
