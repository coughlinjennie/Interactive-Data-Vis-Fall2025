---
title: "Lab 3: Mayoral Mystery"
toc: true
---

<div class="card" style="background-color: #E6E8E8; padding: 15px; width: 100%; box-sizing: border-box; display: block;">
  <h1 style="display: block; width: 100%; max-width: 100%; box-sizing: border-box; text-align: left; margin-bottom: 10px;">
    Election Day is over. What did we learn?
  </h1> 
Our campaign spent a lot of time on GOTV efforts, and before the next campaign, we want to understand how effective they were and what improvements, if any, we should make to our approach. 
</div>

<!-- Import Data -->

```js
const nyc = await FileAttachment("data/nyc.json").json();
const results = await FileAttachment("data/election_results.csv").csv({ typed: true });
const survey = await FileAttachment("data/survey_responses.csv").csv({ typed: true });
const events = await FileAttachment("data/campaign_events.csv").csv({ typed: true });

```

```js

const allVotes = results.map(d => ({  ...d, votes_cast: d.votes_candidate + d.votes_opponent }))
const bin = d3.bin().thresholds([200, 300, 400, 500]);
```

```js
const allResults = allVotes.map(d =>({ ...d, vote_share: d.votes_candidate / d.votes_cast}))
```

<div class="card" style="background-color: #E6E8E8; padding: 15px; width: 100%; box-sizing: border-box; display: block;">
  <h1 style="display: block; width: 100%; max-width: 100%; box-sizing: border-box; text-align: left; margin-bottom: 10px;">
    Candidate votes vs. all votes cast vs. all registered voters
  </h1> 
  How many votes were left on the table? Turnout has been falling over the past several decades. One way to win a campaign is to reverse that, but we have to know if there are enough possible votes out there for that to be a viable strategy. Let's look at the votes our candidate got compared to the total votes cast and the number of registered voters in the district. 
${Plot.plot({
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
    Plot.axisX({anchor: "top"}),
    Plot.barX(allVotes, {
      x: "total_registered_voters",
      y: "boro_cd",
      channels: {"income": "median_household_income", "income bracket" : "income_category"},
      sort: {
        y: "-income"
      },
      stroke: "black"
    }),
    Plot.barX(allVotes, {
      x: "votes_cast",
      y: "boro_cd",
      fill: "#848385",
      insetTop: 2,
      insetBottom: 2
    }),
    Plot.barX(allVotes, {
      x: "votes_candidate",
      y: "boro_cd",
      fill: "#63C96E",
      insetTop: 4,
      insetBottom: 4
    })
  ]
})}
<h2><b>Insights</b></h2>
    <p style="margin-bottom: 15px; width: 100%; max-width: 100%; box-sizing: border-box;">
    The districts with the highest median household income typically had high turnout, but many more votes went to our opponent. As we moved down the list, turnout drops dramatically after those high-income districts. We typically got more of the votes cast, but a lot of voters stayed home. The lower the median income in the district, the better we do, both at turning out voters and capturing the votes of those who cast ballots. Still, the turnout was notably lower than in the richest districts. That suggests that we might have room to improve our margins in those districts by improving turnout. But we should compare results to our GOTV operation before we draw any conclusions. 
  </p>
  </div>


```js
const districts = topojson.feature(nyc, nyc.objects.districts)
```

```js
const resultsMap = new Map(allVotes.map(d => [d.boro_cd, d.gotv_doors_knocked]))
```

```js
const eventsMap = new Map(events.map(d => [d.boro_cd, d.income_category]))

```

<div class="card" style="background-color: #E6E8E8; padding: 15px; width: 100%; box-sizing: border-box; display: block;">
  <h1 style="display: block; width: 100%; max-width: 100%; box-sizing: border-box; text-align: left; margin-bottom: 10px;">
    Candidate votes vs. all votes cast vs. all registered voters
  </h1> 

${Plot.plot({
  // this projection is already zoomed into NYC
  projection: {
    domain: districts,
    type: "mercator",
    },
  color: {
        type: "diverging",
        scheme: "prgn", 
        legend: true, 
        pivot: .5,
        symmetric: true
      },   
  marks: [
    Plot.geo(districts, {
      fill: d => {
        const r = allResults.find(r => r.boro_cd === d.properties.BoroCD);
        return r ? r.vote_share : 0;
      },
      strokeWidth: 1.5,
      tip: {
      format: {
        d: false }
       },
      channels: {
        "District": d => d.properties.BoroCD,
        "Median Household Income:": d => results.find(r => r.boro_cd === d.properties.BoroCD)?.median_household_income ?? "N/A",
        "Income Category:": d => results.find(r => r.boro_cd === d.properties.BoroCD)?.income_category ?? "N/A",
        "Candidate Votes": d => results.find(r => r.boro_cd === d.properties.BoroCD)?.votes_candidate ?? 0,
        "Opponent Votes": d => results.find(r => r.boro_cd === d.properties.BoroCD)?.votes_opponent ?? 0,
      },
    }),
    Plot.dot(events, {
    x: "longitude", 
    y: "latitude", 
    r: "estimated_attendance", 
    stroke: "orange", 
    fill: "orange", 
    fillOpacity: 0.2,
    channels: {
    Event: "event_type",
    Date: "event_date",
    Attendance: "estimated_attendance"
    }}),
  ]
})}

<h2><b>Insights</b></h2>
    <p style="margin-bottom: 15px; width: 100%; max-width: 100%; box-sizing: border-box;">
    On Staten Island, the districts where we held events voted for us, and the one we didn't spend time in did not. Of course, that's also the one high-income district on Staten Island, and we know those are the areas where we performed the worst. Looking at the rest of the city, we see a few high-income districts — 104, 106, 302 and 411 — where we did a lot of events, but performed poorly. Since we see the opposite effect in Central Brooklyn and Bronx districts that are low-income, we can conclude the number of events, or their presence, is less of a factor than the income level of the district. Next time, we should focus our events in the low- and middle-income districts and minimize the time we spend in the high-income districts. If anything, trying to mobilize voters there might have been counterproductive since the high turnout there was against us.  
  </p>
  </div>



