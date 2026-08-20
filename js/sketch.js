const animatedText = 'LUCAS PERNET';
const pointSampleFactor = 0.12;
let font;
let points = [];
let canvasContainer;
let textSizeValue;

function preload() {
  font = loadFont('fonts/JALLEAU-Regular.ttf');
}

function setup() {
  canvasContainer = select('#canva-container');
  createCanvas(canvasContainer.width, canvasContainer.height, WEBGL).parent(canvasContainer);
  textFont(font);
  updateTextPoints();
}

function draw() {
  background('#090909');
  noStroke();
  fill(255);

  const centerX = width / 2;
  const centerY = height / 2;
  const horizontalDistance = abs(mouseX - centerX);
  const verticalDistance = abs(mouseY - centerY);
  const horizontalInteraction = constrain(horizontalDistance / (width / 2), 0, 1);
  const verticalInteraction = constrain(verticalDistance / (height / 2), 0, 1);
  const circleWidth = 20 + horizontalInteraction * 100;
  const circleHeight = 20 + verticalInteraction * 100;

  for (const point of points) {
    push();
    translate(point.x, point.y);
    ellipse(0, 0, circleWidth, circleHeight);
    pop();
  }
}


function updateTextPoints() {
  const baseTextSize = 300;
  const baseBounds = font.textBounds(animatedText, 0, 0, baseTextSize);
  textSizeValue = baseTextSize * (width * 0.95) / baseBounds.w;
  points = font.textToPoints(animatedText, 0, 0, textSizeValue, {
    sampleFactor: pointSampleFactor,
    simplifyThreshold: 0
  });

  const bounds = getPointBounds();
  points = points.map((point) => ({
    x: point.x - bounds.centerX,
    y: point.y - bounds.centerY
  }));
}

function getPointBounds() {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);

  return {
    centerX: (min(xs) + max(xs)) / 2,
    centerY: (min(ys) + max(ys)) / 2
  };
}

function windowResized() {
  resizeCanvas(canvasContainer.width, canvasContainer.height);
  updateTextPoints();
}