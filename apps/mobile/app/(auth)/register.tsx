import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "expo-image";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { useAuth } from "~/lib/hooks/use-auth";
import { Link } from "expo-router";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Mail, Lock, User } from "lucide-react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signUp, loading } = useAuth();

  const handleRegister = async () => {
    const { error } = await signUp(email, password, name);
    if (error) {
      console.error(error);
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
              <Text className="text-2xl font-semibold mt-4">Sign up</Text>
              <Text className="text-muted-foreground text-center mt-2">
                Create an account to get started
              </Text>
            </View>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="bg-blue-600 h-12"
              onPress={() => {
                /* Handle Google Sign Up */
              }}
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
                  Name
                </Text>
                <View className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-3 z-10 text-muted-foreground"
                  />
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    className="pl-10 h-12"
                  />
                </View>
              </View>

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
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="pl-10 h-12"
                  />
                </View>
              </View>

              <Button
                onPress={handleRegister}
                className="h-12"
                disabled={loading}
              >
                <Text className="text-primary-foreground font-semibold">
                  {loading ? "Creating Account..." : "Create Account"}
                </Text>
              </Button>
            </View>
          </CardContent>
        </Card>

        <View className="flex-row justify-center mt-6">
          <Text className="text-muted-foreground">
            Already have an account?{" "}
          </Text>
          <Link href="/(auth)" asChild>
            <Text className="text-primary font-semibold">Sign in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
