let ripples = [];
let quotes = [
  "You can do anything you put your mind to",
  "It's okay to feel your emotions",
  "Be gentle with yourself",
  "Every moment is a fresh start",
  "Shine in your own way",
  "You are enough just as you are",
  "Breathe, relax, and keep going",
];

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(18);
  background(280, 60, 20);
}

function draw() {
  // Fade effect for trails
  fill(280, 60, 20, 15);
  noStroke();
  rect(0, 0, width, height);
  
  // Create new ripple at mouse position
  if (mouseIsPressed || frameCount % 3 === 0) {
    ripples.push({
      x: mouseX,
      y: mouseY,
      size: 0,
      hue: (frameCount * 2) % 360
    });
  }
  
  // Draw and update ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    
    // Draw multiple circles for depth
    noFill();
    strokeWeight(3);
    
    // Outer glow
    stroke(r.hue, 80, 90, 30);
    circle(r.x, r.y, r.size + 20);
    
    // Main ripple
    stroke(r.hue, 90, 100, 60);
    circle(r.x, r.y, r.size);
    
    // Inner bright circle
    stroke(r.hue, 70, 100, 80);
    circle(r.x, r.y, r.size * 0.7);
    
    // Grow the ripple
    r.size += 4;
    
    // Remove when too big
    if (r.size > 400) {
      ripples.splice(i, 1);
    }
  }
  
  // Draw wavy lines following mouse
  if (frameCount % 2 === 0) {
    stroke((frameCount * 3) % 360, 100, 100, 40);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < 50; i++) {
      let x = (i / 50) * width;
      let y = height / 2 + sin((i * 0.3) + (frameCount * 0.1)) * 50;
      let distToMouse = dist(x, y, mouseX, mouseY);
      y += (mouseY - height / 2) * 0.3 * (1 - distToMouse / 500);
      curveVertex(x, y);
    }
    endShape();
  }
  
  // Display cute quotes near the mouse
  fill(0, 0, 100, 90); // white color
  noStroke();
  let index = floor(map(mouseX, 0, width, 0, quotes.length)) % quotes.length;
  text(quotes[index], mouseX, mouseY - 40); // slightly above the mouse
}
