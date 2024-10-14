"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Mail, Shield, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Account() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100">


      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex space-x-8">
            <div className="w-1/4">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/security')}>
                  <Shield className="mr-2 h-4 w-4" /> Security
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Business Information
                </Button>
              </nav>
            </div>

            <div className="w-3/4">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Need to update your public profile? <a href="#" className="text-green-500 hover:underline">Go to My Profile</a>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">FULL NAME</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">EMAIL</Label>
                    <Input id="email" defaultValue="j**********@gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="onlineStatus">ONLINE STATUS</Label>
                    <Select defaultValue="online">
                      <SelectTrigger>
                        <SelectValue placeholder="Select online status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="away">Away</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">When online, your Gigs are visible under the Online search filter.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>ACCOUNT DEACTIVATION</CardTitle>
                  <CardDescription>What happens when you deactivate your account?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">• Your profile and Gigs won't be shown on Fiverr anymore.</p>
                  <p className="text-sm">• Active orders will be cancelled.</p>
                  <p className="text-sm">• You won't be able to re-activate your Gigs.</p>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="deactivationReason">I'm leaving because...</Label>
                    <Select>
                      <SelectTrigger>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
