 /* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
 



const UITLEG = 1;
const START = 2;
const SPELEN = 3;
const GAMEOVER = 4;
const GAMEOVER2 = 5;
var spelStatus = SPELEN;




var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler

var vijand1X =800;
var vijand1Y = 600;
var vijand2X = 200;
var vijand2Y = 300;
var speed2 = 5;
var speed1 = 5;

var health = 5;
var smileyX = 202;
var smileyY = 208;
var img;// plaatje
var coinX = 500;
var coinY = 600;
var points = 0;
var toetsIngedruktNu = false;
var toetsIngedruktVorige = false;


/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
 
  const KEY_DOWN = 40
  const KEY_UP = 38
  const KEY_LEFT = 37
  const KEY_RIGHT = 39
  const SPELEN = 1
  if (keyIsDown(37)) {
    spelerX=spelerX-5
  }
  if (keyIsDown(39)) {
   spelerX=spelerX+5
  }
  if (keyIsDown(38)) {
    spelerY=spelerY-5
  }
  if (keyIsDown(40)) {
  spelerY=spelerY+5
  }
  
  // vijand
  
 

 
  vijand1Y = vijand1Y  + speed1
if (vijand1Y > 700) {
    speed1 = -10;   
  }
    if (vijand1Y<100) {
      speed1 = 10;
      
    }
  vijand2X = vijand2X  + speed2
if (vijand2X > 1200){
    speed2 = -10;
  }
    if (vijand2X<0) {
      speed2 = 10;
    }
    
};
  
  
  // kogel
  
  


/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen vijand
  if (spelerX - vijand2X < 51 && 
      spelerY -vijand2Y > -51 &&
      spelerY - vijand2Y < 51 &&
      spelerX - vijand2X > -51 ) { 
      spelerX = random(0,600);
      spelerY = random(300,600);
      health = health - 1
    points = points -1
      console.log("botsing");     
      }     
   
  
  // botsing kogel tegen vijand

  // update punten en health

  if (spelerX - vijand1X < 51 && 
      spelerY -vijand1Y > -51 &&
      spelerY - vijand1Y < 51 &&
      spelerX - vijand1X > -51 ) {
      spelerX = random(200,900);
      spelerY = random(200,500);
      health = health - 1
      points = points - 1
  };
    
  if (health === 0){
  spelStatus = GAMEOVER;
  };  
};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
   fill("black")
   rect(0, 0, 1280, 720);
  // vijand

  fill("red");
  rect (vijand1X - 25, vijand1Y - 25, 50, 50 );
  fill("black");
  ellipse(vijand1X, vijand1Y, 10, 10);
   image(img,vijand1X-25,vijand1Y-25,50,50)

   fill("red");
  rect (vijand2X - 25, vijand2Y - 25, 50, 50 );
  fill("black");
  ellipse(vijand2X, vijand2Y, 10, 10);
   image(img,vijand2X-25,vijand2Y-25,50,50)
  
  // kogel

  // speler
  fill("green");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 15, 15);

  // punten en health
    fill("white")
    textSize(90);
    text("health = " + health, 200, 100);
    text("points =" + points, 700, 100);

fill("red");
  rect (coinX - 25, coinY - 25, 50, 50 );
  fill("black");
  ellipse(coinX, coinY, 10, 10);
 
  if (spelerX - coinX < 51 && 
      spelerY -coinY > -51 &&
      spelerY - coinY < 51 &&
      spelerX - coinX > -51 ) {
     coinX = random(200,900);
      coinY = random(200,500); 
    points = points + 1
      }

 
  
   if (spelStatus===GAMEOVER) {
     points = 1
   }
  if (spelStatus===GAMEOVER2) {
    points = 1
  }
};
/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */
function preload() {
  img = loadImage('virus.png');
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  
  background("white");
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing(); // checkt ook gameover
    tekenAlles();
    console.log("spelen")
    
  }

  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    background("red");
    fill("white")
    textSize(100)
    text("game over", 400, 100);
    textSize(20)
    text("press enter",400,150);

    toetsIngedrutkVorige = toetsIngedruktNu;
    if (keyIsDown(13)) {
      toetsIngedruktNu = true;
    } else {
      toetsIngedruktNu = false;
    }
      if (toetsIngedruktNu===true && toetsIngedruktVorige == false) {
           spelStatus = GAMEOVER2;
      }
  }
  if (spelStatus === GAMEOVER2) {
    background("red");
    fill("white")
    textSize(100)
    text("game over", 400, 100);
    textSize(20)
    text("press enter",400,150);
    
    ellipse(smileyX, smileyY, 300, 300); // face 
     
    fill(46, 46, 41);
    ellipse(smileyX - 45, smileyY - 57, 40, 40); // left eye
    ellipse(smileyX + 102, smileyY - 66, 40, 40); // right eye
  
    fill(252, 65, 65);
    ellipse(257, 240, 120, 136); // mouth
      
    textSize(100)
    fill(200,200,200);
    text("druk op spatie",350, 700 );
  
   if (keyIsDown(32)){ //spatie
      spelStatus = START;
      health = health + 1
      console.log("spelen")
      }
  }
  if (spelStatus === START){
    background("red");
    fill("white")
    textSize(100)
    text("welkom", 400, 100);  
    textSize(20)
    text("druk op enter om te beginnen",400,150);
    console.log("startscherm")
    toetsIngedrutkVorige = toetsIngedruktNu;
    if (keyIsDown(13)) {
      toetsIngedruktNu = true;
    } else {
      toetsIngedruktNu = false;
    }
      if (toetsIngedruktNu===true && toetsIngedruktVorige == false) {
        spelStatus = SPELEN;
    }
  }
}
 
