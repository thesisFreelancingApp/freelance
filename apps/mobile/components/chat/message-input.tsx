import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Send } from "lucide-react-native";

interface MessageInputProps {
  onSend: (message: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <View className="flex-row items-center p-4 border-t border-border bg-background">
      <TextInput
        className="flex-1 px-4 py-2 bg-secondary rounded-full mr-2"
        placeholder="Type a message..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Pressable
        onPress={handleSend}
        className="w-10 h-10 rounded-full bg-primary items-center justify-center"
      >
        <Send size={20} className="text-primary-foreground" />
      </Pressable>
    </View>
  );
}
