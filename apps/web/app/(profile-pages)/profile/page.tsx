import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

export default function Component() {
    return (
        <div className="flex items-center justify-center min-h-80">
            <Card className="w-full max-w-md text-white bg-card border-zinc-800">
                <CardHeader className="flex flex-col items-center pb-2 space-y-4">
                    <Avatar className="w-20 h-20 bg-zinc-800">
                        <AvatarFallback className="text-3xl">A</AvatarFallback>
                    </Avatar>

                    <p className="text-sm text-zinc-400">
                        azyz.kabada@gmail.com
                    </p>
                </CardHeader>
                <CardContent className="pb-0 space-y-4">
                    <div className="pt-4 border-t border-zinc-800">
                        <h2 className="text-lg font-semibold">SETTINGS</h2>
                    </div>
                    <div className="pt-4 border-t border-zinc-800">
                        <h2 className="text-lg font-semibold">
                            BILLING INFORMATION
                        </h2>
                    </div>
                </CardContent>
                <CardFooter className="mt-4 border-t border-zinc-800">
                    <Button
                        variant="ghost"
                        className="w-full text-white hover:bg-zinc-800 hover:text-white"
                    >
                        LOGOUT
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
