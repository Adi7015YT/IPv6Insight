"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"

const ispData = [
  { name: "Jio", adoption: 78, fill: "hsl(var(--primary))" },
  { name: "Airtel", adoption: 65, fill: "hsl(var(--accent))" },
  { name: "Vi", adoption: 45, fill: "hsl(var(--secondary-foreground))" },
  { name: "BSNL", adoption: 30, fill: "hsl(var(--muted-foreground))" },
];

const cityData = [
    { name: "Delhi", adoption: 72 },
    { name: "Mumbai", adoption: 68 },
    { name: "Bangalore", adoption: 65 },
    { name: "Chennai", adoption: 62 },
    { name: "Kolkata", adoption: 55 },
];

const chartConfig: ChartConfig = {
  adoption: {
    label: "Adoption Rate (%)",
  },
} satisfies ChartConfig

export function RegionalStats() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Regional IPv6 Adoption</CardTitle>
        <CardDescription>Anonymized &amp; aggregated IPv6 adoption rates across India.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div>
          <h3 className="font-semibold mb-4">By Major ISP</h3>
          <ChartContainer config={chartConfig} className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ispData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis unit="%" />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="adoption" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div>
          <h3 className="font-semibold mb-4">By Major City</h3>
          <ChartContainer config={chartConfig} className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis unit="%" />
                 <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="adoption" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
