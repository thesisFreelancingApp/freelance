import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "expo-image";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { useAuth } from "~/lib/hooks/use-auth";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, loading } = useAuth();

  const handleLogin = async () => {
    const { error } = await signIn(email, password);
    if (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView>
      <View className="flex-1 justify-center p-6">
        <View className="items-center mb-8">
          <Image
            source={require("~/assets/images/WaiaHub-LogoIcon.svg")}
            className="w-32 h-32"
            contentFit="contain"
          />
        </View>

        <Text className="text-3xl font-bold text-center mb-8">
          Welcome Back
        </Text>

        <View className="space-y-4">
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Link href="/(auth)/forgot-password" asChild>
            <Text className="text-primary text-right">Forgot password?</Text>
          </Link>

          <Button onPress={handleLogin} className="h-12" disabled={loading}>
            <Text className="text-primary-foreground font-semibold">
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </Button>

          <Link href="/(auth)/register" asChild>
            <Text className="text-primary font-semibold">Sign Up</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
