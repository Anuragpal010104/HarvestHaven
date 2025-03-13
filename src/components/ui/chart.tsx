"use client"

import type * as React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

const chartConfig = {
  colors: [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
    "var(--chart-7)",
    "var(--chart-8)",
    "var(--chart-9)",
    "var(--chart-10)",
    "var(--chart-11)",
    "var(--chart-12)",
  ],
}

interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  xAxisKey: string
  yAxisKey: string
  height?: number
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  showGridLines?: boolean
  valueFormatter?: (value: number) => string
}

export function LineChart({
  data,
  xAxisKey,
  yAxisKey,
  height = 300,
  showXAxis = false,
  showYAxis = false,
  showLegend = false,
  showTooltip = false,
  showGridLines = false,
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: LineChartProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
          {showXAxis && (
            <XAxis
              dataKey={xAxisKey}
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
          )}
          {showYAxis && (
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={valueFormatter}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">{xAxisKey}</span>
                          <span className="font-bold text-muted-foreground">{payload[0].payload[xAxisKey]}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">{yAxisKey}</span>
                          <span className="font-bold">{valueFormatter(payload[0].payload[yAxisKey])}</span>
                        </div>
                      </div>
                    </div>
                  )
                }

                return null
              }}
            />
          )}
          {showLegend && <Legend />}
          <Line type="monotone" dataKey={yAxisKey} stroke="var(--primary)" strokeWidth={2} activeDot={{ r: 8 }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  xAxisKey: string
  yAxisKey: string
  height?: number
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  showGridLines?: boolean
  valueFormatter?: (value: number) => string
  layout?: "horizontal" | "vertical"
}

export function BarChart({
  data,
  xAxisKey,
  yAxisKey,
  height = 300,
  showXAxis = false,
  showYAxis = false,
  showLegend = false,
  showTooltip = false,
  showGridLines = false,
  valueFormatter = (value: number) => `${value}`,
  layout = "horizontal",
  className,
  ...props
}: BarChartProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={data}
          layout={layout}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
          {showXAxis && (
            <XAxis
              dataKey={layout === "horizontal" ? xAxisKey : undefined}
              type={layout === "horizontal" ? "category" : "number"}
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={layout === "horizontal" ? undefined : valueFormatter}
            />
          )}
          {showYAxis && (
            <YAxis
              dataKey={layout === "vertical" ? xAxisKey : undefined}
              type={layout === "vertical" ? "category" : "number"}
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={layout === "vertical" ? undefined : valueFormatter}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">{xAxisKey}</span>
                          <span className="font-bold text-muted-foreground">{payload[0].payload[xAxisKey]}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">{yAxisKey}</span>
                          <span className="font-bold">{valueFormatter(payload[0].payload[yAxisKey])}</span>
                        </div>
                      </div>
                    </div>
                  )
                }

                return null
              }}
            />
          )}
          {showLegend && <Legend />}
          <Bar dataKey={yAxisKey} fill="var(--primary)" radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  height?: number
  showLegend?: boolean
  showTooltip?: boolean
  valueFormatter?: (value: number) => string
}

export function PieChart({
  data,
  height = 300,
  showLegend = false,
  showTooltip = false,
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: PieChartProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[0].name}</span>
                        <span className="font-bold">{valueFormatter(payload[0].value as number)}</span>
                      </div>
                    </div>
                  )
                }

                return null
              }}
            />
          )}
          {showLegend && <Legend />}
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            innerRadius="60%"
            outerRadius="80%"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartConfig.colors[index % chartConfig.colors.length]} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any[]
  xAxisKey: string
  yAxisKey: string
  height?: number
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  showGridLines?: boolean
  valueFormatter?: (value: number) => string
}

export function AreaChart({
  data,
  xAxisKey,
  yAxisKey,
  height = 300,
  showXAxis = false,
  showYAxis = false,
  showLegend = false,
  showTooltip = false,
  showGridLines = false,
  valueFormatter = (value: number) => `${value}`,
  className,
  ...props
}: AreaChartProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          {showGridLines && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />}
          {showXAxis && (
            <XAxis
              dataKey={xAxisKey}
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
          )}
          {showYAxis && (
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={valueFormatter}
            />
          )}
          {showTooltip && (
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">{xAxisKey}</span>
                          <span className="font-bold text-muted-foreground">{payload[0].payload[xAxisKey]}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">{yAxisKey}</span>
                          <span className="font-bold">{valueFormatter(payload[0].payload[yAxisKey])}</span>
                        </div>
                      </div>
                    </div>
                  )
                }

                return null
              }}
            />
          )}
          {showLegend && <Legend />}
          <Area type="monotone" dataKey={yAxisKey} stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

