"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface TalentSpecializationChartProps {
  data: { name: string; value: number }[]
}

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
  "hsl(var(--card))"
]

export function TalentSpecializationChart({ data = [] }: TalentSpecializationChartProps) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Talent Specializations</CardTitle>
        <CardDescription>Distribution of talent specializations</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-4">
        <ChartContainer
          config={{
            specialization: {
              label: "Specialization",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[300px] w-full min-w-0"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="hsl(var(--primary))"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

