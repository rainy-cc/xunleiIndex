window.onload = function(){
	var tabs = document.querySelectorAll('#btn li');	
	var tabLine = document.querySelector('#btn span');
	
	var lis = document.querySelectorAll("#imgWrap li");			
	var texts = document.querySelectorAll("#imgWrap img");		
	var versions = document.querySelectorAll("#imgWrap span");	
	
	var n = 0;		
	
	var tabWidth = tabs[0].offsetWidth;		
	
	var timer = null; 
	
	var footer = document.querySelector(".footer");		
	
	for( var i=0; i<tabs.length; i++ ){
		tabs[i].index = i;	
		texts[i].t = texts[i].offsetTop;		
		tabs[i].onmouseover = function(){
			//鼠标放到按钮上后，要让运动停了
			clearInterval( timer );
			
			n = this.index;		
			tab();
		};
		
		tabs[i].onmouseout = function(){
			autoPlay();
		};
	};
	
	autoPlay();
	tab();		
	//自动播放
	function autoPlay(){
		timer = setInterval(function(){
			n++;
			if(n == tabs.length){//这个条件成立，说明已经走到最后，要让他回去
				n = 0;
			};
			tab();
		}, 2000);
	};

	function tab(){
		//用来让所有的运动都回到最初的状态
		for( var i=0; i<tabs.length; i++ ){
			//把所有的图片透明度设为0
			//lis[i].style.opacity=0;
			
			clearInterval( texts[i].timer );
			clearInterval( versions[i].timer );
			
			move( lis[i], {"opacity":0}, 500, 'linear' );
			
			texts[i].style.opacity = 0;					
			texts[i].style.top = texts[i].t+'px';		
			versions[i].style.opacity = 0;		
		}
		
		
		move( footer, {"bottom": -90}, 200, 'linear' );
		
		
		move( tabLine , {"left": n*65}, 200, 'linear' );	
		
		//让大图切换
		move( lis[n], {"opacity":1}, 500, 'linear', function(){
			//大图over，运动文字action;
			move( texts[n], {"opacity":1,"top":texts[n].t+30}, 500, 'linear', function(){
				//文字over，版本按钮action;
				move( versions[n], {"opacity":1}, 500, 'linear' );
			});
		});
	};
	
	
	//右侧内容
	var more = document.getElementById("more");
	var nav = document.getElementById("nav");
	var subLis = document.querySelectorAll("#nav li");
	var circle = document.querySelector("#nav span");
	
	more.onmouseenter = nav.onmouseenter = function(){
		move( nav, {"right": 0}, 200, 'linear' );
	};
	
	more.onmouseleave = nav.onmouseleave = function(){
		move( nav, {"right": -162} ,200, 'linear' );
		circle.style.display = 'none';		//鼠标移开的时候，要让他不显示，同时位置要回到最初的地方
		circle.style.top = '108px';
	};
	
	
	//给每一个li添加事件
	for( var i=0; i<subLis.length;i++ ){
		subLis[i].onmouseover = function(){
			
			circle.style.display = 'block';
			
			move( circle, {"top": this.offsetTop+6}, 200, 'linear' );
		};
	}
	
	
	//底部内容
	
	mouseScroll(document,function(){
		//鼠标往上走的时候，让footer出来
		move( footer, {"bottom": 0}, 200, 'linear' );
	},function(){
		//鼠标往下走的时候，让footer进去
		move( footer, {"bottom": -90}, 200, 'linear' );
	});


	//封装鼠标滚轮事件
	function mouseScroll(obj,callBackUp,callBackDown){
		
		obj.onmousewheel = fn;
		//兼容非标准IE
		if(obj.addEventListener){
			obj.addEventListener( 'DOMMouseScroll', fn );
		};
		
		function fn(ev){
			var ev = ev || window.event;
			if( ev.wheelDelta == 120 || ev.detail == -3 ){
				
				callBackUp.call(obj);
				
			}else{
				
				callBackDown.call(obj);
				
			}
			
			ev.preventDefault();		//阻止默认body滚动的事件
			return false;				//阻止默认body滚动的事件
		};
		
	};
	
};















