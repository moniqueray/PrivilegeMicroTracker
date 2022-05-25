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
    var backgroundImage;
    
    var bkColor = '#031927';
    var textColor = '#E9D6EC';
    
    var buttonFont;
    
    function preload() {
      clickablesManager = new ClickableManager('data/clickableLayout.csv');
      complexStateMachine = new ComplexStateMachine("data/interactionTable.csv", "data/clickableLayout.csv");
    
      buttonFont = loadFont("AtariClassic-ExtraSmooth.ttf");
    }
    
    // Setup code goes here
    function setup() {
      createCanvas(1920, 1080);
      imageMode(CENTER);
    
      // setup the clickables = this will allocate the array
      clickables = clickablesManager.setup();
    
      // setup the state machine with callbacks
      complexStateMachine.setup(clickablesManager, setImage, stateChanged);
    
      // call OUR function to setup additional information about the p5.clickables
      // that are not in the array 
      setupClickables(); 
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
        clickables[i].textFont = "AtariClassic-ExtraSmooth";
        clickables[i].width = 220;
      }
    }
    
    // tint when mouse is over
    clickableButtonHover = function () {
      this.color = "#F2545B";
      this.noTint = false;
      this.tint = "#FF0000";
    }
    
    // color a light gray if off
    clickableButtonOnOutside = function () {
      // backto our gray color
      this.color = "#E9D6EC";
    }
    
    clickableButtonPressed = function() {
      complexStateMachine.clickablePressed(this.name);
    }
    
    // this is a callback, which we use to set our display image
    function setImage(imageFilename) {
      backgroundImage = loadImage(imageFilename);
    } 
    
    // this is a callback, which we can use for different effects
    function stateChanged(newStateName) {
        currentStateName = newStateName;
        console.log(currentStateName);
    } 
    
    
    //==== KEYPRESSED ====/
    function mousePressed() {
      // if( currentStateName === "Splash" ) {
      //   complexStateMachine.newState("Instructions");
      // }
    }
    
    //==== MODIFY THIS CODE FOR UI =====/
    
    function drawBackground() {
      background(color(bkColor));
    }
    
    // draw centered
    function drawImage() {
      if( backgroundImage !== undefined ) {
        image(backgroundImage, width/2, height/2);
      }  
    }
    
    function drawOther() {
      push();
    
       // Draw mood — if not on Splash or Instructions screen  
       if( currentStateName !== "Splash" && currentStateName !== "Instructions") {
        fill(color(textColor));
        textFont(buttonFont);
        textSize(24);
        text(currentStateName, width/2, 50);
      }
    
      pop();
    }
    
    //-- right now, it is just the clickables
    function drawUI() {
      clickablesManager.draw();
    }