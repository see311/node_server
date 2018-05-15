function Cell(r,c,src){ //建立每个方块的构造函数，保存方块的行列位置和图片链接信息
	this.r=r;
	this.c=c;
	this.src=src;
}
function State(r0,c0,r1,c1,r2,c2,r3,c3){ //保存每个方块位置状态信息的构造函数
	this.r0=r0; this.c0=c0;
	this.r1=r1; this.c1=c1;
	this.r2=r2; this.c2=c2;
	this.r3=r3; this.c3=c3;
}
function Shape(cells,orgi,states){ //生成每种图形的构造函数，
	this.cells=cells; //每个方块的信息
	this.orgi=orgi; //旋转时的参照方块
	this.states=states; //旋转时所有可能的位置
	this.statei=0; //旋转后的位置
}
Shape.prototype.IMGS={
	T:"img/T.png",
	I:"img/I.png",
	O:"img/O.png",
	J:"img/J.png",
	L:"img/L.png",
	S:"img/S.png",
	Z:"img/Z.png"
}
Shape.prototype.moveDown=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].r++;
	}
}
Shape.prototype.moveLeft=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c--;
	}
}
Shape.prototype.moveRight=function(){
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].c++;
	}
}
Shape.prototype.rotateR=function(){
	this.statei++;
	if(this.statei==this.states.length){
		this.statei=0		
	}
	this.rotate();
}
Shape.prototype.rotateL=function(){
	this.statei--;
	if(this.statei==-1){
		this.statei=this.states.length-1;		
	}
	this.rotate();
		
}
Shape.prototype.rotate=function(){
	var state=this.states[this.statei];
	var orgCell=this.cells[this.orgi];
	for(var i=0;i<this.cells.length;i++){
		if(i!=this.orgi){
			this.cells[i].r=orgCell.r+state["r"+i];
			this.cells[i].c=orgCell.c+state["c"+i];
		}
	}
}
function T(){
	var src=this.IMGS.T;
	Shape.call(this,[new Cell(0,3,src),new Cell(0,4,src),new Cell(0,5,src),new Cell(1,4,src)],1,[
		new State(0,-1,0,0,0,1,1,0),
		new State(-1,0,0,0,1,0,0,-1),
		new State(0,1,0,0,0,-1,-1,0),
		new State(1,0,0,0,-1,0,0,1)
	])
}
Object.setPrototypeOf(T.prototype,Shape.prototype);
function I(){
	var src=this.IMGS.I;
	Shape.call(this,[new Cell(0,3,src),new Cell(0,4,src),new Cell(0,5,src),new Cell(0,6,src)],1,[
		new State(0,-1,0,0,0,1,0,2),
		new State(-1,0,0,0,1,0,2,0)
	])
}
Object.setPrototypeOf(I.prototype,Shape.prototype);
function O(){
	var src=this.IMGS.O;
	Shape.call(this,[new Cell(0,4,src),new Cell(0,5,src),new Cell(1,4,src),new Cell(1,5,src)],1,[
		new State(0,-1,0,0,1,-1,1,0)
	])
}
Object.setPrototypeOf(O.prototype,Shape.prototype);


