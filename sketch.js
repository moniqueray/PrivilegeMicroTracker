/***********************************************************************************
    Privilege MicroTracker 
    by Monique Ray

    Currently using a p5 clickable to create a scenario where the person playing this game
    (aka Mayor or city leader) is tasked with appointing a new Equity Committee member to their council
    and must choose the person that not only brings forth the most social equity in their polices
    but also the highest ranking level of empathy (aka understanding) for the city.

    ***********************************************************************************/


    var complexStateMachine;           // the ComplexStateMachine class
    var clickablesManager;             // our clickables manager
    var clickables;                    // an array of clickable objects
    
    var currentStateName = "";
    var moodImage;
    
    var bkColor = '#031927';
    var textColor = '#E9D6EC';
    
    var scores = [];
    const Justin = 0;
    const Celia = 1 ;
    const Ashley = 2;
    const Herbert = 3;
    
    var displayPecentages = true;
    var displayHorizontalBars = true;
    
    var xLeftMargin = 50;     // for percentages
    var xBarOffset = 30;
    var yTopMargin = 50;
    var yOffset = 50;
    var barWidth = 30;
    var barSpacing = 50;
    
    var buttonFont;
    
    var lastButtonPressed = "";
    
    function preload() {
      clickablesManager = new ClickableManager('data/clickableLayout.csv');
      complexStateMachine = new ComplexStateMachine("data/interactionTable.csv", "data/clickableLayout.csv");
    
      buttonFont = loadFont("smoochsans.ttf");
      
    }
    
    // Setup code goes here
    function setup() {
      createCanvas(1280, 720);
      imageMode(CENTER);
    
      // setup the clickables = this will allocate the array
      clickables = clickablesManager.setup();
    
      // setup the state machine with callbacks
      complexStateMachine.setup(clickablesManager, setImage, stateChanged);
    
      // call OUR function to setup additional information about the p5.clickables
      // that are not in the array 
      setupClickables(); 
    
      console.log("scores = ");
      console.log(scores);
      initializeScores();
     }
     
    // Draw code goes here
    function draw() {
      drawBackground();
      drawImage();
      drawOther();
      drawUI();
    }
    
    function setupClickables() {
      // All clickables to have same effects
      for( let i = 0; i < clickables.length; i++ ) {
        clickables[i].onHover = clickableButtonHover;
        clickables[i].onOutside = clickableButtonOnOutside;
        clickables[i].onPress = clickableButtonPressed;
        clickables[i].textFont = "smoochsans";
        clickables[i].width = 170;
      }
    }
    
    // tint when mouse is over
    clickableButtonHover = function () {
      this.color = "#9E98A3";
      this.noTint = false;
      this.tint = "#FF0000";
    }
    
    // color a light gray if off
    clickableButtonOnOutside = function () {
      // backto our gray color
      this.color = "#F8FADE";
    }
    
    clickableButtonPressed = function() {
      complexStateMachine.clickablePressed(this.name);
    
      // store the last button name pressed
      lastButtonPressed = this.name;
    }
    
    // this is a callback, which we use to set our display image
    function setImage(imageFilename) {
      moodImage = loadImage(imageFilename);
    } 
    
    // this is a callback, which we can use for different effects
    function stateChanged(newStateName) {
        currentStateName = newStateName;
        console.log(currentStateName);
    
        // Change scores here
        if( newStateName === "A1justin" ) {
          // Good for Justin, bad for Herbert
          scores[Justin] += 30;
          scores[Celia] -= 10;
          scores[Ashley] += 20;
          scores[Herbert] -= 5;
        }
        if( newStateName === "A2justin" ) {
          scores[Justin] -= 15;
          scores[Celia] += 20;
          scores[Ashley] -= 5;
          scores[Herbert] += 10;
        }
      if( newStateName === "A3justin" ) {
        scores[Justin] += 30;
        scores[Celia] -= 5;
        scores[Ashley] += 40;
        scores[Herbert] += 5;
      }
      if( newStateName === "A4justin" ) {
        scores[Justin] -= 10;
        scores[Celia] += 5;
        scores[Ashley] += 20;
        scores[Herbert] -= 5;
      }
      if( newStateName === "A5justin" ) {
        scores[Justin] += 10;
        scores[Celia] += 10;
        scores[Ashley] += 5;
        scores[Herbert] += 5;
      }
       
        console.log(scores);
    }
    
    //==== MODIFY THIS CODE FOR UI =====/
    
    function drawBackground() {
      background(color(bkColor));
    }
    
    function drawImage() {
      if( moodImage !== undefined ) {
        image(moodImage, width/2, height/2);
      }  
    }
    
    function drawOther() {
      push();
    
       
      }
    
      //if( currentStateName !== "Instructions" && currentStateName !== "Players") {
       // fill(color(textColor));
        //rect(200,300,100,20);
        //textFont(buttonFont);
        //textSize(36);
        //text(currentStateName, width/2, 50);
    
      //}
    
      pop();
    
    
    //-- right now, it is just the clickables
    function drawUI() {
      clickablesManager.draw();
    }
    
    
    function initializeScores() {
      scores = [50,50,50,50];
      console.log(scores);
    }