import React from "react";
import { TextInput, View, TextInputProps } from "react-native";
import { Text } from "./text";
import { cn } from "~/lib/utils";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <View className="mb-4">
        {label && (
          <Text className="text-sm font-medium mb-1.5 text-foreground">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={cn(
            "px-4 py-2 rounded-lg bg-background border border-input",
            error && "border-destructive",
            className
          )}
          placeholderTextColor="#666"
          {...props}
        />
        {error && (
          <Text className="text-sm text-destructive mt-1">{error}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";
