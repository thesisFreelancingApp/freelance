"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getOrderById } from "@/server.actions/service orders/orders.actions";
import { handlePostPurchase } from "@/server.actions/service orders/post-purchase.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle, MessageSquare, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function OrderConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const paymentRef = searchParams.get("ref");

  useEffect(() => {
    async function initializeOrder() {
      try {
        // Get order details
        const orderData = await getOrderById(params.orderId);
        setOrder(orderData);

        // Handle post-purchase setup (chat room, notifications)
        if (paymentRef) {
          await handlePostPurchase(params.orderId, paymentRef);
        } else {
          await handlePostPurchase(params.orderId);
        }
      } catch (error) {
        console.error("Error initializing order:", error);
      } finally {
        setLoading(false);
      }
    }

    initializeOrder();
  }, [params.orderId, paymentRef]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) return <div>Order not found</div>;

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Order Reference */}
            <div className="text-center">
              <p className="text-lg mb-2">Order Reference:</p>
              <Badge variant="secondary" className="text-xl px-4 py-2">
                #{params.orderId.slice(0, 8)}
              </Badge>
            </div>

            {/* Order Details */}
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <h3 className="font-semibold">Order Details:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Service:</div>
                <div>{order.service?.name}</div>
                <div>Amount:</div>
                <div>
                  {order.totalAmount} {order.currency}
                </div>
                <div>Payment Method:</div>
                <div>{order.paymentMethod}</div>
                <div>Status:</div>
                <div>
                  <Badge>{order.status}</Badge>
                </div>
              </div>
            </div>

            {/* Next Steps Info */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Next Steps:</h3>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>
                  • A chat room has been created for communication with the
                  seller
                </li>
                <li>• You'll receive notifications about your order status</li>
                <li>
                  • You can track your order progress in the orders section
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mt-8">
              <Link href={`/orders/${params.orderId}`}>
                <Button className="w-full sm:w-auto">
                  View Order Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/messages">
                <Button variant="outline" className="w-full sm:w-auto">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Seller
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
