"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with a custom shape"

const chartData = [
  { browser: "safari", visitors: 60, fill: "#38ff7e" },
]
const data = [
        { name: 'A', x: 1, fill: "fff" },

    ];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "#ffff",
  },
} satisfies ChartConfig

export function ChartRadialShape() {
  return (
    <div className="flex flex-col">
     
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-24 sm:w-28 md:w-32 aspect-square"
        >
          <RadialBarChart
            data={chartData}
            endAngle={270}
            innerRadius={40}
            outerRadius={60}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-transparent last:fill-transparent"
              polarRadius={[66, 54]}
            />
            <RadialBar dataKey="visitors" cornerRadius={8} fill={chartData[0].fill} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl  font-bold"
                          fill="#ffffff"
                        >
                          {chartData[0].visitors.toLocaleString()+"/100"}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          fill="#ffffff"
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
           {/* <RadialBarChart width={500} 
            height={500} data={data}>
            <RadialBar  dataKey="x" />
        </RadialBarChart> */}
    </div>
  )
}
