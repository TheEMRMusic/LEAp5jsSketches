// P_3_2_2_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


var textTyped = 'L.E.A.';

var font;

var filled = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  opentype.load('data/FreeSans.otf', function(err, f) {
    if (err) {
      print(err);
    } else {
      font = f;
      loop();
    }
  });
}

function draw() {
  if (!font) return;

  background(36, 30, 32);
  if (filled) {
    noStroke();
    noFill();
  } else {
    noFill();
    stroke(101, 175, 188);
    strokeWeight(2.5);
    textSize(windowWidth/12);
    textAlign(CENTER);
    text("a d m i n   c o n s o l e", (windowWidth / 2), ((windowHeight/1.6)));
    stroke(234, 114, 140);
    strokeWeight(2);
    textSize(windowWidth/20);
    textAlign(LEFT);
    text("from EthiCo. Labs", (windowWidth / 2), ((windowHeight / 1.4)));
    textSize(windowWidth/25);
    textAlign(CENTER);
    stroke(241, 225, 200);
    strokeWeight(1.5);
    text("\\\\\\\\ Developed by Norrah Di Cresci \\\\\\\\", (windowWidth / 2), ((windowHeight / 2) + (windowHeight/3)));
    text("\\\\\\\\ L.E.A. Project Dev Team Lead \\\\\\\\", (windowWidth / 2), ((windowHeight / 2) + (windowHeight/2.5)));
    stroke(241, 225, 200);
    strokeWeight(2);
    fill(241, 225, 200);
    textAlign(CENTER);
  }




  // margin border
  translate(((windowWidth/8)), ((windowHeight / 2.5)));

  if (textTyped.length > 0) {
    // get a path from OpenType.js
    var fontPath = font.getPath(textTyped, 0, windowHeight/16, windowWidth/3.5);
    // convert it to a g.Path object
    var path = new g.Path(fontPath.commands);
    // resample it with equidistant points
    path = g.resampleByLength(path, 5);
    // path = g.resampleByAmount(path, 500);

    // map mouse axis
    var addToAngle = map(mouseX, 5, width, -PI, PI);
    var curveHeight = map(mouseY, 5, width, (-PI/2), 2);

    for (var i = 0; i < path.commands.length - 1; i++) {
      var pnt0 = path.commands[i];
      var pnt1 = path.commands[i + 1];
      var d = dist(pnt0.x, pnt0.y, pnt1.x, pnt1.y);

      // create a gap between each letter
      if (d > 15) continue;

      // alternate in every step from -1 to 1
      var stepper = map(i % 2, 0, 30, -1, 1);
      var angle = atan2(pnt1.y - pnt0.y, pnt1.x - pnt0.x);
      angle = angle + addToAngle;

      var cx = pnt0.x + cos(angle * stepper) * d * 9 * curveHeight;
      var cy = pnt0.y + sin(angle * stepper) * d * 0 * curveHeight;

      bezier(pnt0.x, pnt0.y, cx, cy, cx, cy, pnt1.x, pnt1.y);
    }

  }

}
