  const canvas = document.getElementById("FinalProject");
  const context = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 550;
  let score = 0;
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
     update: function(){
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
		x: 950,
		y: 400,
		xDelta: 0,
		yDelta: 0,
		width: 80,
		height: 150,
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
           if (this.x + this.width > canvas.width) {
                this.x = 0;
            }
            else if (this.x < 0) {
                this.x = canvas.width - this.width;
            }

            if (this.y < 0) {
                this.y = canvas.height - this.height;
            }
            else if (this.y + this.height > canvas.height) {
                this.y = 0;
            }
      }, 
	}
  
     

     const AnimeBadGuy = function(count, canvasWidth, canvasHeight) {
      const array = [];
    for(let i = 0; i < count; i++){
    
          array[array.length] = {

            x: rand(canvasHeight-60),
            y: rand(canvasHeight-140),
            width: 100,
            height: 100,
            image: badGuyImg,
            xDelta: 2, 
            yDelta: 2, 
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

	
  
const boxes = AnimeBadGuy(3,canvas.width,canvas.height);
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === rightKey){
        		Animehero.xDelta = 5;
        	}
            }, false);

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === leftKey){
        		Animehero.xDelta = -5;
        	}
            }, false);

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === downKey){
        		Animehero.yDelta = 5;
        	}
            }, false);

    document.addEventListener('keydown', function(event){
        	if(event.keyCode === upKey){
        		Animehero.yDelta = -5;
        	}
            }, false);

    document.addEventListener('keyup', function(event){
        	Animehero.xDelta = 0;
            }, false);

    document.addEventListener('keyup', function(event){
        	Animehero.yDelta = 0;
            }, false);

    const Alldraw = function(array){  
                 for(let i = 0; i < array.length; i = i+1){     
                  AnimeBadGuy(array[i].draw())                  
        }               
  }; 

    const updateAll =function(array1){
                 for(let i = 0; i < array1.length; i = i+1){
                  AnimeBadGuy(array1[i].update());    
        }         
  };

let t = 60;

setInterval(function(){
    t=t-1;
    if(t <= -1){
  alert("YOU DID NOT DIE...CONGRATS!!!" + " " + "YOUR SCORE IS  " + score)
}
    document.getElementById("time").innerHTML = "SECONDS REMAINING: " + t;
}, 1000);

  const loop = function() {
  	context.drawImage(backImage, 0, 0, canvas.width, canvas.height)    
    Alldraw(boxes);     
    Animehero.draw();   
    Animehero.update();  
    updateAll(boxes);
    shuriken.update();
    shuriken.draw();
    h3.innerHTML = "SCORE: " + score                          
    requestAnimationFrame(loop);       
  } 
 
loop();