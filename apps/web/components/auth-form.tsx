"use client";
// a component that is used to sign in and sign up users
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BriefcaseIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { authService } from "../lib/supabaseClient";

export function AuthFormComponent() {
    const [activeTab, setActiveTab] = useState("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [skill, setSkill] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await authService.signIn(email, password);
            router.push("/dashboard");
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await authService.signUp(email, password);

            setActiveTab("signin");
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        try {
            const ok = await authService.signInWithGoogle();
            console.log(ok);
            // if (ok){ router.push("/welcome")}
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome to FreelanceHub
                    </CardTitle>
                    <CardDescription className="text-center">
                        Sign in or create an account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signin">
                            <form onSubmit={handleSignIn}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signinEmail">
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <MailIcon className="absolute w-5 h-5 text-yellow-500 left-3 top-3" />
                                            <Input
                                                id="signinEmail"
                                                placeholder="m@example.com"
                                                type="email"
                                                className="pl-10"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signinPassword">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <LockIcon className="absolute w-5 h-5 text-yellow-500 left-3 top-3" />
                                            <Input
                                                id="signinPassword"
                                                type="password"
                                                className="pl-10"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full text-white bg-yellow-500 hover:bg-yellow-600"
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-4">
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleGoogleSignIn}
                                    >
                                        <FcGoogle className="w-4 h-4 mr-2" />
                                        Sign in with Google
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="signup">
                            <form onSubmit={handleSignUp}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <div className="relative">
                                            <UserIcon className="absolute w-5 h-5 text-yellow-500 left-3 top-3" />
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                className="pl-10"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signupEmail">
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <MailIcon className="absolute w-5 h-5 text-yellow-500 left-3 top-3" />
                                            <Input
                                                id="signupEmail"
                                                placeholder="m@example.com"
                                                type="email"
                                                className="pl-10"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signupPassword">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <LockIcon className="absolute w-5 h-5 text-yellow-500 left-3 top-3" />
                                            <Input
                                                id="signupPassword"
                                                type="password"
                                                className="pl-10"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="skill">
                                            Primary Skill
                                        </Label>
                                        <div className="relative">
                                            <BriefcaseIcon className="absolute w-5 h-5 text-yellow-500 left-3 top-3" />
                                            <Input
                                                id="skill"
                                                placeholder="e.g., Web Development"
                                                className="pl-10"
                                                value={skill}
                                                onChange={(e) =>
                                                    setSkill(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full text-white bg-yellow-500 hover:bg-yellow-600"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-4">
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={handleGoogleSignIn}
                                    >
                                        <FcGoogle className="w-4 h-4 mr-2" />
                                        Sign up with Google
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    {error && (
                        <p className="mt-2 text-sm text-red-500">{error}</p>
                    )}
                </CardContent>
                <CardFooter>
                    <p className="w-full mt-4 text-sm text-center text-gray-600">
                        By signing in or creating an account, you agree to our
                        Terms of Service and Privacy Policy.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
