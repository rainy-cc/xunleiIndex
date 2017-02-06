window.onload = function(){
	var tabs = document.querySelectorAll('#btn li');		//下边的按钮
	var tabLine = document.querySelector('#btn span');	//下边的按钮
	
	var lis = document.querySelectorAll("#imgWrap li");			//所有的图片
	var texts = document.querySelectorAll("#imgWrap img");		//所有的文字
	var versions = document.querySelectorAll("#imgWrap span");	//所有的版本按钮
	
	var n = 0;		//对应每一个tab的索引值
	
	var tabWidth = tabs[0].offsetWidth;		//存一个tab的宽度，为了在运动线的时候，能够有一个正确的值
	
	var timer = null; 
	
	var footer = document.querySelector(".footer");		//获取底部
	
	for( var i=0; i<tabs.length; i++ ){
		tabs[i].index = i;	//给每一个标签添加一个索引值 ,自定义属性
		texts[i].t = texts[i].offsetTop;		//一上来的时候，先把它们默认的top值存一下
		tabs[i].onmouseover = function(){
			/*
			 * 鼠标移入的时候需要做的事情
			 * 1、tab对应的线条要运动
			 * 2、图片切换
			 * 		当前图片透明度变为1
			 * 3、文字往下运动（上面的运动走完了）
			 * 		位置移动，往下走30px
			 * 		同时透明度变为1
			 * 4、版本按钮显示（上面的运动走完了）
			 * 		透明度变为1
			 */
			
			//鼠标放到按钮上后，要让运动停了
			clearInterval( timer );
			
			n = this.index;		//让n的值与tab的索引对应起来	
			tab();
		};
		
		tabs[i].onmouseout = function(){
			autoPlay();
		};
	};
	
	autoPlay();
	tab();		//一下来就要让动画动起来
	//自动播放
	function autoPlay(){
		timer = setInterval(function(){
			//让n的值有变化
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
			
			move( lis[i], {"opacity":0}, 500, 'linear' );	//所有图片透明度先回到0
			
			texts[i].style.opacity = 0;					//所有的文字透明度都回到0
			texts[i].style.top = texts[i].t+'px';		//让所有的文字的位置都回到最初的状态
			versions[i].style.opacity = 0;				//让所有的版本按钮透明度都回到0
		}
		
		
		move( footer, {"bottom": -90}, 200, 'linear' );//在一上来的时候就让底部下去
		
		
		move( tabLine , {"left": n*65}, 200, 'linear' );	//让线条走到对应的位置
		
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

	/*
	 * 鼠标滚轮事件
	 * mousewhell			IE/Chrome
	 * 		滚动方向：event.wheelDelta
	 * 				上：120  下：-120				
	 * DOMMouseScroll		FF
	 * 		滚动方向：event.detail	
	 * 				上：-3   下：3
	 */
	
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















