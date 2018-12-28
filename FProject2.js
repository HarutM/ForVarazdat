 const canvas = document.getElementById("FinalProject");
  const context = canvas.getContext('2d');
  canvas.width = 1000;
  canvas.height = 550;
  let score = 0
  const h3 = document.getElementById("score")
  const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
  };

 const backImage = new Image();
 backImage.src = 'https://i.imgur.com/iNdI7jL.png'

const badGuyImg = new Image();
badGuyImg.src = 'https://2static1.fjcdn.com/comments/Im+assuming+its+this+hidan+bad+guy+from+naruto+who+_63b4af26c6d544021261579c6ff696d3.png';

const shurikenImg = new Image();
shurikenImg.src = 'https://art.pixilart.com/d7acf1ec2c79f80.png';

const goodGuyImg = new Image();
goodGuyImg.src = 'https://vignette.wikia.nocookie.net/naruto/images/f/f7/Kisame_Hoshigaki_full.png/revision/latest?cb=20160304061903';

const shuriken = {
    x: rand(canvas.width-70),
    y: rand(canvas.height-70),
    xDelta: 0,
    yDelta: 0,
    width: 70,
    height: 70,
    image: shurikenImg,
    draw: function(){
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
    },
     collision: function(){
      if(this.x < 0 || this.x > canvas.width - this.width+5){
                this.xDelta = this.xDelta * -1}
          if(this.y < 0 || this.y > canvas.height - this.height+5){
            this.yDelta = this.yDelta * -1}
          
           this.x = this.x + this.xDelta;
           this.y = this.y + this.yDelta;  
      if (this.x < hero.x + hero.width && this.x + this.width > hero.x && this.y < hero.y + hero.height && 
                                 this.height + this.y > hero.y){
                this.x = rand(canvas.width - this.width);
                this.y = rand(canvas.height - this.height);
                score=score+1;
        }
      }
    }



const hero = {
		x: 0,
		y: 0,
		xDelta: 0,
		yDelta: 0,
		width: 70,
		height: 130,
		image: goodGuyImg,
		draw: function(){
			context.drawImage(this.image, this.x, this.y, this.width, this.height);
		},
		update: function() {
    
              if(this.x < 0 || this.x > canvas.width - this.width+5){
              	this.xDelta = this.xDelta * -1}
		      if(this.y < 0 || this.y > canvas.height - this.height+5){
		      	this.yDelta = this.yDelta * -1}
          
           this.x = this.x + this.xDelta;
           this.y = this.y + this.yDelta;  
       
      }, 
	}
  
     

     const orochimaru = function(count, canvasWidth, canvasHeight) {
      const array = [];
    for(let i = 0; i < count; i++){
    
          array[array.length] = {

            x: rand(canvasHeight-100),
            y: rand(canvasHeight-100),
            width: 100,
            height: 100,
            image: badGuyImg,
            xDelta: 2.75, 
            yDelta: 2.75, 
            draw: function() {
              context.drawImage(badGuyImg, this.x, this.y, this.width, this.height)
              
            },
            update: function() { 
                            if(this.x < 0 || this.x > canvasWidth - this.width){
                            	this.xDelta *= -1}
		                        if(this.y < 0 || this.y > canvasHeight - this.height){
		                        	this.yDelta *= -1}
            
                             this.x += this.xDelta;
                             this.y += this.yDelta;
            
                            if (this.x < hero.x + hero.width &&
                                this.x + this.width > hero.x &&
                                this.y < hero.y + hero.height &&
                                this.y + this.height > hero.y){
                                alert("Game Over!!!!!" + " " + "YOUR SCORE IS  " + score)
                            }
                          }
                        } 
     }  
     return array;
};

	
  
const boxes = orochimaru(4,canvas.width,canvas.height);
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === rightKey){
        		hero.xDelta = 5;
        	}
            }, false);

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === leftKey){
        		hero.xDelta = -5;
        	}
            }, false);

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === downKey){
        		hero.yDelta = 5;
        	}
            }, false);

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === upKey){
        		hero.yDelta = -5;
        	}
            }, false);

    document.addEventListener('keyup', function(event){
        	hero.xDelta = 0;
            }, false);

    document.addEventListener('keyup', function(event){
        	hero.yDelta = 0;
            }, false);

    document.addEventListener('keyup', function(event){
        	hero.yDelta = 0;
            }, false); 

    document.addEventListener('keyup', function(event){
          shuriken.yDelta = -1;
            }, false);
        document.addEventListener('keyup', function(event){
          shuriken.xDelta = -1;
            }, false);

  
    const drawAll = function(array){  
                 for(let i = 0; i < array.length; i = i+1){     
                  orochimaru(array[i].draw())                  
        }               
  }; 

    const updateAll =function(array1){
                 for(let i = 0; i < array1.length; i = i+1){
                  orochimaru(array1[i].update());    
        }         
  };

  
  const loop = function() {
  	context.drawImage(backImage, 0, 0, canvas.width, canvas.height)    
    drawAll(boxes);  
    updateAll(boxes);
    hero.draw();
    hero.update();  
    shuriken.draw();
    shuriken.collision();
    h3.innerHTML = "SCORE: " + score                          
    requestAnimationFrame(loop);       
  }   
loop();