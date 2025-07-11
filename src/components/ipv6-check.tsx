"use client";

import { useState, useCallback, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2, Globe, Server, PlayCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function IPv6Check() {
  const [isPending, startTransition] = useTransition();
  const [ipv4Address, setIpv4Address] = useState<string | null>(null);
  const [ipv6Address, setIpv6Address] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testRun, setTestRun] = useState(false);

  const handleCheck = useCallback(async () => {
    startTransition(async () => {
      setError(null);
      setIpv4Address(null);
      setIpv6Address(null);
      setTestRun(true);

      const ipv4Promise = fetch('https://api.ipify.org?format=json').then(res => {
        if (!res.ok) throw new Error('IPv4 check failed');
        return res.json();
      });

      const ipv6Promise = fetch('https://api64.ipify.org?format=json').then(res => {
        if (!res.ok) throw new Error('IPv6 check failed');
        return res.json();
      });

      const [ipv4Result, ipv6Result] = await Promise.allSettled([ipv4Promise, ipv6Promise]);

      if (ipv4Result.status === 'fulfilled') {
        setIpv4Address(ipv4Result.value.ip);
      }

      if (ipv6Result.status === 'fulfilled') {
        setIpv6Address(ipv6Result.value.ip);
      }
      
      if (ipv4Result.status === 'rejected' && ipv6Result.status === 'rejected') {
        setError("Could not connect to test servers. Please check your internet connection.");
      }
    });
  }, []);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">One-Click IPv6 Test</CardTitle>
        <CardDescription>Check if your device and network are using IPv6.</CardDescription>
      </CardHeader>
      <CardContent>
        {!testRun && !isPending && (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
            <PlayCircle className="w-16 h-16 text-primary mb-4" />
            <p className="text-muted-foreground mb-4">Click the button below to start the connectivity test.</p>
            <Button size="lg" onClick={handleCheck} disabled={isPending}>
              {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait</> : "Run IPv6 Test"}
            </Button>
          </div>
        )}

        {isPending && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="mr-4 h-8 w-8 animate-spin text-primary" />
            <span className="text-lg font-medium text-muted-foreground">Running tests...</span>
          </div>
        )}

        {testRun && !isPending && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Alert className={ipv6Address ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'}>
                {ipv6Address ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-orange-500" />}
                <AlertTitle className="font-bold flex items-center gap-2">
                  <Globe className="h-5 w-5" /> IPv6 Connection
                </AlertTitle>
                <AlertDescription>
                  {ipv6Address ? `Supported. Your IPv6 address is: ${ipv6Address}` : "Not supported or not configured."}
                </AlertDescription>
              </Alert>
              <Alert className={ipv4Address ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}>
                {ipv4Address ? <CheckCircle2 className="h-4 w-4 text-blue-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                <AlertTitle className="font-bold flex items-center gap-2">
                  <Server className="h-5 w-5" /> IPv4 Connection
                </AlertTitle>
                <AlertDescription>
                  {ipv4Address ? `Supported. Your IPv4 address is: ${ipv4Address}` : "Not supported. You may have an IPv6-only connection."}
                </AlertDescription>
              </Alert>
            </div>
            {error && <Alert variant="destructive"><XCircle className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}
            <div className="text-center pt-4">
              <Button onClick={handleCheck} disabled={isPending}>
                {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Re-running...</> : "Run Test Again"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
