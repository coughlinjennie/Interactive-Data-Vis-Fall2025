---
#Jennie's First Lab
##Setting up the file
---

<!DOCTYPE html>
<head>
<title>Jennie's Lab 0</title>
</head>
<body>
<h1>Jennie's First Lab</h1>
<p>My goal this year was to build my running mileage back up to about 20 miles per week.</p>
<h2>Monthly Mileage 2025</h2>
<table>
  <tr>
    <th>Month</th>
    <th>Miles</th>
  </tr>
  <tr>
    <td>January</td>
    <td>30.6</td>
  </tr>
   <tr>
    <td>February</td>
    <td>29.6</td>
  </tr>
   <tr>
    <td>March</td>
    <td>49.4</td>
  </tr>
   <tr>
    <td>April</td>
    <td>40.1</td>
  </tr>
   <tr>
    <td>May</td>
    <td>46.6</td>
  </tr>
   <tr>
    <td>June</td>
    <td>42.2</td>
  </tr>
   <tr>
    <td>July</td>
    <td>57.7</td>
  </tr>
   <tr>
    <td>August</td>
    <td>68.6</td>
  </tr>
   <tr>
    <td>September</td>
    <td>52.4</td>
  </tr>
</table>
<img src="sneaker.jpg" alt="Running Sneakers" style="width:250px">
<h2>Training Notes</h2>
<ul>
      <li>Took 10 days off in September to let niggles simmer down</li>
      <li>Ran races in May, August and September: 5K, 5K, 1 mile</li>
      <li>Cut 4 minutes off my 5K time from May to August</li>
    </ul>

<H2>Predict my October mileage</h2>
<ul>
      <li>Two races in October, a 5K and 10K</li>
      <li>Goal is running 4-5 miles, 4-5 days a week</li>
      <li>One week might only have three days of running</li>
    </ul>
<form id="frm1" action="/action_page.php">
  First name: <input type="text" name="fname"><br>
  Prediction: <input type="text" name="miles"><br><br>
  <input type="button" onclick="myFunction()" value="Submit">
</form>

<script>
function myFunction() {
  document.getElementById("frm1").submit();
}
</script>
</body>

