/*全局变量*/
	
	var canvasWidth=480;
	var canvasHeight=650;
	if(screen.width<=768){
		canvasWidth=window.innerWidth;
		canvasHeight=window.innerHeight;
		document.body.width=window.innerWidth;
		document.body.height=window.innerHeight;
	}
	var score=0; //current score
	var lives=3; //current life
	var canvas=document.getElementById('gameCanvas');
	canvas.width=canvasWidth;
	canvas.height=canvasHeight;
	var ctx=canvas.getContext('2d');
	const PHASE_DOWNLOADING=1; 
	const PHASE_READY=2;       
	const PHASE_STARTING=3;    
	const PHASE_PLAY=4;        
	const PHASE_PAUSE=5;       
	const PHASE_GAMEOVER=6;    
	var cur_phase=PHASE_DOWNLOADING;    

/*PHASE_LOADING*/
	var progress=0;
	ctx.lineWidth='20';
	ctx.font='35px SimHei';
	ctx.strokeStyle='#aaa';
	ctx.fillStyle='#aaa';
	function drawProgress(){
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		ctx.beginPath();
		var startAngle=-90*Math.PI/180;
		var endAngle=(270*progress/100)*Math.PI/180
		ctx.arc(canvasWidth/2,canvasHeight/2,60,startAngle,endAngle);	
		ctx.stroke();
		var txt=progress+'%'	
		var txtWidth=ctx.measureText(txt).width;
		ctx.fillText(txt,canvasWidth/2-txtWidth/2,canvasHeight/2+12);
		if(progress>=100){
			cur_phase=PHASE_READY;
			sky=new Sky(imgBackground);		
			startEngine();			
		}
	}

	var imgBackground=new Image();
	var imgBullet=new Image();
	var imgsEnemy1=[new Image(),new Image(),new Image(),new Image(),new Image()];
	var imgsEnemy2=[new Image(),new Image(),new Image(),new Image(),new Image()];
	var imgsEnemy3=[new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
	var imgsGameLoading=[new Image(),new Image(),new Image(),new Image()];
	var imgGamePause=new Image();
	var imgsHero=[new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
	var imgStart=new Image();
	
	!function(){
		imgBackground.src='img/background.png';
		imgBackground.onload=function(){
			progress+=4;
			drawProgress();
		}
		imgBullet.src='img/bullet1.png';
		imgBullet.onload=function(){
			progress+=3;
			drawProgress();
		}
		imgsEnemy1[0].src='img/enemy1.png';
		imgsEnemy1[1].src='img/enemy1_down1.png';
		imgsEnemy1[2].src='img/enemy1_down2.png';
		imgsEnemy1[3].src='img/enemy1_down3.png';
		imgsEnemy1[4].src='img/enemy1_down4.png';
		for(var i=0;i<imgsEnemy1.length;i++){
			imgsEnemy1[i].onload=function(){
				progress+=3;
				drawProgress();
			}
		}
		imgsEnemy2[0].src='img/enemy2.png';
		imgsEnemy2[1].src='img/enemy2_down1.png';
		imgsEnemy2[2].src='img/enemy2_down2.png';
		imgsEnemy2[3].src='img/enemy2_down3.png';
		imgsEnemy2[4].src='img/enemy2_down4.png';
		for(var i=0;i<imgsEnemy2.length;i++){
			imgsEnemy2[i].onload=function(){
				progress+=3;
				drawProgress();
			}
		}
		imgsEnemy3[0].src='img/enemy3_n1.png';
		imgsEnemy3[1].src='img/enemy3_n2.png';
		imgsEnemy3[2].src='img/enemy3_hit.png';
		imgsEnemy3[3].src='img/enemy3_down1.png';
		imgsEnemy3[4].src='img/enemy3_down2.png';
		imgsEnemy3[5].src='img/enemy3_down3.png';
		imgsEnemy3[6].src='img/enemy3_down4.png';
		imgsEnemy3[7].src='img/enemy3_down5.png';
		imgsEnemy3[8].src='img/enemy3_down6.png';
		for(var i=0;i<imgsEnemy3.length;i++){
			imgsEnemy3[i].onload=function(){
				progress+=3;
				drawProgress();
			}
		}
		imgsGameLoading[0].src='img/game_loading1.png';
		imgsGameLoading[1].src='img/game_loading2.png';
		imgsGameLoading[2].src='img/game_loading3.png';
		imgsGameLoading[3].src='img/game_loading4.png';
		for(var i=0;i<imgsGameLoading.length;i++){
			imgsGameLoading[i].onload=function(){
				progress+=3;
				drawProgress();
			}
		}
		imgGamePause.src='img/game_pause_nor.png';
		imgGamePause.onload=function(){
			progress+=3;
			drawProgress();
		}
		imgsHero[0].src='img/hero1.png';
		imgsHero[1].src='img/hero2.png';
		imgsHero[2].src='img/hero_blowup_n1.png';
		imgsHero[3].src='img/hero_blowup_n2.png';
		imgsHero[4].src='img/hero_blowup_n3.png';
		imgsHero[5].src='img/hero_blowup_n4.png';
		for(var i=0;i<imgsHero.length;i++){
			imgsHero[i].onload=function(){
				progress+=3;
				drawProgress();
			}
		}
		imgStart.src='img/start.png';
		imgStart.onload=function(){
			progress+=3;
			drawProgress();
		}
	}();

/*PHASE_READY*/
	//draw sky
	var sky=null;
	function Sky(img){
		this.x1=0;
		this.y1=0;
		this.x2=0;
		this.y2=-canvasHeight;
		this.draw=function(){
			ctx.drawImage(img,this.x1,this.y1,canvasWidth,canvasHeight);
			ctx.drawImage(img,this.x2,this.y2,canvasWidth,canvasHeight);
		}
		this.move=function(){
			this.y1++;
			this.y2++;
			if(this.y1>=canvasHeight){
				this.y1=this.y2-canvasHeight;
			}
			if(this.y2>=canvasHeight){
				this.y2=this.y1-canvasHeight;
			}
		}
	}

	//draw logo
	function drawLogo(){
		ctx.drawImage(imgStart,canvasWidth/2-imgStart.width/2,canvasHeight/2-imgStart.height/2);
	}
	canvas.addEventListener('click',function(){
		if(cur_phase===PHASE_READY||cur_phase===PHASE_GAMEOVER){
			cur_phase=PHASE_STARTING;			
			runningPlane=new RunningPlane(imgsGameLoading);
			lives=3;
		}
	},false);

/*PHASE_STARTING*/
	var runningPlane=null;
	function RunningPlane(imgsGameLoading){
		this.x=0;
		this.y=canvasHeight-imgsGameLoading[0].height;
		this.index=0;
		this.draw=function(){
			ctx.drawImage(imgsGameLoading[this.index],this.x,this.y);
		}
		this.moveCount=0;
		this.move=function(){
			this.moveCount++;
			if(this.moveCount%5===0){
				this.index++;
				if(this.index===imgsGameLoading.length){
					cur_phase=PHASE_PLAY;
					hero=new Hero(imgsHero);
					bulletList=new BulletList();
					enemyList=new EnemyList();
				}
			}		
		}
	}

/*PHASE_PLAY*/
	/*US*/
	var hero=null;
	function Hero(imgsHero){
		this.x=canvasWidth/2-imgsHero[0].width/2;
		this.y=canvasHeight-imgsHero[0].height;
		this.counter=0;
		this.index=0;
		this.notCrashed=true;
		this.width=imgsHero[0].width;
		this.height=imgsHero[0].height;

		this.draw=function(){
			ctx.drawImage(imgsHero[this.index],this.x,this.y);
		};
		this.move=function(){
			this.counter++;
			if(this.counter%3==0){
				if(this.notCrashed){				
					this.index=(this.index==0)?1:0;
				}else{
					this.index++;
					if(this.index>=imgsHero.length){						
						lives--;
						if(lives>0){
							this.x=canvasWidth/2-imgsHero[0].width/2;
							this.y=canvasHeight-imgsHero[0].height;
							this.index=0;
							this.notCrashed=true;
						}else if(lives<1){
							cur_phase=PHASE_GAMEOVER;
						}
					}
				}
			}
			if(this.counter%4==0){ //shooting speed
				var bullet=new Bullet(imgBullet);
				bulletList.add(bullet);
			}
			for(var i=0;i<enemyList.list.length;i++){
				if(
					((this.x+this.width-20)>=enemyList.list[i].x&&(this.x+20)<=(enemyList.list[i].x+enemyList.list[i].width))
					&&(this.y<=(enemyList.list[i].y+enemyList.list[i].height)&&(this.y+this.height-45)>=enemyList.list[i].y)
				){
					this.notCrashed=false;
					enemyList.list[i].blood--;
				}
			}
		}
		if(screen.width<=768){
			canvas.addEventListener('touchmove',function(e){
                e.preventDefault();
				var touch=e.touches[0];
				if(cur_phase==PHASE_PLAY){
					hero.x=touch.pageX-imgsHero[0].width/2;
					hero.y=touch.pageY-imgsHero[0].height/2;
				}
			})
		}else{
			canvas.addEventListener('mousemove',function(e){
				if(cur_phase==PHASE_PLAY){
					hero.x=e.offsetX-imgsHero[0].width/2;
					hero.y=e.offsetY-imgsHero[0].height/2;
				}
			})
		}
	}
	
	
	function Bullet(imgBullet){
		this.width=imgBullet.width;
		this.height=imgBullet.height;
		this.removable=false;
		this.moveSpeed=0;
		this.moveDirection=1;
		this.x=hero.x+(imgsHero[0].width/2-imgBullet.width/2);
		//this.x2=hero.x+(imgsHero[0].width/2-imgBullet.width/2);
		//this.x3=hero.x+(imgsHero[0].width/2-imgBullet.width/2);
		this.y=hero.y-imgBullet.height;

		this.draw=function(){
			ctx.drawImage(imgBullet,this.x,this.y);
			//ctx.drawImage(imgBullet,this.x2-20,this.y);
			//ctx.drawImage(imgBullet,this.x3+20,this.y);
		}
		this.move=function(){
			//if(enemyList.list[i].x>=this.x){
			//	this.moveDirection=1;
			//}else if(enemyList.list[i].x<this.x){
			//	this.moveDirection=-1;
			//}
			this.y-=10; //bullet move speed
			//this.moveSpeed+=10;
			//this.y-=(this.moveSpeed); 
			//this.x=hero.x+(imgsHero[0].width/2-imgBullet.width/2);
			//this.x3+=3;
			if(this.y<=-imgBullet.height){ //bullet out of range
				this.removable=true;
			}
			for(var i=0;i<enemyList.list.length;i++){
				if(
					((this.x+this.width)>=enemyList.list[i].x&&this.x<=(enemyList.list[i].x+enemyList.list[i].width))
					&&(this.y<=(enemyList.list[i].y+enemyList.list[i].height)&&(this.y+this.height)>=enemyList.list[i].y)
				){
					this.removable=true;
					enemyList.list[i].blood--;
				}
			}
		}
	}
	var bulletList=null;
	function BulletList(){
		this.list=[];
		this.add=function(bullet){
			this.list.push(bullet);
		}
		this.draw=function(){
			for(var i=0;i<this.list.length;i++){
				this.list[i].draw();
			}
		};
		this.move=function(){
			for(var i=0;i<this.list.length;i++){
				this.list[i].move();
				if(this.list[i].removable){
					this.list.splice(i,1);
					i--; //子弹删除后索引值会少一个
				}
			}
		};
	}

	/*ENEMY*/
	
	function Enemy1(imgsEnemy1){
		this.width=imgsEnemy1[0].width;
		this.height=imgsEnemy1[0].height;
		this.x=Math.random()*(canvasWidth-this.width);
		this.y=-this.height;
		this.index=0;
		this.blood=1;
		this.removable=false; 
		this.score=10;
		this.notCrashed=true;
		this.counter=0;
		this.draw=function(){
			ctx.drawImage(imgsEnemy1[this.index],this.x,this.y);
		};
		this.move=function(){
			this.y+=6; //Enemy1 move speed;
			this.counter++;
			if(this.y>=canvasHeight){
				this.removable=true;
			}
			if(this.blood<=0){
				this.notCrashed=false;				
			}
			if(!this.notCrashed){	
				if(this.counter%2==0){			
					this.index++
					if(this.index>=imgsEnemy1.length-1){
						this.removable=true;
						score+=this.score;
					}				
				}
			}
		};
	};
	function Enemy2(imgsEnemy2){
		this.width=imgsEnemy2[0].width;
		this.height=imgsEnemy2[0].height;
		this.x=Math.random()*(canvasWidth-this.width);
		this.y=-this.height;
		this.index=0;
		this.blood=4;
		this.removable=false; 
		this.score=30;
		this.notCrashed=true;
		this.counter=0;

		this.draw=function(){
			ctx.drawImage(imgsEnemy2[this.index],this.x,this.y);
		};
		this.move=function(){
			this.y+=4; //Enemy1 move speed;
			this.counter++;
			if(this.y>=canvasHeight){
				this.removable=true;
			}
			if(this.blood<=0){
				this.notCrashed=false;				
			}
			if(!this.notCrashed){	
				if(this.counter%2==0){			
					this.index++
					if(this.index>=imgsEnemy2.length-1){
						this.removable=true;
						score+=this.score;
					}				
				}
			}
		};
	};
	function Enemy3(imgsEnemy3){
		this.width=imgsEnemy3[0].width;
		this.height=imgsEnemy3[0].height;
		this.x=Math.random()*(canvasWidth-this.width);
		this.y=-this.height;
		this.index=0;
		this.blood=8;
		this.removable=false; 
		this.score=70;
		this.notCrashed=true;
		this.counter=0;

		this.draw=function(){
			ctx.drawImage(imgsEnemy3[this.index],this.x,this.y);
		};
		this.move=function(){
			this.y+=2; //Enemy1 move speed;
			this.counter++;
			if(this.y>=canvasHeight){
				this.removable=true;
			}
			if(this.blood<=0){
				this.notCrashed=false;				
			}
			if(this.counter%3==0){
				if(this.notCrashed){				
					this.index=(this.index==0)?1:0;
				}else{
					this.index++;
					if(this.index>=imgsEnemy3.length-1){
						this.removable=true;
						score+=this.score;
					}
				}
			}
			
		};
	};
	var enemyList=null;
	function EnemyList(){
		this.list=[];
		this.counter=0;
		this.add=function(enemy){
			this.list.push(enemy);
		}
		this.draw=function(){
			for(var i=0;i<this.list.length;i++){
				this.list[i].draw();
			}
		}
		this.move=function(){
			var num=Math.floor(Math.random()*200);
			if(num<6){ //add Enemy1
				this.add( new Enemy1(imgsEnemy1));
			}else if(num<9){ //add Enemy2
				this.add( new Enemy2(imgsEnemy2));
			}else if(num<10){ //add Enemy3
				this.add( new Enemy3(imgsEnemy3));
			}

			for(var i=0;i<this.list.length;i++){
				var enemy=this.list[i];
				enemy.move();
				if(enemy.removable){
					this.list.splice(i,1);
					i--;
				}
			}
		}
	};
	function drawState(){
		var scoreTxt='Score:'+score;
		var livesTxt='Lives:'+lives;
		ctx.font='30px SimHei';
		var livesWidth=ctx.measureText(this.livesTxt).width;		
		ctx.fillStyle='#000';
		ctx.fillText(scoreTxt,10,30);
		ctx.fillText(livesTxt,canvasWidth-livesWidth,30);
	}

/*PHASE_PAUSE*/
	canvas.addEventListener('mouseout',function(){
		cur_phase==PHASE_PLAY&&(cur_phase=PHASE_PAUSE);
	});
	canvas.addEventListener('mouseenter',function(){
		if(cur_phase===PHASE_PAUSE){
			cur_phase = PHASE_PLAY;
		}
	});
	function drawPause(){
		ctx.drawImage(imgGamePause,canvasWidth/2-imgGamePause.width/2,canvasHeight/2-imgGamePause.height/2);
	}
	//canvas.addEventListener('');

/*PHASE_GAMEOVER*/
	function drawGameover(){
		var gameover='GAME OVER';
		var cts='Click to start';				
		ctx.font='60px SimHei';
		var gameoverWidth=ctx.measureText(gameover).width;
		ctx.fillText(gameover,canvasWidth/2-gameoverWidth/2,canvasHeight/2-20);		
		ctx.font='30px SimHei';
		var ctsWidth=ctx.measureText(cts).width;
		ctx.fillText(cts,canvasWidth/2-ctsWidth/2,canvasHeight/2+40);
	}

/*GAME_ENGINE*/
	function startEngine(){
		setInterval(function(){
			sky.draw();
			sky.move();
			switch(cur_phase){
				case PHASE_READY:
					drawLogo();
					break;
				case PHASE_STARTING:
					runningPlane.draw();
					runningPlane.move();
					break;
				case PHASE_PLAY:					
					enemyList.draw();
					enemyList.move();
					bulletList.draw();
					bulletList.move();
					hero.draw();
					hero.move();
					drawState();
					break;
				case PHASE_PAUSE:
					drawState();
					drawPause();
					break;
				case PHASE_GAMEOVER:
					drawState();
					drawGameover();									
					break;
			}
		},42);
	}
