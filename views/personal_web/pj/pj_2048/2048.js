//设置全局函数的cookie保存最高分
function getCookie(cookieName){
	var str=document.cookie;
	var i=-1;
	if((i=str.indexOf(cookieName+"="))!=-1){
		var start=i+cookieName.length+1;
		var end=str.indexOf(";",start);
		return str.slice(start,end==-1?str.length:end);
	}else{
		return null;
	}
}
function setCookie(cookieName,value){
	var date=new Date();
	date.setFullYear(date.getFullYear()+1);
	document.cookie=cookieName+"="+value+";expires="+date.toGMTString();
}

var game={
	data:null, //保存二维数组
	RN:4, //总行数
	CN:4, //总列数
	score:0,
	state:1, //运行状态
	RUNNING:1,
	GAMEOVER:0,
	top:0,
	CSIZE:100,
	OFFSET:16,
	init:function(){ //自定义宽高
		var width=this.CN*(this.CSIZE+this.OFFSET)+this.OFFSET;
		var height=this.RN*(this.CSIZE+this.OFFSET)+this.OFFSET;
		gridPanel.style.width=width+"px";
		gridPanel.style.height=height+"px";
		for(var r=0,arr=[];r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				arr.push(""+r+c);
			}
		}
		gridPanel.innerHTML='<div id="g'+arr.join('" class="grid"></div><div id="g')+'" class="grid"></div>'
		+'<div id="c'+arr.join('" class="cell"></div><div id="c')+'" class="cell"></div>';
	},
	start:function(){ //启动游戏
		this.init();
		this.top=getCookie("top")||0;
		this.state=this.RUNNING;
		this.score=0;
		this.data=[];
		for(var r=0;r<this.RN;r++){
			this.data.push([]);
			for(var c=0;c<this.CN;c++){
				this.data[r][c]=0;				
			}
		}
		this.randomNum();
		this.randomNum();
		this.updateView();
		var me=this;
		document.onkeydown=function(e){
			if(me.state==me.RUNNING){
				switch(e.keyCode){
					case 37:me.moveLeft();break;
					case 38:me.moveUp();break;
					case 39:me.moveRight();break;
					case 40:me.moveDown();break;
				}
			}
		}		
	},
	isGameOver:function(){
		for(var r=0;r<this.data.length;r++){
			for(var c=0;c<this.data[r].length;c++){
				if(this.data[r][c]==0){return false;}
				if(r<this.data.length-1&&this.data[r][c]==this.data[r+1][c]){return false;}
				if(c<this.data[r].length-1&&this.data[r][c]==this.data[r][c+1]){return false;}
			}
		}
		return true;
	},
	move:function(fun){ 
		var before=String(this.data);
		fun.call(this);
		var after=String(this.data);
		if(before!=after){
			this.randomNum();
			//检查游戏是否结束
			if(this.isGameOver()){
				this.state=this.GAMEOVER;
				this.score>this.top&&setCookie("top",this.score)
			}
			this.updateView();
		}
	},
	moveLeft:function(){
		this.move(
			function(){
				for(var r=0;r<this.RN;r++){this.moveLeftInRow(r)}
			}
		);		
	},
	moveRight:function(){
		this.move(
			function(){
				for(var r=0;r<this.RN;r++){this.moveRightInRow(r);}
			}
		);
	},
	moveUp:function(){
		this.move(
			function(){
				for(var c=0;c<this.CN;c++){this.moveUpInCol(c);}
			}
		);
	},
	moveDown:function(){
		this.move(
			function(){
				for(var c=0;c<this.CN;c++){this.moveDownInCol(c);}
			}
		);
	},
	moveLeftInRow:function(r){
		for(var c=0;c<this.CN-1;c++){
			var nextc=this.getNextInRow(r,c);
			if(nextc==-1){break;}
			else if(this.data[r][c]==0){
					this.data[r][c]=this.data[r][nextc];
					this.data[r][nextc]=0;
					c--;
			}else if(this.data[r][c]==this.data[r][nextc]){
					this.score+=(this.data[r][c]*=2);
					this.data[r][nextc]=0;
			}
		}	
	},
	moveRightInRow:function(r){
		for(var c=this.CN-1;c>0;c--){
			var prevc=this.getPrevInRow(r,c);
			if(prevc==-1){break;}
			else if(this.data[r][c]==0){
				this.data[r][c]=this.data[r][prevc];
				this.data[r][prevc]=0;
				c++;
			}else if(this.data[r][c]==this.data[r][prevc]){
				this.score+=(this.data[r][c]*=2);
				this.data[r][prevc]=0;
			}
		}
	},
	moveUpInCol:function(c){
		for(var r=0;r<this.RN-1;r++){
			var nextr=this.getNextInCol(r,c);
			if(nextr==-1){break;}
			else if(this.data[r][c]==0){
					this.data[r][c]=this.data[nextr][c];
					this.data[nextr][c]=0;
					r--;
			}else if(this.data[r][c]==this.data[nextr][c]){
					this.score+=(this.data[r][c]*=2);
					this.data[nextr][c]=0;
			}
		}	
	},
	moveDownInCol:function(c){
		for(var r=this.RN-1;r>0;r--){
			var prevr=this.getPrevInCol(r,c);
			if(prevr==-1){break;}
			else if(this.data[r][c]==0){
					this.data[r][c]=this.data[prevr][c];
					this.data[prevr][c]=0;
					r++;
			}else if(this.data[r][c]==this.data[prevr][c]){
					this.score+=(this.data[r][c]*=2);
					this.data[prevr][c]=0;
			}
		}	
	},
	getNextInRow:function(r,c){
		for(var nextc=c+1;nextc<this.CN;nextc++){
			if(this.data[r][nextc]!=0){return nextc;}			
		}
		return -1;
	},
	getPrevInRow:function(r,c){
		for(var prevc=c-1;prevc>=0;prevc--){
			if(this.data[r][prevc]!=0){return prevc;}
		}
		return -1;
	},
	getNextInCol:function(r,c){
		for(var nextr=r+1;nextr<this.RN;nextr++){
			if(this.data[nextr][c]!=0){return nextr;}
		}
		return-1;
	},
	getPrevInCol:function(r,c){
		for(var prevr=r-1;prevr>=0;prevr--){
			if(this.data[prevr][c]!=0){return prevr;}
		}
		return-1;
	},
	updateView:function(){ //更新显示界面
		topScore.innerHTML=this.top;
		for(var r=0;r<this.RN;r++){
			for(var c=0;c<this.CN;c++){
				var div=document.getElementById("c"+r+c);
				if(this.data[r][c]==0){
					div.innerHTML="";
					div.className="cell";
				}else{
					div.innerHTML=this.data[r][c];	
					div.className="cell n"+this.data[r][c];
				}				
			}
		}
		score.innerHTML=this.score;
		if(this.state==this.GAMEOVER){final.innerHTML=this.score;}	
		gameOver.style.display=this.state==this.GAMEOVER?"block":"none";
	},
	randomNum:function(){ //在一个随机位置生成一个数字
		while(1){
			var r=Math.floor(Math.random()*this.RN);
			var c=Math.floor(Math.random()*this.CN);
			if(this.data[r][c]==0){
				this.data[r][c]=Math.random()<0.7?2:4;
				break;
			}			
		}
	}
}
window.onload=function(){game.start()};