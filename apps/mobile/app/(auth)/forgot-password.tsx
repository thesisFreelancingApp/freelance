import { Image } from 'expo-image'
import { Link, router } from 'expo-router'
import { Mail } from 'lucide-react-native'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'
import { useAuth } from '~/lib/hooks/use-auth'

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('')
    const { resetPassword } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleResetPassword = async () => {
        setLoading(true)
        const { error } = await resetPassword(email)
        setLoading(false)

        if (error) {
            console.error(error)
        } else {
            router.replace('/(auth)')
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-background p-4"
        >
            <View className="flex-1 justify-center">
                <Card className="bg-card">
                    <CardHeader>
                        <View className="items-center mb-4">
                            <Image
                                source={require('~/assets/images/WaiaHive-LogoIcon.svg')}
                                className="w-20 h-20"
                                contentFit="contain"
                            />
                            <Text className="text-2xl font-semibold mt-4">
                                Reset Password
                            </Text>
                            <Text className="text-muted-foreground text-center mt-2">
                                Enter your email to receive a password reset
                                link
                            </Text>
                        </View>
                    </CardHeader>

                    <CardContent className="space-y-4">
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

                        <Button
                            onPress={handleResetPassword}
                            className="h-12"
                            disabled={loading}
                        >
                            <Text className="text-primary-foreground font-semibold">
                                {loading
                                    ? 'Sending Link...'
                                    : 'Send Reset Link'}
                            </Text>
                        </Button>

                        <View className="flex-row justify-center mt-4">
                            <Text className="text-muted-foreground">
                                Remember your password?{' '}
                            </Text>
                            <Link
                                href="/(auth)"
                                asChild
                            >
                                <Text className="text-primary font-semibold">
                                    Sign in
                                </Text>
                            </Link>
                        </View>
                    </CardContent>
                </Card>
            </View>
        </KeyboardAvoidingView>
    )
}
