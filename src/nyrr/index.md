---
title: "New York Road Runners 5K Participants"
toc: true
---

```js
const runners = FileAttachment("./data/nyrr.csv").csv({ typed: true })
```

```js

Plot.plot({
  overlap: 8,
  height: 700,
  width,
  marginLeft: 120,
  axis: null,
  x: {
    axis: "top",
    round: true
  },
  y: {
    domain: [0, d3.max(runners, d => d.value)]
  },
  color: {
    legend: true,
    label: "Number of runners",
    scheme: "purd"
  },
  fy: {
    domain: runners.map(d => d.name) // preserve input order
  },
  facet: {
    data: runners,
    y: "AgeGroup"
  },
  marks: [
    Plot.areaY(runners, {x: "Time", y: "Race", z: "AgeGroup", fill: "value", sort: "date"}),
    Plot.lineY(runners, {x: "Time", y: "Race", z: "AgeGroup", strokeWidth: 1, sort: "date"}),
    Plot.text(runners, Plot.selectFirst({x: d3.min(runners, d => d.Time), text: "AgeGroup", dx: -3, frameAnchor: "right"}))
  ]
})

```



```js

Plot.plot({
  height: 100 + new Set(traffic.map(d => d.name)).size * 100,
  width,
  marginBottom: 5,
  marginLeft: 120,
  x: {axis: "both"},
  y: {axis: null, range: [6 * 10 - 2, (2.5 - overlap) * 17 - 2]},
  fy: {label: null, domain: traffic.map(d => d.name)}, // preserve input order
  marks: [
    d3.groups(traffic, d => d.name).map(([, values]) => [
      Plot.areaY(values, {x: "date", y: "value", fy: "name", curve: "basis", sort: "date", fill: "#495867"}),
      Plot.lineY(values, {x: "date", y: "value", fy: "name", curve: "basis", sort: "date", strokeWidth: 1})
    ])
  ]
})

```