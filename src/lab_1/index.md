---
title: "Lab 1: Prolific Pollinators"
toc: true
---
# Lab 1: Prolific Pollinators

```js
const pollinators = FileAttachment("./data/pollinator_activity_data.csv").csv({ typed: true })
```
## This is our pollinator data
```js
Inputs.table(pollinators)
```

## Question 1: What is the body mass and wing span distribution of each pollinator species observed? 

```js
Plot.plot({
  title: "Average body mass of pollinator species",
  subtitle: "See how distribution within the species compares to distribution between species",

  marginLeft: 80,
  x: {label: "Frequency"},
  y: {label: null},
  color: {legend: true},
  marks: [
    Plot.barX(pollinators, {y: "pollinator_species", x: 1, inset: 0.5, fill: "avg_body_mass_g", sort: "avg_body_mass_g", tip: true}),
    Plot.ruleX([0])
  ]
})
```
Honeybees have the smallest average body mass, and there is no overlap with the other pollinators. Bumblebees are the next largest, and also largely don't overlap other pollinators. The one exception is an outlier carpenter bee that is notably smaller than the rest of its species, and falls within the bumblebee range.  

```js
Plot.plot({
  title: "Average wing span of pollinator species",
  subtitle: "See how distribution within the species compares to distribution between species",

  marginLeft: 80,
  x: {label: "Frequency"},
  y: {label: null},
  color: {legend: true},
  marks: [
    Plot.barX(pollinators, {y: "pollinator_species", x: 1, inset: 0.5, fill: "avg_wing_span_mm", sort: "avg_wing_span_mm", tip: true}),
    Plot.ruleX([0])
  ]
})
```
Wing spans show a little more overlap. The honeybees with the largest wing span will overlap with a few of the bumblebees with the shortest wing spans for their cohort. And about half the bumblebees have wing spans large enough to compare to the smallest third of the carpenter bees. 


## Question 2: What is the ideal weather (conditions, temperature, etc) for pollinating?

If you skip ahead to Question 3, you'll see that nectar production is heavily tied to the flower species, so to assess pollinating, we're going to focus on how many visits pollinators make to each site on that day. More visits = more success. 

```js

Plot.plot({
  title: "Weather's impact on pollination",
  subtitle: "A look at how the temperature, wind speed and weather conditions correlate with the number of pollinator visits each day.",
  
  height: 300,
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
      y: "temperature",
      fill: "weather_condition",
      stroke: "weather_condition",
      r: "visit_count",
      tip: true,
      sort: {y: "-x", reduce: "median"}
    })
  ]
})

```
Warmer weather and slower wind speeds result in more pollinator visits, but the weather condition doesn't seem to make much of a difference beyond how it affects those two elements.  

## Question 3: Which flower has the most nectar production?

Sunflowers have the highest nectar production, with the bottom tail of their distribution higher than the top end production for either coneflowers or lavender.

```js
Plot.plot({
  title: "Nectar production",
  subtitle: "A look at how the flower species compare on nectar production",

  y: {
    grid: true,
    inset: 6
  },
  marks: [
    Plot.boxY(pollinators, {x: "flower_species", y: "nectar_production", fill: "flower_species", tip: true})
  ]
})
```
