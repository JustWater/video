//首页加载图片
/*$.ajax({
	url:"http://zmhwater.vicp.io/videos/2",
	type:'GET',
	async:true, 
	dataType:"json",
	contentType:"application/json;charset=UTF-8",
	success:function(result){
		var imgs = $(".navContent img");
		$.each(result,function(index,val){
			var img = (imgs[index]);
			var picA = $(img).parent();
			$(img).attr("data-original",val.video_imagepath+"/video.jpg");
			$(img).parent().attr("href","videoPlayPage.html?vid="+val.vid);
		})
		$("img.lazy").lazyload({
			effect : "fadeIn" ,
			threshold : 200,
		});
	},
	error:function(result){
		alert(2)
	},
})
*/
$.ajaxGet('http://zmhwater.vicp.io/videos/2?beginpage=1',function(result){
	// console.log(result.list)
	var imgs = $(".navContent img");
	$.each(result.list,function(index,val){
		var img = (imgs[index]);
		var picA = $(img).parent();
		$(img).attr("data-original",val.video_imagepath+"/video.jpg");
		$(img).parent().attr("href","videoPlayPage.html?vid="+val.vid);
	})
	$("img.lazy").lazyload({
		effect : "fadeIn" ,
		threshold : 200,
	});
},true)
//登录成功后


// 轮播图
window.onload = function(){
	var imgBanner = ById("imgBanner");
	var bannerBox = ById("bannerBox");
	var prevPosition = ById("prevPosition");
	var nextPosition = ById("nextPosition");
	var liList = ById("circlePoint").getElementsByTagName("li");
	var aImgWidth = 790;
	var animated = false;
	var timer, timer2;
	var index = 0;
	//点击向左运动
	prevPosition.onclick = function() {
		if (!animated) { //不在运动时才能再次调用
			index--;
			if (index < 0) {
				index = 4;
			}
			showButton(index);
			focusMoveOn(aImgWidth);
		}
	}
	//点击向右运动
	nextPosition.onclick = function() {
		if (!animated) {
			index++;
			if (index > 4) {
				index = 0;
			}
			showButton(index);
			focusMoveOn(-aImgWidth);
		}
	}
	//点击按钮
	for (var i = 0; i < liList.length; i++) {
		liList[i].onclick = function() {
			var currentIndex = this.getAttribute("index");
			if (currentIndex == index) {
				return;
			}
			var range = (index - currentIndex) * aImgWidth;
			showButton(currentIndex);
			index = currentIndex;
			focusMoveOn(range);
		}
	}

	bannerBox.onmouseover = stopPlay;
	bannerBox.onmouseout = startPlay;
	startPlay();
	
	function startPlay() {  //开始运动
		timer2 = setInterval(function() {
			nextPosition.onclick();
		}, 3000);
	}
	
	function stopPlay() { //停止运动
		clearInterval(timer2);
	}

	function showButton(index) { //小圆点按钮显示
		for (var i = 0; i < liList.length; i++) {
			if (liList[i].className == 'active') {
				liList[i].className = '';
				break;
			}
		}
		liList[index].className = 'active';
	}

	function focusMoveOn(range) {   //轮播图运动
		var runTime = 200;
		var runEveryTime = 10;
		var speed = range / (runTime / runEveryTime); //每次运动距离
		var currentLeft = parseInt(imgBanner.style.left) + range; //运动的最终结果
		clearInterval(timer);
		timer = setInterval(function() {
			if ((speed < 0 && parseInt(imgBanner.style.left) > currentLeft) || (speed > 0 && parseInt(imgBanner.style.left) < currentLeft)) { // 未达到目标时
				var lastSpeed = Math.abs(currentLeft - parseInt(imgBanner.style.left));
				//解决因speed不同而可能出现的回弹效果，即最后一次加上speed超过目标值，所以对最后一次进行讨论
				if (lastSpeed < Math.abs(speed)) {
					if (speed < 0) {
						imgBanner.style.left = parseInt(imgBanner.style.left) - lastSpeed + 'px';
					} else {
						imgBanner.style.left = parseInt(imgBanner.style.left) + lastSpeed + 'px';
					}
				} else {
					imgBanner.style.left = parseInt(imgBanner.style.left) + speed + 'px';
				}
				animated = true;
			} else { //达到目标情况以后
				clearInterval(timer);
				imgBanner.style.left = currentLeft + 'px';
				if (currentLeft < -aImgWidth * 5) {
					imgBanner.style.left = -aImgWidth + 'px';
				}
				if (currentLeft > -aImgWidth) {
					imgBanner.style.left = -aImgWidth * 5 + 'px';
				}
				animated = false;
			}
		}, 10);
	}
	function ById(id){
		return document.getElementById(id);
	}
}

