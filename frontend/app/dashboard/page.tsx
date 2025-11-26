'use client'
import { ChartRadialShape } from "@/components/chart-radial-shape";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown, ArrowUp, BarChart, Car, Smile } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
 
import { ChartLineMultiple } from "@/components/chart-line-multiple";
import  GaugeComponent from 'react-gauge-component';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function Dashboard() {
  const chartData = [
    // use explicit bright green so it shows on dark/light backgrounds
    { browser: "safari", visitors: 200, fill: "#38ff7e" },
  ]


const WORD_SCALE = [
  { max: 20, word: "Fear" },
  { max: 40, word: "Fomo" },
  { max: 60, word: "Calm " },
  { max: 80, word: "Confident" },
  { max: 100, word: "Greedy" },
]

function valueToWord(v: number) {
  const item = WORD_SCALE.find(s => v <= s.max)
  return item ? item.word : `${v}` // fallback to number if out of range
}

// Helpers to produce lighter/darker tints for neumorphism shadows
function shadeHexColor(hex: string, percent: number) {
  // percent in range [-100, 100]
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) return hex
  const h = hex.startsWith('#') ? hex.slice(1) : hex
  const num = parseInt(h, 16)
  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  const t = percent < 0 ? 0 : 255
  const p = Math.min(100, Math.max(0, Math.abs(percent))) / 100
  const R = Math.round((t - r) * p) + r
  const G = Math.round((t - g) * p) + g
  const B = Math.round((t - b) * p) + b
  return `#${(1 << 24 | (R << 16) | (G << 8) | B).toString(16).slice(1)}`
}

function getNeumorphicInsetShadow(baseHex: string) {
  try {
    const dark = shadeHexColor(baseHex, -18)
    const light = shadeHexColor(baseHex, 22)
    return `inset 6px 6px 12px ${dark}, inset -6px -6px 12px ${light}`
  } catch {
    // fallback neutral inner shadows
    return 'inset 6px 6px 12px rgba(0,0,0,0.18), inset -6px -6px 12px rgba(255,255,255,0.25)'
  }
}

function hexToRGBA(hex: string, alpha: number) {
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) return `rgba(0,0,0,${alpha})`
  const h = hex.startsWith('#') ? hex.slice(1) : hex
  const num = parseInt(h, 16)
  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function readableTextColor(hex: string) {
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) return '#ffffff'
  const h = hex.startsWith('#') ? hex.slice(1) : hex
  const num = parseInt(h, 16)
  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  // relative luminance approximation
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 180 ? '#000000' : '#ffffff'
}

function getButtonTheme(baseHex: string) {
  const light = shadeHexColor(baseHex, 18)
  const dark = shadeHexColor(baseHex, -22)
  const gradient = `linear-gradient(145deg, ${light}, ${dark})`
  const outerShadow = `0 8px 16px ${hexToRGBA(dark, 0.35)}, 0 2px 4px ${hexToRGBA(dark, 0.25)}`
  const hoverShadow = `0 12px 24px ${hexToRGBA(light, 0.35)}, 0 4px 8px ${hexToRGBA(dark, 0.25)}, 0 0 0 2px ${hexToRGBA(baseHex, 0.25)}`
  const activeShadow = `inset 6px 6px 12px ${shadeHexColor(baseHex, -18)}, inset -6px -6px 12px ${shadeHexColor(baseHex, 22)}`
  const border = `1px solid ${hexToRGBA(dark, 0.4)}`
  const text = readableTextColor(baseHex)
  return { gradient, outerShadow, hoverShadow, activeShadow, border, text }
}

  const emotionalState = [
    {
      state: 'Emotional Balance',
      comparison: "0.50%",
      data: 67,
      increase: true,
      total :100
      
    },
    {
      state: 'FOMO Risk',
      comparison: "0.56%",
      data: 67,
      increase: false,
      total :100
    },
    {
      state: 'Decision Conf.',
      comparison: "50%",
      data: 67,
      increase: false,
      total :100
    
    },

  ]
  const tradesResults = [
    {
      Date: '8-10-25',
      Trades: 3,
      Lots: 2.23,
      Results: 6.36
    },
    {
      Date: '9-10-25',
      Trades: 4,
      Lots: 2.13,
      Results: 6.36
    },
    {
      Date: '10-10-25',
      Trades: 5,
      Lots: 4.70,
      Results: 6.36,
    },

  ]

const emotionalTaggingData = [
    { button: "Confident", Color: "#4CAF50" },  // Soft green
    { button: "Fearful",   Color: "#64B5F6" },  // Light blue
    { button: "Fomo",      Color: "#EF9A9A" },  // Soft red
    { button: "Cautious",  Color: "#FFD54F" },  // Warm yellow
    { button: "Patient",   Color: "#BA68C8" },  // Soft purple
    { button: "Excited",   Color: "#FF8A65" },  // Coral orange
    { button: "Greedy",    Color: "#AED581" },  // Light green
    { button: "Focused",   Color: "#4DB6AC" },  // Teal
    { button: "Anxious",   Color: "#FFB74D" },  // Amber
];


const patternReconitionData = [
  { pattern: "Patient Traders", occurrence: 5 },
  { pattern: "Fomo Traders", occurrence: 3 },
  { pattern: "Anxious Traders", occurrence: 4 },
];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex gap-4 p-5">
        <div className="flex-3/4 flex flex-col">
          <div className=" relative flex-3/4">
            <Card className=" h-full  px-5 ">
              <h1 className="text-2xl font-semibold flex items-center">
                <Smile className="mr-2 h-6 w-6 "  />
                Today's Emotional State
              </h1>
              <div className="flex flex-row justify-between">
                {emotionalState.map((element) => (
                  <Card key={element.state} className="flex relative gap-4 p-4 flex-row">
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="wrap-break-word whitespace-normal text-base leading-snug font-semibold">{element.state}</p>
                      {/* <p className="wrap-break-word whitespace-normal text-sm text-muted-foreground">{element.comparison} from yesterday</p> */}
                      <p className="wrap-break-word whitespace-normal text-sm text-muted-foreground flex gap-2">{element.increase ? (<ArrowUp className={'h-4 w-4 text-green-500'} />) : ( <ArrowDown className='h-4 w-4 text-red-500' />)} {element.comparison} from yesterday</p>
                    </div>
                    <div className="shrink-0 w-24 sm:w-28 md:w-32 flex items-center justify-center">
                      <ChartRadialShape />
                    </div>
                  </Card>
                ))}
              </div>
              <ChartLineMultiple/>
           
              </Card>
          </div >
          <Card className="flex-1/4 flex  flex-row gap-2 p-4">
            <Card className="flex-1">
              <CardHeader>Daily Summary</CardHeader>
              <Table>
                <TableCaption>A list of your recent Trades.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Dates</TableHead>
                    <TableHead>Trades</TableHead>
                    <TableHead>Lots</TableHead>
                    <TableHead className="text-right">Results</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow> */}

                  {tradesResults.map((trade)=>{
                    return (
                      <TableRow key={trade.Date}>
                        <TableCell className="font-medium">{trade.Date}</TableCell>
                        <TableCell>{trade.Trades}</TableCell>
                        <TableCell>{trade.Lots}</TableCell>
                        <TableCell className="text-right">{trade.Results}</TableCell>
                      </TableRow>
                    )
                  } )}
                </TableBody>
              </Table>
            </Card>
            <Card className="flex-1">
              <CardHeader>Emotions</CardHeader>
              <GaugeComponent
                value={10}
                type="radial"
                labels={{
                  valueLabel: {
                    formatTextValue: (v: number | string) => valueToWord(Number(v)),
                  },
                  tickLabels: {
                    type: "inner",
                    ticks: [
                      { value: 20 },
                      { value: 40 },
                      { value: 60 },
                      { value: 80 },
                      { value: 100 },
                    ],
                    // Cast to any to allow the formatter when types don't include it
                    formatTextValue: (v: number | string) => valueToWord(Number(v)),
                  } as any,
                }}
                arc={{
                  colorArray: ['#5BE12C', '#EA4228'],
                  subArcs: [
                    { limit: 20 },
                    { limit: 40 },
                    { limit: 60 },
                    { limit: 80 },
                    { limit: 100 },
                  ],
                  padding: 0.02,
                  width: 0.3,
                }}
                pointer={{
                  elastic: true,
                  animationDelay: 0,
                }}
              />
            </Card>
          </Card>
        </div>

        <Card className="flex-1/4 flex p-5">
          <Card className="flex-wrap">
            <CardHeader className="flex font-semibold"><BarChart/> Emotional Tagging</CardHeader>
            <CardContent className="grid grid-cols-3 gap-3">
              {emotionalTaggingData.map((item,index)=>{
                const theme = getButtonTheme(item.Color)
                return (
                  <Button
                    key={index}
                    style={{
                      background: theme.gradient,
                      boxShadow: theme.outerShadow,
                      border: theme.border,
                      color: theme.text,
                    }}
                    className="w-full rounded-3xl font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = theme.hoverShadow }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = theme.outerShadow }}
                    onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = theme.activeShadow }}
                    onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = theme.hoverShadow }}
                  >
                    {item.button}
                  </Button>
                )
              })}
            </CardContent>
          </Card>
          <Card className="flex-wrap">
            <CardHeader className="flex font-semibold"><Car/>Pattern Recognition</CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="font-semibold border-['1px'] rounded-lg  text-lg">
                    <TableHead>Emotional Impact </TableHead>
                    <TableHead>Last 30 Days</TableHead>
                  </TableRow>
                </TableHeader>
              {patternReconitionData.map((item,index)=>{
                return (
                  <TableBody className="" key={index}>
                    <TableRow>
                      <TableCell>{item.pattern}</TableCell>
                      <TableCell>{item.occurrence}</TableCell>
                    </TableRow>
                  </TableBody>
                )
              })}
              </Table>
            </CardContent>

          </Card>
          <div className="flex-wrap">
            <h1 className="text-xl text-semibold">Ai insights</h1>
          </div>
        </Card>
      </div>
    </div>
  );  
}
