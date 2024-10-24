import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const LoginCard: React.FC = () => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="text-lg">Connexion</CardTitle>
                <CardDescription className="text-sm">
                    Entrez vos identifiants pour vous connecter
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid items-center w-full gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="nom@exemple.com"
                                type="email"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                defaultValue={"xxxxx"}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Se souvenir de moi
                            </Label>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
                <Button className="w-full font-bold text-black">
                    Se connecter
                </Button>
                <Link
                    href="#"
                    className="text-sm text-blue-500 hover:underline"
                >
                    Mot de passe oublié ?
                </Link>
            </CardFooter>
        </Card>
    );
};

export default LoginCard;
