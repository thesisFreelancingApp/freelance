"use client";
import { useEffect, useState } from "react";
import { getOrderById } from "@/server.actions/service orders/orders.actions";
import { updateOrderStatus } from "@/server.actions/service orders/post-purchase.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@prisma/client";
import Link from "next/link";
import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";

interface OrderDetailsProps {
  params: {
    orderId: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsProps) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const orderData = await getOrderById(params.orderId);
      setOrder(orderData);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    const colors = {
      PENDING: "bg-yellow-500",
      ACCEPTED: "bg-blue-500",
      IN_PROGRESS: "bg-purple-500",
      IN_REVISION: "bg-orange-500",
      COMPLETED: "bg-green-500",
      CANCELLED: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    try {
      let message = "";
      switch (newStatus) {
        case "ACCEPTED":
          message = "Order accepted! Work will begin shortly.";
          break;
        case "IN_PROGRESS":
          message = "Work has started on your order.";
          break;
        case "COMPLETED":
          message = "Order has been completed! Please review the delivery.";
          break;
        // Add other status messages as needed
      }

      await updateOrderStatus(params.orderId, newStatus, message);
      await fetchOrder();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
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
        {/* Order Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Order #{params.orderId.slice(0, 8)}</span>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Service</h3>
                <p>{order.service?.name}</p>
              </div>
              <div>
                <h3 className="font-semibold">Amount</h3>
                <p>
                  {order.totalAmount} {order.currency}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Payment Status</h3>
                <Badge
                  variant={
                    order.paymentStatus === "COMPLETED"
                      ? "default"
                      : "secondary"
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-x-4">
              <Link href={`/messages`}>
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Seller
                </Button>
              </Link>

              {/* Status Update Buttons - Show based on current status and user role */}
              {order.status === "PENDING" && (
                <Button onClick={() => handleStatusUpdate("ACCEPTED")}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept Order
                </Button>
              )}
              {order.status === "ACCEPTED" && (
                <Button onClick={() => handleStatusUpdate("IN_PROGRESS")}>
                  <Clock className="mr-2 h-4 w-4" />
                  Start Work
                </Button>
              )}
              {order.status === "IN_PROGRESS" && (
                <Button onClick={() => handleStatusUpdate("COMPLETED")}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Card */}
        <Card>
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-sm">Order Created</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              {/* Add more timeline events based on order status changes */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
