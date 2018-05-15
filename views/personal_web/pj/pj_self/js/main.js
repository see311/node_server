var ctx=mySkills.getContext('2d');
var data={
	datasets:[{
		data:[
			80,78,73,78,55,80,73
		],
		backgroundColor:[
			"#FF6384",
			"#4BC0C0",
			"#FFCE56",
			"#36A2EB",
			"#E7E9ED",					
			"#FF6384",
			"#FFCE56"					
		],
		label:'My skills'
	}],
	labels:[
		'HTML',				
		'JavaScript',
		'AngularJS',
		'JQuery',						
		'Others',
		'CSS',
		'Bootstrap'				
	]
};
new Chart(ctx,{
	data:data,
	type:'polarArea'
});
function rNum(max,min){
	if(arguments.length==1){
		return Math.floor(Math.random()*(max+1));
	}else{
		return Math.floor(Math.random()*(max-min+1)+min);
	}
}
function rColor(max,min,a){
	if(arguments.length==2){
		return 'rgba('+rNum(max,min)+','+rNum(max,min)+','+rNum(max,min)+',.3)';
	}else if(arguments.length==3){
		return 'rgba('+rNum(max,min)+','+rNum(max,min)+','+rNum(max,min)+','+a+')';
	}
}
function createCircle(){
	var viewW=parseFloat(getComputedStyle(s1).width);
	var viewH=parseFloat(getComputedStyle(s1).height);
	for(var i=0;i<15;i++){
		var r=rNum(80,30);
		var cx=rNum(viewW-r,0+r);
		var cy=rNum(viewH-r,0+r);		
		var circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
		circle.setAttribute('cx',cx);
		circle.setAttribute('cy',cy);
		circle.setAttribute('r',r);
		circle.setAttribute('opacity',1);
		circle.setAttribute('fill',rColor(255,0));
		s1.appendChild(circle);
	}
};
var timer=null;
s1.addEventListener('click',function(e){			
	var target=e.target;
	if(target.nodeName=='svg'){
		if(timer==null){
			var cx=e.offsetX;
			var cy=e.offsetY;
			var circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
			circle.setAttribute('cx',cx);
			circle.setAttribute('cy',cy);
			circle.setAttribute('fill',rColor(255,0,1));
			s1.appendChild(circle);
			var opa=1;
			var rc=0;				
			timer=setInterval(function(){
				opa-=0.03;
				rc+=3;
				circle.setAttribute('r',rc);
				circle.setAttribute('opacity',opa);
				if(opa<=0){
					circle.parentNode.removeChild(circle);
					clearInterval(timer);
					timer=null;
				}
			},20);
		}
	}
	if(target.nodeName=='circle'){
		var r=parseInt(target.getAttribute('r'));
		var o=parseInt(target.getAttribute('opacity'));
		if(timer==null){
			timer=setInterval(function(){					
				o=o.toFixed(2)-0.05;
				r+=5;
				target.setAttribute('r',r);
				target.setAttribute('opacity',o);
				if(o<=0){
					if(target.parentNode){
						target.parentNode.removeChild(target);
					}
					clearInterval(timer);
					timer=null;
					if(s1.innerHTML==''){
						createCircle();
					}
				}
			},20);
		}
	}
});
window.onload=function(){
	createCircle();
}