import { View, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { Image } from "expo-image";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { useAuth } from "~/lib/hooks/use-auth";
import { Link } from "expo-router";
import { Mail, Lock, ArrowRight } from "lucide-react-native";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading, handleGoogleSignIn } = useAuth();

  const handleLogin = async () => {
    const { error } = await signIn(email, password);
    if (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await handleGoogleSignIn();
    if (error) {
      console.error(error);
      // Handle error (show toast/alert)
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background p-4"
    >
      <View className="flex-1 justify-center">
        <Card className="bg-card">
          <CardHeader>
            <View className="items-center mb-4">
              <Image
                source={require("~/assets/images/WaiaHub-LogoIcon.svg")}
                className="w-20 h-20"
                contentFit="contain"
              />
              <Text className="text-2xl font-semibold mt-4">Sign in</Text>
            </View>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="bg-blue-600 h-12"
              onPress={handleGoogleLogin}
            >
              <View className="flex-row items-center space-x-2">
                <Image
                  source={require("~/assets/images/google.png")}
                  className="w-5 h-5"
                />
                <Text className="text-white font-semibold">
                  Continue with Google
                </Text>
              </View>
            </Button>

            <View className="flex-row items-center">
              <View className="h-[1px] flex-1 bg-border" />
              <Text className="mx-4 text-sm text-muted-foreground">or</Text>
              <View className="h-[1px] flex-1 bg-border" />
            </View>

            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-sm font-medium text-foreground">
                  Email
                </Text>
                <View className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-3 z-10 text-muted-foreground"
                  />
                  <Input
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="pl-10 h-12"
                  />
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-medium text-foreground">
                  Password
                </Text>
                <View className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3 top-3 z-10 text-muted-foreground"
                  />
                  <Input
                    placeholder="Your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="pl-10 h-12"
                  />
                </View>
              </View>

              <Link href="/(auth)/forgot-password" asChild>
                <Pressable className="py-2">
                  <Text className="text-sm text-right text-muted-foreground">
                    Forgot Password?
                  </Text>
                </Pressable>
              </Link>

              <Button onPress={handleLogin} className="h-12" disabled={loading}>
                <Text className="text-primary-foreground font-semibold">
                  {loading ? "Signing in..." : "Sign in"}
                </Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        <View className="flex-row justify-center mt-6">
          <Text className="text-muted-foreground">Don't have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <Pressable className="px-1">
              <Text className="text-primary font-semibold">Sign up</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
