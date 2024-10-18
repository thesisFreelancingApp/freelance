"use client";

import { Bell, Mail, Shield, Upload, User } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Component() {
  const [avatarSrc, setAvatarSrc] = React.useState(
    "/placeholder.svg?height=100&width=100",
  );

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row">
        <aside className="w-full bg-white border-r border-gray-200 sm:w-64 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4">
            <div className="flex items-center mb-6 space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={avatarSrc} alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </div>
            <nav className="space-y-2">
              <Button variant="ghost" className="justify-start w-full">
                <User className="w-4 h-4 mr-2" />
                Account
              </Button>
              <Button asChild variant="ghost" className="justify-start w-full">
                <Link href="/security">
                  <Shield className="w-4 h-4 mr-2" />
                  Security
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start w-full">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" className="justify-start w-full">
                <Mail className="w-4 h-4 mr-2" />
                Business Information
              </Button>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <Tabs defaultValue="general" className="w-full">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="deactivation">
                  Account Deactivation
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account settings and set email preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={avatarSrc} alt="User avatar" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Input
                              type="file"
                              className="hidden"
                              onChange={handleAvatarChange}
                              accept="image/*"
                              id="avatar-upload"
                            />
                            <Label
                              htmlFor="avatar-upload"
                              className="cursor-pointer"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Change Avatar
                            </Label>
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full name</Label>
                        <Input id="fullName" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          defaultValue="j**********@gmail.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="onlineStatus">Online status</Label>
                        <Select defaultValue="online">
                          <SelectTrigger id="onlineStatus">
                            <SelectValue placeholder="Select online status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="away">Away</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          When online, your Gigs are visible under the Online
                          search filter.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="deactivation">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Deactivation</CardTitle>
                    <CardDescription>
                      What happens when you deactivate your account?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul className="pl-5 space-y-2 list-disc">
                      <li className="text-sm">
                        Your profile and Gigs won&apos;t be shown on Fiverr
                        anymore.
                      </li>
                      <li className="text-sm">
                        Active orders will be cancelled.
                      </li>
                      <li className="text-sm">
                        You won&apos;t be able to re-activate your Gigs.
                      </li>
                    </ul>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="deactivationReason">
                        I&apos;m leaving because...
                      </Label>
                      <Select>
                        <SelectTrigger id="deactivationReason">
                          <SelectValue placeholder="Choose a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reason1">Reason 1</SelectItem>
                          <SelectItem value="reason2">Reason 2</SelectItem>
                          <SelectItem value="reason3">Reason 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="destructive">Deactivate Account</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
