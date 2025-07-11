import { IPv6Check } from '@/components/ipv6-check';
import { RegionalStats } from '@/components/regional-stats';
import { AIAssistant } from '@/components/ai-assistant';
import { Network } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Network className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary">IPv6Insight</h1>
          </div>
          <p className="hidden text-sm text-muted-foreground md:block">Your guide to the next generation internet.</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline md:text-4xl">Is your network ready for the future?</h2>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">Check your IPv6 connectivity, explore regional adoption, and ask our AI anything about IPv6.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
          <div className="flex flex-col gap-8 lg:col-span-2">
            <IPv6Check />
            <RegionalStats />
          </div>
          <div className="lg:col-span-1">
            <AIAssistant />
          </div>
        </div>
      </main>
      
      <footer className="mt-16 border-t">
        <div className="container mx-auto flex flex-col items-center justify-center gap-1 px-4 py-6 text-center text-sm text-muted-foreground md:px-6">
          <p>&copy; {new Date().getFullYear()} IPv6Insight. All rights reserved.</p>
          <p>Raising awareness for a faster, more secure internet.</p>
        </div>
      </footer>
    </div>
  );
}
