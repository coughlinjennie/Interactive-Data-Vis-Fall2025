---
title: "Lab 3: Mayoral Mystery"
toc: false
---

<!-- Import Data -->

```js
const nyc = await FileAttachment("data/nyc.json").json();
const results = await FileAttachment("data/election_results.csv").csv({ typed: true });
const survey = await FileAttachment("data/survey_responses.csv").csv({ typed: true });
const events = await FileAttachment("data/campaign_events.csv").csv({ typed: true });


```


Our campaign spent a lot of time on GOTV efforts, and before the next campaign, we want to understand how effective they were and what improvements, if any, we should make to our approach. 


How many votes were left on the table? Turnout has been falling over the past several decades. One way to win a campaign is to reverse that, but we have to know if there are enough possible votes out there for that to be a viable strategy. Let's look at the votes our candidate got compared to the total votes cast and the number of registered voters in the district. 


```js

const allVotes = results.map(d => ({  ...d, votes_cast: d.votes_candidate + d.votes_opponent }))

```

```js

Plot.plot({
  width,
  height: 1200,
  x: {
    axis: "top",
    grid: true
  },
  y: {
    label: null,
  },
  color: { scheme: "dark2" },
  marks: [
    Plot.barX(allVotes, {
      x: "total_registered_voters",
      y: "boro_cd",
      stroke: "black",
      sort: { y: "-x" }
    }),
    Plot.barX(allVotes, {
      x: "votes_cast",
      y: "boro_cd",
      fill: "#ddd",
      insetTop: 2,
      insetBottom: 2
    }),
    Plot.barX(allVotes, {
      x: "votes_candidate",
      y: "boro_cd",
      fill: "blue",
      insetTop: 4,
      insetBottom: 4
    })
  ]
})

```

This shows there are plenty of votes available, especially in the most populated districts at the top of the list. But there is also a lot of variation among those. We need to better understand any patterns in the characteristics of districts that supported us, and how our GOTV efforts map onto our performance in each district. 


```js
const districts = topojson.feature(nyc, nyc.objects.districts)
display(districts)
```


```js
Plot.plot({
  projection: {
    domain: districts,
    type: "mercator",
  },
  marks: [
    Plot.geo(districts),
  ]
})
```



```js

// NYC geoJSON data
display(nyc)
// Campaign data (first 10 objects)
display(results.slice(0,10))
display(survey.slice(0,10))
display(events.slice(0,10))

```