  const canvas = document.getElementById("FinalProject");
  const context = canvas.getContext('2d');
  canvas.width = 1000;
  canvas.height = 550;
  let highscore = 0;
  let score = 0;
  let gamepaused = false;
  const h3 = document.getElementById("score")
  const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
  };

 const backImage = new Image();
 backImage.src = 'https://i.imgur.com/iNdI7jL.png';

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
     update: function(){
      if(this.x < 0 || this.x > canvas.width - this.width){
                this.xDelta = this.xDelta * -1
              }
          if(this.y < 0 || this.y > canvas.height - this.height){
            this.yDelta = this.yDelta * -1
          }
          
           this.x = this.x + this.xDelta;
           this.y = this.y + this.yDelta;  
      if (this.x < Animehero.x + Animehero.width &&
          this.x + this.width > Animehero.x &&
          this.y < Animehero.y + Animehero.height &&
          this.height + this.y > Animehero.y){

           this.x = rand(canvas.width - this.width);
           this.y = rand(canvas.height - this.height);
           score=score+1;
        }
      }
    }

const Animehero = {
		x: 930,
		y: 400,
		xDelta: 0,
		yDelta: 0,
		width: 70,
		height: 130,
		image: goodGuyImg,
		draw: function(){
			context.drawImage(this.image, this.x, this.y, this.width, this.height);
		},
		update: function() {
    
              if(this.x < 0 || this.x > canvas.width - this.width){
              	this.xDelta = this.xDelta * -1}
		      if(this.y < 0 || this.y > canvas.height - this.height){
		      	this.yDelta = this.yDelta * -1}
          
           this.x = this.x + this.xDelta;
           this.y = this.y + this.yDelta;  
       
      }, 
	}
  
     const AnimeBadGuy = function(count, canvasWidth, canvasHeight) {
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
                            	this.xDelta *= -1
                            }
		                        if(this.y < 0 || this.y > canvasHeight - this.height){
		                        	this.yDelta *= -1
                            }
            
                             this.x += this.xDelta;
                             this.y += this.yDelta;
            
                            if (this.x < Animehero.x + Animehero.width &&
                                this.x + this.width > Animehero.x &&
                                this.y < Animehero.y + Animehero.height &&
                                this.y + this.height > Animehero.y){
                                alert("Game Over!!!!!" + " " + "YOUR SCORE IS  " + score)
                            }
                          }
                        } 
     }  
     return array;
};
  
const boxes = AnimeBadGuy(4,canvas.width,canvas.height);
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === rightKey){
        		Animehero.xDelta = 7;
        	}
            }, false);

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === leftKey){
        		Animehero.xDelta = -7;
        	}
            }, false);

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === downKey){
        		Animehero.yDelta = 7;
        	}
            }, false);

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === upKey){
        		Animehero.yDelta = -7;
        	}
            }, false);

    document.addEventListener('keyup', function(event){
        	Animehero.xDelta = 0;
            }, false);

    document.addEventListener('keyup', function(event){
        	Animehero.yDelta = 0;
            }, false);

    document.addEventListener('keyup', function(event){
        	Animehero.yDelta = 0;
            }, false); 

    document.addEventListener('keyup', function(event){
          shuriken.yDelta = -2;
            }, false);
        document.addEventListener('keyup', function(event){
          shuriken.xDelta = -2;
            }, false);

    const drawAll = function(array1){  
                 for(let i = 0; i < array1.length; i = i+1){     
                  AnimeBadGuy(array1[i].draw())                  
        }               
  }; 

    const updateAll =function(array2){
                 for(let i = 0; i < array2.length; i = i+1){
                  AnimeBadGuy(array2[i].update());    
        }         
  };



    function Pause(){
    if(!gamepaused){
     gamepaused = !false;
    } else if (gamepaused)
    {
       gamepaused = false;
    }

}
  document.addEventListener('keydown', function (event) {
const key = event.keyCode;
if (key === 32)     // "Spacebar" is going to pause the game
{
    Pause();
}
});

  let t = 60;
  
setInterval(function(){
  if(!gamepaused){
    t= t-1;
    if(t <= -1){
  alert("YOU DID NOT DIE...CONGRATS!!!" + " " + "YOUR SCORE IS  " + score)
}
}
    document.getElementById("time").innerHTML = "SECONDS REMAINING: " + t;
}, 1000);

  const loop = function() {
  	context.drawImage(backImage, 0, 0, canvas.width, canvas.height)    
    drawAll(boxes);    
    Animehero.draw();
    if(!gamepaused){
    updateAll(boxes);
    Animehero.update();  
    shuriken.update(); 
    };
    shuriken.draw();
    h3.innerHTML = "SCORE: " + score                          
    requestAnimationFrame(loop);       
  }   
loop();