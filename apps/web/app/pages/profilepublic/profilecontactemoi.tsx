import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type UserProfileCardProps = {
  firstName: string;
  lastName: string;
  username: string;
  profilePic: string;
};

export default function UserProfileCard({ firstName, lastName, username, profilePic }: UserProfileCardProps) {
  return (
    <Card className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <Avatar className="w-16 h-16 border-2 border-gray-200">
            <AvatarImage src={profilePic} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</AvatarFallback>
          </Avatar>
          <h2 className="mt-2 text-xl font-semibold text-gray-800">{firstName} {lastName}</h2>
          <p className="text-sm text-gray-500">Offline - 09:08 PM local time</p>
          <Button className="mt-4 w-full bg-gray-800 hover:bg-gray-700 text-white">
            Contact me
          </Button>
          <p className="mt-2 text-xs text-gray-500">Average response time: 1 hour</p>
        </div>
      </CardContent>
    </Card>
  );
}