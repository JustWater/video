// 置顶 jq

$(document).on('click','#toTop',function(){
	$("html,body").animate({"scrollTop":0},"fast");
})
showHideToTop();
$(window).scroll(function(){
	showHideToTop();
})

function showHideToTop(){
	var toTop = $("#toTop");
	if ($(window).scrollTop()>100) {
		toTop.show();
	}else{
		toTop.hide();
	}
}
//置顶js
// /*window.onload = function(){
// 	var toTop = document.getElementById("toTop");
// 	var timer = null;
// 	/*toTop.onclick=function(){
// 		clearInterval(timer);
// 		timer = setInterval(() => {
// 		  // Todo...
// 		  var scrollTopVal = document.body.scrollTop || document.documentElement.scrollTop;
// 		  if (scrollTopVal>0) {
// 		  	document.body.scrollTop = document.documentElement.scrollTop = scrollTopVal - 50;

// 		  }else{
// 		  	clearInterval(timer);

// 		  }
// 		}, 10);
// 	}*/
// 	toTop.onclick = function(){
// 		clearTimeout(timer);
// 		timer = setTimeout(function fn() {
// 		  // Todo...
// 		  var scrollTopVal = document.body.scrollTop || document.documentElement.scrollTop;
// 		  if (scrollTopVal>0) {
// 		  	document.body.scrollTop = document.documentElement.scrollTop = scrollTopVal - 50;
// 		  	timer = setTimeout(fn,10);
// 		  }else{
// 		  	clearInterval(timer);
// 		  }
// 		}, 10)
// 	}
// 	/*toTop.onclick = function(){
// 		cancelAnimationFrame(timer);
// 		timer = requestAnimationFrame(function fn(){
// 			var scrollTopVal = document.body.scrollTop || document.documentElement.scrollTop;
// 			if (scrollTopVal > 0) {
// 				document.body.scrollTop = document.documentElement.scrollTop = scrollTopVal - 50;
// 				timer = requestAnimationFrame(fn);
// 			}else{
// 				cancelAnimationFrame(timer);
// 			}
// 		})
// 	}*/
// 	showHideToTop();
// 	function showHideToTop(){
// 		var scrollTopVal = document.body.scrollTop || document.documentElement.scrollTop;
// 		if (scrollTopVal>100) {
// 			toTop.style.display="block";
// 		}else{
// 			toTop.style.display = "none";
// 		}
// 	}
// 	document.onscroll = function(){
// 		showHideToTop();
// 	}
// }*/

// 弹出提示框
function showMask(type,mes){
	var timer = null;
	var oDiv = $('<div class="mask"><div class="maskContent"><i></i><span></span></div></div>');
	$("body").append(oDiv);
	var documentHeight = $(document).height();
	$(".mask").css("height",documentHeight);
	if (type == 'warning') {
		$('.maskContent i').addClass('icon1');
	}
	else if (type == 'success') {
		$('.maskContent i').addClass('icon2');
	}
	else if (type == 'error') {
		$('.maskContent i').addClass('icon3');
	}
	$('.maskContent span').text(mes);
	oDiv.fadeIn();
	timer = setTimeout(() => {
		oDiv.remove();
	}, 1200);
}

//登录注册
$(function(){
	var logRegDiv = $("#logRegDiv");
	var maskDiv = $("#maskDiv");
	var nPattern = /^[0-9]{3,6}$/;
	var uPattern = /^[a-zA-Z0-9_-]{4,16}$/; 
	var pPattern = /^[a-zA-Z0-9]{6,10}$/; //必须且只含有数字和字母，6-10位
	maskHeight();
	//点击登录
	$(document).on('click','.login',function(){
		if ($("#loginMaskDiv").text()!="") {
			var loginMaskDiv = $("#loginMaskDiv");
			loginMaskDiv.show();
		}else{
			var loginMaskDiv = $("<div id='loginMaskDiv'></div>");
			var loginContent = '<div class="userMaskDiv">' +
			'<h3>账号登录</h3>' +
			'<b id = "closeLogin"></b>' +
			'<form>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting">用户名：</div>' +
			'<div>' +
			'<input type="text" placeholder="请输入用户名" id="logUser" class="rightInput"/>' +
			'</div>' +
			'</div>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting">密 码：</div>' +
			'<div>' +
			'<input type="password" placeholder="请输入密码" id="logPwd" class="rightInput"/>' +
			'</div>' +
			'</div>' +
			'<div class ="rowDiv">' +
			'<div class ="chooseSave" >' +
			'<input type="checkbox" id ="checkbox" class="leftInput"/>' +
			'<span class="spanRight">记住密码</span>' +
			'</div>' +
			'</div>' +
			'<input type="button" value="登录" id="checkIn" class="userBtn" />' +
			'</form>' +
			'<div>';
			loginMaskDiv.html(loginContent);
			logRegDiv.append(loginMaskDiv);
		}
		maskDiv.show();
		makePosition("login");
		$("#closeLogin").on('click',function(){
			closeMaskDiv("loginMaskDiv");
		})
		$("#checkIn").on('click',function(){
			var logUserVal = $("#logUser").val(),
			logPwdVal =$("#logPwd").val();
			if(logUserVal==''){
				showMask("warning","用户名、密码不能为空");
			}else if(logPwdVal==""){
				showMask("warning","用户名、密码不能为空");
			}else{
				var url = "http://zmhwater.vicp.io/videousers/1";
				var data = '{"accountnumber":"'+logUserVal+'","password":"'+logPwdVal+'"}';
				$.ajax({
					url:url,
					type:'POST',
					data: data,
					dataType:"json",
					contentType:"application/json;charset=UTF-8",
					success:function(result){
						showMask("success","登录成功");
						loginMaskDiv.hide();
						changeBtn(result,"loginMaskDiv");
						console.log(result);
					},
					error:function(result){
						showMask("error","账号信息不正确");
					}
				})
			}
		})
	})
	// $("#logRegDiv").children().keyDown(function(e){
	// 	if (e.keyCode == 13) {
	// 		alert(1)
	// 	}
	// })
	$(document).on('keydown','#loginMaskDiv',function(e){
		if(e.keyCode == "13"){
			$("#checkIn").click();
		}
	})
	$(document).on('keydown','#registerMaskDiv',function(e){
		if(e.keyCode == "13"){
			$("#registerIn").click();
		}
	})
	//点击注册
	$(document).on('click','.register',function(){
		if ($("#registerMaskDiv").text()!="") {
			var registerMaskDiv = $("#registerMaskDiv");
			registerMaskDiv.show();
		}else{
			var registerMaskDiv = $("<div id='registerMaskDiv'></div>");
			var registerContent = 
			'<div class="userMaskDiv">' +
			'<h3>账号注册</h3>' +
			'<b id = "closeRegister"></b>' +
			'<form>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting">用户账号：</div>' +
			'<div>' +
			'<input type="text" placeholder="请输入用户账号" id="regUserNum" class="rightInput" index = "1"/>' +
			'<span class="spanNormal"></span>' +
			'</div>' +
			'</div>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting">用户昵称：</div>' +
			'<div>' +
			'<input type="text" placeholder="请输入用户昵称" id="regUser" class="rightInput" index = "2"/>' +
			'<span class="spanNormal"></span>' +
			'</div>' +
			'</div>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting">密码：</div>' +
			'<div>' +
			'<input type="password" placeholder="请输入密码" id="regPwd" class="rightInput" index = "3"/>' +
			'<span class="spanNormal"></span>' +
			'</div>' +
			'</div>' +
			'<div class ="rowDiv">' +
			'<div class="userSetting" >确认密码：</div>' +
			'<div>' +
			'<input type="password" placeholder="请再次输入密码" class="rightInput" index = "4" id="regPwdAga"/>' +
			'<span class="spanNormal"></span>' +
			'</div>' +
			'</div>' +
			'<div class = "tipDiv" id="tipDiv">'+
			'</div>'+
			'<input type="button" value="注册" id="registerIn" class="userBtn checkBtn" />' +
			'</form>'+
			'</div>';
			registerMaskDiv.html(registerContent);
			logRegDiv.append(registerMaskDiv);
		}
		maskDiv.show();
		makePosition("register");
		$("#closeRegister").on('click',function(){
			closeMaskDiv("registerMaskDiv");
		})
	})
	/*//失去焦点注册输入框
	$(document).on("blur",'.rightInput',function(){
		var regUser = $("#regUser"),
		regPwd =$("#regPwd");
		regPwdAga = $("#regPwdAga");
		var index = parseInt($(this).attr("index"));
		var tipDiv = $("#tipDiv"); 
		if($(this).val()==""){
			if (index == 3) {
				tipDiv.text("请输入密码");
			}else{
				var inputLine = $(this).parent().prev().text().split("：")[0];
				if(inputLine=="确认密码"){
					tipDiv.text("请输入密码");
					$(this).attr("placeholder","请再次输入密码");
				}else{
					tipDiv.text("请输入"+inputLine);
					$(this).attr("placeholder","请输入"+inputLine);
				};
			}
			tipDiv.addClass("tipDivWrong");
		}else{
			switch(index){
				case 1:
				checkReg(uPattern,regUser,tipDiv,"用户名输入错误",$(this));
				break;
				case 2:
				checkReg(pPattern,regPwd,tipDiv,"密码输入错误",$(this));
				break;
				case 3:
				checkReg(pPattern,regPwdAga,tipDiv," ",$(this));
				break;
			}
		}
	})
	//点击注册输入框
	$(document).on('click','.rightInput',function(){
		var tipDiv = $("#tipDiv"); 
		tipDiv.removeClass("tipDivWrong");
		tipDiv.removeClass("tipDivTrue");
		tipDiv.text("");
		$(this).attr("placeholder","");
		var spanNormal =$(this).next();
		if(spanNormal.hasClass("ok")){
			spanNormal.removeClass("ok");
		}
	})
	//点击注册按钮
	$(document).on('click','#registerIn',function(){
		var spanNormal =$('.spanNormal');
		var tipDiv = $("#tipDiv"); 
		var flag;
		spanNormal.each(function(){
			if(!$(this).hasClass("ok")){  //这里判断如果没有打勾
				tipDiv.addClass("tipDivWrong");
				var inputLine = $(this).parent().prev().text().split("：")[0];
				if(inputLine=="确认密码"){
					tipDiv.text("请正确输入密码");
				}else{
					tipDiv.text("请正确输入"+inputLine);
				}
				flag = false;
				return;
			}else{
				flag = true;
			}
		})
		if (flag) {

		}
		
	})*/
	$(document).on("blur",'.rightInput',function(){
		var obj = $(this);
		var tipDiv =$("#tipDiv");
		var index = parseInt(obj.attr("index"));
		var spanNormal = obj.next();
		if (obj.val()=="") {  //是否为空
			var inputLine = $(this).parent().prev().text().split("：")[0];
			if (inputLine=="确认密码") {
				obj.attr("placeholder","请再次输入密码");
				tipDiv.text("请再次输入密码");
			}else{
				obj.attr("placeholder","请输入"+inputLine);
				tipDiv.text("请输入"+inputLine);
			}
			tipDiv.addClass("tipDivWrong");
		}else{
			switch(index){
				case 1:
					// checkReg(uPattern,regUser,tipDiv,"用户名输入错误",$(this));
					var regUserNum =$("#regUserNum");
					if (!nPattern.test(regUserNum.val())) {
						tipDiv.text("用户账号正则规则");
						tipDiv.addClass("tipDivWrong");
					}else{
						tipDiv.text("");
						tipDiv.removeClass("tipDivWrong");
						spanNormal.addClass("ok");
						/*var url = "http://zmhwater.vicp.io/videousers";
						var data = '{"accountnumber":"'+obj.val()+'"}';
						console.log(data)
						$.ajax({
							url:url,
							type:'POST',
							data: data,
							dataType:"json",
							contentType:"application/json;charset=UTF-8",
							success:function(result){
								// loginMaskDiv.hide();
								// showMask("success","登录成功");
								// changeBtn(result,"loginMaskDiv");
								alert(1)

							},
							error:function(result){
								// showMask("error","账号信息不正确");
								alert(2)
							}
						})*/
					}
					break;
					case 2:
					// checkReg(pPattern,regPwd,tipDiv,"密码输入错误",$(this));
					var regUser = $("#regUser");
					if (!uPattern.test(regUser.val())) {
						tipDiv.text("用户昵称正则规则");
						tipDiv.addClass("tipDivWrong");
					}else{
						tipDiv.text("");
						tipDiv.removeClass("tipDivWrong");
						spanNormal.addClass("ok");
					}
					break;
					case 3:
					var regPwd = $("#regPwd");
					console.log(!pPattern.test(regPwd.val()))
					if (!pPattern.test(regPwd.val())) {
						tipDiv.text("密码正则规则");
						tipDiv.addClass("tipDivWrong");
					}else{
						tipDiv.text("");
						tipDiv.removeClass("tipDivWrong");
						spanNormal.addClass("ok");
					}
					// checkReg(pPattern,regPwdAga,tipDiv," ",$(this));
					break;
					case 4:
					var regPwd = $("#regPwd");
					var regPwdAga = $("#regPwdAga");
					if (regPwd.val()=="") {
						tipDiv.text("密码不能为空");
						tipDiv.addClass("tipDivWrong");
					}else{
						if (!pPattern.test(regPwd.val())) {
							tipDiv.text("请先正确输入密码");
							tipDiv.addClass("tipDivWrong");
						}else{
							if (regPwdAga.val() == regPwd.val()) {
								tipDiv.text("");
								tipDiv.removeClass("tipDivWrong");
								spanNormal.addClass("ok");
							}else{
								tipDiv.text("两次密码不一致");
								tipDiv.addClass("tipDivWrong");
							}
						}
					}
					break;
				}
			}
		})
	$(document).on('click','.rightInput',function(){
		var obj = $(this);
		if (obj.val()=="") {
			obj.attr("placeholder","");
		}else{
			if (obj.next().hasClass("ok")) {
				obj.next().removeClass("ok");
			}
		}
	})
	// 点击注册框里的注册按钮
	$(document).on('click','#registerIn',function(){
		/*var regUserNum = $("#regUserNum");
		var regUser = $("#regUser");
		var regPwd = $("#regPwd");
		var regPwdAga = $("#regPwdAga");
		if (regUserNum.val()=="") {
			showMask("warning","用户账号不为空");
		}else if (regUser.val()=="") {
			showMask("warning","用户昵称不为空");
		}else if (regPwd.val()=="" ) {
			showMask("warning","密码不为空");
		}else if(regPwdAga.val()==""){
			showMask("warning","请确认密码");
		}else{
			if (!nPattern.test(regUserNum.val())) {
				showMask("warning","用户账号不符合规则");
			}else if(!uPattern.test(regUser.val())){
				showMask("warning","用户昵称不符合规则");
			}else if(!pPattern.test(regPwd.val())){
				showMask("warning","密码不符合规则");
			}else if(regPwdAga.val() != regPwd.val()){
				showMask("warning","两次密码不一致");
			}else{
				//ajax重复
				if (regUserNum.val()) {}
			}
	}*/
	var spanNormalOk = $(".spanNormal.ok");
	var rowDiv = $(".rowDiv");
	if (spanNormalOk.length == rowDiv.length) {
			//ajax
			alert("ajax");
		}else{
			var regUserNum = $("#regUserNum");
			var regUser = $("#regUser");
			var regPwd = $("#regPwd");
			var regPwdAga = $("#regPwdAga");
			if (regUserNum.val()=="") {
				showMask("warning","用户账号不为空");
			}else if (regUser.val()=="") {
				showMask("warning","用户昵称不为空");
			}else if (regPwd.val()=="" ) {
				showMask("warning","密码不为空");
			}else if(regPwdAga.val()==""){
				showMask("warning","请确认密码");
			}else{
				if (!nPattern.test(regUserNum.val())) {
					showMask("warning","用户账号不符合规则");
				}else if(!uPattern.test(regUser.val())){
					showMask("warning","用户昵称不符合规则");
				}else if(!pPattern.test(regPwd.val())){
					showMask("warning","密码不符合规则");
				}else if(regPwdAga.val() != regPwd.val()){
					showMask("warning","两次密码不一致");
				}else{
					//ajax重复
					if (regUserNum.val()) {}
				}
		}
	}

})
})
// 遮罩层的高度获取
function maskHeight(){
	var height = $(document).height();
	$("#maskDiv").css({"height":height})
}
//弹出层关闭按钮
function closeMaskDiv(objDiv){
	var curMaskDiv = $("#"+objDiv);
	curMaskDiv.hide();
	$("#maskDiv").hide();
}
// 登录注册框定位
function makePosition(id){
	var curId = (id+"MaskDiv");
	var curMaskDiv = $("#"+curId);
	var sWidth = $(window).width();
	var sHeight = $(window).height();
	var objMaskDivWidth = curMaskDiv.width();
	var objMaskDivHeight = curMaskDiv.height();
	curMaskDiv.css({"left":parseInt((sWidth - objMaskDivWidth) / 2) + 'px',
		"top":parseInt((sHeight - objMaskDivHeight) / 2) + 'px'})
}
//登录成功后出现用户
function changeBtn(result,objDiv){
	$("#login").remove();
	$("#register").remove();
	$("#"+objDiv).remove();
	$("#maskDiv").hide();
	var userBehavior = $(".userBehavior");
	var userLogo = $("<div id='userLogo' class='userLogo'></div>");
	var userName = $("<div id='userName' class='userName'></div>");
	userName.text("Hello," + result.name);
	userBehavior.append(userLogo);
	userBehavior.append(userName);
	var userContent = userBehavior.find("#userContent");
	userBehavior.hover(function(){
		userContent.show();
	},function(){
		userContent.hide();
	})
}
$(window).resize(function(){
	if ( $("#logRegDiv").find("#loginMaskDiv").is(":visible")) {
		makePosition("login");
	}
	else if( $("#logRegDiv").find("#registerMaskDiv").is(":visible")){
		makePosition("register");
	}
})

/*分页*/
var pageAll = 1;
$(function(){
	var sel = $("#sel");
	var putPageNum = $(".putPageNum");
	for (var i = 1; i < pageAll; i++) {
		var option = $("<option value = "+(i+1)+" class ='chooseOption'>"+(i+1)+"</option>");
		sel.append(option);
	}
	if (pageAll<5) {
		for (var i = 1; i < pageAll; i++) {
			var li = $("<li index="+(i+1)+" class='pageNum'>"+(i+1)+"</li>");
			putPageNum.append(li);
		}
	}else{
		for (var i = 1; i < 5; i++) {
			var li = $("<li index="+(i+1)+" class='pageNum'>"+(i+1)+"</li>");
			putPageNum.append(li);
		}
	}
	pagePosition();
})
$(document).on('click','#paging',function(e){
	var obj = e.target || e.srcElement;
	switch(obj.className || obj.id){
		case 'pageFirst':
		comeFirst(1,0);
		break;
		case 'pageLast':
		comeFirst(pageAll,1);
		break;
		case 'pagePrev':
		prevPage();
		break;
		case 'pageNext':
		nextPage();
		break;
		case 'pageNum':
		pageBtn($(obj).attr("index"));
		break;
		case 'turnTo':
		turnToPage();
	}
})
// 首页、尾页
function comeFirst(Index,num){
	$(".pageNum").removeClass("on");
	if (pageAll <= 5) {
		$(".paging").find('*[index='+Index+']').addClass("on");
	}else{
		/*if (num==0) {
			var firstNumIndex = parseInt($("#pagePrev").next().attr("index"));
			if(firstNumIndex == Index){
				$(".paging").find('*[index='+Index+']').addClass("on");
			}else{
				$(".pageNum").remove();
				for (var i = Index; i < Index+5; i++) {
					var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
					$("#pageNext").before(li);
				}
				$(".paging").find('*[index='+Index+']').addClass("on");
			}
		}else{
			var lastNumIndex = parseInt($("#pageNext").prev().attr("index"));
			if(lastNumIndex == Index){
				$(".paging").find('*[index='+Index+']').addClass("on");
			}else{
				$(".pageNum").remove();
				for(var j = Index-5; j < Index; j++){
					var jIn = j+1;
					var li = $("<li index="+jIn+" class='pageNum'>"+jIn+"</li>");
					$("#pageNext").before(li);

				}
				$(".paging").find('*[index='+Index+']').addClass("on");
			}
		}*/
		var index = $(".pageNum").eq(2).attr("index");
		if(index-2 == Index || index+2 == Index){
			$(".paging").find('*[index='+Index+']').addClass("on");
		}else{
			if(num == 0){
				index = Index+2;
			}else{
				index = Index-2;
			}
			$(".pageNum").remove();
			for (var i = index+1; i < index+3; i++) {
				var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
				$(".putPageNum").append(li);
			}
			for (var j = index; j > index-3; j--) {
				var li = $("<li index="+j+" class='pageNum'>"+j+"</li>");
				$(".putPageNum").prepend(li);
			}
		}
		$(".paging").find('*[index='+Index+']').addClass("on");
	}
	showHidePage(Index);
}
//上一页
function prevPage(){
	var index = parseInt($(".paging").find(".on").attr("index"));
	if (index != 1) {
		if ($(".pageNum:first").hasClass("on")) {
			$(".pageNum").remove();
			for (var i = index-1; i <index-1+5; i++) {
				var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
				$(".putPageNum").append(li);
			}
		}else{
			$(".pageNum").removeClass("on");
		}
		$(".paging").find('*[index='+(index-1)+']').addClass("on");
	}
	showHidePage(index-1);
}
//下一页
function nextPage(){
	var index = parseInt($(".paging").find(".on").attr("index"));
	if (index != pageAll) {
		if ($(".pageNum:last").hasClass("on")) {
			$(".pageNum").remove();
			for(var i = index + 1 ; i > index + 1-5 ; i--){
				var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
				$(".putPageNum").prepend(li);
			}
		}else{
			$(".pageNum").removeClass("on");
		}
		$(".paging").find('*[index='+(index+1)+']').addClass("on");
	}
	showHidePage(index+1);

}
//页码切换
function pageBtn(index){
	$(".pageNum").removeClass("on");
	$(".paging").find("*[index = "+index+"]").addClass("on");
	showHidePage(index);
}
//上一页、下一页显示隐藏
function showHidePage(index){
	if (index == 1) {
		$("#pagePrev").hide();
		$("#pageNext").show();
	}
	if(index >1 && index < pageAll){
		$("#pagePrev").show();
		$("#pageNext").show();
	}
	if(index == pageAll){
		$("#pagePrev").show();
		$("#pageNext").hide();
	}
	pagePosition();
}

//页面跳转
function turnToPage(){
	var selectOption = parseInt($('#sel option:selected').val());  
	var firstNumIndex = parseInt($(".pageNum:first").attr("index"));
	var lastNumIndex = parseInt($(".pageNum:last").attr("index"));
	if(selectOption>lastNumIndex){
		$(".pageNum").remove();
		for (var i = selectOption; i > selectOption - 5; i--) {
			var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
			$(".putPageNum").prepend(li);
		}
		$(".paging").find('*[index='+selectOption+']').addClass("on");
	}else if(selectOption < firstNumIndex){
		$(".pageNum").remove();
		for (var i = selectOption; i < selectOption + 5; i++) {
			var li = $("<li index="+i+" class='pageNum'>"+i+"</li>");
			$(".putPageNum").append(li);
		}
		$(".paging").find('*[index='+selectOption+']').addClass("on");
	}
	pageBtn(selectOption);
}
//分页位置
function pagePosition(){
	var pageWidthHalf = parseInt($("#paging").width()/2);
	$("#paging").css({"margin-left":-pageWidthHalf+'px'})
}

// 转换时间
function transTime(str){
	var date = new Date(parseInt(str));
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	hour = hour > 10 ? hour : "0"+hour;
	min = min > 10 ? min : "0"+min;
	sec = sec > 10 ? sec : "0"+sec;
	var time = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
	return time;
}

// 搜索框边框变化
$(document).on('click','.searchText',function(e){
	e.stopPropagation();
	var searchText = $(this);
	if (searchText.hasClass("formFocus")) {
		searchText.removeClass("formFocus");
		$("#searchUl").hide();
	}else{
		searchText.addClass("formFocus");
		$("#searchUl").show();
	}
})
$(document).on('click',function(){
	$(".searchText").removeClass("formFocus");
	$("#searchUl").hide();
})

// ajax封装
// 加载
function waitLoading() {
	var oDiv = $('<div class="loadingMask"><img src="image/loading1.gif"/></div>');
	$('body').append(oDiv); 
	return oDiv;
}
// get请求
jQuery.ajaxGet = function (url,successfn,isloadingshow,data) {
	var oDiv;
	$.ajax({
		url: url,
		type:'GET',
		async:true, 
		dataType:"json",
		data:data,
		contentType:"application/json;charset=UTF-8",
		success: function (result) {
			successfn(result);
		},
		error: function () {
			showMask("error","发生错误");
		},
		beforeSend:function(){
			if (isloadingshow) {
				oDiv = waitLoading();
			}
		},
		complete:function(){
			if (oDiv) {
				oDiv.remove();
			}
		}
	})
};

//post请求