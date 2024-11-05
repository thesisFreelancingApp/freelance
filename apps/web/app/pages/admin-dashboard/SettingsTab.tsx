import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SettingsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>
          Manage global platform settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Platform Name</Label>
              <Input id="name" placeholder="Enter platform name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fee">Platform Fee (%)</Label>
              <Input id="fee" placeholder="Enter platform fee percentage" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="currency">Default Currency</Label>
              <Input id="currency" placeholder="Enter default currency" />
            </div>
            <Button>Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}