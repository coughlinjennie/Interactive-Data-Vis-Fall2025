function _1(md){return(
md`# Custom theme elements for reuse in Observable Plot`
)}

function _2(md){return(
md`Whether making branded reports for your company or making consistently-styled charts for your personal blog, it can be useful to have custom theme elements on-hand for reuse in your Observable Plot charts.  

Here, we get you started with your own custom theme elements (color schemes, fonts, and logos) that you can quickly [import](https://observablehq.com/@observablehq/import) and use in other notebooks. `
)}

function _3(md){return(
md`---
## Before you start`
)}

function _4(md){return(
md`Fork this notebook to make a copy in your account so that your changes are saved. Your fork of this notebook can become a source document from which you import custom chart elements for use in other notebooks.

For easier reuse, [customize the URL](https://observablehq.com/@observablehq/custom-notebook-urls?collection=@observablehq/observable-tips-and-tricks) of your fork. Then, you can import the theme components you create here into any other notebook using your username and custom notebook slug:

~~~js
  import {componentName} from "@user/notebook-slug"
~~~
`
)}

function _5(md){return(
md`---
## Custom color schemes`
)}

function _6(md){return(
md`### Build a custom categorical palette
Update the colors in the array below to build your custom categorical palette. You can use [hexadecimal color codes](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color) or standard [color names](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color). `
)}

function _myCategoricalColors(){return(
["orange", "#56B4e9", "#009e73", "tomato", "steelblue", "#f0e442"]
)}

function _8(d3,myCategoricalColors)
{
  const div = d3.create('div')
    .style('display', 'flex')
  div.selectAll('div')
    .data(myCategoricalColors)
    .join('div')
    .style('width', 'auto')
    .style('padding', '5px')
    .style('margin', '2px')
    .style('border-radius', '2px')
    .style('background-color', d => d)
    .text(d => d).node()
  return div.node()
}


function _9(md){return(
md`To import your categorical color scheme into another notebook, use: 

~~~js
  import {myCategoricalColors} from "@user/notebook-slug"
~~~`
)}

function _10(md){return(
md`Then use your imported color scheme as the _range_ attribute for your Plot _color_ channel in any notebooks where the palette has been imported, as shown below:`
)}

function _11(Plot,cars,myCategoricalColors){return(
Plot.plot({
  marks: [
    Plot.dot(cars, {
      x: "power (hp)",
      y: "economy (mpg)",
      fill: "cylinders",
      r: 5
    })
  ],
  color: { range: myCategoricalColors } // Your custom color scheme here
})
)}

function _12(md){return(
md`### Build a custom continuous palette
Update the colors in the array below to build your custom continuous palette. You can use [hexadecimal color codes](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color) or standard [color names](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color). `
)}

function _myContinuousColors(){return(
["orange", "#9700ff"]
)}

function _14(d3,myContinuousColors)
{
  const div = d3.create('div')
    .style('display', 'flex')
  div.selectAll('div')
    .data(myContinuousColors)
    .join('div')
    .style('width', 'auto')
    .style('padding', '5px')
    .style('margin', '2px')
    .style('border-radius', '2px')
    .style('background-color', d => d)
    .text(d => d).node()
  return div.node()
}


function _15(md){return(
md`Here's a preview of your palette as a continuous gradient using the default d3.interpolateRgb interpolation:`
)}

function _16(Plot,myContinuousColors,d3){return(
Plot.plot({
  color: {
    type: "linear",
    range: myContinuousColors // uses d3.interpolateRgb
  },
  marks: [
    Plot.cell(d3.range(50), {x: d => d, fill: d => d})
  ],
  axis: null,
  height: 30,
  x: {padding: -0.1},
   width: 300
})
)}

function _17(md){return(
md`And using d3.interpolateHcl interpolation: `
)}

function _18(Plot,myContinuousColors,d3){return(
Plot.plot({
  color: {
    type: "linear",
    range: myContinuousColors, // uses d3.interpolateRgb
    interpolate: "hcl"
  },
  marks: [
    Plot.cell(d3.range(50), {x: d => d, fill: d => d})
  ],
  axis: null,
  height: 30,
  x: {padding: -0.1},
  width: 300
})
)}

function _19(md){return(
md`To import your continuous color scheme into another notebook, use: 

~~~js
  import {myContinuousColors} from "@user/notebook-slug"
~~~`
)}

function _20(md){return(
md`Then use your imported color scheme as the _range_ attribute for your Plot _color_ channel in any notebooks where the palette has been imported, as shown below:`
)}

function _21(Plot,cars,myContinuousColors){return(
Plot.plot({
  marks: [
    Plot.dot(cars, {
      x: "power (hp)",
      y: "economy (mpg)",
      fill: "economy (mpg)",
      r: 5
    })
  ],
  color: {
    range: myContinuousColors, // Your custom color scheme here
    interpolate: "hcl" 
  }
})
)}

function _22(md){return(
md`Learn more about colors in Observable Plot: 
- [Plot: Scales](https://observablehq.com/@observablehq/plot-scales)
- [Plot Cheatsheets - Colors](https://observablehq.com/@observablehq/plot-cheatsheets-colors)`
)}

function _23(md){return(
md`---
## Custom fonts`
)}

function _24(md){return(
md`### Import Google fonts
In an html cell, import one or more [Google fonts](https://fonts.google.com):`
)}

function _myGoogleFonts(htl){return(
htl.html`<style>
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
</style>`
)}

function _26(md){return(
md`The cell above is named _myGoogleFonts_ (with your cursor in that cell, you can see the name in the bar at the bottom of the browser). Import your custom font collection into other Observable notebooks using the cell name: 

~~~js
  import {myGoogleFonts} from "@user/notebook-slug"
~~~`
)}

function _27(md){return(
md`Once you’ve imported the stylesheet, you also need to call it in a JavaScript cell to insert it into the notebook: `
)}

function _28(myGoogleFonts){return(
myGoogleFonts
)}

function _29(md){return(
md`Then, you can then update fonts across an entire chart (as shown below, in the _style_ channel), or piecemeal for different elements (e.g. within a text mark):`
)}

function _30(Plot,alphabet){return(
Plot.plot({
  style: {fontFamily: "Lato"}, // Update with your imported Google font to change all in chart
  y: {
    grid: true,
    label: "↑ Frequency (%)",
    transform: (d) => d * 100
  },
  marks: [
    Plot.barY(alphabet, { x: "letter", y: "frequency" }),
    Plot.text(alphabet, {
      x: "letter",
      y: "frequency",
      text: (d) => (d.frequency * 100).toFixed(1),
      dy: -5
    }),
    Plot.ruleY([0])
  ]
})
)}

function _31(md){return(
md`### Downloaded fonts (.otf or .ttf)
Attach a font file in the notebook: `
)}

function _kalam(FileAttachment){return(
FileAttachment("Kalam-Regular.ttf")
)}

function _33(md){return(
md`Make it available as a style element (here, as font face “Kalam”):`
)}

async function _myDownloadedFonts(kalam,htl){return(
htl.html`<style>
  @font-face {
    font-family: Kalam;
    src: url('${await kalam.url()}');
}
</style>`
)}

function _35(md){return(
md`Import the style element (stored here as _myDownloadedFonts_) into another notebook to quickly reuse your downloaded font: 

~~~js
  import {myDownloadedFonts} from "@user/notebook-slug"
~~~`
)}

function _36(md){return(
md`Once you’ve imported the stylesheet, you also need to call it in a JavaScript cell to insert it into the notebook: `
)}

function _37(myDownloadedFonts){return(
myDownloadedFonts
)}

function _38(md){return(
md`The font is then available for use throughout your notebooks. The text mark font in the chart below is updated to Kalam.`
)}

function _39(Plot,alphabet){return(
Plot.plot({
  y: {
    grid: true,
    label: "↑ Frequency (%)",
    transform: (d) => d * 100
  },
  marks: [
    Plot.barY(alphabet, { x: "letter", y: "frequency" }),
    Plot.text(alphabet, {
      x: "letter",
      y: "frequency",
      text: (d) => (d.frequency * 100).toFixed(1),
      dy: -5,
      fontFamily: "Kalam",
      fontSize: 14,
      fill: "red",
      dy: -10
    }),
    Plot.ruleY([0])
  ]
})
)}

function _40(md){return(
md`---
## Add custom logos`
)}

function _41(md){return(
md`Want to add your organization’s logo to a chart? Instead of attaching it in all of your different notebooks, attach and customize your logo here, then import it into other notebooks for faster and easier reuse.`
)}

function _42(md){return(
md`Replace the file below with your logo (an image, or SVG):`
)}

function _logo(FileAttachment){return(
FileAttachment("observable-logo.png").url()
)}

function _44(md){return(
md`Then you can import the logo into other notebooks using: 

~~~js
  import {logo} from "@user/notebook-slug"
~~~`
)}

function _45(md){return(
md`Add your logo to Observable Plot charts using an image mark: `
)}

function _46(Plot,cars,logo){return(
Plot.plot({
  marks: [
    Plot.dot(cars, { x: "power (hp)", y: "economy (mpg)" }),
    Plot.frame(),
    Plot.image([logo], { src: [logo], frameAnchor: "top-right", dx: -80, width: 130 }) // Add, position and size your logo
  ],
})
)}

function _47(md){return(
md`---
## Wrap-up

With your customized color schemes, fonts, and logos all in one place, you and your team can easily access them in other notebooks using [imports](https://observablehq.com/@observablehq/import). 

There are many other ways you might want to customize your charts (e.g. background colors and styles, gridline options, etc.). We encourage you to keep adding to this document as your source for reusable theme elements.

Learn more about chart customization: 

- [Observable Plot](https://observablehq.com/@observablehq/plot)
- [Observable Plot Cheatsheets](https://observablehq.com/@observablehq/plot-cheatsheets) `
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["observable-logo.png", {url: new URL("./files/a52556ff742d106a7a9fc566199d869b50a67197c291d411ded35c1347317255ba2a2e51f9a08a14f073ff01243b48c4281e32b1370f79c3f46159d86222b435.png", import.meta.url), mimeType: "image/png", toString}],
    ["Kalam-Regular.ttf", {url: new URL("./files/fac40fd17ec75ee90c62c3633d42c23f96eeb0725056ec9037be60f919c955fd96613610cd70bbb5e9c6d95adf0e5e0eb92243aa38415145abfeaece8cbe7588.ttf", import.meta.url), mimeType: "font/ttf", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("myCategoricalColors")).define("myCategoricalColors", _myCategoricalColors);
  main.variable(observer()).define(["d3","myCategoricalColors"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["Plot","cars","myCategoricalColors"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer("myContinuousColors")).define("myContinuousColors", _myContinuousColors);
  main.variable(observer()).define(["d3","myContinuousColors"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["Plot","myContinuousColors","d3"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["Plot","myContinuousColors","d3"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["Plot","cars","myContinuousColors"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("myGoogleFonts")).define("myGoogleFonts", ["htl"], _myGoogleFonts);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer()).define(["myGoogleFonts"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["Plot","alphabet"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("kalam")).define("kalam", ["FileAttachment"], _kalam);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer("myDownloadedFonts")).define("myDownloadedFonts", ["kalam","htl"], _myDownloadedFonts);
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["myDownloadedFonts"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["Plot","alphabet"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer()).define(["md"], _42);
  main.variable(observer("logo")).define("logo", ["FileAttachment"], _logo);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["Plot","cars","logo"], _46);
  main.variable(observer()).define(["md"], _47);
  return main;
}
