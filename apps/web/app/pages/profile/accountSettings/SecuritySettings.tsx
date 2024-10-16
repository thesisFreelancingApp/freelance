"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { User, Shield, Bell } from 'lucide-react'

export default function SecuritySettings() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">


      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex space-x-8">
            <div className="w-1/4">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/accountSettings')}>
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button variant="ghost" className="w-full justify-start font-bold" onClick={() => router.push('/security')}>
                  <Shield className="mr-2 h-4 w-4" /> Security
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/notifications')}>
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
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <p className="text-sm text-gray-500">
                    8 characters or longer. Combine upper and lowercase letters and numbers.
                  </p>
                  <Button className="bg-[hsl(var(--primary))] hover:bg-opacity-90 text-white">Save Changes</Button>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">PHONE VERIFICATION</h3>
                      <p className="text-sm text-gray-500">Your phone is not verified with Fiverr. Click Verify Now to complete phone verification</p>
                    </div>
                    <Button className="bg-[hsl(var(--primary))] hover:bg-opacity-90 text-white">Verify Now</Button>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Turn on to enhance the security of your account.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
