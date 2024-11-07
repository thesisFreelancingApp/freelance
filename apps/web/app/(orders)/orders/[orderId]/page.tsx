"use client";
import React, { useEffect, useState } from "react";
import { getOrderById } from "@/server.actions/service orders/orders.actions";
import {
  updateOrderStatus,
  handleRequirementsSubmission,
  handleOrderDelivery,
  handleRevisionRequest,
  addProgressUpdate,
} from "@/server.actions/service orders/post-purchase.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { OrderStatus } from "@prisma/client";
import { uploadImage } from "@/server.actions/uploadFiles.actions";
import Link from "next/link";
import {
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Upload,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [requirements, setRequirements] = useState("");
  const [requirementFiles, setRequirementFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [deliveryFiles, setDeliveryFiles] = useState<File[]>([]);
  const [revisionFiles, setRevisionFiles] = useState<File[]>([]);
  const [showRevisionForm, setShowRevisionForm] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);
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

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const result = await uploadImage(file);
        return result;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setUploadedFiles((prev) => [...prev, ...uploadedUrls]);
      return uploadedUrls;
    } catch (error) {
      console.error("Error uploading files:", error);
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  const handleRequirementsSubmit = async () => {
    try {
      await handleRequirementsSubmission(
        params.orderId,
        requirements,
        uploadedFiles,
      );
      await fetchOrder();
      setRequirements("");
      setUploadedFiles([]);
    } catch (error) {
      console.error("Error submitting requirements:", error);
    }
  };

  const handleDeliverySubmit = async () => {
    try {
      const fileUrls = await handleFileUpload(deliveryFiles);
      await handleOrderDelivery(params.orderId, deliveryMessage, fileUrls);
      await fetchOrder();
      setDeliveryMessage("");
      setDeliveryFiles([]);
    } catch (error) {
      console.error("Error delivering work:", error);
    }
  };

  const handleRevisionSubmit = async () => {
    try {
      const fileUrls = await handleFileUpload(revisionFiles);
      await handleRevisionRequest(params.orderId, revisionMessage, fileUrls);
      await fetchOrder();
      setRevisionMessage("");
      setRevisionFiles([]);
      setShowRevisionForm(false);
    } catch (error) {
      console.error("Error requesting revision:", error);
    }
  };

  const handleProgressUpdate = async () => {
    try {
      await addProgressUpdate(
        params.orderId,
        progressMessage,
        progressPercentage,
      );
      await fetchOrder();
      setProgressMessage("");
    } catch (error) {
      console.error("Error updating progress:", error);
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
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Update Progress</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressPercentage}
                    onChange={(e) =>
                      setProgressPercentage(Number(e.target.value))
                    }
                    className="w-full"
                  />
                </div>

                <Textarea
                  placeholder="Share progress update with buyer..."
                  value={progressMessage}
                  onChange={(e) => setProgressMessage(e.target.value)}
                  x
                  className="mb-4"
                />

                {order.progressUpdates && order.progressUpdates.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h4 className="font-medium text-sm">Previous Updates</h4>
                    {order.progressUpdates.map((update: any, index: number) => (
                      <div
                        key={index}
                        className="bg-background p-3 rounded-md text-sm"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">
                            {update.percentage}% Complete
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(update.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p>{update.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-4">
                  <Button
                    onClick={handleProgressUpdate}
                    disabled={!progressMessage || progressPercentage === 0}
                  >
                    Post Update
                  </Button>

                  {progressPercentage === 100 && (
                    <Button
                      variant="default"
                      onClick={() =>
                        handleStatusUpdate(
                          "DELIVERED",
                          "Work has been delivered",
                        )
                      }
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Mark as Delivered
                    </Button>
                  )}
                </div>
              </div>

              {order.deliveryDeadline && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Delivery Deadline</h3>
                  <div className="flex justify-between items-center">
                    <span>
                      {new Date(order.deliveryDeadline).toLocaleDateString()}
                    </span>
                    <Badge
                      variant={
                        isDeadlineNear(order.deliveryDeadline)
                          ? "destructive"
                          : "default"
                      }
                    >
                      {getTimeLeft(order.deliveryDeadline)}
                    </Badge>
                  </div>
                </div>
              )}
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
        case "ACCEPTED":
          return (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Submit Requirements</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  Please provide detailed requirements for your order. This will
                  help the seller deliver exactly what you need.
                </div>

                <Textarea
                  placeholder="Describe your requirements in detail..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="mb-4"
                  rows={6}
                />

                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium">
                    Attach Files (Optional)
                  </label>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) =>
                      e.target.files && handleFileUpload(e.target.files)
                    }
                  />
                  {isUploading && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                      Uploading files...
                    </div>
                  )}
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">
                      Attached Files:
                    </h4>
                    <ul className="space-y-1">
                      {uploadedFiles.map((url, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            File {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  onClick={handleRequirementsSubmit}
                  disabled={!requirements || isUploading}
                  className="w-full"
                >
                  Submit Requirements
                </Button>
              </div>
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

const isDeadlineNear = (deadline: Date) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const daysLeft = Math.ceil(
    (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysLeft <= 2;
};

const getTimeLeft = (deadline: Date) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const timeLeft = deadlineDate.getTime() - now.getTime();

  if (timeLeft <= 0) return "Deadline passed";

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );

  return `${days}d ${hours}h remaining`;
};
