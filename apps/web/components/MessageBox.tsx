"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { sendMessage } from "@/server.actions/message.actions";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface MessageBoxProps {
  receiverId: string;
  receiverName: string;
  receiverProfilePic: string;
}

export function MessageBox({
  receiverId,
  receiverName,
  receiverProfilePic,
}: MessageBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSending(true);
    try {
      await sendMessage(receiverId, message);
      setMessage("");
      setIsOpen(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        variant="outline"
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Contact Seller
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={receiverProfilePic} />
                <AvatarFallback>{receiverName[0]}</AvatarFallback>
              </Avatar>
              <span>Message {receiverName}</span>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[100px] resize-none transition-all duration-300 focus:ring-2 focus:ring-primary"
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSending}
                className="w-full transition-all duration-300 hover:bg-primary-dark"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <AnimatePresence>
        {showConfirmation && (
          <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
            <DialogContent className="sm:max-w-[425px] overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4 h-24 relative">
                      <motion.div
                        initial={{ x: -100, y: 50, rotate: -45 }}
                        animate={{ x: 100, y: -50, rotate: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        onAnimationComplete={() => setAnimationComplete(true)}
                        className="absolute"
                      >
                        <Send className="w-12 h-12 text-primary" />
                      </motion.div>
                      <AnimatePresence>
                        {animationComplete && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute"
                          >
                            {[...Array(12)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ x: 0, y: 0 }}
                                animate={{
                                  x: Math.random() * 100 - 50,
                                  y: Math.random() * 100 - 50,
                                  opacity: 0,
                                }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                                className="absolute w-2 h-2 bg-primary rounded-full"
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <DialogTitle className="text-2xl font-bold mb-2 text-center">
                      Message Sent!
                    </DialogTitle>
                    <p className="mb-6 text-center text-gray-600">
                      Your message has been successfully delivered to{" "}
                      <span className="font-semibold">{receiverName}</span>.
                    </p>
                    <div className="flex flex-col w-full space-y-2">
                      <Button
                        onClick={() => router.push("/messages")}
                        className="w-full transition-all duration-300 hover:bg-primary-dark"
                      >
                        View All Messages
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button
                        onClick={() => setShowConfirmation(false)}
                        variant="outline"
                        className="w-full transition-all duration-300 hover:bg-secondary"
                      >
                        Close
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
