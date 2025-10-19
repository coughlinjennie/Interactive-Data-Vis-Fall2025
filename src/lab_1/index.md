---
title: "Lab 1: Passing Pollinators"
toc: true
---


```js
const pollinators = FileAttachment("./data/pollinator_activity_data.csv").csv({ typed: true })
```

```js
Inputs.table(pollinators)
```

## Question 1: What is the body mass and wing span distribution of each pollinator species observed? 

```js
Plot.plot({
  marginLeft: 80,
  x: {label: "Frequency"},
  y: {label: null},
  color: {legend: true},
  marks: [
    Plot.barX(pollinators, {y: "pollinator_species", x: 1, inset: 0.5, fill: "avg_body_mass_g", sort: "avg_body_mass_g"}),
    Plot.ruleX([0])
  ]
})
```
Honeybees have the smallest average body mass, and there is no overlap with the other pollinators. Bumblebees are the next largest, and also largely don't overlap other pollinators. The one exception is an outlier carpenter bee that is notably smaller than the rest of its species, and falls within the bumblebee range.  

```js
Plot.plot({
  marginLeft: 80,
  x: {label: "Frequency"},
  y: {label: null},
  color: {legend: true},
  marks: [
    Plot.barX(pollinators, {y: "pollinator_species", x: 1, inset: 0.5, fill: "avg_wing_span_mm", sort: "avg_wing_span_mm"}),
    Plot.ruleX([0])
  ]
})
```
Wing spans show a little more overlap. The honeybees with the largest wing span will overlap with a few of the bumblebees with the shortest wing spans for their cohort. And about half the bumblebees have wing spans large enough to compare to the smallest third of the carpenter bees. 


## Question 2: What is the ideal weather (conditions, temperature, etc) for pollinating?

We'll start out looking at temperature. To control for differences in the locations, the results are faceted by which plot the plants are in. If you skip ahead to Question 3, you'll see that nectar production is heavily tied to the flower species, so to assess pollinating, we're going to focus on how many visits pollinators make to each site on that day. More visits = more success. 

```js

Plot.plot({
  height: 800,
  marginRight: 90,
  marginLeft: 110,
  grid: true,
  x: {nice: true},
  y: {inset: 5},
  color: {type: "categorical"},
  marks: [
    Plot.frame(),
    Plot.dot(pollinators, {
      x: "temperature",
      y: "visit_count",
      fy: "location",
      stroke: "pollinator_group",
      sort: {y: "-x", fy: "-x", reduce: "median"}
    })
  ]
})

```
The sites with the most visits all come in warmer weather. However, even on those days, there are a number of sites with fewer than five visits. That suggests other factors are at play. So we'll repeat the analysis, but this time looking at humidity. 

```js

Plot.plot({
  height: 800,
  marginRight: 90,
  marginLeft: 110,
  grid: true,
  x: {nice: true},
  y: {inset: 5},
  color: {type: "categorical"},
  marks: [
    Plot.frame(),
    Plot.dot(pollinators, {
      x: "humidity",
      y: "visit_count",
      fy: "location",
      stroke: "pollinator_group",
      sort: {y: "-x", fy: "-x", reduce: "median"}
    })
  ]
})

```

Here, we don't see a strong trend based on humidity. However, this view highlights something that wasn't as apparent when we looked at temperature. Plots A and C have fewer days with more than 10 visits. Perhaps looking at wind speed will shed more light on this. 

```js
Plot.plot({
  height: 800,
  marginRight: 90,
  marginLeft: 110,
  grid: true,
  x: {nice: true},
  y: {inset: 5},
  color: {type: "categorical"},
  marks: [
    Plot.frame(),
    Plot.dot(pollinators, {
      x: "wind_speed",
      y: "visit_count",
      fy: "location",
      stroke: "pollinator_group",
      sort: {y: "-x", fy: "-x", reduce: "median"}
    })
  ]
})
```

Here we have part of the answer: Visits are much higher with slower wind speeds, and Plots A and C appear to have more days where the wind speed exceeded 10. Now we'll look at vists by weather condition by location. 

```js
Plot.plot({
  height: 800,
  marginRight: 90,
  marginLeft: 110,
  grid: true,
  x: {nice: true},
  y: {inset: 5},
  color: {type: "categorical"},
  marks: [
    Plot.frame(),
    Plot.dot(pollinators, {
      x: "weather_condition",
      y: "visit_count",
      fy: "location",
      stroke: "pollinator_group",
      sort: {y: "-x", reduce: "median"}
    })
  ]
})
```
No real differences are apparent here. Based on the data provided, it appears days with warm weather and lower wind speeds are most likely to trigger more visits by pollinators. Since some plots appear to be prome to more higher wind speed days, this suggests that to maximize nectar production, the best sites will be ones where the terrain reduces the chances of high winds. 

## Question 3: Which flower has the most nectar production?

Sunflowers have the highest nectar production, with the bottom tail of their distribution higher than the top end production for either coneflowers or lavender.

```js
Plot.plot({
  y: {
    grid: true,
    inset: 6
  },
  marks: [
    Plot.boxY(pollinators, {x: "flower_species", y: "nectar_production"})
  ]
})
```
