"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { askQuestionAction } from "@/app/actions";
import { Bot, User, Sparkles, Send } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const formSchema = z.object({
  question: z.string().min(10, "Please ask a more detailed question."),
});

const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground" />
  </div>
);

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: values.question };
    setMessages((prev) => [...prev, userMessage]);
    form.reset();

    const result = await askQuestionAction({ question: values.question });

    if (result.success && result.answer) {
      const assistantMessage: Message = { id: crypto.randomUUID(), role: "assistant", content: result.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } else {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: result.error || "An unknown error occurred.",
      });
       setMessages((prev) => prev.slice(0, -1)); // Remove user message on failure
    }
    setIsLoading(false);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("question", suggestion);
    onSubmit({ question: suggestion });
  };

  return (
    <Card className="flex flex-col h-full max-h-[80vh] shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
             <AvatarFallback className="bg-accent text-accent-foreground">
              <Sparkles className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>IPv6 AI Assistant</CardTitle>
            <CardDescription>Ask me anything about IPv6!</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
         <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-sm text-muted-foreground p-4">
                <p>Examples:</p>
                <div className="mt-2 space-y-2">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleSuggestionClick("What is IPv6?")}>What is IPv6?</Button>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleSuggestionClick("Why does my connection still use IPv4?")}>Why does my connection still use IPv4?</Button>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 text-sm",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                 {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex justify-start gap-3 text-sm">
                <Avatar className="h-8 w-8">
                   <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5" /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start gap-2">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Textarea
                      placeholder="e.g., How does IPv6 improve security?"
                      className="resize-none"
                      rows={2}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
