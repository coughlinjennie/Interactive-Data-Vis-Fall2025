---
title: "New York Road Runners 5K Participants"
toc: false
---

```js
const runners = FileAttachment("./data/nyrr.csv").csv({ typed: true })
```

## 2025 Abbott Dash to the Finish Line 5K Results

5K races are among the most common distance for road races. The Dash to the Finish 5K, which has about 10,000 finishers each year, is one of the bigger 5K races in the country, and the biggest one New York Road Runners hosts each year. Because it is the day before the New York City Marathon, it is a common shakeout run for marathoners traveling to the city, and some years serves as the USATF 5K championship event. NYRR has fairly lenient time cutoffs for races, after it changed its policies in December 2022 to be more welcoming to back of the pack runners. Here, you can see how many runners would finish if various common running industry standards had applied. 

```js
Plot.plot({
  height: 600,
  width: 1200,
  x: {
    reverse: true,
    label: "Finish Time (Minutes)",
    transform: (t) => (t /60) // convert seconds to minutes
    },
  color: {
    range: ["#d50080" , "#0064ff" , "#6a0dad"],
    domain: ["W" , "M" , "X"], 
    legend: true
  },  
  marks: [
    Plot.tip(
      [`Road Runners Club of America coaching certification training states that 13:45 is the slowest pace people can run.`],
      {x: 2580, y: 80, dy: -3, anchor: "top-right", fill: "gray", fillOpacity: 0.2}),  
    Plot.tip(
      [`One hour is a common cutoff time for 5K races.`],
      {x: 3590, y: 80, dy: -25, anchor: "bottom-left", fill: "gray", fillOpacity: 0.2}),
    Plot.tip(
      [`NYRR's standard course time limit for 5K races is 82 minutes, or 20 minutes/mile plus 20 minutes.`],
      {x: 4870, y: 80, dy: -3, anchor: "left", fill: "gray", fillOpacity: 0.2}),
    Plot.ruleX([1800], {stroke: "#656566", strokeWidth: 3}),
    Plot.ruleX([2563], {stroke: "#656566", strokeWidth: 3}),
    Plot.ruleX([3600], {stroke: "#656566", strokeWidth: 3}),
    Plot.ruleX([4920], {stroke: "#656566", strokeWidth: 3}),
    Plot.dotX(runners, Plot.dodgeY({x: "Time", fill: "Gender", symbol: "square", r: 1, tip: true})),
    Plot.tip(
      [`The beginner running program Couch25K trains runners to run for 30 minutes.`],
      {x: 1800, y: 80, dy: -3, anchor: "top", fill: "gray", fillOpacity: 0.2})
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
  color: {
    range: ["#d50080" , "#0064ff" , "#6a0dad"],
    domain: ["W" , "M" , "X"], 
    legend: true
  },    
  facet: {
    data: runners,
    y: "AgeGen"
  },
  marks: [
    Plot.ruleX([1800], {stroke: "#656566"}),
    Plot.ruleX([2563], {stroke: "#656566"}),
    Plot.ruleX([3600], {stroke: "#656566"}),
    Plot.ruleX([4920], {stroke: "#656566"}),
    Plot.dotX(runners, Plot.dodgeY({x: "Time", fill: "Gender", symbol: "square", r: 1}),
    )
  ]
})

```


