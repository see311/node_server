window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
}
var tetris={
	CSIZE:26,
	OFFSET:15,
	pg:null,
	shape:null,
	nextShape:null,
	interval:0,
	timer:null,
	wall:[],
	RN:20,
	CN:10,
	lines:0,
	level:1,
	score:0,
	SCORES:[0,10,30,70,150],
	state:1,
	RUNNING:1,
	GAMEOVER:0,
	PAUSE:2,
	start:function(){
		this.state=this.RUNNING;
		this.interval=1000;
		this.score=0;
		this.lines=0;
		this.level=1;
		for(var r=0;r<this.RN;r++){
			this.wall[r]=new Array(this.CN);
		}
		this.pg=$("div.playground");
		this.shape=this.randomShape();
		this.nextShape=this.randomShape();
		this.paint();
		var me=this;
		document.onkeydown=function(e){
			var code=e.keyCode;
			switch(code){
				case 37:
					(me.state==me.RUNNING)&&me.moveLeft();
					break;
				case 38:
					(me.state==me.RUNNING)&&me.rotateR();
					break;
				case 39:
					(me.state==me.RUNNING)&&me.moveRight();
					break;
				case 40:
					(me.state==me.RUNNING)&&me.moveDown();
					break;
				case 90:
					(me.state==me.RUNNING)&&me.rotateL();
					break;
				case 32:
					(me.state==me.RUNNING)&&me.hardDrop();
					break;
				case 80:
					(me.state==me.RUNNING)&&me.pause();
					break;
				case 67:
					(me.state==me.PAUSE)&&me.myContinue();
					break;
				case 81:
					(me.state!=this.GAMEOVER)&&me.quit();
					break;
				case 83:
					(me.state==me.GAMEOVER)&&me.start();
			}
		}
		this.timer=setInterval(this.moveDown.bind(this),this.interval);		
	},
	quit:function(){
		this.state=this.GAMEOVER;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	myContinue:function(){
		this.state=this.RUNNING;
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
	},
	pause:function(){
		this.state=this.PAUSE;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	isGameOver:function(){
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			if(this.wall[cell.r][cell.c]){return true}else{return false};
		}
	},	
	randomShape:function(){
		var r=Math.floor(Math.random()*3);
		switch(r){
			case 0:
				return new I(); //return后循环结束并退出，不用break！
			case 1:
				return new T();
			case 2:
				return new O();
			//case 3:
				//return new J();
		}
	},
	isFull:function(r){
		/*
		var reg=/^,|,,|,$/;
		var i=String(this.wall[r]).search(reg);
		return i==-1;
		*/
		for(var c=this.CN-1;c>=0;c--){
			 if(!this.wall[r][c]){return false};
		}
		return true;		
	},
	delRows:function(){
		for(var r=this.RN-1,lines=0;r>=0;r--){
			if(this.isFull(r)){
				this.delRow(r);lines++;r++;
				if(lines==4||!this.wall[r-1].join("")){break;}
			}
		}
		return lines;
	},
	delRow:function(r){
		for(;r>=0;r--){
			this.wall[r]=this.wall[r-1];
			for(var c=0;c<this.wall[r].length;c++){
				this.wall[r][c]&&this.wall[r][c].r++;
			}
			if(!this.wall[r-2].join("")){this.wall[r-1]=new Array(this.CN);break;}
		}
	},
	paint:function(){
		var reg=/<img\ssrc="[^"]+"[^>]*>/g;
		$("div.playground").innerHTML=$("div.playground").innerHTML.replace(reg,"");
		/*
		if($("div.playground img")){
			var moveImg=$("div.playground img");
			for(var i=0;i<moveImg.length;i++){
				moveImg[i].parentNode.removeChild(moveImg[i]);				
			}
		}
		*/		
		this.paintShape();
		this.paintWall();
		this.paintScore();
		this.paintNext();
		this.paintState();
	},
	paintScore:function(){
		$("#score").innerHTML=this.score;
		$("#rows").innerHTML=this.lines;
		$("#level").innerHTML=this.level;
	},
	paintState:function(){
		if(this.state!=this.RUNNING){
			var img=new Image();
			if(this.state==this.GAMEOVER){img.src="img/game-over.png"}
			else if(this.state==this.PAUSE){img.src="img/pause.png"}
			this.pg.appendChild(img);
		}
	},
	paintNext:function(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.nextShape.cells.length;i++){
			var cell=this.nextShape.cells[i];
			var img=new Image();
			img.src=cell.src;
			img.style.left=(cell.c+10)*this.CSIZE+this.OFFSET+"px";
			img.style.top=(cell.r+1)*this.CSIZE+this.OFFSET+"px";
			frag.appendChild(img);
		}
		this.pg.appendChild(frag);
	},
	canRotate:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r<0||cell.r>this.RN-1||cell.c<0||cell.c>this.CN-1||this.wall[cell.r][cell.c]){return false;}
		}
		return true;
	},
	canDown:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.r==this.RN-1||this.wall[(cell.r+1)][cell.c]){return false}
		}
		return true;
	},
	canLeft:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==0||this.wall[(cell.r)][cell.c-1]){return false}
		}
		return true;
	},
	canRight:function(){
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			if(cell.c==(this.CN-1)||this.wall[(cell.r)][cell.c+1]){return false}
		}
		return true;
	},
	moveLeft:function(){
		if(this.canLeft()){this.shape.moveLeft();}
		this.paint();
	},
	moveRight:function(){
		if(this.canRight()){this.shape.moveRight();}
		this.paint();
	},
	moveDown:function(){
		if(this.canDown()){
			this.shape.moveDown();
		}else{
			this.landIntoWall();
			var lines=this.delRows();
			var oldLines=this.lines;
			this.lines+=lines;			
			this.score+=this.SCORES[lines];
			if(!this.isGameOver()){
				this.shape=this.nextShape;
				this.nextShape=this.randomShape();
				if((this.lines!=oldLines)&&(this.lines!=0)&&(this.lines%20==0)){
					clearInterval(this.timer);
					this.timer=setInterval(this.moveDown.bind(this),(this.interval-100>=200)?(this.interval-=100):(this.interval));
					this.level++;
				}
			}else{this.state=this.GAMEOVER;clearInterval(this.timer);this.timer=null}
		}
		this.paint();
	},
	hardDrop:function(){
		while(this.canDown()){
			this.shape.moveDown();
		}
		this.moveDown();
	},
	rotateR:function(){
			this.shape.rotateR();
		if(!this.canRotate()){
			this.shape.rotateL();
		}else{this.paint();}		
	},
	rotateL:function(){
			this.shape.rotateL();
		if(!this.canRotate()){
			this.shape.rotateR();
		}else{this.paint();}		
	},
	landIntoWall:function(){    
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.wall[cell.r][cell.c]=cell;
		}
  },
	paintShape:function(){
		var frag=document.createDocumentFragment();
		for(var i=0;i<this.shape.cells.length;i++){
			var cell=this.shape.cells[i];
			this.addImg(frag,cell);
		}
		this.pg.appendChild(frag);
	},
	paintWall:function(){
		var frag=document.createDocumentFragment();
		for(var r=this.RN-1;r>=0&&this.wall[r].join("");r--){			
			for(var c=0;c<this.CN;c++){
				var cell=this.wall[r][c]
				if(cell){
					this.addImg(frag,cell);
				}
			}
		}
		this.pg.appendChild(frag);
	},
	addImg:function(frag,cell){
		var img=new Image();
		img.src=cell.src;
		img.style.left=cell.c*this.CSIZE+this.OFFSET+"px";
		img.style.top=cell.r*this.CSIZE+this.OFFSET+"px";
		frag.appendChild(img);
	}
}
window.onload=function(){tetris.start();}