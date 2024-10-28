"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initiatePaymentAction } from "@/server.actions/payment/generate.actions";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export default function PaymentTestPage() {
  const [formData, setFormData] = useState({
    amount: 10000,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "22777777",
    email: "john.doe@gmail.com",
    orderId: "1234657",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { payUrl } = await initiatePaymentAction(formData);
      window.location.href = payUrl; // Redirect to payment URL
    } catch (err) {
      setError("Failed to initiate payment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 mx-auto">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Payment Test Page</CardTitle>
          <CardDescription>
            Enter payment details to test the payment process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (in millimes)</Label>
              <Input
                id="amount"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Processing..." : "Test the Pay Now"}
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

//---------------------------------------------------------------------------------------------------
// Brand	                    Output	                  Number	              ExpDate	        CVC
//---------------------------------------------------------------------------------------------------
// Visa	                      Successful Payment	      4509211111111119	    12/26	          748
// MasterCard	                Successful Payment	      5440212711111110	    12/26	          665
//---------------------------------------------------------------------------------------------------
// MasterCard	                Failed Payment	          5471251111111116	    11/23	          858
//---------------------------------------------------------------------------------------------------
