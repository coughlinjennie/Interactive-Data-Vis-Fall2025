---
title: "Lab 2: Subway Staffing"
toc: true
---

# Subway Staffing

The NYC Transit Authority has collected operational data from their Manhattan subway stations and needs our help to make critical staffing decisions for next summer. They are planning for a busy event season in 2026 and want to ensure they have adequate staff at the right stations. 


```js
const incidents = FileAttachment("./data/incidents.csv").csv({ typed: true })
const local_events = FileAttachment("./data/local_events.csv").csv({ typed: true })
const upcoming_events = FileAttachment("./data/upcoming_events.csv").csv({ typed: true })
const ridership = FileAttachment("./data/ridership.csv").csv({ typed: true })
```


```js
const currentStaffing = {
  "Times Sq-42 St": 19,
  "Grand Central-42 St": 18,
  "34 St-Penn Station": 15,
  "14 St-Union Sq": 4,
  "Fulton St": 17,
  "42 St-Port Authority": 14,
  "Herald Sq-34 St": 15,
  "Canal St": 4,
  "59 St-Columbus Circle": 6,
  "125 St": 7,
  "96 St": 19,
  "86 St": 19,
  "72 St": 10,
  "66 St-Lincoln Center": 15,
  "50 St": 20,
  "28 St": 13,
  "23 St": 8,
  "Christopher St": 15,
  "Houston St": 18,
  "Spring St": 12,
  "Chambers St": 18,
  "Wall St": 9,
  "Bowling Green": 6,
  "West 4 St-Wash Sq": 4,
  "Astor Pl": 7
}
```

```js
const allTravel = ridership.map(d => ({  ...d, total: d.exits + d.entrances }))
const summerEvents = Array.from(new Set(local_events.map(d => d.date)))
const incidentStaff = incidents.map(d => ({  ...d, adj_speed: d.response_time_minutes / d.staffing_count }))
```

# Ridership Impacts
Before we can consider staffing questions, we need to understand ridership across the system and how external events affect it. 

<div class="card">
The stations we are examining are sorted from fewest typical entrances and exits at the top to most at the bottom. Some, such as Times Square, are similar colors across the summer, indicating few spikes. Others, such as 50 St, have some outliers marked by the notably darker cells than the rest of the row.
${Plot.plot({
  height: 800,
  width,
  marginLeft: 120,
  padding: 0,
  x: {ticks: d3.utcMonth.range(...d3.extent(ridership, (d) => d.date)),
    tickFormat: "%b" },
  y: {label: "Station"},
  color: {scheme: "pubugn"},
  marks: [
    Plot.cell(
      allTravel,
      Plot.group(
        {fill: "sum"},
        {x: "date", y: "station", fill: "total", tip: true, inset: 0.5, sort: {y: "fill"}},
      )
    )
  ]
})}
</div>

## Daily Variation

```js
const allStations = Array.from(new Set(ridership.map(d => d.station))) 
const selectedStation = view(Inputs.select(allStations))
```

<div class="card">
Beyond the notable outliers visible above, stations also vary in how their typical trip volume is distributed through the week. Canal Street has less traffic than most stations, and if you select it, you can see it also has lot of variation by day of the week. You also can see a general decline after the fare increase in July. 

Now look at Grand Central-42 St, which has many more people getting on and off there each day and also has less variation in that number day to day. It also seems to have fewer riders after the fare increase. But what's more interesting is that one big spike in the first half of July.   
${Plot.plot({
  height: 400,
  width,
  x: { ticks: d3.utcMonth.range(...d3.extent(ridership, (d) => d.date)),
    tickFormat: "%b" },
  y: { tickFormat: "s", grid: true },
  color: {
    scheme: "spectral",
    legend: true
  },
    marks: [
    Plot.areaY(allTravel.filter(d => d.station === selectedStation), {
      fill: "blue",
      x: "date",
      y: "total",
      z: "station",
      curve: "step",
    }),
    Plot.tip(
      [`The MTA raised subway fares on July 15.`],
      {x: new Date("2025-07-15"), y: 6000, dy: -3, anchor: "top"}
    ),
    Plot.ruleY([0])
  ]
})}

</div>

## Event Impacts

```js
const moreStations = Array.from(new Set(local_events.map(d => d.nearby_station))) 
const newStation = view(Inputs.select(moreStations))
```

<div class="card">
That July spike at Grand Central is an example of the effects special events have on nearby subway stations. In that case, two events that weekend caused a big spike in traffic. You can look at other stations and see the same pattern. 
${Plot.plot({
  height: 400,
  width,
  x: { ticks: d3.utcMonth.range(...d3.extent(ridership, (d) => d.date)),
    tickFormat: "%b" },
  y: { tickFormat: "s", grid: true },
  color: {
    scheme: "spectral",
    legend: true
  },
    marks: [
    Plot.lineY(allTravel.filter(d => d.station === newStation), {
      x: "date",
      y: "total",
      z: "station",
      stroke: "blue"
    }),
    Plot.dotX(local_events.filter(d => d["nearby_station"].includes(newStation)), {
      x: "date",
      fill: "purple",
      tip: true,
      channels: {
        "Event": "event_name", 
        "Attendance": "expected_attendance",
        "Station": "nearby_station"}})
  ]
})}

</div>



# Incident Response Times

<div class="card">
Penn Station has the fastest median response time of all the stations, and generally the stations with the fastest median response times also have the least variation in response time. Bowling Green has the slowest median response time, and that group of stations with the worst median response times (Canal Street, West 4-Washington Square, 125 St and 59 St-Columbus Circle) all have among the most variation in response times of all the stations.  
${Plot.plot({
  height: 800,
  marginLeft: 120,
  y: {
    inset: 6,
    label: "Station"
  },
  marks: [
    Plot.boxX(incidents, 
    {y: "station", x: "response_time_minutes" })
  ]
})
}

</div>


# Summer 2026 Staffing

<div class="card">
When we look ahead to 2026, we have to weigh the impact of a single event on a station vs. the number of nearby events across the season. Because the New York City Transit Authority is looking for staffing recommendations for the season, this recommendation prioritizes stations with more events, and in cases where it is close, the combined attendance of those events.  
${Plot.plot({
  marginLeft: 120,
  x: {
    axis: "top",
    grid: true,
  },
  color: {
    scheme: "set2",
  },
  marks: [
    Plot.ruleX([0]),
    Plot.barX(upcoming_events, {
      y: "nearby_station",
      x: "expected_attendance",
      fill: "expected_attendance",
      tip: true,
      sort: {y: "x", reverse: true}})
  ]
})}

Canal Street, 34 St-Penn Station and Chambers St have both the most events and the highest expected attendence for those events, so they would be the priority. Because we earlier noted that Canal Street has much less traffic in general than most stations and among the worst response times, it also would be the single biggest priority for more staffing on those dates. 

</div>

