"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, TimeScale } from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import classNames from "classnames";
import { Sidebar } from "@/components/Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  CandlestickController,
  CandlestickElement
);

const tabListOptions = ["Chart","Options","News","Financials","Analysts","Risk Analysis","Releases","Notes","Profile"];

const candlestickDataSample = [
  { x: '2023-09-01', o: 400, h: 410, l: 398, c: 405 },
  { x: '2023-09-02', o: 405, h: 412, l: 403, c: 408 },
  { x: '2023-09-03', o: 408, h: 415, l: 406, c: 410 },
  { x: '2023-09-04', o: 410, h: 420, l: 408, c: 418 },
  { x: '2023-09-05', o: 418, h: 425, l: 415, c: 422 },
];

const rsiDataSample = {
  labels: candlestickDataSample.map(d => d.x),
  datasets: [
    {
      label: 'RSI',
      data: [45,50,55,60,65],
      borderColor: '#38ff7e', // primary accent
      fill: true,
      backgroundColor: 'rgba(56,255,126,0.25)',
      tension: 0.3,
    }
  ]
};

const StockDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>('Chart');
  const [orderType, setOrderType] = useState('Market Price');
  const [quantity, setQuantity] = useState(100);
  const [timeInForce, setTimeInForce] = useState('Day');
  const [stopPriceEnabled, setStopPriceEnabled] = useState(true);
  const [stopPrice, setStopPrice] = useState(400);
  const [tradeType, setTradeType] = useState<'Buy'|'Sell'>('Buy');

  const price = 406.32;
  const priceChange = +2.24;
  const priceChangePercent = +0.26;
  const afterHoursPrice = 406.83;
  const afterHoursChange = -0.27;
  const afterHoursPercent = -0.07;
  const buyingPower = 122_912.5;
  const transactionFees = 4;
  const estimatedTotal = quantity * price + transactionFees;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-6 max-w-7xl mx-auto gap-6">
      <Sidebar />
      <header className="flex justify-between items-center border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <img src="https://i.pravatar.cc/40" alt="User Avatar" className="rounded-full" />
          <div>
            <p className="text-lg font-semibold">James Raymond</p>
            <p className="text-sm text-gray-400">Account: 4453728992</p>
          </div>
        </div>
        <div className="flex items-center gap-8 text-center">
          <div>
            <p className="text-muted-foreground uppercase text-xs tracking-wide">Portfolio Balance</p>
            <p className="text-2xl font-semibold text-foreground">${623_098.17.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground uppercase text-xs tracking-wide">Available Funds</p>
            <p className="text-2xl font-semibold text-foreground">${122_912.5.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="search" placeholder="Search" className="bg-neutral-900 rounded-md text-white px-4 py-2 w-48 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400" />
        </div>
      </header>
  <Tabs value={activeTab} onValueChange={(v:string)=>setActiveTab(v)} className="border-b border-border mb-2">
        <TabsList>
          {tabListOptions.map(t => (
            <TabsTrigger key={t} value={t} className="text-xs">{t}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-9 flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="font-bold text-xl text-foreground">MSFT</span>{' '}<span className="text-muted-foreground">Microsoft Corp NASDAQ</span>
              <button aria-label="Alerts" className="ml-3 px-2 py-1 border border-border rounded text-muted-foreground hover:text-foreground transition-colors">🔔</button>
            </div>
            <div className="grid grid-cols-2 gap-x-6 text-xs w-[320px] text-muted-foreground">
              <div>
                <p>Open <span className="text-destructive">401.23</span></p>
                <p>Low <span className="text-destructive">400.10</span></p>
                <p>High <span className="text-primary">408.36</span></p>
                <p>52 wk high <span className="text-primary">430.82</span></p>
                <p>52 wk low <span className="text-muted-foreground">273.13</span></p>
              </div>
              <div>
                <p>Avg Vol (3M) <span className="text-primary">21.73M</span></p>
                <p>Shares Outstanding 7.43B</p>
                <p>Mkt Cap <span className="text-primary">3.02T</span></p>
                <p>Div Yield 0.74%</p>
                <p>View all <button className="text-primary hover:underline">▶</button></p>
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-4">
            <h1 className="text-5xl font-extrabold text-primary">{price.toFixed(2)}</h1>
            <div className="flex flex-col">
              <span className={classNames('text-sm',{ 'text-success':priceChange>0,'text-destructive':priceChange<0})}>{priceChange>0?'+':''}{priceChange.toFixed(2)}</span>
              <span className={classNames('text-xs',{ 'text-success':priceChangePercent>0,'text-destructive':priceChangePercent<0})}>{priceChangePercent>0?'+':''}{priceChangePercent.toFixed(2)}%</span>
            </div>
            <span className="text-xs ml-6">After hours: <span className={classNames(stopPriceEnabled?'text-destructive':'text-muted-foreground')}>{afterHoursPrice.toFixed(2)} {afterHoursChange>0?'+':''}{afterHoursChange.toFixed(2)} {afterHoursPercent>0?'+':''}{afterHoursPercent.toFixed(2)}%</span> | 19:59 04/26 EDT</span>
          </div>
          <div className="text-xs text-muted-foreground mb-2">Open <span className="text-primary">408.36</span> High <span className="text-primary">408.36</span> Low <span className="text-primary">408.36</span> Close <span className="text-primary">408.36</span> <span className="text-success">+8.90 +2.14%</span> Vol <span className="text-primary">56,254,781</span></div>
          <div className="rounded p-2 bg-card/60 backdrop-blur-sm border border-border shadow-sm">
            <Chart type="candlestick" data={{ datasets:[{ label:'MSFT', data: candlestickDataSample as any }] }} options={{ responsive:true, animation:{ duration:1000, easing:'easeInOutSine'}, scales:{ x:{ type:'time', time:{ unit:'day'}, grid:{ color:'#222'}, ticks:{ color:'#888'}}, y:{ grid:{ color:'#222'}, ticks:{ color:'#888'}}}, plugins:{ legend:{ display:false}, tooltip:{ mode:'index', intersect:false}}}} height={350} />
          </div>
          <div className="rounded p-2 mt-2 bg-card/60 backdrop-blur-sm border border-border shadow-sm">
            <Chart type="line" data={rsiDataSample} options={{ responsive:true, animation:{ duration:1200, easing:'easeInOutQuart'}, scales:{ y:{ min:0, max:100, ticks:{ color:'#666'}, grid:{ drawTicks:false, color:'#222'}}, x:{ ticks:{ color:'#666'}, grid:{ drawTicks:false, color:'#222'}}, }, plugins:{ legend:{ labels:{ color:'#38ff7e'} }}}} height={120} />
          </div>
        </section>
        <aside className="col-span-3 flex flex-col gap-6">
          <div className="rounded p-4 flex flex-col gap-4 bg-card/70 backdrop-blur-sm border border-border shadow-sm">
            <div className="flex justify-between items-center text-lg font-semibold border-b border-border pb-2"><h2 className="text-foreground">Trade</h2><button aria-label="More options" className="text-muted-foreground hover:text-foreground transition-colors">≡</button></div>
            <Tabs value={tradeType} onValueChange={(v:string)=>setTradeType(v as 'Buy'|'Sell')}>
              <TabsList>
                <TabsTrigger value="Buy" className="grow">Buy</TabsTrigger>
                <TabsTrigger value="Sell" className="grow">Sell</TabsTrigger>
              </TabsList>
              <TabsContent value="Buy" className="flex flex-col gap-4">
              <div>
                <label htmlFor="order-type" className="block text-sm mb-1 text-muted-foreground">Order Type</label>
                <Select onValueChange={(v:string)=>setOrderType(v)} defaultValue={orderType}>
                  <SelectTrigger id="order-type" className="w-full"><SelectValue placeholder="Select order type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Market Price">Market Price</SelectItem>
                    <SelectItem value="Limit Order">Limit Order</SelectItem>
                    <SelectItem value="Stop Order">Stop Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="quantity" className="flex text-sm mb-1 items-center gap-1 text-muted-foreground">Quantity <span className="text-xs text-primary cursor-pointer">Shares</span></label>
                <Select onValueChange={(v:string)=>setQuantity(Number(v))} value={quantity.toString()}>
                  <SelectTrigger id="quantity" className="w-full"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[10,50,100,500,1000].map(q=> <SelectItem key={q} value={q.toString()}>{q}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div className="flex gap-2 mt-2">
                  {[10,50,100,500].map(val => <Button key={val} variant="outline" size="sm" onClick={()=>setQuantity(val)} className="grow">{val}</Button>)}
                </div>
              </div>
              <div>
                <label htmlFor="time-in-force" className="block text-sm mb-1 text-muted-foreground">Time-in-Force</label>
                <Select onValueChange={(v:string)=>setTimeInForce(v)} defaultValue={timeInForce}>
                  <SelectTrigger id="time-in-force" className="w-full"><SelectValue placeholder="Select Time-in-Force" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Day">Day</SelectItem>
                    <SelectItem value="GTC">Good Till Cancel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="stop-price" checked={stopPriceEnabled} onCheckedChange={setStopPriceEnabled} className="bg-cyan-600" />
                <label htmlFor="stop-price" className="text-sm text-muted-foreground">Stop Price</label>
                {stopPriceEnabled && <Input type="number" className="w-28 text-right" value={stopPrice} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setStopPrice(Number(e.target.value))} min={0} step={0.01} />}
              </div>
              <p className="text-destructive text-xs">Est. Loss: <span className="font-semibold">{(quantity * (price - stopPrice)).toFixed(2)}</span></p>
              <div className="text-xs text-muted-foreground">
                <p>Buying Power <span className="float-right text-foreground">${buyingPower.toLocaleString()}</span></p>
                <p>Transaction Fees <span className="float-right text-foreground">${transactionFees.toFixed(2)}</span></p>
                <p>Estimated Total <span className="float-right text-primary">${estimatedTotal.toFixed(2)}</span></p>
              </div>
              <Button className="w-full bg-primary text-black hover:brightness-110 mt-4">Buy MSFT</Button>
              <p className="text-xs text-muted-foreground text-center mt-2 cursor-pointer">Disclaimer &gt;</p>
              </TabsContent>
              <TabsContent value="Sell" className="p-4 text-muted-foreground text-center">Sell functionality is under development.</TabsContent>
            </Tabs>
          </div>
          <div className="rounded p-4 bg-card/70 backdrop-blur-sm border border-border shadow-sm">
            <div className="flex justify-between items-center text-lg font-semibold border-b border-border pb-2"><h3 className="text-foreground">Time & Sales</h3><button aria-label="More options" className="text-muted-foreground hover:text-foreground transition-colors">≡</button></div>
            <table className="w-full text-xs mt-2">
              <thead>
                <tr className="text-muted-foreground border-b border-border"><th className="text-left">Time</th><th className="text-right">Price</th><th className="text-right">Volume</th></tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_,i)=>(<tr key={i} className="odd:bg-card/40"><td>16:59:32</td><td className="text-right text-primary">420.56</td><td className="text-right">25</td></tr>))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StockDashboard;
