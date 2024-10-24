import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Deactivation() {
  return (
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
            Your profile and Gigs won&apos;t be shown on Fiverr anymore.
          </li>
          <li className="text-sm">Active orders will be cancelled.</li>
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
  );
}
