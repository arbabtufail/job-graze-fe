'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface TalentAcquisitionChartProps {
  data: { month: string; activeProfilesCount: number }[];
}

export function TalentAcquisitionChart({ data }: TalentAcquisitionChartProps) {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Talent Acquisition</CardTitle>
        <CardDescription>Monthly talent acquisition trends</CardDescription>
      </CardHeader>
      <CardContent className='p-0 sm:p-4'>
        <ChartContainer
          config={{
            activeProfilesCount: {
              label: 'Acquisitions',
              color: 'hsl(var(--primary))',
            },
          }}
          className='h-[300px] w-full min-w-0'
        >
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey='month'
                tickMargin={10}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => value.substring(0, 3)}
              />
              <YAxis width={40} tick={{ fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type='monotone'
                dataKey='activeProfilesCount'
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: 'hsl(var(--primary))', opacity: 0.8 },
                }}
                style={
                  {
                    stroke: 'hsl(var(--primary))',
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
