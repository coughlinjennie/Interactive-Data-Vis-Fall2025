---
title: "New York Road Runners 5K Participants"
toc: true
---

```js
const runners = FileAttachment("./data/nyrr.csv").csv({ typed: true })
```

```js
const couchK = new Date("2025-01-15T00:00:00Z");
```

```js
Plot.plot({
  height: 600,
  width: 1000,
  x: {reverse: true},
  marks: [
    Plot.ruleX(["00:30:00"]),
    Plot.dotX(runners, Plot.dodgeY({x: "Time", fill: "Gender", symbol: "square", r: 1.5, tip: true}))
  ]
})

```

```js
Plot.plot({
  height: 1600,
  width: 900,
  marginLeft: 90,
  x: {reverse: true},
  facet: {
    data: runners,
    y: "GenAge"
  },
  marks: [
    Plot.dotX(runners, Plot.dodgeY({x: "Time", fill: "Gender", symbol: "square", r: 1}))
  ]
})

```


y: { domain: ["WU20", "MU20", "W20-24", "M20-24", "W25-29", "M25-29", "W30-34", "M30-34", "W35-39", "M35-39", "W40-44", "M40-44", "W45-49", "M45-49", "W50-54", "M50-54", "W55-59", "M55-59", "W60-64", "M60-64", "W65-69", "M65-69", "W70-74", "M70-74", "W75-79", "M75-79", "W80+", "M80+"]},

  
xAxis.tickValues(x.domain().filter((e,i)=>i%60==0));

```js
Plot.plot({
  height: 600,
  width:
  },
  marks:[
  Plot.waffleY(runners, Plot.groupX(
    y: "count", 
    x: "Time",
    unit: 100
    ))
  ]
)  
```


```js
Plot.plot({
  y: {grid: true},
  color: {legend: true},
  marks: [
    Plot.rectY(runners, Plot.binX({y: "count"}, {x: "Time", fill: "Gender"})),
    Plot.ruleY([0])
  ]
})

```