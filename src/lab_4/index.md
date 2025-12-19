---
title: "New York Road Runners 5K Participants"
toc: false
---

```js
const runners = FileAttachment("./data/nyrr.csv").csv({ typed: true })
const groups = FileAttachment("./data/AgeGroups.csv").csv({ typed: true })
```

<div class="card" style="background-color: #E6E8E8; padding: 15px; width: 100%; box-sizing: border-box; display: block;">
  <h1 style="display: block; width: 100%; max-width: 100%; box-sizing: border-box; text-align: left; margin-bottom: 10px;">
    NYRR Race Results
  </h1> 
5K races are among the most common distance for road races. NYRR has fairly lenient time cutoffs for races, after it changed its policies in December 2022 to be more welcoming to back of the pack runners. Here, you can see how many runners would finish if various common running industry standards had applied. 
</div>

<div class="card" style="background-color: #E6E8E8; padding: 15px; width: 100%; box-sizing: border-box; display: block;">
  <h1 style="display: block; width: 100%; max-width: 100%; box-sizing: border-box; text-align: left; margin-bottom: 10px;">
    Results by Gender
  </h1> 

One thing to note here is that the number of runners registered as non-binary is fairly small, so it's harder to draw broad conclusions compared to the people registered in the men's and women's categories. There are also a small number of anonymous finishers, where the NYRR withholds age, gender and other details from the results to prevent people from being able to track those runners, like when Chelsea Clinton ran the marathon a few years ago. Those show up as nulls. 

```js
Plot.plot({
  marginLeft: 100,
  width: 900,
  y: {grid: true},
  x: {
    domain: [12, 90],
    reverse: true,
    label: "Finish Time (Minutes)",
    transform: (t) => (t /60) // convert seconds to minutes
    },
  color: {legend: true},
  marks: [
    Plot.rectY(runners, Plot.binX({y: "count"}, {x: "Time", fill: "Gender"}, {tip: true})),
    Plot.ruleX([1800], {stroke: "purple"}),
    Plot.ruleX([2052], {stroke: "purple"}),
    Plot.ruleX([2563], {stroke: "purple"}),
    Plot.ruleX([3600], {stroke: "purple"}),
    Plot.ruleX([4920], {stroke: "purple"}),
     Plot.tip(
      [`Road Runners Club of America coaching certification training states that 13:45 is the slowest pace people can run.`],
      {x: 2580, y: 11000, dy: -3, anchor: "top-right", fill: "white", fillOpacity: 0.8}),  
    Plot.tip(
      [`One hour is a common cutoff time for 5K races.`],
      {x: 3590, y: 12000, dy: -25, anchor: "bottom-left", fill: "white", fillOpacity: 0.8}),
    Plot.tip(
      [`NYRR's standard course time limit for 5K races is 82 minutes, or 20 minutes/mile plus 20 minutes.`],
      {x: 4870, y: 4000, dy: -3, anchor: "left", fill: "white", fillOpacity: 0.8}),
    Plot.tip(
      [`The last corral for NYRR races is all runners with a "best pace" that equates to 11:30 pace for a 10K race"`],
      {x: 2052, y: 4000, dy: -3, anchor: "left", fill: "white", fillOpacity: 0.8}),  
    Plot.tip(
      [`The beginner running program Couch25K trains runners to run for 30 minutes.`],
      {x: 1800, y: 20000, dy: -3, anchor: "top", fill: "white", fillOpacity: 0.8})
  ]
})

```

<div class="card" style="background-color: #E6E8E8; padding: 15px; width: 100%; box-sizing: border-box; display: block;">
  <h1 style="display: block; width: 100%; max-width: 100%; box-sizing: border-box; text-align: left; margin-bottom: 10px;">
    Results by Age Group
  </h1> 

When we look by Age Group instead, we can see that the younger age groups dominate the faster finishing times, and as times get slower, they are much more likely to be older runners. 

```js
Plot.plot({
  marginLeft: 100,
  width: 900,
  y: {grid: true},
  x: {
    domain: [12, 90],
    reverse: true,
    label: "Finish Time (Minutes)",
    transform: (t) => (t /60) // convert seconds to minutes
    },
  color: {legend: true},
  marks: [
    Plot.rectY(runners, Plot.binX({y: "count"}, {x: "Time", fill: "AgeGroup"}, {tip: true})),
    Plot.ruleX([1800], {stroke: "purple"}),
    Plot.ruleX([2052], {stroke: "purple"}),
    Plot.ruleX([2563], {stroke: "purple"}),
    Plot.ruleX([3600], {stroke: "purple"}),
    Plot.ruleX([4920], {stroke: "purple"}),
     Plot.tip(
      [`Road Runners Club of America coaching certification training states that 13:45 is the slowest pace people can run.`],
      {x: 2580, y: 11000, dy: -3, anchor: "top-right", fill: "white", fillOpacity: 0.8}),  
    Plot.tip(
      [`One hour is a common cutoff time for 5K races.`],
      {x: 3590, y: 12000, dy: -25, anchor: "bottom-left", fill: "white", fillOpacity: 0.8}),
    Plot.tip(
      [`NYRR's standard course time limit for 5K races is 82 minutes, or 20 minutes/mile plus 20 minutes.`],
      {x: 4870, y: 4000, dy: -3, anchor: "left", fill: "white", fillOpacity: 0.8}),
    Plot.tip(
      [`The last corral for NYRR races is all runners with a "best pace" that equates to 11:30 pace for a 10K race"`],
      {x: 2052, y: 4000, dy: -3, anchor: "left", fill: "white", fillOpacity: 0.8}),  
    Plot.tip(
      [`The beginner running program Couch25K trains runners to run for 30 minutes.`],
      {x: 1800, y: 20000, dy: -3, anchor: "top", fill: "white", fillOpacity: 0.8})
  ]
})

```


 <h1 style="display: block; width: 100%; max-width: 100%; box-sizing: border-box; text-align: left; margin-bottom: 10px;">
    Cutoff Standards by Gender
  </h1> 

Next, we look at how many people in each gender category would finish the 5K in the time allotted for each standard. 

For the 30 minutes allowed in the Couch25K program, there's a huge gap between the number of men who finished a 5K in that time vs. the number of women. Less than half the runners registered as women finished in less than 30 minutes. 
```js
Plot.plot({
  marginLeft: 90,
  color: { scheme: "accent", legend: true },
  x: {reverse: true, tip: true},
  marks: [
    Plot.barX(
      runners,
      Plot.groupY(
        { x: "count"},
        { fill: "C25K", y: "Gender", sort: { y: "x", reverse: true }, tip: true }
      )
    )
  ]
})
```

When New York Road Runners line runners up at the start, they are divided into corrals based on their "best pace," which is their fastest race result in the past year for a race 5K or longer, converted to a 10K equivalent time. Corral L, the last corral, is everybody with a best pace of 11:30 or slower. For a 5K race, that's a finishing time of about 34:15. There are 13 corrals, from AA to L, but the number of finishers who fall into the last corral is far higher than one-thirteenth of the total number of runners who competed. 
```js
Plot.plot({
  marginLeft: 90,
  color: { scheme: "accent", legend: true },
  x: {reverse: true, tip: true},
  marks: [
    Plot.barX(
      runners,
      Plot.groupY(
        { x: "count"},
        { fill: "Corral", y: "Gender", sort: { y: "x", reverse: true }, tip: true }
      )
    )
  ]
})

```

The next threshold is 42:43, which is a 13:45 pace. Road Runners Club of America coaching training materials state that 13:45 is the slowest pace people can physically run. This data set is people who completed road races, without getting into running vs. walking vs. run/walk intervals. While it's a smaller proportion of participants than the first two categories, there are still more than 10,000 runners who finished at a slower pace than the RRCA standard. 
```js
Plot.plot({
  marginLeft: 90,
  color: { scheme: "accent", legend: true },
  x: {reverse: true, tip: true},
  marks: [
    Plot.barX(
      runners,
      Plot.groupY(
        { x: "count"},
        { fill: "rrca", y: "Gender", sort: { y: "x", reverse: true }, tip: true }
      )
    )
  ]
})

```

One common 5K course time limit is an hour, which makes sense. It's a pace slightly faster than 20 minutes/mile, which allows walkers to participate too. Here, the vast majority of runners would be able to finish the race. 
```js
Plot.plot({
  marginLeft: 90,
  color: { scheme: "accent", legend: true },
  x: {reverse: true, tip: true},
  marks: [
    Plot.barX(
      runners,
      Plot.groupY(
        { x: "count"},
        { fill: "Hour", y: "Gender", sort: { y: "x", reverse: true }, tip: true }
      )
    )
  ]
})

```

In December 2022, NYRR made some changes to be more welcoming to slower runners. Now, the cutoff time for NYRR 5K races is typically 82 minutes, which is 20:00/mile plus 20 minutes. Under this standard, virtually everybody finishes. And, actually, since this is NYRR data, the few people who have slower times than the standard were still allowed to finish the race. Otherwise, they wouldn't show up in results. When the faster standards are in effect, the people who don't meet the standard often don't get an official finish time, or opt not to register for the race in the first place, rendering them invisible to the larger road racing community. 
```js
Plot.plot({
  marginLeft: 90,
  color: { scheme: "accent", legend: true },
  x: {reverse: true, tip: true},
  marks: [
    Plot.barX(
      runners,
      Plot.groupY(
        { x: "count"},
        { fill: "nyrr", y: "Gender", sort: { y: "x", reverse: true }, tip: true }
      )
    )
  ]
})

```