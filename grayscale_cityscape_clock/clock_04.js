// Clock 04
// (c) Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0/

// FEATS
// - changing sky colors with accurate sunrises and sunsets
// - accurate revolving sun and moon
// - car moving every 1 second, finishes road in 1 minute
// - houselights turn on during the day and off during the night


function remapRGB(value, rangeStart, rangeEnd, shadeStart, shadeEnd) {
  let rgbShade = []
  for (let i = 0; i < 3; i++) {
    rgbShade.push(remap(value, rangeStart, rangeEnd, shadeStart[i], shadeEnd[i]))
  }
  return rgbShade
}

function setup() {
  size(400, 400);
}

let dayFlag = true

function draw() {
  let nightShade = gray(90)
  let sunSetRiseShade = gray(50)
  let dayShade = gray(10)
  
  
  let currentMinute = (hour() * 60) + minute()
  // let currentMinute = second() * 60 // 60 second simulation
  // console.log(currentMinute)
  let skyShade;

  // sunrise
  if (currentMinute >= 350 && currentMinute <= 430) {
    skyShade = remap(currentMinute, 350, 510, nightShade, sunSetRiseShade)
    dayFlag = false
  }
  else if (currentMinute > 430 && currentMinute <= 510) {
    skyShade = remap(currentMinute, 431, 510, sunSetRiseShade, dayShade)
    dayFlag = true
  }
  // sunset
  else if (currentMinute >= 1050 && currentMinute <= 1100) {
    skyShade = remap(currentMinute, 1050, 1100, dayShade, sunSetRiseShade)
    dayFlag = true
  }
  else if (currentMinute > 1100 && currentMinute <= 1150) {
    skyShade = remap(currentMinute, 1101, 1150, sunSetRiseShade, nightShade)
    dayFlag = false
  }
  // day
  else if (currentMinute > 510 && currentMinute < 1050) {
    skyShade = dayShade
    dayFlag = true
  }
  // night
  else {
    skyShade = nightShade
    dayFlag = false
  }
  
  clear(skyShade);
  noStroke()  
  
  moonPos = clockHand(currentMinute, 1440, 170, 200, 250)
  let moonX = moonPos["x"]
  let moonY = moonPos["y"]
  let sunX = 400 - moonX
  let sunY = 500 - moonY
  
  console.log(hour())
  fill(gray(30))
  circle(sunX, sunY, 50)
  fill (gray(7))
  circle(moonX, moonY, 50)

  fill(gray(25))
  rect(0, 250, 400, 150)
  
  const nightWindow = gray(70)
  const dayWindow = gray(20)
  let windowShade;
  if (dayFlag) {windowShade = dayWindow}
  else {windowShade = nightWindow}
  
  const houseSpace = 75
  let x = 18
  for (let i = 0; i < 5; i++) {
    if (i % 2 === 0) {fill(gray(30))}
    else {fill(gray(50))}
    square(x, 230, 65)
    fill(windowShade)
    rect(x + 30, 245, 18, 30)
    x += houseSpace
  }
  
  fill(gray(70))
  rect(0, 300, 400, 30)
  
  currentSecond = second()
  remap(currentSecond, 0, 59, 0, 370)
  fill(gray(30))
  rect(remap(currentSecond, 0, 59, 0, 370), 300, 29, 15)
  fill(gray(0))
  rect(15 + remap(currentSecond, 0, 59, 0, 370), 302, 11, 7)
  rect(2 + remap(currentSecond, 0, 59, 0, 370), 302, 11, 7)
  
  fill(162, 89, 70)
  x = 18
  for (let i = 0; i < 5; i++) {
    if (i % 2 !== 0) {fill(gray(30))}
    else {fill(gray(50))}
    square(x, 310, 65)
    fill(windowShade)
    rect(x + 30, 325, 18, 30)
    x += houseSpace
  }
  
  textFont("Courier New")
  textSize(20)
  fill(gray(40))
  text(hoursMinutesSeconds(), 200, 200)
  textAlign(CENTER)
}
