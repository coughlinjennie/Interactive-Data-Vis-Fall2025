---
title: "New York Road Runners 5K Participants"
toc: true
---

```js
const runners = FileAttachment("./data/nyrr.csv").csv({ typed: true })
```



```js
Plot.plot({
  height: 600,
  width: 1200,
  x: {
    reverse: true,
    label: "Finish Time (Minutes)",
    transform: (t) => (t /60) // convert seconds to minutes
    },
  marks: [
    Plot.ruleX([1800], {stroke: "purple"}),
    Plot.ruleX([2563], {stroke: "purple"}),
    Plot.ruleX([3600], {stroke: "purple"}),
    Plot.ruleX([4800], {stroke: "purple"}),
    Plot.dotX(runners, Plot.dodgeY({x: "Time", fill: "Gender", symbol: "square", r: 1, tip: true}))
  ]
})

```



```js
Plot.plot({
  height: 1600,
  width: 1200,
  marginLeft: 90,
  x: {
    reverse: true,
    label: "Finish Time (Minutes)",
    transform: (t) => (t /60) // convert seconds to minutes
    },
  facet: {
    data: runners,
    y: "AgeGen"
  },
  marks: [
    Plot.ruleX([1800], {stroke: "purple"}),
    Plot.ruleX([2563], {stroke: "purple"}),
    Plot.ruleX([3600], {stroke: "purple"}),
    Plot.ruleX([4800], {stroke: "purple"}),
    Plot.dotX(runners, Plot.dodgeY({x: "Time", fill: "Gender", symbol: "square", r: 1}),
    )
  ]
})

```


```js
Plot.plot({
  y: {grid: true},
  x: {
    reverse: true,
    label: "Finish Time (Minutes)",
    transform: (t) => (t /60) // convert seconds to minutes
    },
  color: {legend: true},
  marks: [
    Plot.rectY(runners, Plot.binX({y: "count"}, {x: "Time", fill: "Gender"}, {tip: true})),
    Plot.ruleX([1800], {stroke: "purple"}),
    Plot.ruleX([2563], {stroke: "purple"}),
    Plot.ruleX([3600], {stroke: "purple"}),
    Plot.ruleX([4800], {stroke: "purple"})
  ]
})

```