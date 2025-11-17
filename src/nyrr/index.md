---
title: "New York Road Runners 5K Participants"
toc: true
---

```js
const runners = FileAttachment("./data/nyrr.csv").csv({ typed: true })
```

```js
Plot.plot({
  height: 720,
  axis: null,
  marks: [
    Plot.areaY(industries, {x: "date", y: "unemployed", fy: "industry"}),
    Plot.text(industries, Plot.selectFirst({text: "industry", fy: "industry", frameAnchor: "top-left", dx: 6, dy: 6})),
    Plot.frame()
  ]
})
```

```js
Plot.plot({
  aspectRatio: 1,
  x: {label: "Age (years)"},
  y: {
    grid: true,
    label: "← Women · Men →",
    labelAnchor: "center",
    tickFormat: Math.abs
  },
  marks: [
    Plot.dot(
      congress,
      Plot.stackY2({
        x: (d) => 2023 - d.birthday.getUTCFullYear(),
        y: (d) => d.gender === "M" ? 1 : -1,
        fill: "gender",
        title: "full_name"
      })
    ),
    Plot.ruleY([0])
  ]
})
```